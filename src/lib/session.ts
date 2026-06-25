import crypto from 'crypto';

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;
export const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24; // seconds, for cookie maxAge

export function createSignedSession(): string {
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = Date.now() + SESSION_MAX_AGE_MS;
  const payload = `${token}:${expiry}`;
  const signature = crypto
    .createHmac('sha256', process.env.ADMIN_SECRET!)
    .update(payload)
    .digest('hex');
  return `${payload}.${signature}`;
}

export function validateSession(cookieValue: string): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;

  const lastDot = cookieValue.lastIndexOf('.');
  if (lastDot === -1) return false;

  const payload = cookieValue.slice(0, lastDot);
  const receivedSig = cookieValue.slice(lastDot + 1);

  try {
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    const a = Buffer.from(receivedSig, 'hex');
    const b = Buffer.from(expectedSig, 'hex');
    if (a.length !== b.length) return false;
    if (!crypto.timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }

  const parts = payload.split(':');
  const expiry = parts[parts.length - 1];
  return !!expiry && Date.now() < parseInt(expiry);
}
