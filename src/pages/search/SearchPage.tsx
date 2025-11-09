import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setQuery, setPage, setSortBy, addToSearchHistory, clearSearchHistory, fetchAnimeList, clearError } from '../../features/anime/animeSearchSlice'
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch'
import { useAbortController } from '../../hooks/useAbortController'
import { AnimeCard } from '../../components/anime/AnimeCard'
import { SkeletonCard } from '../../components/ui/SkeletonCard'

export function SearchPage() {
  const dispatch = useAppDispatch()
  const { query, page, sortBy, results, pagination, isLoading, error, searchHistory } = useAppSelector(
    (state: any) => state.animeSearch
  )
  const [searchParams] = useSearchParams()

  const [searchInput, setSearchInput] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const debouncedQuery = useDebouncedSearch(searchInput, 250)
  const { newAbortController, cleanup } = useAbortController()

  // Track when to fetch data (initial search or pagination)
  const shouldFetch = useRef(false)
  const hasInitializedFromURL = useRef(false)

  // Initialize from URL parameters on mount
  useEffect(() => {
    if (!hasInitializedFromURL.current) {
      const urlQuery = searchParams.get('q')
      if (urlQuery && urlQuery.trim().length >= 3) {
        setSearchInput(urlQuery)
        dispatch(setQuery(urlQuery))
        dispatch(setPage(1))
        shouldFetch.current = true
        hasInitializedFromURL.current = true
      }
    }
  }, [searchParams, dispatch])

  useEffect(() => {
    if (debouncedQuery.trim().length >= 3) {
      dispatch(setQuery(debouncedQuery))
      dispatch(setPage(1))
      shouldFetch.current = true

      // Update URL when user searches
      const url = new URL(window.location.href)
      if (debouncedQuery.trim()) {
        url.searchParams.set('q', debouncedQuery)
      } else {
        url.searchParams.delete('q')
      }
      window.history.replaceState({}, '', url.toString())
    } else {
      dispatch(clearError())
      shouldFetch.current = false

      // Remove URL parameter when search is too short
      const url = new URL(window.location.href)
      url.searchParams.delete('q')
      window.history.replaceState({}, '', url.toString())
    }
  }, [debouncedQuery, dispatch])

  useEffect(() => {
    if (shouldFetch.current && query.trim().length >= 3) {
      const controller = newAbortController()
      dispatch(fetchAnimeList({ query, page, sortBy, signal: controller.signal }))
        .unwrap()
        .then(() => {
          // Add to search history only on successful search
          dispatch(addToSearchHistory(query))
        })
        .catch(() => {
          // Error is handled in the slice
        })
        .finally(() => {
          shouldFetch.current = false
        })

      return cleanup
    }
  }, [page, query, sortBy, dispatch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleClearSearch = () => {
    setSearchInput('')
    dispatch(clearError())
    // Clear URL parameter
    const url = new URL(window.location.href)
    url.searchParams.delete('q')
    window.history.replaceState({}, '', url.toString())
  }

  const handleSortChange = (newSortBy: 'rating' | 'members' | 'default') => {
    dispatch(setSortBy(newSortBy))
    dispatch(setPage(1))
    shouldFetch.current = true
    // Scroll to top when sort changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleHistoryClick = (historyQuery: string) => {
    setSearchInput(historyQuery)
    setIsSearchFocused(false)
  }

  const handleClearHistory = () => {
    dispatch(clearSearchHistory())
  }

  const handlePreviousPage = () => {
    if (pagination.hasPrev) {
      dispatch(setPage(page - 1))
      shouldFetch.current = true
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNextPage = () => {
    if (pagination.hasNext) {
      dispatch(setPage(page + 1))
      shouldFetch.current = true
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

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
              className="w-full px-4 py-3 pr-12 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
            {searchInput && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Show requirement text only when focused and less than 3 characters */}
          {isSearchFocused && searchInput.length > 0 && searchInput.length < 3 && (
            <p className="text-slate-500 text-sm mt-2 ml-1">
              Type at least 3 characters to search
            </p>
          )}
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
              <p>{error}</p>
            </div>
          </div>
        )}

        {!searchInput.trim() && !isLoading && (
          <div className="max-w-2xl mx-auto py-16">
            {searchHistory.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-white">Recent Searches</h3>
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

        {/* Only show search-related content when there's an active search */}
        {searchInput.trim() && (
          <>
            {searchInput.trim() && !isLoading && results.length === 0 && !error && (
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
                {results.map((anime: any) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Only show search-related content when there's an active search */}
        {searchInput.trim() && (
          <>
            {searchInput.trim() && !isLoading && results.length === 0 && !error && (
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
                {results.map((anime: any) => (
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
                          onClick={() => handleSortChange('default')}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            sortBy === 'default'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          Default
                        </button>
                        <button
                          onClick={() => handleSortChange('rating')}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            sortBy === 'rating'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          Rating
                        </button>
                        <button
                          onClick={() => handleSortChange('members')}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            sortBy === 'members'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
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
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                          onClick={() => handleSortChange('default')}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                            sortBy === 'default'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          Default
                        </button>
                        <button
                          onClick={() => handleSortChange('rating')}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                            sortBy === 'rating'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          Rating
                        </button>
                        <button
                          onClick={() => handleSortChange('members')}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                            sortBy === 'members'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
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
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
    </div>
  )
}