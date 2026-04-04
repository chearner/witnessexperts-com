-- US states + DC for expert profile location. Apply via Supabase CLI or SQL Editor.

create table if not exists public.us_states (
  code char(2) primary key,
  name text not null,
  sort_order integer not null unique
);

comment on table public.us_states is 'US states and DC (USPS codes) for profile location.';

create index if not exists us_states_sort_order_idx on public.us_states (sort_order);

alter table public.profiles
  add column if not exists us_state_code char(2) references public.us_states (code) on delete set null;

comment on column public.profiles.us_state_code is 'US state or DC for directory / contact (optional).';

alter table public.us_states enable row level security;

drop policy if exists "US states are viewable by everyone" on public.us_states;
create policy "US states are viewable by everyone"
  on public.us_states for select to anon, authenticated using (true);

insert into public.us_states (code, name, sort_order) values
  ('AL', 'Alabama', 0),
  ('AK', 'Alaska', 1),
  ('AZ', 'Arizona', 2),
  ('AR', 'Arkansas', 3),
  ('CA', 'California', 4),
  ('CO', 'Colorado', 5),
  ('CT', 'Connecticut', 6),
  ('DE', 'Delaware', 7),
  ('DC', 'District of Columbia', 8),
  ('FL', 'Florida', 9),
  ('GA', 'Georgia', 10),
  ('HI', 'Hawaii', 11),
  ('ID', 'Idaho', 12),
  ('IL', 'Illinois', 13),
  ('IN', 'Indiana', 14),
  ('IA', 'Iowa', 15),
  ('KS', 'Kansas', 16),
  ('KY', 'Kentucky', 17),
  ('LA', 'Louisiana', 18),
  ('ME', 'Maine', 19),
  ('MD', 'Maryland', 20),
  ('MA', 'Massachusetts', 21),
  ('MI', 'Michigan', 22),
  ('MN', 'Minnesota', 23),
  ('MS', 'Mississippi', 24),
  ('MO', 'Missouri', 25),
  ('MT', 'Montana', 26),
  ('NE', 'Nebraska', 27),
  ('NV', 'Nevada', 28),
  ('NH', 'New Hampshire', 29),
  ('NJ', 'New Jersey', 30),
  ('NM', 'New Mexico', 31),
  ('NY', 'New York', 32),
  ('NC', 'North Carolina', 33),
  ('ND', 'North Dakota', 34),
  ('OH', 'Ohio', 35),
  ('OK', 'Oklahoma', 36),
  ('OR', 'Oregon', 37),
  ('PA', 'Pennsylvania', 38),
  ('RI', 'Rhode Island', 39),
  ('SC', 'South Carolina', 40),
  ('SD', 'South Dakota', 41),
  ('TN', 'Tennessee', 42),
  ('TX', 'Texas', 43),
  ('UT', 'Utah', 44),
  ('VT', 'Vermont', 45),
  ('VA', 'Virginia', 46),
  ('WA', 'Washington', 47),
  ('WV', 'West Virginia', 48),
  ('WI', 'Wisconsin', 49),
  ('WY', 'Wyoming', 50)
on conflict (code) do nothing;
