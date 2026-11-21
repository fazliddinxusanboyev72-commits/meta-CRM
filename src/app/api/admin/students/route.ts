import { NextRequest, NextResponse } from 'next/server';
import { getStudents, createStudent, updateStudent, deleteStudent, logActivity } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const students = await getStudents();
  return NextResponse.json(students);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const data = await req.json();
    const student = await createStudent(data);
    await logActivity(session.username || 'admin', 'STUDENT_CREATE', 'Students', `Yangi o'quvchi qo'shildi: ${student.fullName}`);
    return NextResponse.json(student, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const { id, ...updates } = await req.json();
    const updated = await updateStudent(id, updates);
    if (!updated) return NextResponse.json({ error: 'Topilmadi' }, { status: 404 });

    await logActivity(session.username || 'admin', 'STUDENT_UPDATE', 'Students', `O'quvchi ma'lumotlari yangilandi: ${updated.fullName}`);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const { id } = await req.json();
    const success = await deleteStudent(id);
    await logActivity(session.username || 'admin', 'STUDENT_DELETE', 'Students', `O'quvchi o'chirildi (ID: ${id})`);
    return NextResponse.json({ success });
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
