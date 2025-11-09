# Unit Testing with Vitest

This document describes the unit testing setup for the anime search app.

## 🧪 Testing Stack

- **Test Runner**: Vitest 4.0.8
- **Testing Library**: React Testing Library
- **DOM Environment**: jsdom
- **Assertion Library**: Vitest's built-in expect + Jest DOM
- **Mocking**: Vitest's vi.mock

## 📋 Test Scripts

- `npm run test` - Run tests in watch mode
- `npm run test:ui` - Run tests with visual UI interface
- `npm run test:run` - Run tests once (CI mode)
- `npm run test:coverage` - Run tests with coverage report

## 📁 Test Structure

```
src/
├── __tests__/               # Global test setup
│   └── setup.ts            # Test configuration
├── hooks/
│   └── __tests__/
│       ├── useDebouncedSearch.test.ts
│       └── useAbortController.test.ts
├── features/
│   ├── anime/
│   │   └── __tests__/
│   │       └── animeSearchSlice.test.ts
│   ├── search/
│   │   └── __tests__/
│   │       └── useSearch.test.ts
│   └── detail/
│       └── __tests__/
│           └── useAnimeDetail.test.ts
└── components/
    ├── anime/
    │   └── __tests__/
    │       └── AnimeCard.test.tsx
    └── ui/
        └── __tests__/
            └── ErrorDisplay.test.tsx
```

## 🎯 Test Coverage

### **Custom Hooks**

- ✅ `useDebouncedSearch` - Debouncing functionality
- ✅ `useAbortController` - Request cancellation
- ✅ `useSearch` - Search state management
- ✅ `useAnimeDetail` - Anime detail state management

### **Redux Slice**

- ✅ `animeSearchSlice` - Search state actions and reducers

### **Components**

- ✅ `AnimeCard` - Anime card rendering and interactions
- ✅ `ErrorDisplay` - Error UI components

## 🔧 Configuration

### **Vitest Config** (`vitest.config.ts`)

- Environment: jsdom
- Setup file: `src/test/setup.ts`
- Path aliases: `@/` → `src/`

### **Test Setup** (`src/test/setup.ts`)

- Jest DOM matchers
- Window API mocks (scroll, history, etc.)
- URL class mocking
- Cleanup after each test

## 📝 Writing Tests

### **Test Pattern Example**

```typescript
import { renderHook, act } from "@testing-library/react";
import { MyHook } from "../MyHook";

describe("MyHook", () => {
  it("should work correctly", () => {
    const { result } = renderHook(() => MyHook());

    expect(result.current.someValue).toBe("expected");
  });
});
```

### **Redux Testing Example**

```typescript
import { configureStore } from "@reduxjs/toolkit";
import { mySlice } from "../mySlice";

describe("mySlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        myFeature: mySlice.reducer,
      },
    });
  });

  it("should handle actions", () => {
    store.dispatch(mySlice.actions.someAction("payload"));
    expect(store.getState().myFeature.someValue).toBe("expected");
  });
});
```

## 🚀 Running Tests

### **Development Mode**

```bash
npm run test
```

- Runs tests in watch mode
- Re-runs on file changes
- Good for TDD workflow

### **Interactive Mode**

```bash
npm run test:ui
```

- Visual test runner interface
- Filter and run specific tests
- See coverage in real-time

### **CI Mode**

```bash
npm run test:run
```

- Single test run
- Exit with proper status codes
- Suitable for CI/CD pipelines

### **Coverage Report**

```bash
npm run test:coverage
```

- Generate coverage report
- Shows test coverage percentage
- Identifies untested code

## 📊 Current Status

- ✅ Test framework configured
- ✅ Mock environment set up
- ✅ Basic hook tests passing
- ✅ Redux slice tests running (some logic fixes needed)
- ✅ Component tests created
- 🔄 Tests need refinement for exact business logic

## 🎯 Next Steps

1. Fix remaining test assertions to match actual behavior
2. Add integration tests for component interactions
3. Add edge case testing
4. Set up CI/CD integration
5. Add coverage thresholds
