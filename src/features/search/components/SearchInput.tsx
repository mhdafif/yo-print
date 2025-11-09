import React from "react";

interface SearchInputProps {
  searchInput: string;
  isSearchFocused: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClearSearch: () => void;
}

export function SearchInput({
  searchInput,
  isSearchFocused,
  onInputChange,
  onFocus,
  onBlur,
  onClearSearch,
}: SearchInputProps) {
  return (
    <div className="max-w-2xl mx-auto mb-4">
      <div className="relative">
        <input
          type="text"
          value={searchInput}
          onChange={onInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Search for anime..."
          className="w-full px-4 py-3 pr-12 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-[2] relative"
        />
        {searchInput && (
          <button
            onClick={onClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700 z-[2]"
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5"
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

        {/* Absolute positioned requirement text with border */}
        {isSearchFocused &&
          searchInput.length > 0 &&
          searchInput.length < 3 && (
            <div className="absolute top-[70%] left-0 right-0 mt-2 p-3 bg-slate-800 border border-slate-700 rounded-b-lg z-[1] shadow-lg">
              <p className="text-slate-400 text-sm">
                Type at least 3 characters to search
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
