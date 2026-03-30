import type { SubmitFunction } from "@sveltejs/kit";

/**
 * For `use:enhance` on forms: toggles a boolean while the server round-trip runs.
 *
 * @example
 * ```svelte
 * let submitting = $state(false);
 * <form use:enhance={submittingEnhance((v) => (submitting = v))}>
 *   <Button type="submit" loading={submitting}>Save</Button>
 * </form>
 * ```
 */
export function submittingEnhance(
  setSubmitting: (value: boolean) => void,
): SubmitFunction {
  return () => {
    setSubmitting(true);
    return async ({ update }) => {
      try {
        await update();
      } finally {
        setSubmitting(false);
      }
    };
  };
}
