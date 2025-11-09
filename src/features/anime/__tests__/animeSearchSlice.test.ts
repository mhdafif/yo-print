import { configureStore } from "@reduxjs/toolkit";
import animeSearchSlice, {
  setQuery,
  setPage,
  setSortBy,
  addToSearchHistory,
  clearSearchHistory,
  clearError,
  fetchAnimeList,
} from "../animeSearchSlice";
import { AnimeSummary } from "../../../types/anime";

// Mock axios
vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockAnimeData: AnimeSummary[] = [
  {
    mal_id: 1,
    url: "https://myanimelist.net/anime/1",
    images: {
      jpg: {
        image_url: "https://example.com/image1.jpg",
        small_image_url: "https://example.com/small1.jpg",
        large_image_url: "https://example.com/large1.jpg",
      },
      webp: {
        image_url: "https://example.com/image1.webp",
        small_image_url: "https://example.com/small1.webp",
        large_image_url: "https://example.com/large1.webp",
      },
    },
    trailer: {
      youtube_id: "",
      url: "",
      embed_url: "",
    },
    approved: true,
    titles: [],
    title: "Test Anime",
    title_english: "Test Anime English",
    title_japanese: "テストアニメ",
    title_synonyms: [],
    type: "TV",
    source: "Manga",
    episodes: 12,
    status: "Completed",
    airing: false,
    aired: {
      from: "2023-01-01",
      to: "2023-03-01",
      prop: {
        from: { day: 1, month: 1, year: 2023 },
        to: { day: 1, month: 3, year: 2023 },
        string: "Jan 1, 2023 to Mar 1, 2023",
      },
    },
    duration: "24 min per ep",
    rating: "PG-13",
    score: 8.5,
    scored_by: 10000,
    rank: 100,
    popularity: 1000,
    members: 50000,
    favorites: 1000,
    synopsis: "Test synopsis",
    background: "",
    season: "winter",
    year: 2023,
    broadcast: {
      day: "Monday",
      time: "12:00",
      timezone: "Asia/Tokyo",
      string: "Mondays at 12:00 (JST)",
    },
    producers: [],
    licensors: [],
    studios: [],
    genres: [
      {
        mal_id: 1,
        type: "anime",
        name: "Action",
        url: "https://myanimelist.net/anime/genre/1/Action",
      },
    ],
    explicit_genres: [],
    themes: [],
    demographics: [],
    relations: [],
    theme: {
      openings: [],
      endings: [],
    },
    external: [],
    streaming: [],
  },
];

describe("animeSearchSlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        animeSearch: animeSearchSlice.reducer,
      },
    });
  });

  it("should return initial state", () => {
    const state = animeSearchSlice.reducer(undefined, { type: "unknown" });
    expect(state).toEqual(
      expect.objectContaining({
        query: "",
        page: 1,
        sortBy: "default",
        results: [],
        isLoading: false,
        error: null,
      })
    );
  });

  it("should handle setQuery", () => {
    store.dispatch(setQuery("test query"));
    const state = store.getState().animeSearch;
    expect(state.query).toBe("test query");
  });

  it("should handle setPage", () => {
    store.dispatch(setPage(2));
    const state = store.getState().animeSearch;
    expect(state.page).toBe(2);
  });

  it("should handle setSortBy", () => {
    store.dispatch(setSortBy("rating"));
    const state = store.getState().animeSearch;
    expect(state.sortBy).toBe("rating");
  });

  it("should handle addToSearchHistory", () => {
    store.dispatch(addToSearchHistory("first search"));
    store.dispatch(addToSearchHistory("second search"));
    const state = store.getState().animeSearch;
    expect(state.searchHistory).toEqual(["second search", "first search"]);
  });

  it("should limit search history to 5 items", () => {
    store.dispatch(addToSearchHistory("search1"));
    store.dispatch(addToSearchHistory("search2"));
    store.dispatch(addToSearchHistory("search3"));
    store.dispatch(addToSearchHistory("search4"));
    store.dispatch(addToSearchHistory("search5"));
    store.dispatch(addToSearchHistory("search6")); // This should remove "search1"

    const state = store.getState().animeSearch;
    expect(state.searchHistory).toEqual([
      "search6",
      "search5",
      "search4",
      "search3",
      "search2",
    ]);
  });

  it("should not add duplicate searches to history", () => {
    store.dispatch(addToSearchHistory("test"));
    store.dispatch(addToSearchHistory("other"));
    store.dispatch(addToSearchHistory("test")); // Duplicate

    const state = store.getState().animeSearch;
    expect(state.searchHistory).toEqual(["test", "other"]);
  });

  it("should handle clearSearchHistory", () => {
    store.dispatch(addToSearchHistory("test"));
    store.dispatch(clearSearchHistory());
    const state = store.getState().animeSearch;
    expect(state.searchHistory).toEqual([]);
  });

  it("should handle clearError", () => {
    store.dispatch(setQuery("test"));
    store.dispatch(fetchAnimeList.rejected(null, "test", null, "Some error"));
    store.dispatch(clearError());
    const state = store.getState().animeSearch;
    expect(state.error).toBe(null);
  });

  it("should handle fetchAnimeList.pending", () => {
    store.dispatch(
      fetchAnimeList.pending("test", {
        query: "test",
        page: 1,
        sortBy: "default",
      })
    );
    const state = store.getState().animeSearch;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle fetchAnimeList.fulfilled", async () => {
    const mockResponse = {
      data: {
        pagination: {
          last_visible_page: 1,
          has_next_page: false,
          current_page: 1,
          items: { count: 1, total: 1, per_page: 20 },
        },
        data: mockAnimeData,
      },
    };

    const axios = (await import("axios")).default;
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    await store.dispatch(
      fetchAnimeList({ query: "test", page: 1, sortBy: "default" })
    );

    const state = store.getState().animeSearch;
    expect(state.isLoading).toBe(false);
    expect(state.results).toEqual(mockAnimeData);
    expect(state.pagination.currentPage).toBe(1);
    expect(state.pagination.lastPage).toBe(1);
    expect(state.pagination.hasNext).toBe(false);
    expect(state.pagination.hasPrev).toBe(false);
  });

  it("should handle fetchAnimeList.rejected", async () => {
    // Test the rejected case directly by dispatching the rejected action
    store.dispatch(
      fetchAnimeList.rejected(
        null,
        "testThunk",
        { query: "test", page: 1, sortBy: "default" },
        "Failed to fetch anime data. Please check your connection."
      )
    );

    const state = store.getState().animeSearch;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(
      "Failed to fetch anime data. Please check your connection."
    );
    expect(state.results).toEqual([]);
  });
});
