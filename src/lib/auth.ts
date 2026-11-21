import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { verifyAdmin, AUTHORIZED_ADMIN_USERNAMES, logActivity, getStudentById, getStudents } from '@/lib/db';
import { UserRole } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'metaitschool-super-secret-jwt-key-2026-maximum-edition';
const COOKIE_NAME = 'metaitschool_session';

export interface SessionUser {
  id: string;
  username?: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// In-memory rate limiting map: ip -> { count, timestamp }
const rateLimitMap = new Map<string, { count: number; lastAttempt: number }>();

export function checkRateLimit(identifier: string, maxAttempts = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now - entry.lastAttempt > windowMs) {
    rateLimitMap.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }

  if (entry.count >= maxAttempts) {
    return false;
  }

  entry.count += 1;
  entry.lastAttempt = now;
  return true;
}

export function createToken(payload: SessionUser): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionUser;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function loginAdmin(username: string, pass: string, ip = '127.0.0.1'): Promise<{ success: boolean; error?: string; user?: SessionUser }> {
  const cleanUsername = username.trim().toLowerCase();

  if (!checkRateLimit(`admin-login-${ip}`)) {
    return { success: false, error: 'Haddan tashqari ko\'p urinish. Iltimos, 1 daqiqadan so\'ng qayta urinib ko\'ring.' };
  }

  // Strict enforcement: ONLY fazliddin, yaxyobek, jasurbek
  if (!AUTHORIZED_ADMIN_USERNAMES.includes(cleanUsername as any)) {
    return { success: false, error: 'Faqatgina vakolatli 3 nafar administrator tizimga kira oladi.' };
  }

  const admin = await verifyAdmin(cleanUsername, pass);
  if (!admin) {
    return { success: false, error: 'Parol yoki foydalanuvchi nomi noto\'g\'ri.' };
  }

  const sessionUser: SessionUser = {
    id: admin.id,
    username: admin.username,
    fullName: admin.fullName,
    email: admin.email,
    role: 'admin',
    avatar: admin.avatar,
  };

  const token = createToken(sessionUser);
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });

  await logActivity(admin.username, 'ADMIN_LOGIN', 'Auth', `Administrator tizimga kirdi (IP: ${ip})`, ip);

  return { success: true, user: sessionUser };
}

export async function loginStudent(emailOrId: string, pass: string): Promise<{ success: boolean; error?: string; user?: SessionUser }> {
  const students = await getStudents();
  const student = students.find(
    (s) => s.email.toLowerCase() === emailOrId.trim().toLowerCase() || s.studentId.toUpperCase() === emailOrId.trim().toUpperCase()
  );

  if (!student) {
    return { success: false, error: 'Bunday o\'quvchi topilmadi.' };
  }

  // Demo default password for students: student123 or admin
  if (pass !== 'student123' && pass !== 'admin') {
    return { success: false, error: 'Parol noto\'g\'ri.' };
  }

  const sessionUser: SessionUser = {
    id: student.id,
    fullName: student.fullName,
    email: student.email,
    role: 'student',
    avatar: student.avatar,
  };

  const token = createToken(sessionUser);
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });

  return { success: true, user: sessionUser };
}

export async function loginTeacher(email: string, pass: string): Promise<{ success: boolean; error?: string; user?: SessionUser }> {
  // Demo check for teacher
  if (pass !== 'teacher123' && pass !== 'admin') {
    return { success: false, error: 'Parol noto\'g\'ri.' };
  }

  const sessionUser: SessionUser = {
    id: 'teacher-1',
    fullName: 'Javohir Rahmatov',
    email: email,
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  };

  const token = createToken(sessionUser);
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });

  return { success: true, user: sessionUser };
}

export async function logoutUser(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}
