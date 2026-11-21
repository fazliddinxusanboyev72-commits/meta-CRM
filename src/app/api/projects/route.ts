import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/db';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
