import { useState } from "react";
import ComparePage from "./pages/ComparePage";
import SchoolProfilePage from "./pages/SchoolProfilePage";
import DatasetsPage from "./pages/DatasetsPage";
import { getParam, setParams } from "./utils/urlState";

type Page = "compare" | "profile" | "datasets";

const NAV: { key: Page; label: string }[] = [
  { key: "compare", label: "Compare" },
  { key: "profile", label: "School Profile" },
  { key: "datasets", label: "Datasets" },
];

function initialPage(): Page {
  const p = getParam("page");
  return (p === "profile" || p === "datasets") ? p : "compare";
}

export default function App() {
  const [page, setPage] = useState<Page>(initialPage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = (p: Page) => {
    setPage(p);
    setIsMobileMenuOpen(false);
    setParams({ page: p === "compare" ? null : p });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Top nav */}
      <header className="relative z-10 border-b border-gray-200 mx-6 md:mx-10">
        <div className="mx-auto flex items-center justify-between h-14 md:h-12">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M96 464v32c0 8.84 7.16 16 16 16h224c8.84 0 16-7.16 16-16V153.25c4.56-2 8.92-4.35 12.99-7.12l142.05 47.63c8.38 2.81 17.45-1.71 20.26-10.08l10.17-30.34c2.81-8.38-1.71-17.45-10.08-20.26l-128.4-43.05c.42-3.32 1.01-6.6 1.01-10.03 0-44.18-35.82-80-80-80-29.69 0-55.3 16.36-69.11 40.37L132.96.83c-8.38-2.81-17.45 1.71-20.26 10.08l-10.17 30.34c-2.81 8.38 1.71 17.45 10.08 20.26l132 44.26c7.28 21.25 22.96 38.54 43.38 47.47V448H112c-8.84 0-16 7.16-16 16zM0 304c0 44.18 57.31 80 128 80s128-35.82 128-80h-.02c0-15.67 2.08-7.25-85.05-181.51-17.68-35.36-68.22-35.29-85.87 0C-1.32 295.27.02 287.82.02 304H0zm56-16l72-144 72 144H56zm328.02 144H384c0 44.18 57.31 80 128 80s128-35.82 128-80h-.02c0-15.67 2.08-7.25-85.05-181.51-17.68-35.36-68.22-35.29-85.87 0-86.38 172.78-85.04 165.33-85.04 181.51zM440 416l72-144 72 144H440z" />
            </svg>
            <span className="text- tracking-normal font-medium hidden sm:inline">
              Compare 509 Data
            </span>
            <span className="tracking-normal font-medium sm:hidden">
              509 Data
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => navigate(n.key)}
                className={`relative transition-all duration-300 after:content-[''] after:absolute after:w-full after:h-[2px] after:-bottom-[12px] after:left-0 after:bg-gray-900 after:transition-transform after:duration-300 ${page === n.key
                    ? " text-gray-900 after:scale-x-100 after:origin-bottom-left"
                    : "text-gray-900 after:scale-x-0 after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left"
                  }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center">
            <button 
              className="p-2 -mr-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-3 border-t border-gray-100 flex flex-col gap-1 absolute left-0 right-0 bg-[#FDFDFD] shadow-lg z-50 rounded-b-lg top-full">
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => navigate(n.key)}
                className={`text-left px-6 py-3 transition-colors ${
                  page === n.key 
                    ? "bg-gray-50 text-gray-900 font-semibold border-l-4 border-gray-900" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Page content */}
      <main className="mx-auto py-7" style={{
        
        minHeight: "100vh",
      }}>
        {page === "compare" && <ComparePage />}
        <div className="mx-auto px-6">
          {page === "profile" && <SchoolProfilePage />}
          {page === "datasets" && <DatasetsPage />}
        </div>
      </main>
    </div>
  );
}
