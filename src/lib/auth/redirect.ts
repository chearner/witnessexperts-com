/** Prevent open redirects from ?next= on auth callback. */
export function safeNextPath(next: string | null): string {
  if (!next || !next.startsWith("/")) return "/";
  if (next.startsWith("//")) return "/";
  return next;
}
