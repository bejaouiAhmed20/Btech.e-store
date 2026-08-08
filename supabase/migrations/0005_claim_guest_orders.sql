-- Attaches previous guest orders (user_id is null) to the currently
-- authenticated user, matched by normalized email. Must be called by an
-- authenticated user; the email is taken from the trusted JWT (auth.jwt()),
-- never from a browser-submitted parameter, so a caller cannot claim orders
-- placed under someone else's email.
--
-- SECURITY DEFINER is required so the function can update rows across the
-- RLS boundary (an order with user_id = null does not belong to the caller
-- yet, so the ordinary "own orders" policy would not allow the update).
-- search_path is pinned to `public` to prevent search-path hijacking.
create or replace function claim_my_guest_orders()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_id uuid := auth.uid();
  caller_email text;
  caller_email_confirmed boolean;
  claimed_count integer;
begin
  if caller_id is null then
    raise exception 'Authentication required';
  end if;

  select email, (email_confirmed_at is not null)
    into caller_email, caller_email_confirmed
    from auth.users
    where id = caller_id;

  if caller_email is null then
    return 0;
  end if;

  -- Require a verified email when Supabase reports a confirmation state at
  -- all, so an unconfirmed signup cannot claim someone else's guest orders
  -- by registering their email address.
  if caller_email_confirmed is false then
    return 0;
  end if;

  update orders
     set user_id = caller_id
   where user_id is null
     and lower(customer_email) = lower(caller_email);

  get diagnostics claimed_count = row_count;
  return claimed_count;
end;
$$;

-- Callable by any authenticated user (the function itself enforces
-- auth.uid() and email ownership, so no broader grant is needed).
grant execute on function claim_my_guest_orders() to authenticated;
