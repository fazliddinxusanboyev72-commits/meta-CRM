'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input, Select } from '@/components/ui/FormControls';
import { Payment, Student, Course } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Plus, Printer, CreditCard, DollarSign, Search, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<Payment | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    amount: 1800000,
    totalDue: 1800000,
    method: 'Payme' as const,
    status: 'paid' as const,
    date: new Date().toISOString().split('T')[0],
    notes: 'Oylik to\'lov',
  });

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([
      fetch('/api/admin/finance').then((r) => r.json()),
      fetch('/api/admin/students').then((r) => r.json()),
      fetch('/api/admin/courses').then((r) => r.json()),
    ])
      .then(([fData, sData, cData]) => {
        if (fData?.payments) setPayments(fData.payments);
        if (Array.isArray(sData)) {
          setStudents(sData);
          if (sData.length > 0) setFormData((prev) => ({ ...prev, studentId: sData[0].id }));
        }
        if (Array.isArray(cData)) {
          setCourses(cData);
          if (cData.length > 0) setFormData((prev) => ({ ...prev, courseId: cData[0].id }));
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      studentId: students[0]?.id || '',
      courseId: courses[0]?.id || '',
      amount: 1800000,
      totalDue: 1800000,
      method: 'Payme',
      status: 'paid',
      date: new Date().toISOString().split('T')[0],
      notes: "Oylik to'liq to'lov",
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === formData.studentId);
    const course = courses.find((c) => c.id === formData.courseId);

    const payload = {
      type: 'payment',
      data: {
        ...formData,
        studentName: student ? student.fullName : 'Talaba',
        courseTitle: course ? course.title : 'IT Kursi',
      },
    };

    try {
      const res = await fetch('/api/admin/finance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const created = await res.json();
        setPayments((prev) => [created, ...prev]);
        setIsModalOpen(false);
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  const filtered = payments.filter(
    (p) =>
      p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            To&apos;lovlar va Kvitansiyalar
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Talabalardan qabul qilingan barcha to&apos;lovlar, kvitansiya raqamlari va to&apos;lov usullari
          </p>
        </div>

        <Button size="md" variant="primary" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
          Yangi To&apos;lov Qabul Qilish
        </Button>
      </div>

      <Card className="p-4 sm:p-5">
        <div className="relative">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Kvitansiya raqami, talaba ismi yoki kurs bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background-panel border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-primary-purple"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-background-panel border-b border-border text-text-secondary uppercase text-[11px] tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Kvitansiya #</th>
                <th className="py-3.5 px-4">Talaba</th>
                <th className="py-3.5 px-4">Kurs</th>
                <th className="py-3.5 px-4">Miqdor</th>
                <th className="py-3.5 px-4">Usul</th>
                <th className="py-3.5 px-4">Holat</th>
                <th className="py-3.5 px-4">Sana</th>
                <th className="py-3.5 px-4 text-right">Kvitansiya</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-text-secondary">
                    Yuklanmoqda...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-text-secondary">
                    To&apos;lovlar topilmadi.
                  </td>
                </tr>
              ) : (
                filtered.map((pay) => (
                  <tr key={pay.id} className="hover:bg-background-elevated/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-primary-cyan">
                      {pay.receiptNumber}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">{pay.studentName}</td>
                    <td className="py-3.5 px-4 text-text-secondary">{pay.courseTitle}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-status-success">
                      {formatCurrency(pay.amount)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-background-panel border border-border text-[11px] text-text-main">
                        {pay.method}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          pay.status === 'paid'
                            ? 'success'
                            : pay.status === 'partially_paid'
                            ? 'warning'
                            : 'secondary'
                        }
                        size="sm"
                      >
                        {pay.status === 'paid'
                          ? "To'langan"
                          : pay.status === 'partially_paid'
                          ? "Qisman to'langan"
                          : 'Kutilmoqda'}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-text-muted font-mono">{pay.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        leftIcon={<Printer className="w-3.5 h-3.5" />}
                        onClick={() => {
                          setSelectedReceipt(pay);
                          setIsReceiptOpen(true);
                        }}
                      >
                        Kvitansiya
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New Payment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yangi To'lov Qabul Qilish"
        maxWidth="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Select
            label="Talaba *"
            options={students.map((s) => ({ label: `${s.fullName} (${s.studentId})`, value: s.id }))}
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
          />

          <Select
            label="Kurs *"
            options={courses.map((c) => ({ label: c.title, value: c.id }))}
            value={formData.courseId}
            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="To'lov Miqdori (so'm) *"
              type="number"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
            />
            <Input
              label="Jami To'lanishi Kerak (so'm) *"
              type="number"
              required
              value={formData.totalDue}
              onChange={(e) => setFormData({ ...formData, totalDue: Number(e.target.value) })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="To'lov Usuli"
              options={[
                { label: 'Payme', value: 'Payme' },
                { label: 'Click', value: 'Click' },
                { label: 'Bank Card', value: 'Bank Card' },
                { label: 'Naqd Pul (Cash)', value: 'Cash' },
              ]}
              value={formData.method}
              onChange={(e) => setFormData({ ...formData, method: e.target.value as any })}
            />
            <Select
              label="Holat"
              options={[
                { label: "To'langan (paid)", value: 'paid' },
                { label: "Qisman to'langan (partially_paid)", value: 'partially_paid' },
                { label: 'Kutilmoqda (pending)', value: 'pending' },
              ]}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            />
          </div>

          <Input
            label="Izoh (Kvitansiya eslatmasi)"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" variant="primary">
              To&apos;lovni Saqlash
            </Button>
          </div>
        </form>
      </Modal>

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <Modal
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
          title="To'lov Kvitansiyasi"
          maxWidth="md"
        >
          <div className="space-y-6 p-4 rounded-2xl bg-background-panel border border-border">
            <div className="text-center pb-4 border-b border-border space-y-1">
              <div className="font-extrabold text-lg text-white font-mono">METAITSCHOOL ACADEMY</div>
              <div className="text-[11px] text-text-muted">Rasmiy To&apos;lov Cheki / Kvitansiya</div>
              <div className="text-xs font-mono font-bold text-primary-cyan">{selectedReceipt.receiptNumber}</div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-text-muted">Talaba:</span>
                <strong className="text-white">{selectedReceipt.studentName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-text-muted">Kurs:</span>
                <strong className="text-white">{selectedReceipt.courseTitle}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-text-muted">To&apos;lov usuli:</span>
                <strong className="text-white">{selectedReceipt.method}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-text-muted">Sana:</span>
                <strong className="text-white">{selectedReceipt.date}</strong>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <span className="font-bold text-white">Qabul qilingan summa:</span>
                <strong className="font-mono text-status-success text-base">
                  {formatCurrency(selectedReceipt.amount)}
                </strong>
              </div>
            </div>

            <div className="pt-2 text-center text-[10px] text-text-muted">
              Ushbu kvitansiya elektron tarzda shakllantirildi va muhr talab qilinmaydi.
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button size="sm" variant="outline" onClick={() => window.print()} leftIcon={<Printer className="w-4 h-4" />}>
                Chop etish (Print)
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setIsReceiptOpen(false)}>
                Yopish
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
