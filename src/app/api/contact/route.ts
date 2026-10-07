import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous-client';

    // Rate Limit: 5 per 10 mins
    const rateCheck = checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'RATE_LIMITED',
            message: 'Too many messages sent. Please wait before contacting again.',
          },
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot Bot Protection
    if (body._hp && body._hp.trim() !== '') {
      console.warn(`[Security] Honeypot triggered in contact form by IP ${ip}. Rejected.`);
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'BOT_DETECTED',
            message: 'Automated submission rejected.',
          },
        },
        { status: 400 }
      );
    }

    delete body._hp;

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
    const internalKey = process.env.INTERNAL_API_KEY;

    const backendRes = await fetch(`${backendUrl}/api/public/v1/contact`, {
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
    console.error('BFF contact proxy error:', err);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'PROXY_ERROR',
          message: 'Unable to reach concierge gateway. Please reach out via WhatsApp.',
        },
      },
      { status: 500 }
    );
  }
}
