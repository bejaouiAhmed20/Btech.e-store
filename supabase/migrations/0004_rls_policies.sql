alter table profiles enable row level security;
alter table orders enable row level security;

-- ── profiles ─────────────────────────────────────────────────────────────
-- Authenticated users may read and update only their own profile row.
create policy "Users can read own profile"
  on profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- No insert/delete policy for profiles: rows are created exclusively by the
-- handle_new_user trigger (SECURITY DEFINER) and deleted via the
-- auth.users cascade — customers never insert or delete their own row directly.

-- ── orders ───────────────────────────────────────────────────────────────
-- Authenticated customers may read only their own orders. Guests have no
-- direct table access at all — guest orders are written exclusively through
-- the create-order Edge Function (service role), and there is intentionally
-- no policy that exposes them to public/anon reads.
create policy "Users can read own orders"
  on orders
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Deliberately no insert/update/delete policies for the `authenticated` or
-- `anon` roles: customers must not be able to create orders directly (price
-- must go through the trusted Edge Function), change their own order's
-- status or price, delete an order, or reassign ownership. All writes are
-- performed by the create-order Edge Function and the claim_my_guest_orders
-- function below, both of which run with the service role / SECURITY DEFINER
-- and therefore bypass RLS by design. Administrative changes (status
-- updates, etc.) are made from the Supabase Dashboard using the service role.
