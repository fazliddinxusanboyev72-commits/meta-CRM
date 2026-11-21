'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ActivityLog } from '@/types';
import { History, Shield, Clock, Terminal } from 'lucide-react';

export default function AdminActivityPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/activity')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setLogs(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Tizim Faoliyat Jurnali (Audit Log)
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Barcha administratorlarning platformadagi xatti-harakatlari, o&apos;zgarishlar va tizimga kirish tarixi
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-background-panel border-b border-border text-text-secondary uppercase text-[11px] tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Admin</th>
                <th className="py-3.5 px-4">Amal (Action)</th>
                <th className="py-3.5 px-4">Modul</th>
                <th className="py-3.5 px-4">Tafsilot</th>
                <th className="py-3.5 px-4">IP Manzil</th>
                <th className="py-3.5 px-4">Vaqt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-text-secondary">
                    Yuklanmoqda...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-text-secondary">
                    Qaydlar mavjud emas.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-background-elevated/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-primary-cyan">
                      @{log.username}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-background-panel border border-border text-[11px] font-mono font-semibold text-white">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-text-secondary font-medium">{log.entity}</td>
                    <td className="py-3.5 px-4 text-text-main max-w-xs truncate">{log.details}</td>
                    <td className="py-3.5 px-4 text-text-muted font-mono text-[11px]">{log.ip}</td>
                    <td className="py-3.5 px-4 text-text-muted text-[11px] font-mono">
                      {new Date(log.timestamp).toLocaleString('uz-UZ')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
