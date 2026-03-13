import { fmtPct, titleCase } from "../utils/compareHelpers";
import { useRowHover } from "../context/RowHoverContext";
import { useRowExpand } from "../context/RowExpandContext";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";

// ---------------------------------------------------------------------------
// Shared hover wiring helper
// ---------------------------------------------------------------------------

function useHoverRow(rowKey: string, highlightColor: string) {
  const { hoveredKey, setHoveredKey } = useRowHover();
  const isHovered = hoveredKey === rowKey;
  const bg = isHovered ? `${highlightColor}18` : undefined;
  const handlers = {
    onMouseEnter: () => setHoveredKey(rowKey),
    onMouseLeave: () => setHoveredKey(null),
  };
  return { isHovered, bg, handlers };
}

// ---------------------------------------------------------------------------
// ValueRow
// ---------------------------------------------------------------------------

export function ValueRow({
  label,
  value,
  signed,
  rowKey,
  highlightColor = "transparent",
}: {
  label: string;
  value: string;
  signed?: boolean;
  rowKey: string;
  highlightColor?: string;
}) {
  const { bg, handlers } = useHoverRow(rowKey, highlightColor);
  let display = value;

  if (signed && value !== "—") {
    const n = parseFloat(value);
    if (!isNaN(n)) {
      if (n > 0) { display = `+${value}`; }
    }
  }

  return (
    <div
      className="flex justify-between items-baseline py-1.5 border-b border-gray-200 last:border-0 px-1 -mx-1 transition-colors duration-100"
      style={{ backgroundColor: bg }}
      {...handlers}
    >
      <span className="text-sm text-gray-800 pr-3">{label}</span>
      <span className="text-sm font-medium text-gray-900 shrink-0">{display}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PctRow
// ---------------------------------------------------------------------------

export function PctRow({
  label,
  pct,
  hasData,
  raw,
  rowKey,
  highlightColor = "transparent",
}: {
  label: string;
  pct: number;
  hasData: boolean;
  raw: number;
  rowKey: string;
  highlightColor?: string;
}) {
  const { bg, handlers } = useHoverRow(rowKey, highlightColor);
  const rawDisplay = Number.isInteger(raw) ? raw : parseFloat(raw.toFixed(1));

  return (
    <div
      className="flex justify-between items-baseline py-1.5 border-b border-gray-200 last:border-0 px-1 -mx-1 transition-colors duration-100"
      style={{ backgroundColor: bg }}
      {...handlers}
    >
      <span className="text-sm text-gray-800 pr-3 tracking-tight">{label}</span>
      <span className="text-sm font-medium text-gray-900 shrink-0">
        {hasData ? (
          <>
            {fmtPct(pct)}
            <span className="ml-1.5 text-xs text-gray-500 font-normal">({rawDisplay})</span>
          </>
        ) : (
          "—"
        )}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PctGroupRow  (sum of all breakdown keys, expandable to show each)
// ---------------------------------------------------------------------------

export function PctGroupRow({
  label,
  totalPct,
  totalRaw,
  hasData,
  breakdown,
  rowKey,
  highlightColor = "transparent",
}: {
  label: string;
  totalPct: number;
  totalRaw: number;
  hasData: boolean;
  breakdown: { label: string; pct: number; raw: number; hasData: boolean }[];
  rowKey: string;
  highlightColor?: string;
}) {
  const { expandedKeys, toggle } = useRowExpand();
  const expanded = expandedKeys.has(rowKey);
  const { bg, handlers } = useHoverRow(rowKey, highlightColor);
  const rawDisplay = Number.isInteger(totalRaw) ? totalRaw : parseFloat(totalRaw.toFixed(1));

  return (
    <div
      className="py-1.5 border-b border-gray-200 last:border-0 px-1 -mx-1 transition-colors duration-100"
      style={{ backgroundColor: bg }}
      {...handlers}
    >
      <div className="flex justify-between items-baseline">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-sm text-gray-800 tracking-tight">{label}</span>
          <button
            onClick={() => toggle(rowKey)}
            className="text-xs text-gray-700 hover:text-gray-500 shrink-0 transition-colors px-1"
            title={expanded ? "Collapse" : "Show Full-Time/Part-Time breakdown"}
          >
            {expanded ? <PiCaretUpBold size={16} /> : <PiCaretDownBold size={16} />}
          </button>
        </div>
        <span className="text-sm font-medium text-gray-900 shrink-0 ml-2">
          {hasData ? (
            <>
              {fmtPct(totalPct)}
              <span className="ml-1.5 text-xs text-gray-500 font-normal">({rawDisplay})</span>
            </>
          ) : "—"}
        </span>
      </div>

      {expanded && (
        <div className="mt-1 ml-2 border-l-2 border-gray-200 pl-2">
          {breakdown.map((b, i) => {
            const r = Number.isInteger(b.raw) ? b.raw : parseFloat(b.raw.toFixed(1));
            return (
              <div key={i} className="flex justify-between items-baseline py-0.5 border-b border-gray-100 last:border-0">
                <span className="text-xs text-gray-500">{b.label}</span>
                <span className="text-xs font-medium text-gray-700 shrink-0 ml-2">
                  {b.hasData ? (
                    <>
                      {fmtPct(b.pct)}
                      <span className="ml-1 text-xs text-gray-400 font-normal">({r})</span>
                    </>
                  ) : "—"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// RangeRow
// ---------------------------------------------------------------------------

export function RangeRow({
  label,
  p25,
  p50,
  p75,
  rowKey,
  highlightColor = "transparent",
}: {
  label: string;
  p25: string;
  p50: string;
  p75: string;
  rowKey: string;
  highlightColor?: string;
}) {
  const { bg, handlers } = useHoverRow(rowKey, highlightColor);
  const clean = (v: string) => {
    if (v === "—") return v;
    const n = parseFloat(v);
    if (isNaN(n)) return v;
    return Number.isInteger(n) ? String(n) : v;
  };
  return (
    <div
      className="py-1.5 border-b border-gray-200 last:border-0 px-1 -mx-1 transition-colors duration-100"
      style={{ backgroundColor: bg }}
      {...handlers}
    >
      <div className="text-sm text-gray-800 mb-0.5 tracking-tight">{label}</div>
      <div className="flex gap-3 text-sm">
        <span className="text-gray-500 text-xs">
          25th <span className="font-medium text-gray-800">{clean(p25)}</span>
        </span>
        <span className="text-gray-500 text-xs">
          Med <span className="font-medium text-gray-800">{clean(p50)}</span>
        </span>
        <span className="text-gray-500 text-xs">
          75th <span className="font-medium text-gray-800">{clean(p75)}</span>
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// StatesRow
// ---------------------------------------------------------------------------

export function StatesRow({
  states,
  rowKey,
  highlightColor = "transparent",
}: {
  states: { name: string; pct: number; count: number }[];
  rowKey: string;
  highlightColor?: string;
}) {
  const { bg, handlers } = useHoverRow(rowKey, highlightColor);
  const filled = states.filter((s) => s.name !== "—");
  if (!filled.length) {
    return (
      <div
        className="py-1.5 border-b border-gray-200 px-1 -mx-1 transition-colors duration-100"
        style={{ backgroundColor: bg }}
        {...handlers}
      >
        <span className="text-sm text-gray-800">Top States</span>
        <span className="text-sm text-gray-300 ml-2">—</span>
      </div>
    );
  }
  return (
    <div
      className="py-1.5 border-b border-gray-200 last:border-0 px-1 -mx-1 transition-colors duration-100"
      style={{ backgroundColor: bg }}
      {...handlers}
    >
      <div className="text-sm text-gray-800 mb-1.5 tracking-tight">Top States</div>
      <div className="space-y-0.5">
        {filled.map((s, i) => (
          <div key={i} className="flex justify-between items-baseline">
            <span className="text-sm text-gray-700">{titleCase(s.name)}</span>
            <span className="text-sm font-medium text-gray-900 shrink-0 ml-4">
              {fmtPct(s.pct)}
              <span className="ml-1.5 text-xs text-gray-500 font-normal">({s.count})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PctStoredRow
// ---------------------------------------------------------------------------

export function PctStoredRow({
  label,
  pctValue,
  rawValue,
  rowKey,
  highlightColor = "transparent",
}: {
  label: string;
  pctValue: string;
  rawValue: number | null;
  rowKey: string;
  highlightColor?: string;
}) {
  const { bg, handlers } = useHoverRow(rowKey, highlightColor);
  const numericPct = pctValue !== "—" ? parseFloat(pctValue) : null;
  const display = numericPct !== null ? numericPct.toFixed(1) + "%" : "—";

  return (
    <div
      className="flex justify-between items-baseline py-1.5 border-b border-gray-200 last:border-0 px-1 -mx-1 transition-colors duration-100"
      style={{ backgroundColor: bg }}
      {...handlers}
    >
      <span className="text-sm text-gray-800 pr-3 tracking-tight">{label}</span>
      <span className="text-sm font-medium text-gray-900 shrink-0">
        {display}
        {rawValue !== null && pctValue !== "—" && (
          <span className="ml-1.5 text-xs text-gray-400 font-normal">({rawValue})</span>
        )}
      </span>
    </div>
  );
}

// re-export helpers so importers only need this one file
export { fmt, fmtPct, titleCase, toNum, displayName } from "../utils/compareHelpers";
