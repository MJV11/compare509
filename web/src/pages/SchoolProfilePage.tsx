import { useState, useEffect } from "react";
import type { DatasetMeta } from "../api";
import { fetchDatasets, fetchSchools, fetchSchoolAllDatasets } from "../api";
import Autocomplete from "../components/Autocomplete";
import DataTable from "../components/DataTable";

export default function SchoolProfilePage() {
  const [datasets, setDatasets] = useState<DatasetMeta[]>([]);
  const [schools, setSchools] = useState<string[]>([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [result, setResult] = useState<Awaited<ReturnType<typeof fetchSchoolAllDatasets>> | null>(null);
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allYears = ["2020", "2021", "2022", "2023", "2024"];

  useEffect(() => {
    fetchDatasets().then(setDatasets).catch(console.error);
    fetchSchools().then(setSchools).catch(console.error);
  }, []);

  const runSearch = async () => {
    if (!selectedSchool) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const r = await fetchSchoolAllDatasets(selectedSchool, selectedYear || undefined);
      setResult(r);
      setActiveTab(Object.keys(r.datasets)[0] ?? "");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const datasetLabel = (key: string) =>
    datasets.find((d) => d.key === key)?.label ?? key;

  const activeRows = result?.datasets[activeTab]?.rows ?? [];

  const displayName = selectedSchool
    ? selectedSchool
        .split(",")
        .map((s) => s.trim())
        .reverse()
        .join(", ")
    : "";

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Search bar */}
      <div className="w-full flex flex-col items-center">
        <div className="bg-white rounded-xl border border-gray-200 p-6 w-full">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                School Name
              </label>
              <Autocomplete
                options={schools}
                value={selectedSchool}
                onChange={setSelectedSchool}
                placeholder="Search for a school..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Year
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">All years</option>
                {allYears.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={runSearch}
              disabled={loading || !selectedSchool}
              className="bg-gray-900 hover:bg-gray-700 disabled:opacity-40 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
            >
              {loading ? "Loading..." : "Load Profile"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden w-full min-w-0">
          {/* School header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">{displayName || result.school}</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {Object.keys(result.datasets).length} datasets available
              {result.year ? ` · ${result.year}` : " · all years"}
            </p>
          </div>

          {/* Dataset tabs */}
          <div className="flex flex-wrap border-b border-gray-200 px-2">
            {Object.keys(result.datasets).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === key
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {datasetLabel(key)}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-4">
            <p className="mb-3 text-xs text-gray-400">
              {activeRows.length} row{activeRows.length !== 1 ? "s" : ""}
            </p>
            <DataTable rows={activeRows} />
          </div>
        </div>
      )}
    </div>
  );
}
