interface Pagination {
  currentPage: number;
  lastPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}

interface SearchControlsProps {
  pagination: Pagination;
  sortBy: string;
  onSortChange: (value: string) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export function SearchControls({
  pagination,
  sortBy,
  onSortChange,
  onPreviousPage,
  onNextPage,
}: SearchControlsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-3 sm:p-4 z-10">
      <div className="container mx-auto px-4">
        {/* Mobile Layout: Stacked */}
        <div className="flex flex-col sm:hidden gap-3">
          {/* Sort Options */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Sort:</span>
            <div className="flex gap-1">
              <button
                onClick={() => onSortChange("default")}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  sortBy === "default"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Default
              </button>
              <button
                onClick={() => onSortChange("rating")}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  sortBy === "rating"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Rating
              </button>
              <button
                onClick={() => onSortChange("members")}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  sortBy === "members"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Members
              </button>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <button
              onClick={onPreviousPage}
              disabled={!pagination.hasPrev}
              className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <span className="text-white text-sm">
              {pagination.currentPage} of {pagination.lastPage}
            </span>

            <button
              onClick={onNextPage}
              disabled={!pagination.hasNext}
              className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Layout: Side by Side */}
        <div className="hidden sm:flex justify-between items-center">
          {/* Sort Options */}
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm">Sort by:</span>
            <div className="flex gap-2">
              <button
                onClick={() => onSortChange("default")}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  sortBy === "default"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Default
              </button>
              <button
                onClick={() => onSortChange("rating")}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  sortBy === "rating"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Rating
              </button>
              <button
                onClick={() => onSortChange("members")}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  sortBy === "members"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                Members
              </button>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={onPreviousPage}
              disabled={!pagination.hasPrev}
              className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <span className="text-white">
              {pagination.currentPage} of {pagination.lastPage}
            </span>

            <button
              onClick={onNextPage}
              disabled={!pagination.hasNext}
              className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
