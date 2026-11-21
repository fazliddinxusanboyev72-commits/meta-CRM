import { NextRequest, NextResponse } from 'next/server';
import {
  getPayments,
  getExpenses,
  createPayment,
  createExpense,
  getFinanceSummary,
  logActivity,
} from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const [payments, expenses, summary] = await Promise.all([
    getPayments(),
    getExpenses(),
    getFinanceSummary(),
  ]);
  return NextResponse.json({ payments, expenses, summary });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Ruxsat berilmagan' }, { status: 403 });
    }

    const body = await req.json();
    const { type, data } = body;

    if (type === 'payment') {
      const payment = await createPayment(data);
      await logActivity(
        session.username || 'admin',
        'FINANCE_PAYMENT',
        'Finance',
        `Yangi to'lov qabul qilindi: ${payment.amount.toLocaleString()} so'm (${payment.studentName})`
      );
      return NextResponse.json(payment, { status: 201 });
    }

    if (type === 'expense') {
      const expense = await createExpense(data);
      await logActivity(
        session.username || 'admin',
        'FINANCE_EXPENSE',
        'Finance',
        `Yangi xarajat qayd etildi: ${expense.title} (${expense.amount.toLocaleString()} so'm)`
      );
      return NextResponse.json(expense, { status: 201 });
    }

    return NextResponse.json({ error: 'Noto\'g\'ri tur' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Xatolik yuz berdi' }, { status: 500 });
  }
}
