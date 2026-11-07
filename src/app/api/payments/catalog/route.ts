import { NextResponse } from 'next/server';
import { getAllTrackProducts } from '@/lib/payments/products';

export const dynamic = 'force-dynamic';

export async function GET() {
  const products = getAllTrackProducts();
  return NextResponse.json(
    {
      success: true,
      products,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      },
    }
  );
}
