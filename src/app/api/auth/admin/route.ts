import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createSignedSession, SESSION_COOKIE_MAX_AGE } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminPassword || !adminSecret) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Constant-time comparison prevents timing-based password inference
    const inputBuf = Buffer.from(password ?? '');
    const expectedBuf = Buffer.from(adminPassword);
    const passwordsMatch =
      inputBuf.length === expectedBuf.length &&
      crypto.timingSafeEqual(inputBuf, expectedBuf);

    if (!passwordsMatch) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    const sessionToken = createSignedSession();
    const response = NextResponse.json({ success: true });

    response.cookies.set('admin-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: SESSION_COOKIE_MAX_AGE,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
