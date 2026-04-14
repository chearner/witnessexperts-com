-- Featured / sponsored directory placements: which site paths spotlight a profile.

create table if not exists public.profile_featured_placements (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  page_path text not null,
  created_at timestamptz not null default now(),
  unique (profile_id, page_path),
  constraint profile_featured_placements_page_path_format
    check (
      page_path = '/'
      or (
        page_path like '/%'
        and page_path not like '%//%'
        and right(page_path, 1) <> '/'
      )
    )
);

create index if not exists profile_featured_placements_page_path_idx
  on public.profile_featured_placements (page_path);

comment on table public.profile_featured_placements is
  'Optional featured slots: a profile may appear in directory highlights on one or more paths (home, category pages, key marketing pages).';

alter table public.profile_featured_placements enable row level security;

drop policy if exists "Featured placements selectable for active listings" on public.profile_featured_placements;
create policy "Featured placements selectable for active listings"
  on public.profile_featured_placements
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = profile_featured_placements.profile_id
        and p.listing_active = true
    )
  );

drop policy if exists "Owners can select own featured placements" on public.profile_featured_placements;
create policy "Owners can select own featured placements"
  on public.profile_featured_placements
  for select
  to authenticated
  using ((select auth.uid()) = profile_id);

drop policy if exists "Owners insert own featured placements" on public.profile_featured_placements;
create policy "Owners insert own featured placements"
  on public.profile_featured_placements
  for insert
  to authenticated
  with check ((select auth.uid()) = profile_id);

drop policy if exists "Owners delete own featured placements" on public.profile_featured_placements;
create policy "Owners delete own featured placements"
  on public.profile_featured_placements
  for delete
  to authenticated
  using ((select auth.uid()) = profile_id);
