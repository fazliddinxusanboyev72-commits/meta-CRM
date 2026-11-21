'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { CRMApplication, ApplicationStatus, AcademicGroup } from '@/types';
import {
  Kanban,
  UserPlus,
  Phone,
  Clock,
  ArrowRight,
  MessageSquare,
  UserCheck,
  CheckCircle2,
  Calendar,
  Send,
} from 'lucide-react';

export default function AdminCRMPage() {
  const [applications, setApplications] = useState<CRMApplication[]>([]);
  const [groups, setGroups] = useState<AcademicGroup[]>([]);
  const [selectedApp, setSelectedApp] = useState<CRMApplication | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [targetGroupId, setTargetGroupId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchCRM = () => {
    setIsLoading(true);
    Promise.all([
      fetch('/api/admin/crm').then((r) => r.json()),
      fetch('/api/admin/groups').then((r) => r.json()),
    ])
      .then(([apps, grps]) => {
        if (Array.isArray(apps)) setApplications(apps);
        if (Array.isArray(grps)) {
          setGroups(grps);
          if (grps.length > 0) setTargetGroupId(grps[0].id);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchCRM();
  }, []);

  const stages: { key: ApplicationStatus; label: string; color: string }[] = [
    { key: 'NEW', label: 'Yangi Arizalar', color: 'border-status-warning/50 text-status-warning' },
    { key: 'CONTACTED', label: 'Bog\'lanildi', color: 'border-primary-cyan/50 text-primary-cyan' },
    { key: 'CONSULTATION', label: 'Konsultatsiya', color: 'border-primary-blue/50 text-primary-blue' },
    { key: 'APPROVED', label: 'Tasdiqlangan', color: 'border-primary-purple/50 text-primary-purple' },
    { key: 'ENROLLED', label: 'O\'qishga Qabul Qilindi', color: 'border-status-success/50 text-status-success' },
    { key: 'REJECTED', label: 'Bekor Qilingan', color: 'border-status-error/50 text-status-error' },
  ];

  const handleUpdateStatus = async (id: string, status: ApplicationStatus) => {
    try {
      const res = await fetch('/api/admin/crm', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setApplications((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
        if (selectedApp?.id === id) {
          setSelectedApp(updated);
        }
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedApp) return;

    try {
      const res = await fetch('/api/admin/crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add-note',
          applicationId: selectedApp.id,
          text: newNote.trim(),
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setApplications((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
        setSelectedApp(updated);
        setNewNote('');
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  const handleConvertToStudent = async () => {
    if (!selectedApp) return;

    try {
      const res = await fetch('/api/admin/crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'convert',
          applicationId: selectedApp.id,
          groupId: targetGroupId,
        }),
      });
      if (res.ok) {
        const result = await res.json();
        alert(`Muvaffaqiyatli! ${result.student.fullName} o'quvchilar safiga qabul qilindi. ID: ${result.student.studentId}`);
        fetchCRM();
        setIsDetailOpen(false);
      }
    } catch {
      alert('Xatolik yuz berdi');
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Qabul CRM — Kanban Boshqaruvi
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Yangi arizalarni qabul qilish, bosqichma-bosqich o&apos;tkazish va o&apos;quvchiga aylantirish
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="primary" size="md">
            Jami Lidlar: {applications.length}
          </Badge>
        </div>
      </div>

      {/* Kanban Board Container with Horizontal Scroll */}
      <div className="flex gap-5 overflow-x-auto pb-6 pt-2 no-scrollbar min-h-[600px] items-start">
        {stages.map((stage) => {
          const stageApps = applications.filter((a) => a.status === stage.key);

          return (
            <div
              key={stage.key}
              className="w-72 sm:w-80 flex-shrink-0 rounded-2xl bg-background-elevated/70 border border-border flex flex-col max-h-[750px]"
            >
              {/* Column Header */}
              <div className="p-4 border-b border-border/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${stage.color}`}>
                    {stage.label}
                  </span>
                </div>
                <span className="w-6 h-6 rounded-full bg-background-panel text-xs font-bold text-white flex items-center justify-center">
                  {stageApps.length}
                </span>
              </div>

              {/* Cards List with Internal Scroll */}
              <div className="p-3 space-y-3 overflow-y-auto flex-1">
                {stageApps.length === 0 ? (
                  <div className="text-center py-8 text-xs text-text-muted">Arizalar mavjud emas</div>
                ) : (
                  stageApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => {
                        setSelectedApp(app);
                        setIsDetailOpen(true);
                      }}
                      className="p-4 rounded-xl bg-background-panel border border-border/80 hover:border-primary/50 transition-all cursor-pointer space-y-3 shadow-sm hover:shadow-glow group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-primary-cyan transition-colors">
                            {app.fullName}
                          </h4>
                          <div className="text-[11px] text-text-muted">{app.preferredSchedule}</div>
                        </div>
                        <span className="text-[10px] text-text-muted">{app.age} yosh</span>
                      </div>

                      <div className="text-xs text-primary-cyan font-medium truncate">
                        {app.courseName}
                      </div>

                      <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-status-success" />
                          {app.phone}
                        </span>
                        {app.notes && app.notes.length > 0 && (
                          <span className="flex items-center gap-1 text-primary-cyan">
                            <MessageSquare className="w-3 h-3" />
                            {app.notes.length}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Detail & Transition Modal */}
      {selectedApp && (
        <Modal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Ariza: ${selectedApp.fullName}`}
          maxWidth="lg"
        >
          <div className="space-y-6">
            {/* Top Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-background-panel border border-border">
                <span className="text-text-muted block">Telefon:</span>
                <strong className="text-white">{selectedApp.phone}</strong>
              </div>
              <div className="p-3 rounded-xl bg-background-panel border border-border">
                <span className="text-text-muted block">Yoshi:</span>
                <strong className="text-white">{selectedApp.age} yosh</strong>
              </div>
              <div className="p-3 rounded-xl bg-background-panel border border-border">
                <span className="text-text-muted block">Kurs:</span>
                <strong className="text-primary-cyan truncate block">{selectedApp.courseName}</strong>
              </div>
              <div className="p-3 rounded-xl bg-background-panel border border-border">
                <span className="text-text-muted block">Vaqt:</span>
                <strong className="text-white">{selectedApp.preferredSchedule}</strong>
              </div>
            </div>

            {selectedApp.message && (
              <div className="p-3.5 rounded-xl bg-background-panel border border-border text-xs space-y-1">
                <span className="font-semibold text-text-secondary">Arizachi xabari:</span>
                <p className="text-text-main leading-relaxed">{selectedApp.message}</p>
              </div>
            )}

            {/* Stage Selector Action */}
            <div className="p-4 rounded-xl bg-background-panel border border-border space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Bosqichni o&apos;zgartirish:
              </span>
              <div className="flex flex-wrap gap-2">
                {stages.map((st) => (
                  <button
                    key={st.key}
                    onClick={() => handleUpdateStatus(selectedApp.id, st.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedApp.status === st.key
                        ? 'bg-primary-purple text-white shadow-glow'
                        : 'bg-background-elevated border border-border text-text-secondary hover:text-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Convert to Student Section */}
            {selectedApp.status !== 'ENROLLED' && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-status-success/10 to-primary-purple/10 border border-status-success/30 space-y-3">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-status-success" />
                  <h4 className="text-sm font-bold text-white">Talabaga aylantirish (Shartnoma tuzish)</h4>
                </div>
                <p className="text-xs text-text-secondary">
                  Arizachi to&apos;lov qilgandan yoki shartnoma imzolagandan so&apos;ng uni to&apos;g&apos;ridan-to&apos;g&apos;ri yangi talaba sifatida ro&apos;yxatga oling.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <select
                    value={targetGroupId}
                    onChange={(e) => setTargetGroupId(e.target.value)}
                    className="flex-1 bg-background-panel border border-border rounded-xl px-3.5 py-2 text-xs text-text-main focus:outline-none focus:border-primary-purple"
                  >
                    {groups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name} ({g.schedule})
                      </option>
                    ))}
                  </select>
                  <Button size="sm" variant="success" onClick={handleConvertToStudent}>
                    O&apos;quvchiga aylantirish
                  </Button>
                </div>
              </div>
            )}

            {/* Notes Log */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ichki Qo&apos;ng&apos;iroq Qaydlari</h4>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Mijoz bilan muloqot xulosasi yoki qo'ng'iroq natijasi..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 bg-background-panel border border-border rounded-xl px-3.5 py-2 text-xs text-text-main placeholder-text-muted focus:outline-none focus:border-primary-purple"
                />
                <Button type="submit" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
                  Qo&apos;shish
                </Button>
              </form>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedApp.notes && selectedApp.notes.length > 0 ? (
                  selectedApp.notes.map((note) => (
                    <div key={note.id} className="p-3 rounded-xl bg-background-panel border border-border text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-text-muted">
                        <span className="font-mono text-primary-cyan">@{note.author}</span>
                        <span>{note.createdAt?.split('T')[0]}</span>
                      </div>
                      <p className="text-text-main leading-relaxed">{note.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-text-muted text-center py-3">Hozircha qaydlar yo&apos;q</div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}
