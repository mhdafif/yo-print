import React from "react";

interface StickySearchBarProps {
  searchInput: string;
  isSearchFocused: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClearSearch: () => void;
}

export function StickySearchBar({
  searchInput,
  onInputChange,
  onFocus,
  onBlur,
  onClearSearch,
}: StickySearchBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-40 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={onInputChange}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="Search for anime..."
              className="w-full px-4 py-2 pr-12 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
            {searchInput && (
              <button
                onClick={onClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700"
                aria-label="Clear search"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
