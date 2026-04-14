#!/usr/bin/env node
/**
 * Seeds profile_featured_placements for demo/staging (home + sample category pages).
 *
 * Uses existing public profiles (e.g. from seed-directory-profiles). Requires
 * PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 *
 * Run: node --env-file=.env scripts/seed-featured-placements.mjs
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
	console.error(
		"Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Load .env, e.g. node --env-file=.env scripts/seed-featured-placements.mjs",
	);
	process.exit(1);
}

const supabase = createClient(url, serviceKey, {
	auth: { autoRefreshToken: false, persistSession: false },
});

const { data: profiles, error: profErr } = await supabase
	.from("profiles")
	.select("id")
	.eq("listing_active", true)
	.order("created_at", { ascending: true })
	.limit(24);

if (profErr || !profiles?.length) {
	console.error(
		"No profiles to attach placements to. Run scripts/seed-directory-profiles.mjs first, or create listings.",
		profErr?.message ?? "",
	);
	process.exit(1);
}

const { data: cats, error: catErr } = await supabase
	.from("categories")
	.select("slug")
	.order("sort_order");

if (catErr || !cats?.length) {
	console.error("Could not load categories:", catErr?.message ?? "no rows");
	process.exit(1);
}

const slugs = cats.map((c) => c.slug);
const medicalSlug = slugs.includes("medical")
	? "medical"
	: slugs[Math.floor(slugs.length / 2)];
const engineeringSlug = slugs.includes("engineering-science")
	? "engineering-science"
	: slugs[0];
const businessSlug = slugs.includes("business-financial")
	? "business-financial"
	: slugs[slugs.length - 1];

/** @type {{ profile_id: string; page_path: string }[]} */
const rows = [];

for (let i = 0; i < profiles.length; i++) {
	const { id } = profiles[i];
	if (i < 6) {
		rows.push({ profile_id: id, page_path: "/" });
	}
	if (i >= 2 && i < 8) {
		rows.push({ profile_id: id, page_path: `/categories/${medicalSlug}` });
	}
	if (i >= 4 && i < 10) {
		rows.push({
			profile_id: id,
			page_path: `/categories/${engineeringSlug}`,
		});
	}
	if (i >= 6 && i < 12) {
		rows.push({ profile_id: id, page_path: `/categories/${businessSlug}` });
	}
	if (i === 0) {
		rows.push({ profile_id: id, page_path: "/request" });
	}
	if (i === 1) {
		rows.push({ profile_id: id, page_path: "/categories" });
	}
}

const seen = new Set();
const uniqueRows = rows.filter((r) => {
	const k = `${r.profile_id}:${r.page_path}`;
	if (seen.has(k)) return false;
	seen.add(k);
	return true;
});

const { error: upsertErr } = await supabase
	.from("profile_featured_placements")
	.upsert(uniqueRows, { onConflict: "profile_id,page_path" });

if (upsertErr) {
	console.error("Upsert failed:", upsertErr.message);
	process.exit(1);
}

console.log(
	`Seeded ${uniqueRows.length} featured placement row(s) across /, /categories, /request, and sample category pages (${medicalSlug}, ${engineeringSlug}, ${businessSlug}).`,
);
