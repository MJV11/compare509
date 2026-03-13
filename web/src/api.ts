// Client-side CSV data layer — parses static CSVs with PapaParse, no backend needed

import Papa from "papaparse";

// ---------------------------------------------------------------------------
// Dataset config (mirrors api/main.py DATASETS)
// ---------------------------------------------------------------------------

interface DatasetConfig {
  file: string;
  label: string;
  schoolCol: string;
  yearCol: string;
}

const DATASETS: Record<string, DatasetConfig> = {
  employment: {
    file: "aba_509_employment_all_schools.csv",
    label: "Employment Outcomes",
    schoolCol: "schoolname",
    yearCol: "cohort",
  },
  bar_passage_firsttime: {
    file: "bar_passage_firsttime.csv",
    label: "Bar Passage — First Time",
    schoolCol: "School Name",
    yearCol: "SchoolYear",
  },
  bar_passage_ultimate: {
    file: "bar_passage_ultimate.csv",
    label: "Bar Passage — Two-Year Ultimate",
    schoolCol: "School Name",
    yearCol: "SchoolYear",
  },
  basics: {
    file: "509_basics.csv",
    label: "The Basics / Academic Calendar",
    schoolCol: "SchoolName",
    yearCol: "SchoolYear",
  },
  firstyearclass: {
    file: "509_firstyearclass.csv",
    label: "First Year Class",
    schoolCol: "SchoolName",
    yearCol: "SchoolYear",
  },
  curriculum: {
    file: "509_curriculum.csv",
    label: "Curricular Offerings",
    schoolCol: "School Name",
    yearCol: "SchoolYear",
  },
  faculty: {
    file: "509_faculty.csv",
    label: "Faculty Resources",
    schoolCol: "SchoolName",
    yearCol: "SchoolYear",
  },
  diversity: {
    file: "509_diversity.csv",
    label: "JD Enrollment and Ethnicity",
    schoolCol: "SchoolName",
    yearCol: "SchoolYear",
  },
  scholarships: {
    file: "509_scholarships.csv",
    label: "Grants and Scholarships",
    schoolCol: "SchoolName",
    yearCol: "SchoolYear",
  },
  tuition: {
    file: "509_tuition.csv",
    label: "Tuition, Fees & Living Expenses",
    schoolCol: "SchoolName",
    yearCol: "SchoolYear",
  },
  attrition: {
    file: "509_attrition.csv",
    label: "Attrition",
    schoolCol: "SchoolName",
    yearCol: "SchoolYear",
  },
  transfers: {
    file: "509_transfers.csv",
    label: "Transfers",
    schoolCol: "SchoolName",
    yearCol: "SchoolYear",
  },
};

// ---------------------------------------------------------------------------
// Shared types (unchanged)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// CSV cache + loader
// ---------------------------------------------------------------------------

type Row = Record<string, string>;

const cache = new Map<string, Row[]>();
let columnDict: Record<string, { columns?: Record<string, string> }> | null = null;

async function loadCsv(key: string): Promise<Row[]> {
  if (cache.has(key)) return cache.get(key)!;
  const cfg = DATASETS[key];
  if (!cfg) throw new Error(`Unknown dataset: ${key}`);

  const res = await fetch(`/data/${cfg.file}`);
  if (!res.ok) throw new Error(`Failed to load ${cfg.file}`);
  const text = await res.text();

  const parsed = Papa.parse<Row>(text, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = parsed.data.map((row) => {
    const clean: Row = {};
    for (const [k, v] of Object.entries(row)) {
      if (v !== "" && v !== "nan" && v !== "NaN" && v != null) {
        clean[k] = v;
      }
    }
    return clean;
  });

  cache.set(key, rows);
  return rows;
}

async function loadColumnDict() {
  if (columnDict) return columnDict;
  try {
    const res = await fetch("/data/column_dictionary.json");
    if (res.ok) columnDict = await res.json();
  } catch { /* ignore */ }
  columnDict ??= {};
  return columnDict;
}

// ---------------------------------------------------------------------------
// Exported API functions (same signatures as before)
// ---------------------------------------------------------------------------

export async function fetchDatasets(): Promise<DatasetMeta[]> {
  const results: DatasetMeta[] = [];

  await Promise.all(
    Object.entries(DATASETS).map(async ([key, cfg]) => {
      try {
        const rows = await loadCsv(key);
        const cols = rows.length > 0 ? Object.keys(rows[0]) : [];
        const yearSet = new Set<string>();
        for (const row of rows) {
          const y = row[cfg.yearCol];
          if (y) yearSet.add(y);
        }
        results.push({
          key,
          label: cfg.label,
          rows: rows.length,
          columns: cols.length,
          years: [...yearSet].sort(),
        });
      } catch {
        // skip datasets that fail to load
      }
    })
  );

  return results;
}

export async function fetchSchools(dataset = "basics"): Promise<string[]> {
  const cfg = DATASETS[dataset];
  if (!cfg) throw new Error(`Unknown dataset: ${dataset}`);
  const rows = await loadCsv(dataset);
  const schoolSet = new Set<string>();
  for (const row of rows) {
    const s = row[cfg.schoolCol];
    if (s) schoolSet.add(s);
  }
  return [...schoolSet].sort();
}

export async function fetchColumns(dataset: string): Promise<ColumnMeta[]> {
  const cfg = DATASETS[dataset];
  if (!cfg) throw new Error(`Unknown dataset: ${dataset}`);
  const rows = await loadCsv(dataset);
  const dict = await loadColumnDict();
  const fileDict = dict[cfg.file]?.columns ?? {};
  const cols = rows.length > 0 ? Object.keys(rows[0]) : [];
  return cols.map((col) => ({ column: col, label: fileDict[col] ?? col }));
}

export async function queryDataset(params: {
  dataset: string;
  school?: string;
  year?: string;
  columns?: string[];
  limit?: number;
  offset?: number;
}): Promise<QueryResult> {
  const cfg = DATASETS[params.dataset];
  if (!cfg) throw new Error(`Unknown dataset: ${params.dataset}`);
  let rows = await loadCsv(params.dataset);

  if (params.school) {
    const q = params.school.toLowerCase();
    rows = rows.filter((r) => r[cfg.schoolCol]?.toLowerCase().includes(q));
  }
  if (params.year) {
    rows = rows.filter((r) => String(r[cfg.yearCol]) === params.year);
  }

  const total = rows.length;
  const offset = params.offset ?? 0;
  const limit = params.limit ?? 100;
  rows = rows.slice(offset, offset + limit);

  if (params.columns?.length) {
    rows = rows.map((r) => {
      const picked: Row = {};
      for (const c of params.columns!) {
        if (c in r) picked[c] = r[c];
      }
      return picked;
    });
  }

  return { dataset: params.dataset, total, offset, limit, rows };
}

export async function compareSchools(params: {
  schools: string[];
  dataset: string;
  year?: string;
  columns?: string[];
}): Promise<CompareResult> {
  const cfg = DATASETS[params.dataset];
  if (!cfg) throw new Error(`Unknown dataset: ${params.dataset}`);
  const allRows = await loadCsv(params.dataset);

  const lowerNames = params.schools.map((s) => s.toLowerCase());
  let rows = allRows.filter((r) =>
    lowerNames.includes(r[cfg.schoolCol]?.toLowerCase())
  );

  if (params.year) {
    rows = rows.filter((r) => String(r[cfg.yearCol]) === params.year);
  }

  if (params.columns?.length) {
    const keep = new Set([cfg.schoolCol, cfg.yearCol, ...params.columns]);
    rows = rows.map((r) => {
      const picked: Row = {};
      for (const c of keep) {
        if (c in r) picked[c] = r[c];
      }
      return picked;
    });
  }

  return {
    dataset: params.dataset,
    schools: params.schools,
    year: params.year ?? null,
    rows,
  };
}

export async function fetchSchoolAllDatasets(
  school: string,
  year?: string
): Promise<SchoolAllResult> {
  const result: SchoolAllResult = {
    school,
    year: year ?? null,
    datasets: {},
  };

  await Promise.all(
    Object.entries(DATASETS).map(async ([key, cfg]) => {
      try {
        const allRows = await loadCsv(key);

        // exact match first, partial fallback
        const lowerSchool = school.toLowerCase();
        let rows = allRows.filter(
          (r) => r[cfg.schoolCol]?.toLowerCase() === lowerSchool
        );
        if (rows.length === 0) {
          rows = allRows.filter((r) =>
            r[cfg.schoolCol]?.toLowerCase().includes(lowerSchool)
          );
        }

        if (year) {
          rows = rows.filter((r) => String(r[cfg.yearCol]) === year);
        }

        if (rows.length > 0) {
          result.datasets[key] = { label: cfg.label, rows };
        }
      } catch {
        // skip datasets that fail to load
      }
    })
  );

  if (Object.keys(result.datasets).length === 0) {
    throw new Error(`No data found for '${school}'.`);
  }

  return result;
}
