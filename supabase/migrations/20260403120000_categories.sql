-- Expert witness categories (taxonomy). Apply via Supabase CLI (`supabase db push`) or SQL Editor.

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  name text not null,
  description text,
  expert_count integer,
  sort_order integer not null default 0
);

create unique index if not exists categories_slug_key on public.categories (slug);

create table if not exists public.subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  unique (category_id, name)
);

create index if not exists subcategories_category_id_idx on public.subcategories (category_id);

comment on table public.categories is 'Expert witness category (taxonomy).';
comment on table public.subcategories is 'Specialty within a category.';

alter table public.categories enable row level security;
alter table public.subcategories enable row level security;

drop policy if exists "Categories are viewable by everyone" on public.categories;
create policy "Categories are viewable by everyone"
  on public.categories for select to anon, authenticated using (true);

drop policy if exists "Subcategories are viewable by everyone" on public.subcategories;
create policy "Subcategories are viewable by everyone"
  on public.subcategories for select to anon, authenticated using (true);


-- categories
insert into public.categories (slug, name, expert_count, sort_order) values ('accidents-injuries-safety', 'Accidents / Injuries / Safety', 127, 0);
insert into public.categories (slug, name, expert_count, sort_order) values ('automotive-aviation-marine', 'Automotive / Aviation / Marine', 89, 1);
insert into public.categories (slug, name, expert_count, sort_order) values ('business-financial', 'Business & Financial', 156, 2);
insert into public.categories (slug, name, expert_count, sort_order) values ('chemical-environmental-energy', 'Chemical / Environmental / Energy', 94, 3);
insert into public.categories (slug, name, expert_count, sort_order) values ('computers-technology', 'Computers / Internet & Technology', 72, 4);
insert into public.categories (slug, name, expert_count, sort_order) values ('construction-architecture', 'Construction & Architecture', 118, 5);
insert into public.categories (slug, name, expert_count, sort_order) values ('documents-handwriting', 'Documents & Handwriting', 34, 6);
insert into public.categories (slug, name, expert_count, sort_order) values ('engineering-science', 'Engineering & Science', 142, 7);
insert into public.categories (slug, name, expert_count, sort_order) values ('medical', 'Medical', 287, 8);
insert into public.categories (slug, name, expert_count, sort_order) values ('real-estate', 'Real Estate', 67, 9);
insert into public.categories (slug, name, expert_count, sort_order) values ('human-resources', 'Human Resources', 45, 10);
insert into public.categories (slug, name, expert_count, sort_order) values ('insurance', 'Insurance', 78, 11);
insert into public.categories (slug, name, expert_count, sort_order) values ('investigative-forensic', 'Investigative & Forensic', 56, 12);
insert into public.categories (slug, name, expert_count, sort_order) values ('police-penal', 'Police & Penal', 41, 13);
insert into public.categories (slug, name, expert_count, sort_order) values ('psychiatry-psychology', 'Psychiatry & Psychology', 63, 14);

-- subcategories: accidents-injuries-safety
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Accident Reconstruction'::text, 0),
  ('Carbon Monoxide Poisoning'::text, 1),
  ('Alarms'::text, 2),
  ('Amusement Parks'::text, 3),
  ('Aquatics Safety & Water Rescue'::text, 4),
  ('Asbestos'::text, 5),
  ('Automotive'::text, 6),
  ('Aviation'::text, 7),
  ('Biomechanics'::text, 8),
  ('Building Codes'::text, 9),
  ('Bus & Truck Safety'::text, 10),
  ('Child Seat Restraints'::text, 11),
  ('Ergonomics'::text, 12),
  ('Elevator & Escalator'::text, 13),
  ('Fire & Explosion Investigation'::text, 14),
  ('Firearms and Ballistics'::text, 15),
  ('Forklifts'::text, 16),
  ('Hazardous Materials'::text, 17),
  ('Human Factors'::text, 18),
  ('Ladders & Scaffolds'::text, 19),
  ('Maritime and Admiralty'::text, 20),
  ('Motorcycle'::text, 21),
  ('Premises Liability'::text, 22),
  ('Products Liability'::text, 23),
  ('Safety Engineering'::text, 24),
  ('Slips and Falls'::text, 25),
  ('Sports & Recreation Injuries'::text, 26),
  ('Traffic Engineering'::text, 27),
  ('Traumatic Brain Injury'::text, 28),
  ('Workplace Accidents'::text, 29)
) as v(name, ord)
where c.slug = 'accidents-injuries-safety';


-- subcategories: automotive-aviation-marine
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Accident Reconstruction'::text, 0),
  ('Airlines'::text, 1),
  ('Automobile Dealerships'::text, 2),
  ('Bicycles'::text, 3),
  ('Boating and Watersports'::text, 4),
  ('Cruise Lines'::text, 5),
  ('Highway Construction'::text, 6),
  ('Maritime and Admiralty'::text, 7),
  ('Motorcycle'::text, 8),
  ('Railroads'::text, 9),
  ('Seat Belts & Air Bags'::text, 10),
  ('Supply Chain & Warehousing'::text, 11),
  ('Tires'::text, 12),
  ('Transportation'::text, 13)
) as v(name, ord)
where c.slug = 'automotive-aviation-marine';


-- subcategories: business-financial
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Accounting'::text, 0),
  ('Actuarial'::text, 1),
  ('Banking'::text, 2),
  ('Bankruptcy'::text, 3),
  ('Business Valuations'::text, 4),
  ('Contract Disputes'::text, 5),
  ('Copyrights'::text, 6),
  ('Economic Damages'::text, 7),
  ('Forensic Accounting'::text, 8),
  ('Fraud'::text, 9),
  ('Insurance'::text, 10),
  ('Intellectual Property'::text, 11),
  ('Labor Law and Compliance'::text, 12),
  ('Lost Profits'::text, 13),
  ('Mergers & Acquisitions'::text, 14),
  ('Patents & Trademarks'::text, 15),
  ('Real Estate Commercial'::text, 16),
  ('Securities'::text, 17),
  ('Taxation'::text, 18)
) as v(name, ord)
where c.slug = 'business-financial';


-- subcategories: chemical-environmental-energy
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Asbestos'::text, 0),
  ('Biochemistry'::text, 1),
  ('Chemistry & Chemicals'::text, 2),
  ('Coal & Mining'::text, 3),
  ('Environmental'::text, 4),
  ('Geology'::text, 5),
  ('Hazardous Materials'::text, 6),
  ('Hydrology'::text, 7),
  ('Industrial Hygiene'::text, 8),
  ('Lead Poisoning'::text, 9),
  ('Mold and Indoor Air Quality'::text, 10),
  ('Petroleum & Petrochemicals'::text, 11),
  ('Pollution'::text, 12),
  ('Weather / Meteorology'::text, 13)
) as v(name, ord)
where c.slug = 'chemical-environmental-energy';


-- subcategories: computers-technology
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Artificial Intelligence'::text, 0),
  ('Computer Evidence Discovery'::text, 1),
  ('Cyber Security'::text, 2),
  ('E-commerce'::text, 3),
  ('Information Technology'::text, 4),
  ('Internet'::text, 5),
  ('Photography & Visual Evidence'::text, 6),
  ('Semiconductors'::text, 7),
  ('Software'::text, 8),
  ('Software - Trade Secrets'::text, 9)
) as v(name, ord)
where c.slug = 'computers-technology';


-- subcategories: construction-architecture
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Architecture'::text, 0),
  ('Building Codes'::text, 1),
  ('Building Materials'::text, 2),
  ('Concrete & Cement'::text, 3),
  ('Construction Claims'::text, 4),
  ('Electrical Codes'::text, 5),
  ('Floor Failure Analysis'::text, 6),
  ('Home Inspections'::text, 7),
  ('HVAC'::text, 8),
  ('Landscape Design'::text, 9),
  ('Plumbing & HVAC'::text, 10),
  ('Project Management'::text, 11),
  ('Roofing & Waterproofing'::text, 12),
  ('Structural Engineering'::text, 13),
  ('Zoning & Land Use'::text, 14)
) as v(name, ord)
where c.slug = 'construction-architecture';


-- subcategories: documents-handwriting
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Document Examination'::text, 0),
  ('Fingerprint Identification'::text, 1),
  ('Handwriting'::text, 2),
  ('Ink Dating'::text, 3)
) as v(name, ord)
where c.slug = 'documents-handwriting';


-- subcategories: engineering-science
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Acoustics'::text, 0),
  ('Aerospace Engineering'::text, 1),
  ('Chemical Engineering'::text, 2),
  ('Civil Engineering'::text, 3),
  ('Electrical Engineering'::text, 4),
  ('Fire Protection Engineering'::text, 5),
  ('Forensic Sciences'::text, 6),
  ('Geotechnical Engineering'::text, 7),
  ('Materials Science'::text, 8),
  ('Mechanical Engineering'::text, 9),
  ('Metallurgy'::text, 10),
  ('Physics'::text, 11),
  ('Product Reliability'::text, 12),
  ('Traffic Engineering'::text, 13)
) as v(name, ord)
where c.slug = 'engineering-science';


-- subcategories: medical
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Anesthesiology'::text, 0),
  ('Cardiology'::text, 1),
  ('Chiropractic'::text, 2),
  ('Critical Care'::text, 3),
  ('Dental'::text, 4),
  ('Emergency Medicine'::text, 5),
  ('Forensic Medicine'::text, 6),
  ('Gastroenterology'::text, 7),
  ('Geriatrics'::text, 8),
  ('Internal Medicine'::text, 9),
  ('Medical Malpractice'::text, 10),
  ('Neurology'::text, 11),
  ('Nursing'::text, 12),
  ('Obstetrics / Gynecology'::text, 13),
  ('Oncology'::text, 14),
  ('Orthopedic Surgery'::text, 15),
  ('Pathology'::text, 16),
  ('Pediatrics'::text, 17),
  ('Psychiatry'::text, 18),
  ('Psychology'::text, 19),
  ('Radiology'::text, 20),
  ('Sports Medicine'::text, 21),
  ('Toxicology'::text, 22),
  ('Traumatic Brain Injury'::text, 23)
) as v(name, ord)
where c.slug = 'medical';


-- subcategories: real-estate
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Appraisal'::text, 0),
  ('Broker Conduct'::text, 1),
  ('Commission Disputes'::text, 2),
  ('Development'::text, 3),
  ('Escrow'::text, 4),
  ('Leasing'::text, 5),
  ('Property Management'::text, 6),
  ('Title Insurance'::text, 7),
  ('Zoning & Land Use'::text, 8)
) as v(name, ord)
where c.slug = 'real-estate';


-- subcategories: human-resources
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('ADA Compliance'::text, 0),
  ('Employment'::text, 1),
  ('Labor Law'::text, 2),
  ('Negligent Hiring'::text, 3),
  ('Sexual Harassment'::text, 4),
  ('Wrongful Termination'::text, 5)
) as v(name, ord)
where c.slug = 'human-resources';


-- subcategories: insurance
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Bad Faith'::text, 0),
  ('Claims Handling'::text, 1),
  ('Disability Claims'::text, 2),
  ('Property & Casualty'::text, 3),
  ('Professional Liability'::text, 4),
  ('Reinsurance'::text, 5),
  ('Structured Settlements'::text, 6)
) as v(name, ord)
where c.slug = 'insurance';


-- subcategories: investigative-forensic
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Crime Scene'::text, 0),
  ('Electronic Surveillance'::text, 1),
  ('Firearms and Ballistics'::text, 2),
  ('Jury Consultants'::text, 3),
  ('Lie Detection / Polygraph'::text, 4),
  ('Photography & Visual Evidence'::text, 5),
  ('Voice Identification'::text, 6)
) as v(name, ord)
where c.slug = 'investigative-forensic';


-- subcategories: police-penal
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Corrections'::text, 0),
  ('Deadly Force'::text, 1),
  ('Law Enforcement'::text, 2),
  ('Police Practices'::text, 3),
  ('Prison Standards'::text, 4),
  ('Search & Seizure'::text, 5)
) as v(name, ord)
where c.slug = 'police-penal';


-- subcategories: psychiatry-psychology
insert into public.subcategories (category_id, name, sort_order)
select c.id, v.name, v.ord
from public.categories c
cross join (values
  ('Behavioral Health'::text, 0),
  ('Child Custody Evaluation'::text, 1),
  ('Mental Health'::text, 2),
  ('Neuropsychology'::text, 3),
  ('PTSD'::text, 4),
  ('Vocational Rehabilitation'::text, 5)
) as v(name, ord)
where c.slug = 'psychiatry-psychology';

