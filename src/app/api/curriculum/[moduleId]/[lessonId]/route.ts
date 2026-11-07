import { NextRequest, NextResponse } from 'next/server';
import { checkLessonAccessServer } from '@/lib/entitlements/server';
import { getLesson } from '@/data/modules/curriculum';
import { getPythonLesson } from '@/data/python/curriculum';
import { getJavaLesson } from '@/data/java/curriculum';
import { getDSALesson } from '@/data/dsa/curriculum';
import { resolveCanonicalModuleId } from '@/lib/entitlements/config';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { moduleId: string; lessonId: string } }
) {
  try {
    const { moduleId, lessonId } = params;

    if (!moduleId || !lessonId) {
      return NextResponse.json(
        { error: 'Missing moduleId or lessonId parameter.' },
        { status: 400 }
      );
    }

    // 1. Authoritative Server-Side Access Evaluation
    const access = await checkLessonAccessServer(moduleId, lessonId);

    // 2. Unauthenticated check
    if (!access.allowed && access.reason === 'unauthenticated') {
      return NextResponse.json(
        {
          error: 'Authentication required. Please sign in to access curriculum content.',
          reason: 'unauthenticated',
        },
        { status: 401 }
      );
    }

    // 3. Unauthorized / Locked Content check
    // CRITICAL: NEVER include the lesson body or protected material in the response
    if (!access.allowed) {
      return NextResponse.json(
        {
          error: access.message,
          reason: access.reason,
          locked: true,
          requiredPlan: access.requiredPlan || 'premium',
          moduleId: access.moduleId,
          lessonId: access.lessonId,
        },
        { status: 403 }
      );
    }

    // 4. Retrieve lesson content across all curriculum tracks
    const canonicalMod = resolveCanonicalModuleId(moduleId);
    let lesson: any = null;

    if (canonicalMod.startsWith('python-')) {
      lesson = getPythonLesson(lessonId);
    } else if (canonicalMod.startsWith('java-')) {
      lesson = getJavaLesson(lessonId);
    } else if (canonicalMod.startsWith('dsa-')) {
      lesson = getDSALesson(lessonId);
    } else {
      lesson = getLesson(moduleId, lessonId);
    }

    if (!lesson) {
      return NextResponse.json(
        { error: `Lesson "${lessonId}" not found in module "${moduleId}".` },
        { status: 404 }
      );
    }

    // Return the authorized lesson content with no-store cache control
    return NextResponse.json(
      {
        success: true,
        tier: access.tier,
        lesson,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
          Pragma: 'no-cache',
        },
      }
    );
  } catch (err: any) {
    console.error('[API Curriculum] Internal error:', err);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred.' },
      { status: 500 }
    );
  }
}

