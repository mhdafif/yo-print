import { renderHook, act } from "@testing-library/react";
import { useDebouncedSearch } from "../useDebouncedSearch";

describe("useDebouncedSearch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebouncedSearch("test", 250));
    expect(result.current).toBe("test");
  });

  it("should debounce input changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedSearch(value, delay),
      {
        initialProps: { value: "initial", delay: 250 },
      }
    );

    expect(result.current).toBe("initial");

    // Change the value
    rerender({ value: "updated", delay: 250 });

    // Should still be the old value before delay
    expect(result.current).toBe("initial");

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Should now be updated
    expect(result.current).toBe("updated");
  });

  it("should cancel previous debounced calls", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedSearch(value, delay),
      {
        initialProps: { value: "initial", delay: 250 },
      }
    );

    // Change value multiple times quickly
    rerender({ value: "update1", delay: 250 });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: "update2", delay: 250 });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: "final", delay: 250 });

    // Fast-forward past the delay
    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Should only have the final value
    expect(result.current).toBe("final");
  });

  it("should work with different delay values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedSearch(value, delay),
      {
        initialProps: { value: "test", delay: 500 },
      }
    );

    rerender({ value: "updated", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Should not have updated yet (delay is 500)
    expect(result.current).toBe("test");

    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Should have updated now
    expect(result.current).toBe("updated");
  });
});
