import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous-client';

    // 1. Rate Limiting Check: max 5 enquiries per 10 minutes per IP
    const rateCheck = checkRateLimit(`enquiry:${ip}`, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'RATE_LIMITED',
            message: 'Too many enquiry requests. Please wait a few minutes before submitting again.',
          },
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot Bot Protection: if invisible honeypot field is filled, reject
    if (body._hp && body._hp.trim() !== '') {
      console.warn(`[Security] Honeypot triggered by IP ${ip}. Rejected submission.`);
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

    // Strip honeypot before forwarding to backend
    delete body._hp;

    // 3. Forward to Backend with Server-Side INTERNAL_API_KEY
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
    const internalKey = process.env.INTERNAL_API_KEY;

    const backendRes = await fetch(`${backendUrl}/api/public/v1/enquiries`, {
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
    console.error('BFF enquiry proxy error:', err);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'GATEWAY_ERROR',
          message: 'Unable to process enquiry at this time.',
        },
      },
      { status: 502 }
    );
  }
}
