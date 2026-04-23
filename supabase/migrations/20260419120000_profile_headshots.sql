-- Public headshot URL on profiles + Supabase Storage bucket for uploads.

alter table public.profiles
  add column if not exists headshot_url text;

comment on column public.profiles.headshot_url is
  'Public URL for profile headshot (e.g. Storage public URL), shown on listings.';

-- Storage bucket (public read; authenticated users write only under their user id folder).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'profile-headshots',
  'profile-headshots',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Profile headshots public read" on storage.objects;
create policy "Profile headshots public read"
  on storage.objects
  for select
  to public
  using (bucket_id = 'profile-headshots');

drop policy if exists "Profile headshots insert own folder" on storage.objects;
create policy "Profile headshots insert own folder"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'profile-headshots'
    and split_part(name, '/', 1) = (select auth.uid()::text)
  );

drop policy if exists "Profile headshots update own folder" on storage.objects;
create policy "Profile headshots update own folder"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'profile-headshots'
    and split_part(name, '/', 1) = (select auth.uid()::text)
  )
  with check (
    bucket_id = 'profile-headshots'
    and split_part(name, '/', 1) = (select auth.uid()::text)
  );

drop policy if exists "Profile headshots delete own folder" on storage.objects;
create policy "Profile headshots delete own folder"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'profile-headshots'
    and split_part(name, '/', 1) = (select auth.uid()::text)
  );
