import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AnimeSummary, JikanResponse, Pagination } from "../../types/anime";

interface AnimeSearchState {
  query: string;
  page: number;
  sortBy: "rating" | "members" | "default";
  results: AnimeSummary[];
  pagination: Pagination;
  isLoading: boolean;
  error: string | null;
  searchHistory: string[];
}

// Load search history from localStorage
const loadSearchHistory = (): string[] => {
  try {
    const saved = localStorage.getItem("anime-search-history");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: AnimeSearchState = {
  query: "",
  page: 1,
  sortBy: "default",
  results: [],
  pagination: {
    currentPage: 1,
    lastPage: 1,
    total: 0,
    hasNext: false,
    hasPrev: false,
  },
  isLoading: false,
  error: null,
  searchHistory: loadSearchHistory(),
};

export const fetchAnimeList = createAsyncThunk(
  "animeSearch/fetchAnimeList",
  async (
    {
      query,
      page,
      sortBy,
      signal,
    }: {
      query: string;
      page: number;
      sortBy: "rating" | "members" | "default";
      signal?: AbortSignal;
    },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: "20",
      });

      // Add sort parameters
      if (sortBy === "rating") {
        params.append("order_by", "score");
        params.append("sort", "desc");
      } else if (sortBy === "members") {
        params.append("order_by", "members");
        params.append("sort", "desc");
      }

      const response = await axios.get<JikanResponse<AnimeSummary>>(
        `https://api.jikan.moe/v4/anime?${params}`,
        { signal }
      );

      const paginationData = response.data.pagination;
      const pagination: Pagination = {
        currentPage: paginationData.current_page,
        lastPage: paginationData.last_visible_page,
        total: paginationData.items.total,
        hasNext: paginationData.has_next_page,
        hasPrev: paginationData.current_page > 1,
      };

      return {
        data: response.data.data,
        pagination,
      };
    } catch (error) {
      if (axios.isCancel(error)) {
        return rejectWithValue("Request cancelled");
      }

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 429) {
          return rejectWithValue(
            "The anime API is currently busy. Please try again in a moment."
          );
        }
        if (status && status >= 500) {
          return rejectWithValue(
            "The anime API is experiencing issues. Please try again later."
          );
        }
        if (status === 404) {
          return rejectWithValue("No anime found matching your search.");
        }
        return rejectWithValue(
          "Failed to fetch anime data. Please check your connection."
        );
      }

      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

export const animeSearchSlice = createSlice({
  name: "animeSearch",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<"rating" | "members" | "default">
    ) => {
      state.sortBy = action.payload;
    },
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (query && query.length >= 3) {
        // Remove if already exists
        state.searchHistory = state.searchHistory.filter(
          (item) => item !== query
        );
        // Add to beginning
        state.searchHistory.unshift(query);
        // Keep only last 5
        state.searchHistory = state.searchHistory.slice(0, 5);

        // Save to localStorage
        try {
          localStorage.setItem(
            "anime-search-history",
            JSON.stringify(state.searchHistory)
          );
        } catch {
          // Ignore localStorage errors
        }
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
      try {
        localStorage.removeItem("anime-search-history");
      } catch {
        // Ignore localStorage errors
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAnimeList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchAnimeList.rejected, (state, action) => {
        state.isLoading = false;
        // Don't show error for cancelled requests
        if (action.payload !== "Request cancelled") {
          state.error = action.payload as string;
        }
      });
  },
});

export const {
  setQuery,
  setPage,
  setSortBy,
  addToSearchHistory,
  clearSearchHistory,
  clearError,
} = animeSearchSlice.actions;
