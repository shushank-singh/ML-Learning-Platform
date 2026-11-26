import { NextRequest, NextResponse } from 'next/server';
import { getServerUserContext } from '@/lib/entitlements/server';
import { isOwnerIdentity } from '@/lib/entitlements/policy';
import { TopicCreateOrUpdateSchema } from '@/lib/medverse/validation';
import {
  ANATOMY_ASSET_LIST,
  MBBS_SUBJECTS_CATALOG,
  MBBS_TOPICS_CATALOG,
  SCIENTIFIC_ANIMATIONS,
} from '@/data/medverse';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

function isAuthorizedEditor(ctx: Awaited<ReturnType<typeof getServerUserContext>>): boolean {
  if (!ctx.isAuthenticated || !ctx.userId) return false;
  if (isOwnerIdentity({ userId: ctx.userId, email: ctx.email })) return true;
  return ctx.role === 'admin' || ctx.role === 'owner';
}

/**
 * GET /api/medverse/studio
 * Returns MedVerse content audit, missing assets report, and editorial state.
 * Strictly requires Admin or Owner authorization on the server.
 */
export async function GET() {
  try {
    const ctx = await getServerUserContext();
    if (!ctx.isAuthenticated) {
      return NextResponse.json({ success: false, error: 'Authentication required.' }, { status: 401 });
    }
    if (!isAuthorizedEditor(ctx)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Admin or Owner role required for Content Studio.' },
        { status: 403 }
      );
    }

    const missingAssetTopics = MBBS_TOPICS_CATALOG.filter((t) => !t.assetId).map((t) => ({
      id: t.id,
      title: t.title,
      subjectId: t.subjectId,
      status: t.status,
    }));

    return NextResponse.json(
      {
        success: true,
        editor: {
          userId: ctx.userId,
          email: ctx.email,
          role: ctx.role || 'owner',
        },
        summary: {
          subjectsCount: MBBS_SUBJECTS_CATALOG.length,
          topicsCount: MBBS_TOPICS_CATALOG.length,
          publishedCount: MBBS_TOPICS_CATALOG.filter((t) => t.status === 'published').length,
          inDevelopmentCount: MBBS_TOPICS_CATALOG.filter((t) => t.status === 'in_development').length,
          plannedCount: MBBS_TOPICS_CATALOG.filter((t) => t.status === 'planned').length,
          assetsCount: ANATOMY_ASSET_LIST.length,
          animationsCount: SCIENTIFIC_ANIMATIONS.length,
          missingAssetTopicsCount: missingAssetTopics.length,
        },
        missingAssetTopics,
        assets: ANATOMY_ASSET_LIST,
        topics: MBBS_TOPICS_CATALOG,
      },
      { status: 200, headers: { 'Cache-Control': 'no-store, private' } }
    );
  } catch (err) {
    console.error('[/api/medverse/studio GET] Error:', err);
    return NextResponse.json({ success: false, error: 'Unexpected studio error.' }, { status: 500 });
  }
}

/**
 * POST /api/medverse/studio
 * Validates and persists a topic / status update to Supabase `topics` and `content_reviews`.
 */
export async function POST(req: NextRequest) {
  try {
    const ctx = await getServerUserContext();
    if (!ctx.isAuthenticated) {
      return NextResponse.json({ success: false, error: 'Authentication required.' }, { status: 401 });
    }
    if (!isAuthorizedEditor(ctx)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Admin or Owner role required.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = TopicCreateOrUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed.', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const topic = parsed.data;
    const supabase = getSupabaseServerClient();

    const { error } = await supabase.from('topics').upsert(
      {
        id: topic.id,
        module_id: topic.moduleId,
        subject_id: topic.subjectId,
        phase_id: topic.phaseId,
        title: topic.title,
        subtitle: topic.subtitle,
        status: topic.status,
        difficulty: topic.difficulty,
        estimated_minutes: topic.estimatedMinutes,
        asset_id: topic.assetId || null,
        focus_structure_ids: topic.focusStructureIds || [],
        content_version: topic.contentVersion,
        last_reviewed_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json(
          {
            success: true,
            persisted: 'validated_only',
            message: 'Payload passed Zod validation and authorization. Apply supabase/migrations/20261126_medverse_3d_schema.sql to persist edits in PostgreSQL.',
            topic,
          },
          { status: 200 }
        );
      }
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    await supabase.from('content_reviews').insert({
      entity_type: 'topic',
      entity_id: topic.id,
      reviewer_id: ctx.userId,
      new_status: topic.status,
      review_notes: `Updated via MedVerse Content Studio (${topic.contentVersion})`,
    });

    return NextResponse.json(
      {
        success: true,
        persisted: 'database',
        topic,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('[/api/medverse/studio POST] Error:', err);
    return NextResponse.json({ success: false, error: 'Failed to save studio entry.' }, { status: 500 });
  }
}
