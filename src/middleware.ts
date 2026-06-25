import { NextRequest, NextResponse } from 'next/server';

// Web Crypto version of validateSession — Edge Runtime does not support Node.js crypto.
// Must stay in sync with src/lib/session.ts logic.
async function validateSessionEdge(cookieValue: string): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;

  const lastDot = cookieValue.lastIndexOf('.');
  if (lastDot === -1) return false;

  const payload = cookieValue.slice(0, lastDot);
  const receivedSigHex = cookieValue.slice(lastDot + 1);

  if (!receivedSigHex || receivedSigHex.length % 2 !== 0) return false;

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const receivedSig = new Uint8Array(
      receivedSigHex.match(/.{2}/g)!.map(byte => parseInt(byte, 16))
    );

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      receivedSig,
      encoder.encode(payload)
    );

    if (!isValid) return false;

    const parts = payload.split(':');
    const expiry = parts[parts.length - 1];
    return !!expiry && Date.now() < parseInt(expiry);
  } catch {
    return false;
  }
}

function isProtected(request: NextRequest): boolean {
  const pathname = request.nextUrl.pathname.replace(/\/+$/, '') || '/';
  const method = request.method;
  if (pathname === '/api/portfolio' && method === 'POST') return true;
  if (pathname === '/api/notes' && method === 'POST') return true;
  if (pathname.startsWith('/api/notes/') && (method === 'DELETE' || method === 'PATCH')) return true;
  if (pathname === '/api/upload' && method === 'POST') return true;
  return false;
}

export async function middleware(request: NextRequest) {
  if (isProtected(request)) {
    const sessionCookie = request.cookies.get('admin-session')?.value;
    if (!sessionCookie || !(await validateSessionEdge(sessionCookie))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/portfolio', '/api/notes', '/api/notes/', '/api/notes/:id*', '/api/upload'],
};
