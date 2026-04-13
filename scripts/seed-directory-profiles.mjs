#!/usr/bin/env node
/**
 * Seeds demo expert users + profiles for local/staging (directory counts, UI).
 *
 * Requires: PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in the environment.
 * Optional: SEED_PROFILE_COUNT (default 100), SEED_EXPERT_PASSWORD (default dev-only string).
 *
 * Run: node --env-file=.env scripts/seed-directory-profiles.mjs
 *
 * Emails are witnessexperts-seed-{n}@local.invalid — safe to delete the auth users later from the dashboard.
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const target = Math.min(
	500,
	Math.max(1, Number.parseInt(process.env.SEED_PROFILE_COUNT ?? "100", 10) || 100),
);
const password =
	process.env.SEED_EXPERT_PASSWORD ?? "DevSeedExperts_ChangeMe!";

if (!url || !serviceKey) {
	console.error(
		"Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Load .env, e.g. node --env-file=.env scripts/seed-directory-profiles.mjs",
	);
	process.exit(1);
}

const supabase = createClient(url, serviceKey, {
	auth: { autoRefreshToken: false, persistSession: false },
});

const { data: catRows, error: catErr } = await supabase
	.from("categories")
	.select("slug")
	.order("sort_order");

if (catErr || !catRows?.length) {
	console.error("Could not load categories:", catErr?.message ?? "no rows");
	process.exit(1);
}

const slugs = catRows.map((c) => c.slug);
let created = 0;
let skipped = 0;
let failed = 0;

for (let i = 1; i <= target; i++) {
	const email = `witnessexperts-seed-${i}@local.invalid`;
	const displayName = `Demo Expert ${i}`;
	const primary_category_slug = slugs[(i - 1) % slugs.length];

	const { data: userData, error: createErr } =
		await supabase.auth.admin.createUser({
			email,
			password,
			email_confirm: true,
			user_metadata: { display_name: displayName },
		});

	if (createErr) {
		const msg = createErr.message ?? "";
		if (
			msg.toLowerCase().includes("already") ||
			msg.toLowerCase().includes("registered")
		) {
			skipped++;
			continue;
		}
		console.error(`[${i}] createUser:`, createErr);
		failed++;
		continue;
	}

	const id = userData.user?.id;
	if (!id) {
		console.error(`[${i}] No user id returned`);
		failed++;
		continue;
	}

	const { error: upErr } = await supabase.from("profiles").upsert(
		{
			id,
			display_name: displayName,
			primary_category_slug,
			listing_active: true,
			bio: "Seeded demo profile for development.",
		},
		{ onConflict: "id" },
	);

	if (upErr) {
		console.error(`[${i}] profile upsert:`, upErr);
		failed++;
		continue;
	}

	created++;
	if (created % 25 === 0) process.stdout.write(`… ${created} created\n`);
}

console.log(
	`Done. created=${created} skipped_duplicate=${skipped} failed=${failed} (target loop=${target})`,
);
