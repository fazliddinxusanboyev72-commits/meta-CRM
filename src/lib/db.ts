import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import {
  AdminUser,
  Teacher,
  Course,
  AcademicGroup,
  Student,
  GroupAttendance,
  CRMApplication,
  Homework,
  HomeworkSubmission,
  Exam,
  ExamAttempt,
  Certificate,
  Payment,
  Expense,
  NotificationItem,
  ProjectItem,
  BlogPost,
  TestimonialItem,
  CMSSettings,
  ActivityLog,
  ApplicationStatus,
} from '@/types';
import {
  INITIAL_ADMINS,
  INITIAL_TEACHERS,
  INITIAL_COURSES,
  INITIAL_GROUPS,
  INITIAL_STUDENTS,
  INITIAL_ATTENDANCE,
  INITIAL_APPLICATIONS,
  INITIAL_HOMEWORK,
  INITIAL_SUBMISSIONS,
  INITIAL_EXAMS,
  INITIAL_CERTIFICATES,
  INITIAL_PAYMENTS,
  INITIAL_EXPENSES,
  INITIAL_NOTIFICATIONS,
  INITIAL_PROJECTS,
  INITIAL_BLOG,
  INITIAL_TESTIMONIALS,
  INITIAL_CMS_SETTINGS,
  INITIAL_ACTIVITY_LOGS,
} from '@/data/seed-data';

interface DatabaseSchema {
  admins: AdminUser[];
  teachers: Teacher[];
  courses: Course[];
  groups: AcademicGroup[];
  students: Student[];
  attendance: GroupAttendance[];
  applications: CRMApplication[];
  homework: Homework[];
  submissions: HomeworkSubmission[];
  exams: Exam[];
  examAttempts: ExamAttempt[];
  certificates: Certificate[];
  payments: Payment[];
  expenses: Expense[];
  notifications: NotificationItem[];
  projects: ProjectItem[];
  blog: BlogPost[];
  testimonials: TestimonialItem[];
  cms: CMSSettings;
  activityLogs: ActivityLog[];
}

const DB_DIR = path.join(process.cwd(), 'src', 'data');
const DB_PATH = path.join(DB_DIR, 'metaitschool-db.json');

let inMemoryCache: DatabaseSchema | null = null;
let writeQueue: Promise<void> = Promise.resolve();

// Only these 3 authorized administrator accounts are allowed by specification
export const AUTHORIZED_ADMIN_USERNAMES = ['fazliddin', 'yaxyobek', 'jasurbek'] as const;

async function ensureDbInitialized(): Promise<DatabaseSchema> {
  if (inMemoryCache) {
    return inMemoryCache;
  }

  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    const content = await fs.readFile(DB_PATH, 'utf-8');
    inMemoryCache = JSON.parse(content) as DatabaseSchema;
    return inMemoryCache;
  } catch {
    // Initialize with seed data
    const seedDb: DatabaseSchema = {
      admins: INITIAL_ADMINS,
      teachers: INITIAL_TEACHERS,
      courses: INITIAL_COURSES,
      groups: INITIAL_GROUPS,
      students: INITIAL_STUDENTS,
      attendance: INITIAL_ATTENDANCE,
      applications: INITIAL_APPLICATIONS,
      homework: INITIAL_HOMEWORK,
      submissions: INITIAL_SUBMISSIONS,
      exams: INITIAL_EXAMS,
      examAttempts: [],
      certificates: INITIAL_CERTIFICATES,
      payments: INITIAL_PAYMENTS,
      expenses: INITIAL_EXPENSES,
      notifications: INITIAL_NOTIFICATIONS,
      projects: INITIAL_PROJECTS,
      blog: INITIAL_BLOG,
      testimonials: INITIAL_TESTIMONIALS,
      cms: INITIAL_CMS_SETTINGS,
      activityLogs: INITIAL_ACTIVITY_LOGS,
    };
    inMemoryCache = seedDb;
    await persistDb(seedDb);
    return seedDb;
  }
}

async function persistDb(data: DatabaseSchema): Promise<void> {
  // Chain writes safely
  writeQueue = writeQueue.then(async () => {
    try {
      const tempPath = `${DB_PATH}.tmp.${Date.now()}`;
      await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf-8');
      await fs.rename(tempPath, DB_PATH);
    } catch {
      // Direct write fallback
      await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    }
  });
  return writeQueue;
}

// ==================== AUTHENTICATION & ADMINS ====================

export async function verifyAdmin(username: string, plainPass: string): Promise<AdminUser | null> {
  const db = await ensureDbInitialized();
  const lowerUser = username.trim().toLowerCase();

  // Strict check: only the 3 designated administrators
  if (!AUTHORIZED_ADMIN_USERNAMES.includes(lowerUser as any)) {
    return null;
  }

  const admin = db.admins.find((a) => a.username.toLowerCase() === lowerUser);
  if (!admin) {
    return null;
  }

  const isValid = bcrypt.compareSync(plainPass, admin.passwordHash);
  if (!isValid) {
    return null;
  }

  return admin;
}

export async function getAdmins(): Promise<AdminUser[]> {
  const db = await ensureDbInitialized();
  return db.admins.map(({ passwordHash: _, ...rest }) => rest as AdminUser);
}

// ==================== STUDENTS ====================

export async function getStudents(): Promise<Student[]> {
  const db = await ensureDbInitialized();
  return db.students;
}

export async function getStudentById(id: string): Promise<Student | null> {
  const db = await ensureDbInitialized();
  return db.students.find((s) => s.id === id || s.studentId === id) || null;
}

export async function createStudent(data: Omit<Student, 'id' | 'studentId' | 'joinedAt'>): Promise<Student> {
  const db = await ensureDbInitialized();
  const nextNum = 1000 + db.students.length + 1;
  const newStudent: Student = {
    ...data,
    id: `student-${Date.now()}`,
    studentId: `META-S-${nextNum}`,
    joinedAt: new Date().toISOString().split('T')[0],
  };
  db.students.unshift(newStudent);
  await persistDb(db);
  return newStudent;
}

export async function updateStudent(id: string, updates: Partial<Student>): Promise<Student | null> {
  const db = await ensureDbInitialized();
  const index = db.students.findIndex((s) => s.id === id);
  if (index === -1) return null;
  db.students[index] = { ...db.students[index], ...updates };
  await persistDb(db);
  return db.students[index];
}

export async function deleteStudent(id: string): Promise<boolean> {
  const db = await ensureDbInitialized();
  const initialLength = db.students.length;
  db.students = db.students.filter((s) => s.id !== id);
  if (db.students.length !== initialLength) {
    await persistDb(db);
    return true;
  }
  return false;
}

// ==================== TEACHERS ====================

export async function getTeachers(): Promise<Teacher[]> {
  const db = await ensureDbInitialized();
  return db.teachers;
}

export async function getTeacherById(id: string): Promise<Teacher | null> {
  const db = await ensureDbInitialized();
  return db.teachers.find((t) => t.id === id) || null;
}

export async function createTeacher(data: Omit<Teacher, 'id'>): Promise<Teacher> {
  const db = await ensureDbInitialized();
  const newTeacher: Teacher = {
    ...data,
    id: `teacher-${Date.now()}`,
  };
  db.teachers.push(newTeacher);
  await persistDb(db);
  return newTeacher;
}

export async function updateTeacher(id: string, updates: Partial<Teacher>): Promise<Teacher | null> {
  const db = await ensureDbInitialized();
  const index = db.teachers.findIndex((t) => t.id === id);
  if (index === -1) return null;
  db.teachers[index] = { ...db.teachers[index], ...updates };
  await persistDb(db);
  return db.teachers[index];
}

export async function deleteTeacher(id: string): Promise<boolean> {
  const db = await ensureDbInitialized();
  db.teachers = db.teachers.filter((t) => t.id !== id);
  await persistDb(db);
  return true;
}

// ==================== COURSES ====================

export async function getCourses(): Promise<Course[]> {
  const db = await ensureDbInitialized();
  return db.courses;
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const db = await ensureDbInitialized();
  return db.courses.find((c) => c.slug === slug || c.id === slug) || null;
}

export async function createCourse(data: Omit<Course, 'id'>): Promise<Course> {
  const db = await ensureDbInitialized();
  const newCourse: Course = {
    ...data,
    id: data.slug || `course-${Date.now()}`,
  };
  db.courses.unshift(newCourse);
  await persistDb(db);
  return newCourse;
}

export async function updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
  const db = await ensureDbInitialized();
  const index = db.courses.findIndex((c) => c.id === id || c.slug === id);
  if (index === -1) return null;
  db.courses[index] = { ...db.courses[index], ...updates };
  await persistDb(db);
  return db.courses[index];
}

export async function deleteCourse(id: string): Promise<boolean> {
  const db = await ensureDbInitialized();
  db.courses = db.courses.filter((c) => c.id !== id && c.slug !== id);
  await persistDb(db);
  return true;
}

// ==================== ACADEMIC GROUPS ====================

export async function getGroups(): Promise<AcademicGroup[]> {
  const db = await ensureDbInitialized();
  return db.groups;
}

export async function getGroupById(id: string): Promise<AcademicGroup | null> {
  const db = await ensureDbInitialized();
  return db.groups.find((g) => g.id === id) || null;
}

export async function createGroup(data: Omit<AcademicGroup, 'id' | 'studentsCount'>): Promise<AcademicGroup> {
  const db = await ensureDbInitialized();
  const newGroup: AcademicGroup = {
    ...data,
    id: `group-${Date.now()}`,
    studentsCount: data.studentIds?.length || 0,
  };
  db.groups.push(newGroup);
  await persistDb(db);
  return newGroup;
}

export async function updateGroup(id: string, updates: Partial<AcademicGroup>): Promise<AcademicGroup | null> {
  const db = await ensureDbInitialized();
  const index = db.groups.findIndex((g) => g.id === id);
  if (index === -1) return null;
  if (updates.studentIds) {
    updates.studentsCount = updates.studentIds.length;
  }
  db.groups[index] = { ...db.groups[index], ...updates };
  await persistDb(db);
  return db.groups[index];
}

export async function deleteGroup(id: string): Promise<boolean> {
  const db = await ensureDbInitialized();
  db.groups = db.groups.filter((g) => g.id !== id);
  await persistDb(db);
  return true;
}

// ==================== ATTENDANCE ====================

export async function getAllAttendance(): Promise<GroupAttendance[]> {
  const db = await ensureDbInitialized();
  return db.attendance;
}

export async function getAttendanceByGroup(groupId: string): Promise<GroupAttendance[]> {
  const db = await ensureDbInitialized();
  return db.attendance.filter((a) => a.groupId === groupId);
}

export async function saveAttendance(record: Omit<GroupAttendance, 'id'>): Promise<GroupAttendance> {
  const db = await ensureDbInitialized();
  const existingIndex = db.attendance.findIndex((a) => a.groupId === record.groupId && a.date === record.date);
  if (existingIndex >= 0) {
    db.attendance[existingIndex] = {
      ...db.attendance[existingIndex],
      ...record,
    };
    await persistDb(db);
    return db.attendance[existingIndex];
  }
  const newAttendance: GroupAttendance = {
    ...record,
    id: `att-${Date.now()}`,
  };
  db.attendance.unshift(newAttendance);
  await persistDb(db);
  return newAttendance;
}

// ==================== ADMISSIONS CRM ====================

export async function getApplications(): Promise<CRMApplication[]> {
  const db = await ensureDbInitialized();
  return db.applications;
}

export async function getApplicationById(id: string): Promise<CRMApplication | null> {
  const db = await ensureDbInitialized();
  return db.applications.find((a) => a.id === id) || null;
}

export async function createApplication(data: Omit<CRMApplication, 'id' | 'status' | 'notes' | 'createdAt'>): Promise<CRMApplication> {
  const db = await ensureDbInitialized();
  const newApp: CRMApplication = {
    ...data,
    id: `app-${Date.now()}`,
    status: 'NEW',
    notes: [],
    createdAt: new Date().toISOString(),
  };
  db.applications.unshift(newApp);

  // Notify admins
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    targetRole: 'admin',
    title: 'Yangi kurs arizasi',
    message: `${data.fullName} — "${data.courseName}" kursiga yangi ariza qoldirdi.`,
    type: 'info',
    isRead: false,
    link: '/admin/crm',
    createdAt: new Date().toISOString(),
  });

  await persistDb(db);
  return newApp;
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus): Promise<CRMApplication | null> {
  const db = await ensureDbInitialized();
  const app = db.applications.find((a) => a.id === id);
  if (!app) return null;
  app.status = status;
  await persistDb(db);
  return app;
}

export async function addApplicationNote(id: string, text: string, author: string): Promise<CRMApplication | null> {
  const db = await ensureDbInitialized();
  const app = db.applications.find((a) => a.id === id);
  if (!app) return null;
  app.notes.push({
    id: `note-${Date.now()}`,
    text,
    author,
    createdAt: new Date().toISOString(),
  });
  await persistDb(db);
  return app;
}

export async function convertApplicationToStudent(applicationId: string, groupId?: string): Promise<{ student: Student; application: CRMApplication } | null> {
  const db = await ensureDbInitialized();
  const app = db.applications.find((a) => a.id === applicationId);
  if (!app) return null;

  const nextNum = 1000 + db.students.length + 1;
  const newStudent: Student = {
    id: `student-${Date.now()}`,
    studentId: `META-S-${nextNum}`,
    fullName: app.fullName,
    email: `${app.fullName.toLowerCase().replace(/\s+/g, '.')}@student.metaitschool.uz`,
    phone: app.phone,
    status: 'active',
    balance: 0,
    enrolledCourseIds: [app.courseId],
    groupId: groupId || undefined,
    attendanceRate: 100,
    averageGrade: 0,
    joinedAt: new Date().toISOString().split('T')[0],
    notes: `CRM arizasidan o'quvchiga aylantirildi. Ariza ID: ${app.id}`,
  };

  db.students.unshift(newStudent);
  app.status = 'ENROLLED';
  app.convertedToStudentId = newStudent.id;

  if (groupId) {
    const group = db.groups.find((g) => g.id === groupId);
    if (group && !group.studentIds.includes(newStudent.id)) {
      group.studentIds.push(newStudent.id);
      group.studentsCount = group.studentIds.length;
      newStudent.groupName = group.name;
    }
  }

  await persistDb(db);
  return { student: newStudent, application: app };
}

// ==================== HOMEWORK & SUBMISSIONS ====================

export async function getHomeworkList(courseId?: string, groupId?: string): Promise<Homework[]> {
  const db = await ensureDbInitialized();
  return db.homework.filter((h) => {
    if (courseId && h.courseId !== courseId) return false;
    if (groupId && h.groupId !== groupId) return false;
    return true;
  });
}

export async function createHomework(data: Omit<Homework, 'id' | 'submissionsCount'>): Promise<Homework> {
  const db = await ensureDbInitialized();
  const newHw: Homework = {
    ...data,
    id: `hw-${Date.now()}`,
    submissionsCount: 0,
  };
  db.homework.unshift(newHw);
  await persistDb(db);
  return newHw;
}

export async function getSubmissions(homeworkId?: string, studentId?: string): Promise<HomeworkSubmission[]> {
  const db = await ensureDbInitialized();
  return db.submissions.filter((s) => {
    if (homeworkId && s.homeworkId !== homeworkId) return false;
    if (studentId && s.studentId !== studentId) return false;
    return true;
  });
}

export async function submitHomework(data: Omit<HomeworkSubmission, 'id' | 'submittedAt' | 'status'>): Promise<HomeworkSubmission> {
  const db = await ensureDbInitialized();
  const newSub: HomeworkSubmission = {
    ...data,
    id: `sub-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: 'submitted',
  };
  db.submissions.unshift(newSub);

  const hw = db.homework.find((h) => h.id === data.homeworkId);
  if (hw) {
    hw.submissionsCount = (hw.submissionsCount || 0) + 1;
  }

  await persistDb(db);
  return newSub;
}

export async function gradeSubmission(submissionId: string, score: number, feedback: string): Promise<HomeworkSubmission | null> {
  const db = await ensureDbInitialized();
  const sub = db.submissions.find((s) => s.id === submissionId);
  if (!sub) return null;
  sub.score = score;
  sub.feedback = feedback;
  sub.status = 'graded';
  sub.gradedAt = new Date().toISOString();
  await persistDb(db);
  return sub;
}

// ==================== EXAMS ====================

export async function getExams(): Promise<Exam[]> {
  const db = await ensureDbInitialized();
  return db.exams;
}

export async function getExamById(id: string): Promise<Exam | null> {
  const db = await ensureDbInitialized();
  return db.exams.find((e) => e.id === id) || null;
}

export async function createExam(data: Omit<Exam, 'id'>): Promise<Exam> {
  const db = await ensureDbInitialized();
  const newExam: Exam = {
    ...data,
    id: `exam-${Date.now()}`,
  };
  db.exams.unshift(newExam);
  await persistDb(db);
  return newExam;
}

export async function submitExamAttempt(data: Omit<ExamAttempt, 'id' | 'completedAt'>): Promise<ExamAttempt> {
  const db = await ensureDbInitialized();
  const newAttempt: ExamAttempt = {
    ...data,
    id: `attempt-${Date.now()}`,
    completedAt: new Date().toISOString(),
  };
  db.examAttempts.unshift(newAttempt);
  await persistDb(db);
  return newAttempt;
}

export async function getExamAttempts(studentId?: string): Promise<ExamAttempt[]> {
  const db = await ensureDbInitialized();
  if (studentId) {
    return db.examAttempts.filter((a) => a.studentId === studentId);
  }
  return db.examAttempts;
}

// ==================== CERTIFICATES ====================

export async function getCertificates(): Promise<Certificate[]> {
  const db = await ensureDbInitialized();
  return db.certificates;
}

export async function getCertificateById(certId: string): Promise<Certificate | null> {
  const db = await ensureDbInitialized();
  const cleanId = certId.trim().toUpperCase();
  return db.certificates.find((c) => c.certificateId.toUpperCase() === cleanId || c.id === certId) || null;
}

export async function issueCertificate(data: {
  studentId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  teacherName: string;
}): Promise<Certificate> {
  const db = await ensureDbInitialized();
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const certCode = `META-2026-${randNum}`;
  const newCert: Certificate = {
    id: `cert-${Date.now()}`,
    certificateId: certCode,
    studentId: data.studentId,
    studentName: data.studentName,
    courseId: data.courseId,
    courseTitle: data.courseTitle,
    teacherName: data.teacherName,
    issueDate: new Date().toISOString().split('T')[0],
    verificationUrl: `/verify/${certCode}`,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://metaitschool.uz/verify/${certCode}`,
    status: 'active',
  };
  db.certificates.unshift(newCert);
  await persistDb(db);
  return newCert;
}

// ==================== PAYMENTS & FINANCE ====================

export async function getPayments(): Promise<Payment[]> {
  const db = await ensureDbInitialized();
  return db.payments;
}

export async function getExpenses(): Promise<Expense[]> {
  const db = await ensureDbInitialized();
  return db.expenses;
}

export async function createPayment(data: Omit<Payment, 'id' | 'receiptNumber'>): Promise<Payment> {
  const db = await ensureDbInitialized();
  const nextNum = String(db.payments.length + 1).padStart(3, '0');
  const newPayment: Payment = {
    ...data,
    id: `pay-${Date.now()}`,
    receiptNumber: `REC-2026-${nextNum}`,
  };
  db.payments.unshift(newPayment);

  // Update student balance
  const student = db.students.find((s) => s.id === data.studentId);
  if (student && data.status === 'paid') {
    student.balance = Math.max(0, student.balance - data.amount);
  }

  await persistDb(db);
  return newPayment;
}

export async function createExpense(data: Omit<Expense, 'id'>): Promise<Expense> {
  const db = await ensureDbInitialized();
  const newExp: Expense = {
    ...data,
    id: `exp-${Date.now()}`,
  };
  db.expenses.unshift(newExp);
  await persistDb(db);
  return newExp;
}

export async function getFinanceSummary() {
  const db = await ensureDbInitialized();
  const totalRevenue = db.payments.reduce((acc, p) => (p.status === 'paid' ? acc + p.amount : acc), 0);
  const pendingPayments = db.payments.reduce((acc, p) => (p.status === 'pending' || p.status === 'partially_paid' ? acc + (p.totalDue - p.amount) : acc), 0);
  const totalExpenses = db.expenses.reduce((acc, e) => acc + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  return {
    totalRevenue,
    pendingPayments,
    totalExpenses,
    netProfit,
    paymentsCount: db.payments.length,
    expensesCount: db.expenses.length,
  };
}

// ==================== NOTIFICATIONS ====================

export async function getNotifications(role?: string, userId?: string): Promise<NotificationItem[]> {
  const db = await ensureDbInitialized();
  return db.notifications.filter((n) => {
    if (n.targetRole === 'all') return true;
    if (role && (n.targetRole === role || n.targetUserId === userId)) return true;
    return true;
  });
}

export async function markNotificationRead(id: string): Promise<boolean> {
  const db = await ensureDbInitialized();
  const notif = db.notifications.find((n) => n.id === id);
  if (notif) {
    notif.isRead = true;
    await persistDb(db);
    return true;
  }
  return false;
}

export async function createNotification(data: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>): Promise<NotificationItem> {
  const db = await ensureDbInitialized();
  const newNotif: NotificationItem = {
    ...data,
    id: `notif-${Date.now()}`,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  db.notifications.unshift(newNotif);
  await persistDb(db);
  return newNotif;
}

// ==================== PROJECTS ====================

export async function getProjects(): Promise<ProjectItem[]> {
  const db = await ensureDbInitialized();
  return db.projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const db = await ensureDbInitialized();
  return db.projects.find((p) => p.slug === slug || p.id === slug) || null;
}

export async function createProject(data: Omit<ProjectItem, 'id'>): Promise<ProjectItem> {
  const db = await ensureDbInitialized();
  const newProj: ProjectItem = {
    ...data,
    id: `proj-${Date.now()}`,
  };
  db.projects.unshift(newProj);
  await persistDb(db);
  return newProj;
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = await ensureDbInitialized();
  db.projects = db.projects.filter((p) => p.id !== id);
  await persistDb(db);
  return true;
}

// ==================== BLOG ====================

export async function getBlogPosts(): Promise<BlogPost[]> {
  const db = await ensureDbInitialized();
  return db.blog;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = await ensureDbInitialized();
  return db.blog.find((b) => b.slug === slug || b.id === slug) || null;
}

export async function createBlogPost(data: Omit<BlogPost, 'id' | 'publishedAt'>): Promise<BlogPost> {
  const db = await ensureDbInitialized();
  const newPost: BlogPost = {
    ...data,
    id: `blog-${Date.now()}`,
    publishedAt: new Date().toISOString().split('T')[0],
  };
  db.blog.unshift(newPost);
  await persistDb(db);
  return newPost;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const db = await ensureDbInitialized();
  db.blog = db.blog.filter((b) => b.id !== id);
  await persistDb(db);
  return true;
}

// ==================== TESTIMONIALS ====================

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const db = await ensureDbInitialized();
  return db.testimonials;
}

export async function createTestimonial(data: Omit<TestimonialItem, 'id'>): Promise<TestimonialItem> {
  const db = await ensureDbInitialized();
  const newTestimonial: TestimonialItem = {
    ...data,
    id: `test-${Date.now()}`,
  };
  db.testimonials.push(newTestimonial);
  await persistDb(db);
  return newTestimonial;
}

// ==================== CMS SETTINGS ====================

export async function getCMSSettings(): Promise<CMSSettings> {
  const db = await ensureDbInitialized();
  return db.cms;
}

export async function updateCMSSettings(updates: Partial<CMSSettings>): Promise<CMSSettings> {
  const db = await ensureDbInitialized();
  db.cms = {
    ...db.cms,
    ...updates,
    hero: { ...db.cms.hero, ...(updates.hero || {}) },
    announcement: { ...db.cms.announcement, ...(updates.announcement || {}) },
    about: { ...db.cms.about, ...(updates.about || {}) },
    contact: { ...db.cms.contact, ...(updates.contact || {}) },
  };
  await persistDb(db);
  return db.cms;
}

// ==================== ACTIVITY LOGS ====================

export async function getActivityLogs(): Promise<ActivityLog[]> {
  const db = await ensureDbInitialized();
  return db.activityLogs;
}

export async function logActivity(username: string, action: string, entity: string, details: string, ip = '127.0.0.1'): Promise<void> {
  const db = await ensureDbInitialized();
  db.activityLogs.unshift({
    id: `log-${Date.now()}`,
    username,
    action,
    entity,
    details,
    ip,
    timestamp: new Date().toISOString(),
  });
  // Keep last 100 logs
  if (db.activityLogs.length > 100) {
    db.activityLogs = db.activityLogs.slice(0, 100);
  }
  await persistDb(db);
}
