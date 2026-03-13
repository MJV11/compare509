import { useState, useEffect } from "react";
import type { DatasetMeta } from "../api";
import { fetchDatasets } from "../api";

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<DatasetMeta[]>([]);

  useEffect(() => {
    fetchDatasets().then(setDatasets).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-gray-900">Datasets</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {datasets.map((d) => (
          <div
            key={d.key}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-sm font-semibold text-gray-900">{d.label}</h3>
              <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500 font-mono">
                {d.key}
              </span>
            </div>
            <div className="flex gap-4 text-xs text-gray-500 mb-3">
              <span>
                <span className="font-semibold text-gray-800">{d.rows.toLocaleString()}</span> rows
              </span>
              <span>
                <span className="font-semibold text-gray-800">{d.columns}</span> columns
              </span>
            </div>
            {d.years.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {d.years.map((y) => (
                  <span
                    key={y}
                    className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
                  >
                    {y}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
