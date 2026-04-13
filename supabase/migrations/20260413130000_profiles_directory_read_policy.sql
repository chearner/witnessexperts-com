-- Allow anyone to read directory-visible rows (active listings) for category pages and public profiles.

drop policy if exists "Directory can read active profiles" on public.profiles;
create policy "Directory can read active profiles"
  on public.profiles
  for select
  to anon, authenticated
  using (listing_active = true);

comment on policy "Directory can read active profiles" on public.profiles is
  'Public directory: anon and members can read rows shown in search. Owners still read inactive own rows via the owner policy (policies are OR-combined).';

create index if not exists profiles_directory_category_idx
  on public.profiles (primary_category_slug)
  where listing_active = true and primary_category_slug is not null;
