interface SearchHistoryProps {
  searchHistory: string[];
  onHistoryClick: (query: string) => void;
  onClearHistory: () => void;
}

export function SearchHistory({
  searchHistory,
  onHistoryClick,
  onClearHistory,
}: SearchHistoryProps) {
  if (searchHistory.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16">
        <div className="text-center text-slate-400 py-16">
          <p className="text-lg">Start typing to search for an anime</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-16">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Searches</h3>
          <button
            onClick={onClearHistory}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Clear All
          </button>
        </div>
        <div className="space-y-2">
          {searchHistory.map((historyQuery, index) => (
            <button
              key={index}
              onClick={() => onHistoryClick(historyQuery)}
              className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="text-slate-300 group-hover:text-white">
                  {historyQuery}
                </span>
                <svg
                  className="w-4 h-4 text-slate-500 group-hover:text-slate-300"
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
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
