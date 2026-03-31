/** Whether the expert profile still needs basic information (e.g. after email confirmation). */
export function isProfileIncomplete(
  profile: { display_name: string | null } | null,
): boolean {
  if (!profile) return true;
  return !profile.display_name?.trim();
}
