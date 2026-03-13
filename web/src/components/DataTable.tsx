import { useMemo } from "react";
import type { ColumnMeta } from "../api";

interface Props {
  rows: Record<string, string>[];
  columns?: ColumnMeta[];   // for human labels
  maxCols?: number;
}

export default function DataTable({ rows, columns, maxCols = 60 }: Props) {
  const labelMap = useMemo(() => {
    const m: Record<string, string> = {};
    columns?.forEach((c) => (m[c.column] = c.label));
    return m;
  }, [columns]);

  if (!rows.length) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-gray-500 dark:text-gray-400">
        No results
      </div>
    );
  }

  // Derive columns from first row, capped at maxCols
  const keys = Object.keys(rows[0]).slice(0, maxCols);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left text-xs text-gray-600 dark:text-gray-300">
        <thead className="sticky top-0 bg-gray-50 text-xs uppercase tracking-wider text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          <tr>
            {keys.map((k) => (
              <th
                key={k}
                title={k}
                className="whitespace-nowrap border-b border-gray-200 px-3 py-2 font-semibold dark:border-gray-700"
              >
                {labelMap[k] ?? k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {rows.map((row, i) => (
            <tr
              key={i}
              className="bg-white transition-colors hover:bg-blue-50 dark:bg-gray-900 dark:hover:bg-gray-800"
            >
              {keys.map((k) => (
                <td
                  key={k}
                  className="max-w-xs truncate whitespace-nowrap px-3 py-2"
                  title={row[k] ?? ""}
                >
                  {row[k] ?? <span className="text-gray-300 dark:text-gray-600"></span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
