create table orders (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  user_id uuid references auth.users (id) on delete set null,
  template_id text not null,
  -- Snapshot of the template at order time, so historical orders keep their
  -- original price even if the template catalogue changes later.
  template_name text not null,
  template_price numeric(10, 2) not null check (template_price >= 0),
  template_currency text not null,
  customer_name text not null check (char_length(customer_name) between 2 and 80),
  customer_email text not null check (char_length(customer_email) <= 254),
  customer_phone text not null check (char_length(customer_phone) between 6 and 20),
  customization_details text check (char_length(customization_details) <= 2000),
  status order_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_user_id_idx on orders (user_id);
create index orders_customer_email_idx on orders (lower(customer_email));
create index orders_created_at_idx on orders (created_at desc);
create index orders_status_idx on orders (status);
create index orders_reference_idx on orders (reference);

create trigger orders_set_updated_at
  before update on orders
  for each row
  execute function set_updated_at();

-- Generates a customer-safe, unique order reference (e.g. BTECH-2026-4F91A2C7).
-- Only ever called server-side (from the create-order Edge Function via the
-- service role, or as this table's own default), never trusted from the browser.
create or replace function generate_order_reference()
returns text
language plpgsql
set search_path = public
as $$
declare
  candidate text;
  attempt int := 0;
begin
  loop
    candidate := 'BTECH-' || to_char(now(), 'YYYY') || '-' || upper(substr(md5(gen_random_uuid()::text), 1, 8));
    exit when not exists (select 1 from orders where reference = candidate);
    attempt := attempt + 1;
    if attempt > 10 then
      raise exception 'Could not generate a unique order reference after % attempts', attempt;
    end if;
  end loop;
  return candidate;
end;
$$;

alter table orders
  alter column reference set default generate_order_reference();
