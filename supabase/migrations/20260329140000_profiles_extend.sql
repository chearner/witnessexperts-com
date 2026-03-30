-- Extra profile fields for member directory / expert listing preferences.

alter table public.profiles
  add column if not exists primary_category_slug text,
  add column if not exists subcategory text,
  add column if not exists bio text,
  add column if not exists phone text;

comment on column public.profiles.primary_category_slug is 'Main expert category (slug from site category list).';
comment on column public.profiles.subcategory is 'Sub-area or specialty within the main category.';
comment on column public.profiles.bio is 'Short professional summary for listings.';
comment on column public.profiles.phone is 'Contact phone (optional).';
