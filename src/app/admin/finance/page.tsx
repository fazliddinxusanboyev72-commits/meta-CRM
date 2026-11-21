'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/FormControls';
import { Expense, Payment } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Plus, DollarSign, TrendingUp, TrendingDown, Wallet, Calendar, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminFinancePage() {
  const [finance, setFinance] = useState<any>({
    payments: [],
    expenses: [],
    summary: { totalRevenue: 0, totalExpenses: 0, netProfit: 0, pendingPayments: 0 },
  });
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [expenseForm, setExpenseForm] = useState({
    title: '',
    category: 'servers' as const,
    amount: 1000000,
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const fetchFinance = () => {
    setIsLoading(true);
    fetch('/api/admin/finance')
      .then((r) => r.json())
      .then((data) => {
        if (data) setFinance(data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchFinance();
  }, []);

  const handleCreateExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/admin/finance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'expense',
          data: expenseForm,
        }),
      });
      if (res.ok) {
        setIsExpenseModalOpen(false);
        fetchFinance();
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  const summary = finance.summary || { totalRevenue: 0, totalExpenses: 0, netProfit: 0, pendingPayments: 0 };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Moliya va Xarajatlar Boshqaruvi
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Akademiyaning daromadlari, operatsion xarajatlari va sof foyda hisoboti
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/payments">
            <Button size="sm" variant="outline">
              To&apos;lovlar Ro&apos;yxati
            </Button>
          </Link>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsExpenseModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Yangi Xarajat Qayd Etish
          </Button>
        </div>
      </div>

      {/* KPI Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card glow className="p-5 space-y-2">
          <div className="flex items-center justify-between text-text-secondary">
            <span className="text-xs font-semibold uppercase">Jami Tushum (Revenue)</span>
            <div className="p-2 rounded-xl bg-status-success/15 text-status-success">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-status-success">
            {formatCurrency(summary.totalRevenue)}
          </div>
          <div className="text-xs text-text-muted">Kurs to&apos;lovlari hisobidan</div>
        </Card>

        <Card glow className="p-5 space-y-2">
          <div className="flex items-center justify-between text-text-secondary">
            <span className="text-xs font-semibold uppercase">Jami Xarajatlar (Expenses)</span>
            <div className="p-2 rounded-xl bg-status-error/15 text-status-error">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-status-error">
            {formatCurrency(summary.totalExpenses)}
          </div>
          <div className="text-xs text-text-muted">Ijara, serverlar, marketing</div>
        </Card>

        <Card glow className="p-5 space-y-2">
          <div className="flex items-center justify-between text-text-secondary">
            <span className="text-xs font-semibold uppercase">Sof Foyda (Net Profit)</span>
            <div className="p-2 rounded-xl bg-primary-cyan/15 text-primary-cyan">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-primary-cyan">
            {formatCurrency(summary.netProfit)}
          </div>
          <div className="text-xs text-text-muted">Joriy davr natijasi</div>
        </Card>

        <Card glow className="p-5 space-y-2">
          <div className="flex items-center justify-between text-text-secondary">
            <span className="text-xs font-semibold uppercase">Qarzdorlik / Kutilayotgan</span>
            <div className="p-2 rounded-xl bg-status-warning/15 text-status-warning">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {formatCurrency(summary.pendingPayments)}
          </div>
          <div className="text-xs text-status-warning">Kutilayotgan tushumlar</div>
        </Card>
      </div>

      {/* Expenses Breakdown Table */}
      <Card className="overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Xarajatlar Jurnali</h3>
            <p className="text-xs text-text-secondary mt-0.5">Operatsion, infratuzilma va marketing xarajatlari</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-background-panel border-b border-border text-text-secondary uppercase text-[11px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Xarajat Nomi</th>
                <th className="py-3 px-4">Kategoriya</th>
                <th className="py-3 px-4">Summa</th>
                <th className="py-3 px-4">Sana</th>
                <th className="py-3 px-4">Tavsif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {finance.expenses.map((exp: Expense) => (
                <tr key={exp.id} className="hover:bg-background-elevated/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{exp.title}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-background-panel border border-border text-[11px] uppercase tracking-wider text-primary-cyan">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-status-error">
                    -{formatCurrency(exp.amount)}
                  </td>
                  <td className="py-3.5 px-4 text-text-muted font-mono">{exp.date}</td>
                  <td className="py-3.5 px-4 text-text-secondary">{exp.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Record Expense Modal */}
      <Modal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        title="Yangi Xarajat Qayd Etish"
        maxWidth="md"
      >
        <form onSubmit={handleCreateExpense} className="space-y-4">
          <Input
            label="Xarajat Nomi *"
            required
            placeholder="Vercel Pro yoki Ofis jihozlari"
            value={expenseForm.title}
            onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Kategoriya"
              options={[
                { label: 'Server & Bulut (servers)', value: 'servers' },
                { label: 'Bino Ijarasi (rent)', value: 'rent' },
                { label: 'Marketing & Target (marketing)', value: 'marketing' },
                { label: 'Oylik Maosh (salary)', value: 'salary' },
                { label: 'Uskunalar (equipment)', value: 'equipment' },
                { label: 'Boshqa (other)', value: 'other' },
              ]}
              value={expenseForm.category}
              onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value as any })}
            />
            <Input
              label="Xarajat Miqdori (so'm) *"
              type="number"
              required
              value={expenseForm.amount}
              onChange={(e) => setExpenseForm({ ...expenseForm, amount: Number(e.target.value) })}
            />
          </div>

          <Input
            label="Sana"
            type="date"
            value={expenseForm.date}
            onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
          />

          <Input
            label="Qo'shimcha tavsif"
            value={expenseForm.description}
            onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
          />

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsExpenseModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" variant="primary">
              Saqlash
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
