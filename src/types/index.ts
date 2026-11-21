export type UserRole = 'admin' | 'teacher' | 'student';

export interface AdminUser {
  id: string;
  username: 'fazliddin' | 'yaxyobek' | 'jasurbek' | string;
  passwordHash: string;
  fullName: string;
  email: string;
  avatar?: string;
  role: 'admin';
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  studentId: string; // e.g. META-S-1001
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'graduated';
  balance: number;
  enrolledCourseIds: string[];
  groupId?: string;
  groupName?: string;
  attendanceRate: number;
  averageGrade: number;
  joinedAt: string;
  notes?: string;
}

export interface Teacher {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  specialization: string;
  experience: string;
  rating: number;
  studentsCount: number;
  courseIds: string[];
  social: {
    github?: string;
    linkedin?: string;
    telegram?: string;
  };
}

export interface LessonResource {
  name: string;
  url: string;
  size: string;
  type: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  slug: string;
  duration: string;
  order: number;
  videoUrl: string;
  contentMarkdown: string;
  resources: LessonResource[];
  isFreePreview?: boolean;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'programming' | 'design' | 'technology';
  level: 'Boshlang\'ich' | 'O\'rta' | 'Mukammal';
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  teacherId: string;
  teacherName?: string;
  teacherAvatar?: string;
  coverImage: string;
  description: string;
  overview: string;
  learningOutcomes: string[];
  requirements: string[];
  modulesCount: number;
  lessonsCount: number;
  isPopular?: boolean;
  status: 'published' | 'draft';
  modules?: CourseModule[];
}

export interface AcademicGroup {
  id: string;
  name: string;
  courseId: string;
  courseTitle: string;
  teacherId: string;
  teacherName: string;
  schedule: string; // e.g. Du-Chor-Juma 18:00 - 20:00
  room: string;
  capacity: number;
  studentIds: string[];
  studentsCount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  note?: string;
}

export interface GroupAttendance {
  id: string;
  groupId: string;
  groupName: string;
  date: string;
  topic?: string;
  records: AttendanceRecord[];
}

export type ApplicationStatus = 'NEW' | 'CONTACTED' | 'CONSULTATION' | 'APPROVED' | 'ENROLLED' | 'REJECTED';

export interface CRMApplication {
  id: string;
  fullName: string;
  phone: string;
  age: number;
  courseId: string;
  courseName: string;
  preferredSchedule: string;
  message?: string;
  status: ApplicationStatus;
  notes: {
    id: string;
    text: string;
    author: string;
    createdAt: string;
  }[];
  followUpDate?: string;
  createdAt: string;
  convertedToStudentId?: string;
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  studentName: string;
  content: string;
  fileUrl?: string;
  submittedAt: string;
  status: 'submitted' | 'graded';
  score?: number;
  maxScore: number;
  feedback?: string;
  gradedAt?: string;
}

export interface Homework {
  id: string;
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  groupId: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  submissionsCount?: number;
}

export interface ExamQuestion {
  id: string;
  text: string;
  type: 'mcq' | 'tf' | 'short';
  options?: string[];
  correctAnswer: string;
  points: number;
}

export interface Exam {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  durationMinutes: number;
  passingScore: number;
  questions: ExamQuestion[];
  status: 'published' | 'draft';
}

export interface ExamAttempt {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  answers: Record<string, string>;
  score: number;
  maxScore: number;
  passed: boolean;
  completedAt: string;
}

export interface Certificate {
  id: string;
  certificateId: string; // e.g. META-2026-9481
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  teacherName: string;
  issueDate: string;
  verificationUrl: string;
  qrCodeUrl: string;
  status: 'active' | 'revoked';
}

export type PaymentStatus = 'paid' | 'partially_paid' | 'pending' | 'overdue' | 'cancelled';

export interface Payment {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  totalDue: number;
  method: 'Payme' | 'Click' | 'Bank Card' | 'Cash';
  status: PaymentStatus;
  date: string;
  notes?: string;
}

export interface Expense {
  id: string;
  title: string;
  category: 'rent' | 'servers' | 'marketing' | 'salary' | 'equipment' | 'other';
  amount: number;
  date: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  targetRole: 'all' | 'admin' | 'teacher' | 'student';
  targetUserId?: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: 'web' | 'mobile' | 'ai' | 'design';
  categoryLabel: string;
  studentName: string;
  courseTitle: string;
  coverImage: string;
  demoUrl?: string;
  githubUrl?: string;
  description: string;
  technologies: string[];
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  status: 'published' | 'draft';
}

export interface TestimonialItem {
  id: string;
  studentName: string;
  role: string;
  company?: string;
  courseTitle: string;
  avatar: string;
  rating: number;
  content: string;
  featured?: boolean;
}

export interface CMSSettings {
  hero: {
    badge: string;
    headline: string;
    highlightedText: string;
    supportingText: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  announcement: {
    enabled: boolean;
    text: string;
    linkText: string;
    linkUrl: string;
  };
  about: {
    story: string;
    mission: string;
    vision: string;
    stats: {
      graduates: number;
      hiredRate: number;
      coursesCount: number;
      partnersCount: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    telegram: string;
    instagram: string;
    youtube: string;
    workingHours: string;
  };
}

export interface ActivityLog {
  id: string;
  username: string;
  action: string;
  entity: string;
  details: string;
  ip: string;
  timestamp: string;
}
