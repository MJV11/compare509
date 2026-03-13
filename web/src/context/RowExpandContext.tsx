import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

interface RowExpandContextValue {
  expandedKeys: Set<string>;
  toggle: (key: string) => void;
}

const RowExpandContext = createContext<RowExpandContextValue>({
  expandedKeys: new Set(),
  toggle: () => {},
});

export function RowExpandProvider({ children }: { children: ReactNode }) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const toggle = useCallback((key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  return (
    <RowExpandContext.Provider value={{ expandedKeys, toggle }}>
      {children}
    </RowExpandContext.Provider>
  );
}

export function useRowExpand() {
  return useContext(RowExpandContext);
}
