import { SECTIONS } from "../types/compareTypes";
import type { SchoolData } from "../types/compareTypes";
import {
  ValueRow,
  PctRow,
  PctGroupRow,
  RangeRow,
  StatesRow,
  PctStoredRow,
  fmt,
  toNum,
  displayName,
} from "./StatRows";
import { getBranding } from "../data/schoolBranding";
import { PiXBold } from "react-icons/pi";

interface Props {
  name: string;
  dataByDataset: Record<string, SchoolData | null>;
  year: string;
  onRemove: () => void;
  canRemove: boolean;
  loading: boolean;
}

export default function SchoolCard({
  name,
  dataByDataset,
  year,
  onRemove,
  canRemove,
  loading,
}: Props) {
  const schoolDisplayName = displayName(name);
  const branding = getBranding(name);

  return (
    <div
      className="w-full mx-auto md:w-[450px] rounded-xl overflow-hidden flex flex-col"
      style={{
        border: "2px solid transparent",
        background: `
          linear-gradient(white, white) padding-box,
          linear-gradient(95deg, ${branding.secondary} 45%, ${branding.primary} 55%) border-box
        `,
        boxShadow: "0 0 4px 0px rgba(0,0,0,0.1), 0 0 32px 0 rgba(0,0,0,0.12)",
      }}
    >
      <div
        className="p-4 flex flex-col gap-5"
        style={{
          background: `linear-gradient(95deg, ${branding.secondary}20 20%, ${branding.primary}10 75%)`,
          borderColor: `${branding.secondary}22`,
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center gap-3">
          {/* Seal / monogram */}
          {branding.sealUrl ? (
            <img
              src={branding.sealUrl}
              alt={`${schoolDisplayName} seal`}
              className="w-14 h-14 object-contain shrink-0 rounded-full bg-white"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = "none";
                el.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${branding.sealUrl ? "hidden" : ""}`}
            style={{ background: `${branding.secondary}18`, color: branding.secondary }}
          >
            {schoolDisplayName.split(" ").filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3
                className="font-bold text-base leading-snug"
              >
                {schoolDisplayName}
              </h3>
              {canRemove && (
                <button
                  onClick={onRemove}
                  className={`shrink-0 mt-0.5 p-1 rounded-lg text-gray-600 hover:text-gray-800 transition-colors text-xl leading-none`}
                  style={{ background: `${branding.secondary}10` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${branding.secondary}28`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${branding.secondary}10`;
                  }}
                  aria-label="Remove school"
                >
                  <PiXBold size={16} className="" />
                </button>
              )}
            </div>
            {year && (
              <div className="text-xs text-gray-600">
                Class of {year}
              </div>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1 space-y-5">
          {SECTIONS.map((section) => {
            const data = dataByDataset[section.dataset];
            return (
              <div key={section.heading} className={` p-3 rounded-lg ${loading ? "animate-pulse bg-gray-50" : "bg-white/60"}`}>
                <div className="text-xs font-semibold uppercase mb-1" style={{ color: `${branding.secondary}` }}>
                  {section.heading}
                </div>
                {loading ? <div className="text-sm text-gray-300 py-2"></div> : !data ? (
                  <div className="text-sm text-gray-300 py-2">No data</div>
                ) : (
                  <div>
                    {section.rows.map((stat, i) => {
                      const rowKey = `${section.heading}__${i}`;
                      const hi = branding.primary;
                      if (stat.type === "value") {
                        return <ValueRow key={i} label={stat.label} value={fmt(data[stat.key])} signed={stat.signed} rowKey={rowKey} highlightColor={hi} />;
                      }
                      if (stat.type === "pct") {
                        const num = toNum(data[stat.numKey]);
                        const denomData = stat.denomDataset
                          ? dataByDataset[stat.denomDataset]
                          : data;
                        const denom = toNum(denomData?.[stat.denomKey]);
                        const pct = denom > 0 ? (num / denom) * 100 : 0;
                        return (
                          <PctRow
                            key={i}
                            label={stat.label}
                            pct={pct}
                            hasData={denom > 0}
                            raw={num}
                            rowKey={rowKey}
                            highlightColor={hi}
                          />
                        );
                      }
                      if (stat.type === "pct-group") {
                        const denomData = stat.denomDataset
                          ? dataByDataset[stat.denomDataset]
                          : data;
                        const denom = toNum(denomData?.[stat.denomKey]);
                        const breakdown = stat.breakdown.map((b) => {
                          const bNum = toNum(data[b.numKey]);
                          const bPct = denom > 0 ? (bNum / denom) * 100 : 0;
                          return { label: b.label, pct: bPct, raw: bNum, hasData: denom > 0 };
                        });
                        const totalRaw = breakdown.reduce((sum, b) => sum + b.raw, 0);
                        const totalPct = denom > 0 ? (totalRaw / denom) * 100 : 0;
                        return (
                          <PctGroupRow
                            key={i}
                            label={stat.label}
                            totalPct={totalPct}
                            totalRaw={totalRaw}
                            hasData={denom > 0}
                            breakdown={breakdown}
                            rowKey={rowKey}
                            highlightColor={hi}
                          />
                        );
                      }
                      if (stat.type === "pct-stored") {
                        const v = fmt(data[stat.key]);
                        const rawV = stat.rawKey ? toNum(data[stat.rawKey]) : null;
                        return (
                          <PctStoredRow key={i} label={stat.label} pctValue={v} rawValue={rawV} rowKey={rowKey} highlightColor={hi} />
                        );
                      }
                      if (stat.type === "range") {
                        return (
                          <RangeRow
                            key={i}
                            label={stat.label}
                            p25={fmt(data[stat.p25])}
                            p50={fmt(data[stat.p50])}
                            p75={fmt(data[stat.p75])}
                            rowKey={rowKey}
                            highlightColor={hi}
                          />
                        );
                      }
                      if (stat.type === "states") {
                        const denom = toNum(data[stat.denomKey]);
                        const states = stat.keys.map((k, si) => ({
                          name: fmt(data[k]),
                          count: toNum(data[stat.numKeys[si]]),
                          pct:
                            denom > 0
                              ? (toNum(data[stat.numKeys[si]]) / denom) * 100
                              : 0,
                        }));
                        return <StatesRow key={i} states={states} rowKey={rowKey} highlightColor={hi} />;
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
