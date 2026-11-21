import { NextRequest, NextResponse } from 'next/server';
import { getCourses, createCourse, updateCourse, deleteCourse, logActivity } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const courses = await getCourses();
  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const data = await req.json();
    const course = await createCourse(data);
    await logActivity(session.username || 'admin', 'COURSE_CREATE', 'Courses', `Yangi kurs yaratildi: ${course.title}`);
    return NextResponse.json(course, { status: 201 });
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
    const updated = await updateCourse(id, updates);
    if (!updated) return NextResponse.json({ error: 'Topilmadi' }, { status: 404 });

    await logActivity(session.username || 'admin', 'COURSE_UPDATE', 'Courses', `Kurs yangilandi: ${updated.title}`);
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
    const success = await deleteCourse(id);
    await logActivity(session.username || 'admin', 'COURSE_DELETE', 'Courses', `Kurs o'chirildi (ID: ${id})`);
    return NextResponse.json({ success });
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
