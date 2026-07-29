-- Ejecuta este script completo en el SQL Editor de tu proyecto Supabase.

create extension if not exists "pgcrypto";

create table if not exists settings (
  id text primary key default 'default',
  salary numeric default 25000,
  mode text default 'percent',
  fixed_amount numeric default 2500,
  percent numeric default 10
);
insert into settings (id) values ('default') on conflict (id) do nothing;

create table if not exists debts (
  id uuid primary key default gen_random_uuid(),
  bank text not null,
  limit_amount numeric,
  balance numeric,
  min_payment numeric,
  cut_date date,
  due_date date,
  interest_rate numeric,
  created_at timestamptz default now()
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  amount numeric not null,
  date date not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists goals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  target_amount numeric not null,
  current_amount numeric default 0,
  created_at timestamptz default now()
);

create table if not exists savings_actual (
  month_key text primary key,
  amount numeric default 0
);

-- Row Level Security: abierto para uso personal de un solo usuario con la clave anon.
alter table settings enable row level security;
alter table debts enable row level security;
alter table expenses enable row level security;
alter table goals enable row level security;
alter table savings_actual enable row level security;

drop policy if exists "allow all settings" on settings;
create policy "allow all settings" on settings for all using (true) with check (true);

drop policy if exists "allow all debts" on debts;
create policy "allow all debts" on debts for all using (true) with check (true);

drop policy if exists "allow all expenses" on expenses;
create policy "allow all expenses" on expenses for all using (true) with check (true);

drop policy if exists "allow all goals" on goals;
create policy "allow all goals" on goals for all using (true) with check (true);

drop policy if exists "allow all savings_actual" on savings_actual;
create policy "allow all savings_actual" on savings_actual for all using (true) with check (true);
