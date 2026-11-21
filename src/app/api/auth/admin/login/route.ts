import { NextRequest, NextResponse } from 'next/server';
import { loginAdmin } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Foydalanuvchi nomi va parol kiritilishi shart.' },
        { status: 400 }
      );
    }

    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const result = await loginAdmin(username, password, ip);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: result.user });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Serverda xatolik yuz berdi.' }, { status: 500 });
  }
}
