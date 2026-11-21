import { NextRequest, NextResponse } from 'next/server';
import { getCMSSettings, updateCMSSettings, logActivity } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const cms = await getCMSSettings();
  return NextResponse.json(cms);
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const updates = await req.json();
    const updated = await updateCMSSettings(updates);
    await logActivity(
      session.username || 'admin',
      'CMS_UPDATE',
      'CMS',
      'Veb-sayt bosh sahifasi va umumiy sozlamalari yangilandi'
    );
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
