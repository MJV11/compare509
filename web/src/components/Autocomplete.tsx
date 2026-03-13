import { useState, useEffect, useRef } from "react";

interface Props {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Autocomplete({
  options,
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: Props) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase())).slice(0, 12)
    : options.slice(0, 12);

  // Format display: "CALIFORNIA-DAVIS, UNIVERSITY OF" -> show as-is but also match title case
  const display = (name: string) => {
    // title-case for display
    return name
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <input
        type="text"
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
        placeholder={placeholder}
        value={query ? display(query) : query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (!e.target.value) onChange("");
        }}
        onFocus={() => setOpen(true)}
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg">
          {filtered.map((opt) => (
            <li
              key={opt}
              className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onMouseDown={() => {
                onChange(opt);
                setQuery(opt);
                setOpen(false);
              }}
            >
              {display(opt)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
