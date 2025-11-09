import { AnimeCard } from "../../components/anime/AnimeCard";
import { SkeletonCard } from "../../components/ui/SkeletonCard";
import useSearch from "../../features/search/useSearch";

export function SearchPage() {
  const {
    searchInput,
    isSearchFocused,
    showStickySearch,
    results,
    pagination,
    isLoading,
    error,
    searchHistory,
    sortBy,
    handleInputChange,
    handleClearSearch,
    handleSortChange,
    handleHistoryClick,
    handleClearHistory,
    handlePreviousPage,
    handleNextPage,
    setIsSearchFocused,
  } = useSearch();

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Anime Search</h1>
          <p className="text-slate-400">Search for your favorite anime</p>
        </header>

        <div className="max-w-2xl mx-auto mb-4">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search for anime..."
              className="w-full px-4 py-3 pr-12 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-[2] relative"
            />
            {searchInput && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700"
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

        {error && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
              <p>{error}</p>
            </div>
          </div>
        )}

        {searchInput.trim().length < 3 && !isLoading && (
          <div className="max-w-2xl mx-auto py-16">
            {searchHistory.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-white">
                    Recent Searches
                  </h3>
                  <button
                    onClick={handleClearHistory}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2">
                  {searchHistory.map((historyQuery, index) => (
                    <button
                      key={index}
                      onClick={() => handleHistoryClick(historyQuery)}
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
            ) : (
              <div className="text-center text-slate-400 py-16">
                <p className="text-lg">Start typing to search for an anime</p>
              </div>
            )}
          </div>
        )}

        {/* Only show search-related content when there's an active search with 3+ characters */}
        {searchInput.trim().length >= 3 && (
          <>
            {searchInput.trim() &&
              !isLoading &&
              results.length === 0 &&
              !error && (
                <div className="text-center text-slate-400 py-16">
                  <p className="text-lg">No anime found for '{searchInput}'</p>
                </div>
              )}

            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                {Array.from({ length: 20 }).map((_, index) => (
                  <SkeletonCard key={`skeleton-${index}`} />
                ))}
              </div>
            )}

            {results.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-24">
                {results.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            )}

            {/* Sticky bottom bar with sort and pagination */}
            {results.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-3 sm:p-4 z-10">
                <div className="container mx-auto px-4">
                  {/* Mobile Layout: Stacked */}
                  <div className="flex flex-col sm:hidden gap-3">
                    {/* Sort Options */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Sort:</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleSortChange("default")}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            sortBy === "default"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          }`}
                        >
                          Default
                        </button>
                        <button
                          onClick={() => handleSortChange("rating")}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            sortBy === "rating"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          }`}
                        >
                          Rating
                        </button>
                        <button
                          onClick={() => handleSortChange("members")}
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
                        onClick={handlePreviousPage}
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
                        {pagination.currentPage} / {pagination.lastPage}
                      </span>

                      <button
                        onClick={handleNextPage}
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
                          onClick={() => handleSortChange("default")}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                            sortBy === "default"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          }`}
                        >
                          Default
                        </button>
                        <button
                          onClick={() => handleSortChange("rating")}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                            sortBy === "rating"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          }`}
                        >
                          Rating
                        </button>
                        <button
                          onClick={() => handleSortChange("members")}
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
                        onClick={handlePreviousPage}
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
                        Page {pagination.currentPage} of {pagination.lastPage}
                      </span>

                      <button
                        onClick={handleNextPage}
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
            )}
          </>
        )}
      </div>

      {/* Sticky Floating Search Bar */}
      {showStickySearch && (
        <div className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-40 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleInputChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search for anime..."
                  className="w-full px-4 py-2 pr-12 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />
                {searchInput && (
                  <button
                    onClick={handleClearSearch}
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
      )}
    </div>
  );
}
