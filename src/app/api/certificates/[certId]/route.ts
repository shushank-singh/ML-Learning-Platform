import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/certificates/[certId]
 * Public read-only endpoint to verify a certificate ID without exposing user PII.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { certId: string } }
) {
  try {
    const certId = decodeURIComponent(params.certId || '').trim().toUpperCase();
    if (!certId || !/^AZL-[A-Z0-9-]+$/.test(certId)) {
      return NextResponse.json(
        { valid: false, error: 'Invalid certificate identifier format.' },
        { status: 400 }
      );
    }

    const admin = getSupabaseAdminClient();
    if (admin) {
      const { data, error } = await admin
        .from('user_certificates')
        .select('id, recipient_name, track_id, track_title, lessons_completed, total_lessons, score_pct, issued_at')
        .eq('id', certId)
        .maybeSingle();

      if (error && (error.code === '42P01' || error.message?.includes('does not exist'))) {
        return NextResponse.json({ valid: false, error: 'Certificate registry unavailable.' }, { status: 404 });
      }
      if (!data) {
        return NextResponse.json({ valid: false, error: 'Certificate not found.' }, { status: 404 });
      }
      return NextResponse.json({ valid: true, certificate: data }, { status: 200 });
    }

    // Fallback: call SECURITY DEFINER public RPC
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.rpc('verify_certificate_by_id', {
      cert_id: certId,
    });

    if (error || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ valid: false, error: 'Certificate not found.' }, { status: 404 });
    }

    return NextResponse.json({ valid: true, certificate: data[0] }, { status: 200 });
  } catch (err) {
    console.error('[/api/certificates/[certId] GET] Error:', err);
    return NextResponse.json(
      { valid: false, error: 'Failed to verify certificate.' },
      { status: 500 }
    );
  }
}
