/**
 * Thin helpers for reading and writing URLSearchParams without a router.
 * Uses history.replaceState so the URL updates without a page reload.
 */

export function getParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key);
}

export function getParamList(key: string): string[] {
  const v = getParam(key);
  return v ? v.split("|").map((s) => s.trim()).filter(Boolean) : [];
}

export function setParams(updates: Record<string, string | string[] | null>) {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(updates)) {
    if (value === null || (Array.isArray(value) && value.length === 0)) {
      params.delete(key);
    } else if (Array.isArray(value)) {
      params.set(key, value.join("|"));
    } else {
      params.set(key, value);
    }
  }
  const search = params.toString();
  history.replaceState(null, "", search ? `?${search}` : window.location.pathname);
}
