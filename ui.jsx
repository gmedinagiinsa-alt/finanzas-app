'use client';
import React from 'react';

export function Card({ children, className = '' }) {
  return <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm p-5 ${className}`}>{children}</div>;
}

export function Input({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        className="mt-1 w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-400 text-sm"
      />
    </div>
  );
}
