import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous-client';

    // Rate Limit: 10 per 10 mins
    const rateCheck = checkRateLimit(`newsletter:${ip}`, 10, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'RATE_LIMITED',
            message: 'Too many newsletter requests. Please wait a moment.',
          },
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot check
    if (body._hp && body._hp.trim() !== '') {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'BOT_DETECTED',
            message: 'Automated request rejected.',
          },
        },
        { status: 400 }
      );
    }

    delete body._hp;

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
    const internalKey = process.env.INTERNAL_API_KEY;

    const backendRes = await fetch(`${backendUrl}/api/public/v1/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-key': internalKey || '',
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json().catch(() => null);
    return NextResponse.json(data, { status: backendRes.status });
  } catch (err: any) {
    console.error('BFF newsletter proxy error:', err);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'PROXY_ERROR',
          message: 'Unable to subscribe to newsletter at this time.',
        },
      },
      { status: 500 }
    );
  }
}
