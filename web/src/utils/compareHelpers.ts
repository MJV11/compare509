export function toNum(v: string | undefined | null): number {
  if (!v) return 0;
  return parseFloat(String(v).replace(/[^0-9.-]/g, "")) || 0;
}

export function fmt(v: string | undefined | null): string {
  if (v == null || v === "" || v === "nan") return "—";
  const s = String(v);
  // Strip trailing .0 from numbers (e.g. "243.0" -> "243")
  if (/^-?\d+\.0$/.test(s)) return s.slice(0, -2);
  return s;
}

export function fmtPct(n: number): string {
  return n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + "%";
}

export function titleCase(s: string): string {
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export function displayName(s: string): string {
  const tc = titleCase(s);
  // "Foo-Bar, University Of" → "University Of Foo, Bar"
  const commaIdx = tc.indexOf(", ");
  if (commaIdx !== -1) {
    const before = tc.slice(0, commaIdx).replace("-", ", ");
    const after = tc.slice(commaIdx + 2);
    return `${after} ${before}`;
  }
  return tc;
}
