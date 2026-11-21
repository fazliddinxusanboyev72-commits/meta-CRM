import { NextRequest, NextResponse } from 'next/server';
import { getNotifications, createNotification, markNotificationRead, logActivity } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const notifs = await getNotifications();
  return NextResponse.json(notifs);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const data = await req.json();
    const newNotif = await createNotification(data);
    await logActivity(
      session.username || 'admin',
      'NOTIFICATION_SEND',
      'Notifications',
      `Yangi xabarnoma yuborildi: ${newNotif.title}`
    );
    return NextResponse.json(newNotif, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id } = await req.json();
    const success = await markNotificationRead(id);
    return NextResponse.json({ success });
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
