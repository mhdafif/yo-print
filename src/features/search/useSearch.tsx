import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setQuery,
  setPage,
  setSortBy,
  addToSearchHistory,
  clearSearchHistory,
  fetchAnimeList,
  clearError,
} from "../anime/animeSearchSlice";
import { useDebouncedSearch } from "../../hooks/useDebouncedSearch";
import { AnimeSummary } from "../../types/anime";

interface UseSearchReturn {
  /*======================== Props ======================== */
  searchInput: string;
  isSearchFocused: boolean;
  showStickySearch: boolean;

  /*======================== Store ======================== */
  query: string;
  page: number;
  sortBy: "rating" | "members" | "default";
  results: AnimeSummary[];
  pagination: {
    currentPage: number;
    lastPage: number;
    hasPrev: boolean;
    hasNext: boolean;
  };
  isLoading: boolean;
  error: string | null;
  searchHistory: string[];

  /*======================== Handler ======================== */
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
  handleSortChange: (newSortBy: "rating" | "members" | "default") => void;
  handleHistoryClick: (historyQuery: string) => void;
  handleClearHistory: () => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  setIsSearchFocused: (focused: boolean) => void;
}

const useSearch = (): UseSearchReturn => {
  /*======================== Store ======================== */
  const dispatch = useAppDispatch();
  const {
    query,
    page,
    sortBy,
    results,
    pagination,
    isLoading,
    error,
    searchHistory,
  } = useAppSelector((state) => state.animeSearch);
  const [searchParams] = useSearchParams();

  /*======================== UseState ======================== */
  const [searchInput, setSearchInput] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showStickySearch, setShowStickySearch] = useState(false);

  /*======================== Hooks ======================== */
  const debouncedQuery = useDebouncedSearch(searchInput, 250);

  /*======================== Others ======================== */
  // Track when to fetch data (initial search or pagination)
  const shouldFetch = useRef(false);
  const hasInitializedFromURL = useRef(false);

  /*======================== UseEffect ======================== */
  // Handle scroll to show/hide sticky search
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const initialSearchPosition = 300; // Show sticky search after scrolling 300px
      setShowStickySearch(scrollY > initialSearchPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize from URL parameters on mount
  useEffect(() => {
    if (!hasInitializedFromURL.current) {
      const urlQuery = searchParams.get("q");
      if (urlQuery && urlQuery.trim().length >= 3) {
        setSearchInput(urlQuery);
        dispatch(setQuery(urlQuery));
        dispatch(setPage(1));
        shouldFetch.current = true;
        hasInitializedFromURL.current = true;
      }
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (debouncedQuery.trim().length >= 3) {
      dispatch(setQuery(debouncedQuery));
      dispatch(setPage(1));
      shouldFetch.current = true;

      // Update URL when user searches
      const url = new URL(window.location.href);
      if (debouncedQuery.trim()) {
        url.searchParams.set("q", debouncedQuery);
      } else {
        url.searchParams.delete("q");
      }
      window.history.replaceState({}, "", url.toString());
    } else {
      dispatch(clearError());
      shouldFetch.current = false;

      // Remove URL parameter when search is too short
      const url = new URL(window.location.href);
      url.searchParams.delete("q");
      window.history.replaceState({}, "", url.toString());
    }
  }, [debouncedQuery, dispatch]);

  useEffect(() => {
    if (shouldFetch.current && query.trim().length >= 3) {
      const abortController = new AbortController();

      dispatch(
        fetchAnimeList({ query, page, sortBy, signal: abortController.signal })
      )
        .unwrap()
        .then(() => {
          // Add to search history only on successful search
          dispatch(addToSearchHistory(query));
        })
        .catch(() => {
          // Error is handled in the slice
        })
        .finally(() => {
          shouldFetch.current = false;
        });

      // Cleanup function to abort request if component unmounts or dependencies change
      return () => {
        abortController.abort();
      };
    }
  }, [page, query, sortBy, dispatch]);

  /*======================== Handler ======================== */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    dispatch(clearError());
    // Clear URL parameter
    const url = new URL(window.location.href);
    url.searchParams.delete("q");
    window.history.replaceState({}, "", url.toString());
  };

  const handleSortChange = (newSortBy: "rating" | "members" | "default") => {
    dispatch(setSortBy(newSortBy));
    dispatch(setPage(1));
    shouldFetch.current = true;
    // Scroll to top when sort changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHistoryClick = (historyQuery: string) => {
    setSearchInput(historyQuery);
    setIsSearchFocused(false);
  };

  const handleClearHistory = () => {
    dispatch(clearSearchHistory());
  };

  const handlePreviousPage = () => {
    if (pagination.hasPrev) {
      dispatch(setPage(page - 1));
      shouldFetch.current = true;
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNext) {
      dispatch(setPage(page + 1));
      shouldFetch.current = true;
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /*======================== Return ======================== */
  return {
    searchInput,
    isSearchFocused,
    showStickySearch,
    query,
    page,
    sortBy,
    results,
    pagination,
    isLoading,
    error,
    searchHistory,
    handleInputChange,
    handleClearSearch,
    handleSortChange,
    handleHistoryClick,
    handleClearHistory,
    handlePreviousPage,
    handleNextPage,
    setIsSearchFocused,
  };
};

export default useSearch;
