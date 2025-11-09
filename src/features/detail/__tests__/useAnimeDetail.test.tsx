import React from "react";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import useAnimeDetail from "../useAnimeDetail";
import { configureStore } from "@reduxjs/toolkit";

// Mock axios
vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

// Mock window methods
const mockScrollTo = vi.fn();
Object.defineProperty(window, "scrollTo", {
  value: mockScrollTo,
  writable: true,
});

// Mock window.scrollY
let mockScrollY = 0;
Object.defineProperty(window, "scrollY", {
  get: () => mockScrollY,
  set: (value) => {
    mockScrollY = value;
  },
  configurable: true,
});

// Mock window.innerWidth
let mockInnerWidth = 1024;
Object.defineProperty(window, "innerWidth", {
  get: () => mockInnerWidth,
  set: (value) => {
    mockInnerWidth = value;
  },
  configurable: true,
});

const mockAnimeData = {
  mal_id: 1,
  title: "Test Anime",
  title_english: "Test Anime English",
  title_japanese: "テストアニメ",
  type: "TV",
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
  images: {
    jpg: {
      image_url: "https://example.com/image.jpg",
      small_image_url: "https://example.com/small.jpg",
      large_image_url: "https://example.com/large.jpg",
    },
    webp: {
      image_url: "https://example.com/image.webp",
      small_image_url: "https://example.com/small.webp",
      large_image_url: "https://example.com/large.webp",
    },
  },
  trailer: {
    youtube_id: "",
    url: "",
    embed_url: "",
  },
  approved: true,
  titles: [],
  title_synonyms: [],
  source: "Manga",
  genres: [],
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
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={configureStore({ reducer: { test: (state = {}) => state } })}>
    <MemoryRouter initialEntries={["/anime/1"]}>{children}</MemoryRouter>
  </Provider>
);

describe("useAnimeDetail", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockScrollY = 0;
    mockInnerWidth = 1024;
    mockScrollTo.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return initial loading state", () => {
    const { result } = renderHook(() => useAnimeDetail(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.anime).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.errorType).toBe(null);
    expect(typeof result.current.retry).toBe("function");
  });

  it("should show float back button on mobile after scrolling", () => {
    mockInnerWidth = 767; // Mobile width (< 768)

    const { result } = renderHook(() => useAnimeDetail(), { wrapper });

    // Initially not showing
    expect(result.current.showFloatBackButton).toBe(false);

    // Simulate scroll event
    act(() => {
      mockScrollY = 250; // Above threshold (> 200)
      const scrollEvent = new Event("scroll");
      window.dispatchEvent(scrollEvent);
      // Force a tick to ensure the event is processed
      vi.advanceTimersByTime(0);
    });

    expect(result.current.showFloatBackButton).toBe(true);
  });

  it("should not show float back button on desktop", () => {
    mockInnerWidth = 1024; // Desktop width

    const { result } = renderHook(() => useAnimeDetail(), { wrapper });

    // Simulate scroll event
    act(() => {
      mockScrollY = 250;
      const scrollEvent = new Event("scroll");
      window.dispatchEvent(scrollEvent);
    });

    expect(result.current?.showFloatBackButton).toBe(false);
  });

  it("should have retry function", () => {
    const { result } = renderHook(() => useAnimeDetail(), { wrapper });

    expect(typeof result.current.retry).toBe("function");
  });
});