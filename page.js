'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { MONTHS, YEAR, fmt } from '@/lib/constants';
import { Card } from '@/components/ui';

export default function TablaPage() {
  const [settings, setSettings] = useState(null);
  const [savingsActual, setSavingsActual] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: s }, { data: sa }] = await Promise.all([
        supabase.from('settings').select('*').eq('id', 'default').single(),
        supabase.from('savings_actual').select('*'),
      ]);
      setSettings(s);
      const map = {};
      (sa || []).forEach(row => { map[row.month_key] = row.amount; });
      setSavingsActual(map);
      setLoading(false);
    }
    load();
  }, []);

  const plannedSavings = useMemo(() => {
    if (!settings) return 0;
    if (settings.mode === 'fixed') return Math.min(Number(settings.fixed_amount) || 0, Number(settings.salary) || 0);
    return (Number(settings.salary) || 0) * ((Number(settings.percent) || 0) / 100);
  }, [settings]);

  async function setActual(monthIdx, value) {
    const key = `${YEAR}-${monthIdx}`;
    setSavingsActual(prev => ({ ...prev, [key]: value }));
    await supabase.from('savings_actual').upsert({ month_key: key, amount: value });
  }

  if (loading) return <p className="text-sm text-slate-400 text-center py-16">Cargando…</p>;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-slate-900">Tabla de ahorro</h1>
        <p className="text-sm text-slate-500 mt-1">Captura lo que realmente ahorraste cada mes.</p>
      </div>
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-[11px] text-slate-400 uppercase border-b border-slate-100">
              <th className="px-4 py-3 font-medium">Mes</th>
              <th className="px-4 py-3 font-medium">Sueldo</th>
              <th className="px-4 py-3 font-medium">Ahorro programado</th>
              <th className="px-4 py-3 font-medium">Ahorro real</th>
              <th className="px-4 py-3 font-medium">Diferencia</th>
              <th className="px-4 py-3 font-medium">Saldo disponible</th>
            </tr>
          </thead>
          <tbody>
            {MONTHS.map((m, i) => {
              const actual = Number(savingsActual[`${YEAR}-${i}`]) || 0;
              const diff = actual - plannedSavings;
              const saldo = (Number(settings.salary) || 0) - actual;
              return (
                <tr key={m} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-2.5 font-medium">{m}</td>
                  <td className="px-4 py-2.5 text-slate-500">{fmt(settings.salary)}</td>
                  <td className="px-4 py-2.5 text-slate-500">{fmt(plannedSavings)}</td>
                  <td className="px-4 py-2.5">
                    <input
                      type="number"
                      defaultValue={savingsActual[`${YEAR}-${i}`] ?? ''}
                      onBlur={e => setActual(i, Number(e.target.value) || 0)}
                      placeholder="0"
                      className="w-24 border border-slate-200 rounded-lg px-2 py-1 outline-none focus:border-indigo-400"
                    />
                  </td>
                  <td className={`px-4 py-2.5 font-medium ${diff >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{fmt(diff)}</td>
                  <td className="px-4 py-2.5 text-slate-500">{fmt(saldo)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
