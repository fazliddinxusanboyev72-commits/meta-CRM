import { NextRequest, NextResponse } from 'next/server';
import { getAllAttendance, saveAttendance, logActivity } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const records = await getAllAttendance();
  return NextResponse.json(records);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== 'admin' && session.role !== 'teacher')) {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const data = await req.json();
    const saved = await saveAttendance(data);
    await logActivity(
      session.username || session.fullName,
      'ATTENDANCE_RECORD',
      'Attendance',
      `${saved.groupName} guruhi uchun davomat belgilandi (${saved.date})`
    );
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
