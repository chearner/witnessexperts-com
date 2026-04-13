-- Drop denormalized category counts; use live counts from public profiles instead.

alter table public.categories
  drop column if exists expert_count;

-- Aggregated counts (listing-active experts with a primary category). SECURITY DEFINER
-- so anon can read counts without a permissive select policy on profile rows.
create or replace function public.category_expert_counts()
returns table (slug text, expert_count bigint)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.primary_category_slug as slug,
    count(*)::bigint as expert_count
  from public.profiles p
  where
    p.listing_active = true
    and p.primary_category_slug is not null
    and p.primary_category_slug <> ''
  group by p.primary_category_slug;
$$;

comment on function public.category_expert_counts() is 'Public-safe per-category expert counts for directory UI.';

revoke all on function public.category_expert_counts() from public;
grant execute on function public.category_expert_counts() to anon, authenticated;
