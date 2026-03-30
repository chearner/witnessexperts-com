/** localStorage key for explicit light/dark choice */
export const THEME_STORAGE_KEY = "witnessexperts-theme";

export type ThemeMode = "light" | "dark";

export function getStoredTheme(): ThemeMode | null {
  if (typeof localStorage === "undefined") return null;
  const v = localStorage.getItem(THEME_STORAGE_KEY);
  if (v === "dark" || v === "light") return v;
  return null;
}

/** Apply class on <html> and persist when `persist` is true. */
export function applyTheme(mode: ThemeMode, persist = true) {
  const root = document.documentElement;
  if (mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      /* private mode, etc. */
    }
  }
}

/** Toggle between light and dark; returns the new mode. */
export function toggleTheme(): ThemeMode {
  const next: ThemeMode = document.documentElement.classList.contains("dark")
    ? "light"
    : "dark";
  applyTheme(next);
  return next;
}

export function isDarkMode(): boolean {
  return document.documentElement.classList.contains("dark");
}
