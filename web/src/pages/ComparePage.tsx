import { useState, useEffect, useCallback, useRef } from "react";
import type { DatasetMeta } from "../api";
import { fetchDatasets, fetchSchools, compareSchools } from "../api";
import { ALL_DATASETS } from "../types/compareTypes";
import type { SchoolData } from "../types/compareTypes";
import SchoolCard from "../components/SchoolCard";
import { displayName } from "../components/StatRows";
import { PiXBold } from "react-icons/pi";
import { RowHoverProvider } from "../context/RowHoverContext";
import { getParam, getParamList, setParams } from "../utils/urlState";

export default function ComparePage() {
  const [datasets, setDatasets] = useState<DatasetMeta[]>([]);
  const [schools, setSchools] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState(() => getParam("year") ?? "");
  const [schoolNames, setSchoolNames] = useState<string[]>(() => getParamList("schools"));
  const [exiting, setExiting] = useState<Set<string>>(new Set());

  // Search box state
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // cache: "dataset||school||year" -> row data
  const [dataCache, setDataCache] = useState<Record<string, SchoolData | null>>({});
  const [_loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const availableYears = datasets.find((d) => d.key === "employment")?.years ?? [];

  useEffect(() => {
    fetchDatasets().then((ds) => {
      setDatasets(ds);
      // Only set year from API default if nothing is in the URL
      if (!getParam("year")) {
        const emp = ds.find((d) => d.key === "employment");
        if (emp?.years.length) setSelectedYear(emp.years[emp.years.length - 1]);
      }
    });
    fetchSchools().then(setSchools);
  }, []);

  // Sync schoolNames + year back to the URL whenever they change
  useEffect(() => {
    setParams({
      schools: schoolNames.length ? schoolNames : null,
      year: selectedYear || null,
    });
  }, [schoolNames, selectedYear]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const cacheKey = (dataset: string, school: string, year: string) =>
    `${dataset}||${school}||${year}`;

  const fetchForSchool = useCallback(
    async (school: string, dataset: string, year: string) => {
      const key = cacheKey(dataset, school, year);
      if (key in dataCache) return;
      setDataCache((prev) => ({ ...prev, [key]: null }));
      try {
        const r = await compareSchools({ schools: [school], dataset, year: year || undefined });
        setDataCache((prev) => ({ ...prev, [key]: r.rows[0] ?? null }));
      } catch {
        setDataCache((prev) => ({ ...prev, [key]: null }));
      }
    },
    [dataCache]
  );

  useEffect(() => {
    if (!schoolNames.length || !selectedYear) return;
    setLoading(true);
    setError("");
    const fetches = schoolNames.flatMap((n) =>
      ALL_DATASETS.map((ds) => fetchForSchool(n, ds, selectedYear))
    );
    Promise.all(fetches).finally(() => setLoading(false));
  }, [selectedYear, schoolNames.join("|")]);

  const addSchool = (name: string) => {
    if (schoolNames.includes(name)) return;
    setSchoolNames((prev) => [...prev, name]);
    if (selectedYear) {
      ALL_DATASETS.forEach((ds) => fetchForSchool(name, ds, selectedYear));
    }
    setQuery("");
    setDropdownOpen(false);
  };

  const removeSchool = (name: string) => {
    setExiting((prev) => new Set(prev).add(name));
    setTimeout(() => {
      setSchoolNames((prev) => prev.filter((n) => n !== name));
      setExiting((prev) => {
        const next = new Set(prev);
        next.delete(name);
        return next;
      });
    }, 350);
  };

  const getDataForSchool = (name: string): Record<string, SchoolData | null> => {
    const result: Record<string, SchoolData | null> = {};
    for (const ds of ALL_DATASETS) {
      const key = cacheKey(ds, name, selectedYear);
      result[ds] = key in dataCache ? dataCache[key] : null;
    }
    return result;
  };

  const filtered = query
    ? schools
        .filter(
          (s) =>
            s.toLowerCase().includes(query.toLowerCase()) &&
            !schoolNames.includes(s)
        )
        .slice(0, 14)
    : schools.filter((s) => !schoolNames.includes(s)).slice(0, 14);

  return (
    <div className="h-full min-h-0">
      {/* Toolbar */}
      <div className="flex flex-col items-center gap-4 min-w-0">
        {/* Title — fixed */}
        <h1 className="text-3xl font-bold text-gray-900 shrink-0">Compare</h1>

        {/* controls */}
        <div className="flex items-center gap-3 shrink-0">
          <select
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {availableYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          {/* Search bar */}
          <div ref={searchRef} className="relative">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4">
              <svg className="w-3.5 h-3.5 text-gray-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                className="w-52 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none border-none"
                placeholder="Add a school…"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setDropdownOpen(true); }}
                onFocus={() => setDropdownOpen(true)}
              />
            </div>
            {dropdownOpen && filtered.length > 0 && (
              <ul className="absolute right-0 z-50 mt-1 w-72 max-h-72 overflow-auto rounded-lg border border-gray-200 bg-white py-1.5 shadow-lg">
                {filtered.map((opt) => (
                  <li
                    key={opt}
                    className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onMouseDown={() => addSchool(opt)}
                  >
                    {displayName(opt)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Chips — fills remaining space, scrolls horizontally */}
        {schoolNames.length > 0 ? (
          <div className="w-full">
            <div className="flex flex-row flex-wrap items-center justify-center">
              {schoolNames.map((name) => (
                <div
                  key={name}
                  className={`flex items-center gap-2 border-2 border-dashed border-gray-700 rounded-full px-4 py-1.5 shrink-0 ${exiting.has(name) ? "animate-chip-out" : "animate-chip-in"}`}
                  style={!exiting.has(name) ? { margin: "0 4px" } : {}}
                >
                  <span className="text-sm whitespace-nowrap font-semibold text-gray-800">
                    {displayName(name)}
                  </span>
                  <button
                    onClick={() => removeSchool(name)}
                    className="text-gray-400 hover:text-gray-700 text-base leading-none"
                    aria-label="Remove"
                  >
                    <PiXBold size={12} className="" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null
        }
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Cards row */}
      {schoolNames.length > 0 ? (
        <RowHoverProvider>
          <div className="w-full overflow-x-auto">
            <div className="flex flex-row items-start w-max mx-auto p-6">
              {schoolNames.map((name) => (
                <div
                  key={name}
                  className={exiting.has(name) ? "animate-card-out" : "animate-card-in"}
                  style={!exiting.has(name) ? { margin: "0 20px" } : {}}
                >
                  <SchoolCard
                    name={name}
                    dataByDataset={getDataForSchool(name)}
                    year={selectedYear}
                    onRemove={() => removeSchool(name)}
                    canRemove={schoolNames.length > 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </RowHoverProvider>
      ) : <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-gray-100">
        <svg className="w-[100px] h-[100px] opacity-20" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M96 464v32c0 8.84 7.16 16 16 16h224c8.84 0 16-7.16 16-16V153.25c4.56-2 8.92-4.35 12.99-7.12l142.05 47.63c8.38 2.81 17.45-1.71 20.26-10.08l10.17-30.34c2.81-8.38-1.71-17.45-10.08-20.26l-128.4-43.05c.42-3.32 1.01-6.6 1.01-10.03 0-44.18-35.82-80-80-80-29.69 0-55.3 16.36-69.11 40.37L132.96.83c-8.38-2.81-17.45 1.71-20.26 10.08l-10.17 30.34c-2.81 8.38 1.71 17.45 10.08 20.26l132 44.26c7.28 21.25 22.96 38.54 43.38 47.47V448H112c-8.84 0-16 7.16-16 16zM0 304c0 44.18 57.31 80 128 80s128-35.82 128-80h-.02c0-15.67 2.08-7.25-85.05-181.51-17.68-35.36-68.22-35.29-85.87 0C-1.32 295.27.02 287.82.02 304H0zm56-16l72-144 72 144H56zm328.02 144H384c0 44.18 57.31 80 128 80s128-35.82 128-80h-.02c0-15.67 2.08-7.25-85.05-181.51-17.68-35.36-68.22-35.29-85.87 0-86.38 172.78-85.04 165.33-85.04 181.51zM440 416l72-144 72 144H440z" />
        </svg>
        <span className="text-sm text-gray-400 mt-2">Add a school to get started</span>
      </div>}
    </div>
  );
}
