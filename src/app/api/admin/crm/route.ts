import { NextRequest, NextResponse } from 'next/server';
import {
  getApplications,
  updateApplicationStatus,
  addApplicationNote,
  convertApplicationToStudent,
  logActivity,
} from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const apps = await getApplications();
  return NextResponse.json(apps);
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const { id, status } = await req.json();
    const updated = await updateApplicationStatus(id, status);
    if (!updated) return NextResponse.json({ error: 'Topilmadi' }, { status: 404 });

    await logActivity(
      session.username || 'admin',
      'CRM_STATUS_CHANGE',
      'CRM',
      `${updated.fullName} arizasi holati "${status}" ga o'zgartirildi`
    );
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const body = await req.json();
    const { action, applicationId, text, groupId } = body;

    if (action === 'add-note') {
      const updated = await addApplicationNote(applicationId, text, session.username || 'admin');
      return NextResponse.json(updated);
    }

    if (action === 'convert') {
      const result = await convertApplicationToStudent(applicationId, groupId);
      if (!result) return NextResponse.json({ error: 'Aylantirishda xatolik yuz berdi' }, { status: 400 });

      await logActivity(
        session.username || 'admin',
        'CRM_CONVERT_STUDENT',
        'CRM',
        `${result.student.fullName} muvaffaqiyatli o'quvchilar safiga qabul qilindi (Student ID: ${result.student.studentId})`
      );
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Noto\'g\'ri amal' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
