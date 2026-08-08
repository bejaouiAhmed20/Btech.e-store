-- Order lifecycle status. Kept intentionally small and linear; admins move an
-- order through these stages from the Supabase Dashboard (see docs/SUPABASE_SETUP.md).
create type order_status as enum (
  'pending',
  'contacted',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled'
);

-- Shared trigger function: keeps `updated_at` current on any row update.
-- Reused by both profiles and orders (migrations 0002 and 0003).
create or replace function set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
