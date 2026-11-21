import { NextRequest, NextResponse } from 'next/server';
import { loginStudent, loginTeacher } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { login, password, role } = await req.json();

    if (!login || !password) {
      return NextResponse.json({ error: 'Login va parol kiritilishi shart.' }, { status: 400 });
    }

    let result;
    if (role === 'teacher') {
      result = await loginTeacher(login, password);
    } else {
      result = await loginStudent(login, password);
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: result.user });
  } catch (error) {
    console.error('Portal login error:', error);
    return NextResponse.json({ error: 'Server xatoligi yuz berdi' }, { status: 500 });
  }
}
