'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PiggyBank, CreditCard, Table2, Receipt, Target, Wallet } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/ahorro', label: 'Ahorro', icon: PiggyBank },
  { href: '/deudas', label: 'Deudas', icon: CreditCard },
  { href: '/tabla', label: 'Tabla', icon: Table2 },
  { href: '/gastos', label: 'Gastos', icon: Receipt },
  { href: '/metas', label: 'Metas', icon: Target },
];

export default function Shell({ children }) {
  const pathname = usePathname();
  const activeLabel = NAV_ITEMS.find(n => n.href === pathname)?.label || 'Finanzas';

  return (
    <div className="font-body min-h-screen bg-slate-50 text-slate-800">
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-60 bg-white border-r border-slate-200 px-5 py-6">
        <div className="flex items-center gap-2 mb-10 px-1">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
            <Wallet size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg text-slate-900">Finanzas</span>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <header className="md:hidden sticky top-0 z-20 bg-white border-b border-slate-200 px-5 py-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <Wallet size={16} className="text-white" />
        </div>
        <span className="font-display font-bold text-slate-900">{activeLabel}</span>
      </header>

      <main className="md:pl-60 pb-24 md:pb-10">
        <div className="max-w-4xl mx-auto px-5 py-6">{children}</div>
      </main>

      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 flex justify-around py-2 z-20">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-0.5 px-2 py-1">
              <Icon size={20} className={active ? 'text-indigo-600' : 'text-slate-400'} />
              <span className={`text-[10px] ${active ? 'text-indigo-600 font-medium' : 'text-slate-400'}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
