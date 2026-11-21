import { NextRequest, NextResponse } from 'next/server';
import { getExams, createExam, logActivity } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const exams = await getExams();
  return NextResponse.json(exams);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== 'admin' && session.role !== 'teacher')) {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const data = await req.json();
    const exam = await createExam(data);
    await logActivity(
      session.username || session.fullName,
      'EXAM_CREATE',
      'Exams',
      `Yangi imtihon yaratildi: ${exam.title}`
    );
    return NextResponse.json(exam, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
