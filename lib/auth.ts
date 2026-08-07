import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-editorial-digital-store-key-2026'
);

export async function createAdminSession(adminId: string, email: string) {
  const token = await new SignJWT({ adminId, email, role: 'ADMIN' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return token;
}

export async function verifyAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!token) return null;

  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as { adminId: string; email: string; role: string };
  } catch {
    return null;
  }
}

export async function deleteAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}
