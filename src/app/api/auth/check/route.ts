import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get('admin-session')?.value;

  if (sessionCookie && validateSession(sessionCookie)) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false });
}
