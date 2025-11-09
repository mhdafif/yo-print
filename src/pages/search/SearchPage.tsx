import useSearch from "../../features/search/useSearch";
import { SearchHeader } from "../../features/search/components/SearchHeader";
import { SearchInput } from "../../features/search/components/SearchInput";
import { SearchHistory } from "../../features/search/components/SearchHistory";
import { SearchResults } from "../../features/search/components/SearchResults";
import { SearchControls } from "../../features/search/components/SearchControls";
import { StickySearchBar } from "../../features/search/components/StickySearchBar";

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
        <SearchHeader />

        <SearchInput
          searchInput={searchInput}
          isSearchFocused={isSearchFocused}
          onInputChange={handleInputChange}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onClearSearch={handleClearSearch}
        />

        {searchInput.trim().length < 3 && !isLoading && (
          <SearchHistory
            searchHistory={searchHistory}
            onHistoryClick={handleHistoryClick}
            onClearHistory={handleClearHistory}
          />
        )}

        {/* Only show search-related content when there's an active search with 3+ characters */}
        {searchInput.trim().length >= 3 && (
          <>
            <SearchResults
              results={results}
              searchInput={searchInput}
              isLoading={isLoading}
              error={error}
            />

            {/* Sticky bottom bar with sort and pagination */}
            {results.length > 0 && (
              <SearchControls
                pagination={pagination}
                sortBy={sortBy}
                onSortChange={handleSortChange}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
              />
            )}
          </>
        )}
      </div>

      {/* Sticky Floating Search Bar */}
      {showStickySearch && (
        <StickySearchBar
          searchInput={searchInput}
          isSearchFocused={isSearchFocused}
          onInputChange={handleInputChange}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onClearSearch={handleClearSearch}
        />
      )}
    </div>
  );
}
