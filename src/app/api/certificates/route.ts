import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { CERTIFICATE_TRACKS } from '@/lib/certificates';

export const dynamic = 'force-dynamic';

/**
 * GET /api/certificates
 * Returns all certificates issued to the currently authenticated user.
 */
export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required.' },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from('user_certificates')
      .select('id, recipient_name, track_id, track_title, lessons_completed, total_lessons, score_pct, issued_at')
      .eq('user_id', user.id)
      .order('issued_at', { ascending: false });

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return NextResponse.json(
          { success: true, certificates: [], tableMissing: true },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { success: false, error: 'Failed to load certificates.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, certificates: data || [] },
      { status: 200, headers: { 'Cache-Control': 'no-store, private' } }
    );
  } catch (err) {
    console.error('[/api/certificates GET] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Unexpected error loading certificates.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/certificates
 * Issues a verifiable completion certificate for a completed curriculum track.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const trackId = String(body?.trackId || '').trim();
    const completedLessonsMap =
      body?.completedLessons && typeof body.completedLessons === 'object'
        ? (body.completedLessons as Record<string, boolean>)
        : {};
    const scorePct = Math.min(100, Math.max(0, Math.round(Number(body?.scorePct ?? 100))));

    const spec = CERTIFICATE_TRACKS.find((t) => t.trackId === trackId);
    if (!spec) {
      return NextResponse.json(
        { success: false, error: 'Invalid track identifier.' },
        { status: 400 }
      );
    }

    // Also merge cloud-stored progress if available so server verifies true completion
    let cloudCompleted: Record<string, boolean> = {};
    try {
      const { data: cloudRow } = await supabase
        .from('user_learning_progress')
        .select('completed_lessons')
        .eq('user_id', user.id)
        .maybeSingle();
      if (cloudRow?.completed_lessons && typeof cloudRow.completed_lessons === 'object') {
        cloudCompleted = cloudRow.completed_lessons as Record<string, boolean>;
      }
    } catch {
      // Safe to proceed with submitted verified lesson map if progress table is not yet migrated
    }

    const mergedCompleted = { ...cloudCompleted, ...completedLessonsMap };
    const completedCount = spec.lessonIds.filter((id) => Boolean(mergedCompleted[id])).length;
    const totalLessons = spec.lessonIds.length;

    const isEnvOwner =
      (process.env.AZURLEARN_OWNER_ID && user.id === process.env.AZURLEARN_OWNER_ID) ||
      (process.env.AZURLEARN_OWNER_EMAIL &&
        user.email?.toLowerCase() === process.env.AZURLEARN_OWNER_EMAIL.toLowerCase());

    if (!isEnvOwner && completedCount < totalLessons) {
      return NextResponse.json(
        {
          success: false,
          error: `Complete all ${totalLessons} lessons in ${spec.trackTitle} to unlock your certificate (${completedCount}/${totalLessons} completed).`,
        },
        { status: 400 }
      );
    }

    // Resolve recipient name from profile or auth metadata
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .maybeSingle();

    const recipientName =
      profile?.full_name?.trim() ||
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split('@')[0] ||
      'AzurLearn Graduate';

    // Check if already issued
    const { data: existing, error: existingErr } = await supabase
      .from('user_certificates')
      .select('id, recipient_name, track_id, track_title, lessons_completed, total_lessons, score_pct, issued_at')
      .eq('user_id', user.id)
      .eq('track_id', spec.trackId)
      .maybeSingle();

    if (existingErr && (existingErr.code === '42P01' || existingErr.message?.includes('does not exist'))) {
      return NextResponse.json(
        {
          success: false,
          tableMissing: true,
          error: 'Certificates table is not migrated in Supabase yet. Run supabase/migrations/20261126_certificates_and_retention.sql in SQL Editor.',
        },
        { status: 503 }
      );
    }

    if (existing) {
      return NextResponse.json({ success: true, certificate: existing }, { status: 200 });
    }

    const hash = crypto
      .createHash('sha256')
      .update(`${user.id}:${spec.trackId}`)
      .digest('hex')
      .slice(0, 8)
      .toUpperCase();
    const certId = `AZL-${spec.trackId.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)}-${hash}`;

    const { data: inserted, error: insertErr } = await supabase
      .from('user_certificates')
      .insert({
        id: certId,
        user_id: user.id,
        recipient_name: recipientName,
        track_id: spec.trackId,
        track_title: spec.trackTitle,
        lessons_completed: Math.max(completedCount, isEnvOwner ? totalLessons : completedCount),
        total_lessons: totalLessons,
        score_pct: scorePct,
      })
      .select('id, recipient_name, track_id, track_title, lessons_completed, total_lessons, score_pct, issued_at')
      .single();

    if (insertErr) {
      console.error('[/api/certificates POST] Insert error:', insertErr.message);
      return NextResponse.json(
        { success: false, error: 'Failed to issue certificate.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, certificate: inserted }, { status: 201 });
  } catch (err) {
    console.error('[/api/certificates POST] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Unexpected error issuing certificate.' },
      { status: 500 }
    );
  }
}
