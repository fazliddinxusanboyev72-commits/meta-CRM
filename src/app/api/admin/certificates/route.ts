import { NextRequest, NextResponse } from 'next/server';
import { getCertificates, issueCertificate, logActivity } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const certs = await getCertificates();
  return NextResponse.json(certs);
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const data = await req.json();
    const cert = await issueCertificate(data);
    await logActivity(
      session.username || 'admin',
      'CERTIFICATE_ISSUE',
      'Certificates',
      `${cert.studentName} uchun ${cert.certificateId} raqamli sertifikat generatsiya qilindi`
    );
    return NextResponse.json(cert, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
