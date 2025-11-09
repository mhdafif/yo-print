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

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider
    store={configureStore({ reducer: { test: (state = {}) => state } })}
  >
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

  it("should handle missing anime ID", async () => {
    const { result } = renderHook(() => useAnimeDetail(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
      ),
    });

    // When there's no anime ID, the hook should be in initial loading state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.anime).toBeNull();
  });
});
