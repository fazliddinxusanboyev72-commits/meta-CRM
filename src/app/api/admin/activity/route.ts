import { NextResponse } from 'next/server';
import { getActivityLogs } from '@/lib/db';

export async function GET() {
  const logs = await getActivityLogs();
  return NextResponse.json(logs);
}
