// Central API client — all fetch calls go through here

const BASE = "http://localhost:8000";

export interface DatasetMeta {
  key: string;
  label: string;
  rows: number;
  columns: number;
  years: string[];
}

export interface ColumnMeta {
  column: string;
  label: string;
}

export interface QueryResult {
  dataset: string;
  total: number;
  offset: number;
  limit: number;
  rows: Record<string, string>[];
}

export interface CompareResult {
  dataset: string;
  schools: string[];
  year: string | null;
  rows: Record<string, string>[];
}

export interface SchoolAllResult {
  school: string;
  year: string | null;
  datasets: Record<string, { label: string; rows: Record<string, string>[] }>;
}

export async function fetchDatasets(): Promise<DatasetMeta[]> {
  const r = await fetch(`${BASE}/datasets`);
  if (!r.ok) throw new Error("Failed to fetch datasets");
  return r.json();
}

export async function fetchSchools(dataset = "basics"): Promise<string[]> {
  const r = await fetch(`${BASE}/schools?dataset=${encodeURIComponent(dataset)}`);
  if (!r.ok) throw new Error("Failed to fetch schools");
  const d = await r.json();
  return d.schools as string[];
}

export async function fetchColumns(dataset: string): Promise<ColumnMeta[]> {
  const r = await fetch(`${BASE}/columns/${encodeURIComponent(dataset)}`);
  if (!r.ok) throw new Error("Failed to fetch columns");
  return r.json();
}

export async function queryDataset(params: {
  dataset: string;
  school?: string;
  year?: string;
  columns?: string[];
  limit?: number;
  offset?: number;
}): Promise<QueryResult> {
  const p = new URLSearchParams();
  if (params.school) p.set("school", params.school);
  if (params.year) p.set("year", params.year);
  if (params.columns?.length) p.set("columns", params.columns.join(","));
  p.set("limit", String(params.limit ?? 100));
  p.set("offset", String(params.offset ?? 0));
  const r = await fetch(`${BASE}/data/${encodeURIComponent(params.dataset)}?${p}`);
  if (!r.ok) throw new Error("Query failed");
  return r.json();
}

export async function compareSchools(params: {
  schools: string[];
  dataset: string;
  year?: string;
  columns?: string[];
}): Promise<CompareResult> {
  const p = new URLSearchParams();
  p.set("schools", params.schools.join("|"));
  p.set("dataset", params.dataset);
  if (params.year) p.set("year", params.year);
  if (params.columns?.length) p.set("columns", params.columns.join(","));
  const r = await fetch(`${BASE}/compare?${p}`);
  if (!r.ok) throw new Error("Compare failed");
  return r.json();
}

export async function fetchSchoolAllDatasets(
  school: string,
  year?: string
): Promise<SchoolAllResult> {
  const p = new URLSearchParams();
  if (year) p.set("year", year);
  const r = await fetch(`${BASE}/school/${encodeURIComponent(school)}?${p}`);
  if (!r.ok) throw new Error(`No data for ${school}`);
  return r.json();
}
