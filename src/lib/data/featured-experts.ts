/**
 * Placeholder pool for home hero “featured experts”.
 * Replace with API/CMS data and keep `pickFeaturedExperts` or move selection server-side.
 */
export type FeaturedExpert = {
  id: string;
  name: string;
  title: string;
  location: string;
  /** Future: link to expert profile */
  href?: string;
};

export const featuredExpertsPool: FeaturedExpert[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Orthopedic surgery",
    location: "Chicago, IL",
    href: "/search?q=orthopedic",
  },
  {
    id: "2",
    name: "James Okonkwo, PE",
    title: "Structural engineering",
    location: "Atlanta, GA",
    href: "/search?q=structural+engineering",
  },
  {
    id: "3",
    name: "Maria Santos, CPA",
    title: "Forensic accounting",
    location: "Dallas, TX",
    href: "/search?q=forensic+accounting",
  },
  {
    id: "4",
    name: "Dr. Robert Hayes",
    title: "Neurology",
    location: "Boston, MA",
    href: "/search?q=neurology",
  },
  {
    id: "5",
    name: "Lisa Park, PhD",
    title: "Human factors",
    location: "Seattle, WA",
    href: "/search?q=human+factors",
  },
  {
    id: "6",
    name: "Michael Torres",
    title: "Accident reconstruction",
    location: "Phoenix, AZ",
    href: "/search?q=accident+reconstruction",
  },
  {
    id: "7",
    name: "Dr. Emily Wright",
    title: "Emergency medicine",
    location: "Denver, CO",
    href: "/search?q=emergency+medicine",
  },
  {
    id: "8",
    name: "David Kim, CFA",
    title: "Securities & valuation",
    location: "New York, NY",
    href: "/search?q=securities",
  },
];

/** Fisher–Yates shuffle, then take up to `count` items. */
export function pickFeaturedExperts(count: number): FeaturedExpert[] {
  const pool = [...featuredExpertsPool];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}
