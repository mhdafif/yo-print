import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.scroll methods
Object.defineProperty(window, "scrollTo", {
  value: vi.fn(),
  writable: true,
});

// Mock window.history methods
Object.defineProperty(window, "history", {
  value: {
    replaceState: vi.fn(),
    pushState: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  },
  writable: true,
});

// Mock window.location
Object.defineProperty(window, "location", {
  value: {
    href: "http://localhost:3000",
    origin: "http://localhost:3000",
    pathname: "/",
    search: "",
    hash: "",
  },
  writable: true,
});

// Mock window.innerWidth/innerHeight
Object.defineProperty(window, "innerWidth", {
  value: 1024,
  writable: true,
});

Object.defineProperty(window, "innerHeight", {
  value: 768,
  writable: true,
});

// Mock window.scrollY
Object.defineProperty(window, "scrollY", {
  value: 0,
  writable: true,
});

// Mock URL
const mockSearchParams = new Map<string, string>();
class MockURL {
  constructor(public href: string) {}
  toString() {
    return this.href;
  }
  get searchParams() {
    return {
      get: (key: string) => mockSearchParams.get(key),
      set: (key: string, value: string) => mockSearchParams.set(key, value),
      delete: (key: string) => mockSearchParams.delete(key),
      has: (key: string) => mockSearchParams.has(key),
      toString: () =>
        new URLSearchParams(Array.from(mockSearchParams)).toString(),
    };
  }
}

// @ts-expect-error - Global URL assignment requires type assertion
global.URL = MockURL;
