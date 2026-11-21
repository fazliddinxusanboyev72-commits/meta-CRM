import { NextRequest, NextResponse } from 'next/server';
import { createApplication, getCourses } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, phone, age, courseId, preferredSchedule, message } = body;

    if (!fullName || !phone || !courseId) {
      return NextResponse.json(
        { error: 'Iltimos, barcha majburiy maydonlarni to\'ldiring.' },
        { status: 400 }
      );
    }

    const courses = await getCourses();
    const course = courses.find((c) => c.id === courseId || c.slug === courseId);
    const courseName = course ? course.title : 'Umumiy Dasturlash';

    const newApp = await createApplication({
      fullName: fullName.trim(),
      phone: phone.trim(),
      age: Number(age) || 20,
      courseId,
      courseName,
      preferredSchedule: preferredSchedule || 'Kechki guruh (18:30)',
      message: message?.trim() || '',
    });

    return NextResponse.json({ success: true, application: newApp }, { status: 201 });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json({ error: 'Server xatoligi yuz berdi' }, { status: 500 });
  }
}
