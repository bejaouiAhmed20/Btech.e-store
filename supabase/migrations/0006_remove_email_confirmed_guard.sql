-- Remove the email-confirmed guard from claim_my_guest_orders().
--
-- Email confirmation for sign-up has been disabled in the Supabase Auth
-- settings (Providers → Email → "Confirm email" toggle OFF).  Passwords are
-- still required and password-reset still sends a verification link, so the
-- security posture for account recovery is unchanged.
--
-- With email confirmation disabled, auth.users.email_confirmed_at is always
-- NULL for new accounts, which caused the old guard to silently return 0 and
-- never attach guest orders to a newly-created account.  The guard is no
-- longer meaningful, so it is removed.

create or replace function claim_my_guest_orders()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_id    uuid := auth.uid();
  caller_email text;
  claimed_count integer;
begin
  if caller_id is null then
    raise exception 'Authentication required';
  end if;

  select email
    into caller_email
    from auth.users
   where id = caller_id;

  if caller_email is null then
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

-- Grant remains unchanged.
grant execute on function claim_my_guest_orders() to authenticated;
