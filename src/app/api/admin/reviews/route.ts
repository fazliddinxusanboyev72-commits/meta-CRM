import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, createTestimonial } from '@/lib/db';

export async function GET() {
  const reviews = await getTestimonials();
  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const created = await createTestimonial(data);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
