import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface RowHoverContextValue {
  hoveredKey: string | null;
  setHoveredKey: (key: string | null) => void;
}

const RowHoverContext = createContext<RowHoverContextValue>({
  hoveredKey: null,
  setHoveredKey: () => {},
});

export function RowHoverProvider({ children }: { children: ReactNode }) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  return (
    <RowHoverContext.Provider value={{ hoveredKey, setHoveredKey }}>
      {children}
    </RowHoverContext.Provider>
  );
}

export function useRowHover() {
  return useContext(RowHoverContext);
}
