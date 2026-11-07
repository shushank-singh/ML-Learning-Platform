import { NextRequest, NextResponse } from 'next/server';
import { getServerUserContext } from '@/lib/entitlements/server';
import { getUserEntitlements } from '@/lib/entitlements/policy';

export const dynamic = 'force-dynamic';

/**
 * Authoritative Server-Side User Entitlement Endpoint
 *
 * Resolves the authenticated user's tier, owner status (from server env AZURLEARN_OWNER_ID /
 * AZURLEARN_OWNER_EMAIL or database role), and active paid plan in user_entitlements.
 *
 * Cache-Control is strictly private, no-store to prevent edge/proxy caching.
 */
export async function GET(req: NextRequest) {
  try {
    const userCtx = await getServerUserContext();
    const entitlements = getUserEntitlements(userCtx);

    return NextResponse.json(
      {
        success: true,
        entitlements,
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
    console.error('[/api/entitlements/me] Error:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to resolve user entitlements.',
        entitlements: {
          userId: null,
          tier: 'anonymous',
          isOwner: false,
          allowedModuleIds: [],
        },
      },
      { status: 500 }
    );
  }
}
