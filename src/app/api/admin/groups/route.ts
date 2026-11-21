import { NextRequest, NextResponse } from 'next/server';
import { getGroups, createGroup, updateGroup, deleteGroup, logActivity } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const groups = await getGroups();
  return NextResponse.json(groups);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const data = await req.json();
    const group = await createGroup(data);
    await logActivity(session.username || 'admin', 'GROUP_CREATE', 'Groups', `Yangi guruh ochildi: ${group.name}`);
    return NextResponse.json(group, { status: 201 });
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
    const updated = await updateGroup(id, updates);
    if (!updated) return NextResponse.json({ error: 'Topilmadi' }, { status: 404 });

    await logActivity(session.username || 'admin', 'GROUP_UPDATE', 'Groups', `Guruh yangilandi: ${updated.name}`);
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
    const success = await deleteGroup(id);
    await logActivity(session.username || 'admin', 'GROUP_DELETE', 'Groups', `Guruh o'chirildi (ID: ${id})`);
    return NextResponse.json({ success });
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
