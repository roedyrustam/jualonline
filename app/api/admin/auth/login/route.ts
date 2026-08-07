import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi.' },
        { status: 400 }
      );
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Kredensial admin tidak valid.' },
        { status: 401 }
      );
    }

    const passwordValid = await bcrypt.compare(password, admin.passwordHash);

    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Kredensial admin tidak valid.' },
        { status: 401 }
      );
    }

    // Set Encrypted Session Cookie
    await createAdminSession(admin.id, admin.email);

    return NextResponse.json({
      success: true,
      message: 'Login Admin Berhasil',
    });
  } catch (error) {
    console.error('Error logging in admin:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada sistem autentikasi.' },
      { status: 500 }
    );
  }
}
