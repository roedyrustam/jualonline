import { NextResponse } from 'next/server';
import { deleteAdminSession } from '@/lib/auth';

export async function POST() {
  await deleteAdminSession();
  return NextResponse.json({ success: true, message: 'Logout Admin Berhasil' });
}
