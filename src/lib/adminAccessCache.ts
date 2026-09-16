// Local cache of a signed-in user's backend access (roles + module permissions).
// The admin UI renders from this cache immediately, so a slow or flaky backend
// permission query can never block or eject a logged-in user.

export type CachedAccess = {
  userId: string;
  isAdmin: boolean;
  isStaff: boolean;
  permissions: string[];
  updatedAt: number;
};

const KEY_PREFIX = "nsl.admin.access.";

export const readAccessCache = (userId?: string): CachedAccess | null => {
  if (!userId) return null;
  try {
    const raw = window.localStorage.getItem(KEY_PREFIX + userId);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedAccess;
    if (!parsed || parsed.userId !== userId || !Array.isArray(parsed.permissions)) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const writeAccessCache = (value: Omit<CachedAccess, "updatedAt">) => {
  try {
    window.localStorage.setItem(
      KEY_PREFIX + value.userId,
      JSON.stringify({ ...value, updatedAt: Date.now() })
    );
  } catch {
    // storage unavailable (private mode) - cache is a nicety, never fatal
  }
};

export const clearAccessCache = (userId?: string) => {
  try {
    if (userId) {
      window.localStorage.removeItem(KEY_PREFIX + userId);
      return;
    }
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(KEY_PREFIX))
      .forEach((k) => window.localStorage.removeItem(k));
  } catch {
    // ignore
  }
};
