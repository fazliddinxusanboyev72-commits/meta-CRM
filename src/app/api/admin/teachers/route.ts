import { NextRequest, NextResponse } from 'next/server';
import { getTeachers, createTeacher, updateTeacher, deleteTeacher, logActivity } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const teachers = await getTeachers();
  return NextResponse.json(teachers);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const data = await req.json();
    const teacher = await createTeacher(data);
    await logActivity(session.username || 'admin', 'TEACHER_CREATE', 'Teachers', `Yangi o'qituvchi qo'shildi: ${teacher.fullName}`);
    return NextResponse.json(teacher, { status: 201 });
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
    const updated = await updateTeacher(id, updates);
    if (!updated) return NextResponse.json({ error: 'Topilmadi' }, { status: 404 });

    await logActivity(session.username || 'admin', 'TEACHER_UPDATE', 'Teachers', `O'qituvchi yangilandi: ${updated.fullName}`);
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
    const success = await deleteTeacher(id);
    await logActivity(session.username || 'admin', 'TEACHER_DELETE', 'Teachers', `O'qituvchi o'chirildi (ID: ${id})`);
    return NextResponse.json({ success });
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
