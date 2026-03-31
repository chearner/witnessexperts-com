-- Directory visibility: inactive profiles are hidden from public directory listings.

alter table public.profiles
  add column if not exists listing_active boolean not null default true;

comment on column public.profiles.listing_active is 'When false, the expert profile is hidden from the public directory.';
