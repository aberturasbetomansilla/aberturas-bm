-- Aberturas BM — sistema de QR dinámicos
-- Crea únicamente la tabla qr_codes. No modifica tablas existentes.

create table if not exists public.qr_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  business_name text,
  destination_url text,
  status text not null default 'available'
    check (status in ('available', 'active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint qr_codes_active_requires_destination check (
    status <> 'active'
    or (
      destination_url is not null
      and length(trim(destination_url)) > 0
      and business_name is not null
      and length(trim(business_name)) > 0
    )
  )
);

create index if not exists qr_codes_status_idx on public.qr_codes (status);
create index if not exists qr_codes_code_idx on public.qr_codes (code);

create or replace function public.set_qr_codes_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists qr_codes_set_updated_at on public.qr_codes;
create trigger qr_codes_set_updated_at
  before update on public.qr_codes
  for each row
  execute procedure public.set_qr_codes_updated_at();

alter table public.qr_codes enable row level security;

drop policy if exists "qr_codes_select_public" on public.qr_codes;
create policy "qr_codes_select_public"
  on public.qr_codes
  for select
  to anon, authenticated
  using (true);

drop policy if exists "qr_codes_update_authenticated" on public.qr_codes;
create policy "qr_codes_update_authenticated"
  on public.qr_codes
  for update
  to authenticated
  using (true)
  with check (true);

grant usage on schema public to anon, authenticated;
grant select on table public.qr_codes to anon, authenticated;
grant update on table public.qr_codes to authenticated;

insert into public.qr_codes (code, status)
select
  'BM-' || lpad(n::text, 3, '0'),
  'available'
from generate_series(1, 20) as n
on conflict (code) do nothing;
