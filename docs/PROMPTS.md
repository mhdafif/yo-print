# PROMPTS.md

This file documents how I intentionally used AI tools (ChatGPT, Claude, Copilot, etc.) to build the **Anime Search App** for YoPrint.

I treat AI as a pair-programmer:

- I provide clear constraints (tech stack, assignment rules).
- I ask for focused help (architecture, patterns, snippets).
- I review, modify, and own all final code.

Boilerplate base: [`github.com/mhdafif/react-boilerplate`](https://github.com/mhdafif/react-boilerplate)

---

## 1. Project Initialization & Boilerplate Adaptation

### Prompt 1.1 - Adapt my React boilerplate for this assignment

**Context / Purpose:** Start from my existing Vite + React + TS boilerplate and align it with YoPrint's rules.

**Prompt:**

> I have this repo as my base: https://github.com/mhdafif/react-boilerplate (React + TypeScript + Vite).
> Help me adapt it for a coding test with these constraints:
>
> - Use React 18+, TypeScript, Vite.
> - Use **npm only** (no pnpm/yarn). Assume evaluator will run:
>   - `npm install`
>   - `npm run dev`
> - Dev server **must run on port 4000**.
> - Single Page App only (no Next.js).
> - Tech stack: react-router-dom, Redux (@reduxjs/toolkit + react-redux), UI library (use shadcn), tailwind, axios.
> - No environment variables. Jikan API base URL must be hardcoded.
>
> Tasks:
>
> 1. Show the updated `package.json` (scripts, dependencies) using npm.
> 2. Show the necessary `vite.config.ts` change so `npm run dev` starts on port 4000.
> 3. Confirm folder structure based on my boilerplate:
>    - `src/app` for store and app config
>    - `src/routes` or `src/pages` for route components
>    - `src/components` for shared UI
>    - `src/features/anime` for anime-related logic (slices, hooks, components)
> 4. Mention any files from the original boilerplate I should delete or adjust to keep it clean for this test.

### Prompt 1.2 - ESLint/Prettier and DX sanity

**Context / Purpose:** Keep my existing linting/formatting from the boilerplate but ensure no conflicts with the assignment.

**Prompt:**

> Using my existing eslint/prettier config from https://github.com/mhdafif/react-boilerplate, review and:
>
> - Ensure configs work with React 18, react-router-dom, Redux Toolkit, and TypeScript.
> - Suggest minimal rules to:
>   - Avoid `any` unless absolutely necessary.
>   - Enforce hooks rules.
> - Output final `eslint.config.js` (or config file) tailored for this Anime Search App.

---

## 2. Routing & Application Shell

### Prompt 2.1 - Set up SPA routing structure

**Context / Purpose:** Define routes for search page & detail page using `react-router-dom`.

**Prompt:**

> I need routing for an Anime Search SPA using `react-router-dom@latest` inside a Vite + React + TS project:
>
> - `/` : Anime search page with list + pagination.
> - `/anime/:id` : Detail page for selected anime.
>
> Using my boilerplate structure:
>
> - Create `src/router/index.tsx` (or similar) that defines routes.
> - Update `src/main.tsx` to wrap the app with:
>   - `<BrowserRouter>`
>   - `<Provider store={store}>`
> - Use lazy-loaded pages if simple and clean.
>   Provide the TypeScript code for:
> - `src/main.tsx`
> - `src/router/index.tsx`
> - Minimal `SearchPage.tsx` and `AnimeDetailPage.tsx` placeholders.

---

## 3. Redux Store & State Design

### Prompt 3.1 - Set up Redux Toolkit store

**Context / Purpose:** Quickly scaffold a proper typed store based on my style.

**Prompt:**

> Using Redux Toolkit and React-Redux:
>
> - Create `src/app/store.ts` with `configureStore`.
> - Add typed `RootState` and `AppDispatch`.
> - Show how to use `useAppDispatch` and `useAppSelector` hooks.
>
> Assume I will add an `animeSearchSlice` and, optionally, `animeDetailSlice`.
> Output the exact code for:
>
> - `src/app/store.ts`
> - `src/app/hooks.ts`

### Prompt 3.2 - Anime search slice with server-side pagination

**Context / Purpose:** Manage search query, results, page, loading, error via Redux.

**Prompt:**

> Design a Redux Toolkit slice for the Jikan Anime search:
>
> - Endpoint: `https://api.jikan.moe/v4/anime`
> - Query params: `q` (search), `page`, plus any recommended params (e.g. `limit`).
>
> Requirements:
>
> - State:
>   - `query: string`
>   - `page: number`
>   - `results: AnimeSummary[]`
>   - `pagination: { currentPage; lastPage; total; hasNext; hasPrev }`
>   - `isLoading: boolean`
>   - `error: string | null`
> - Actions:
>   - `setQuery`
>   - `setPage`
>   - Extra reducers for async thunk.
> - Async thunk `fetchAnimeList` that:
>   - Calls Jikan with `q` and `page`.
>   - Maps response into typed `AnimeSummary`.
>
> Provide:
>
> - `AnimeSummary` TypeScript interface based on Jikan response.
> - `animeSearchSlice.ts` implementation.
> - Use `createAsyncThunk` and handle loading/error states cleanly.
>   No environment variables; base URL is inline.

---

## 4. Debounced Instant Search with Request Cancellation

### Prompt 4.1 - Implement debounced search with AbortController

**Context / Purpose:** Correct instant search behavior: 250ms debounce + cancel in-flight requests + Redux integration.

**Prompt:**

> I need an instant search bar with these rules:
>
> - User types in input, search triggers automatically.
> - Debounce: 250ms.
> - Cancel in-flight API request if user keeps typing.
> - Uses Redux Toolkit thunk `fetchAnimeList`.
> - Uses `AbortController` (no external debounce libs).
>
> Implement:
>
> - `useDebouncedSearch` hook in `src/hooks/useDebouncedSearch.ts`:
>   - Accepts `value`, `delay`, and returns debounced value.
> - In `SearchPage.tsx`:
>   - Local state for `searchInput`.
>   - `useEffect` watching debounced value:
>     - Dispatch `setQuery` + `setPage(1)` + `fetchAnimeList`.
> - Show how AbortController is wired inside the thunk to cancel previous calls and prevent race conditions.
>
> Provide full TypeScript examples for the hook and thunk usage.

---

## 5. Search Page UI & Server-Side Pagination

### Prompt 5.1 - Build search page layout & pagination component

**Context / Purpose:** Compose the main page UI.

**Prompt:**

> Build the `SearchPage` UI with:
>
> - A centered search input at top.
> - Result grid/list of anime cards (image, title, score, type, year).
> - Clickable card to `/anime/:id`.
> - Pagination controls using Jikan pagination:
>   - Next / Prev buttons.
>   - Disable when not available.
>
> Use:
>
> - My folder style (`src/pages/SearchPage.tsx`, `src/components/anime/AnimeCard.tsx`, `src/components/Pagination.tsx`).
> - A simple UI lib or utility classes (e.g. Tailwind if appropriate for my boilerplate) but keep it minimal.
> - Data from `animeSearchSlice` (select from Redux).
>
> Output full React + TSX code for:
>
> - `AnimeCard`
> - `Pagination`
> - `SearchPage` integrating Redux state.

---

## 6. Detail Page

### Prompt 6.1 - Anime detail page with reusable types

**Context / Purpose:** Implement `/anime/:id` consuming Jikan detail endpoint.

**Prompt:**

> Implement `AnimeDetailPage`:
>
> - Use route param `id`.
> - Call `https://api.jikan.moe/v4/anime/:id/full` (no env).
> - Show:
>   - Cover image
>   - Title / Japanese title
>   - Score, rank, popularity
>   - Genres
>   - Synopsis
>   - Airing dates
> - Add loading and error states.
> - Use either:
>   - A separate `animeDetailSlice` with thunk, **or**
>   - A local `useEffect` with `useState` if it's simpler but still clean.
>
> Provide:
>
> - Reusable `AnimeDetail` TypeScript interface.
> - `AnimeDetailPage.tsx` implementation.
> - Explain which approach better matches "Redux for state management" expectation.

---

## 7. UX, Loading, Empty States & Error Handling

### Prompt 7.1 - Skeletons & empty state UX

**Context / Purpose:** Make the app feel polished (bonus points).

**Prompt:**

> Suggest and implement:
>
> - Skeleton loaders for:
>   - Search result cards
>   - Anime detail page
> - Friendly empty states:
>   - Initial: "Start typing to search for an anime"
>   - No results: "No anime found for '{query}'"
>
> Provide:
>
> - `SkeletonCard` component.
> - Updated `SearchPage` code to show skeletons when `isLoading` is true.
> - Empty state components/messages integrated cleanly.

### Prompt 7.2 - Robust error handling & rate limit handling

**Context / Purpose:** Handle Jikan errors / network issues cleanly.

**Prompt:**

> Improve error handling for all API calls:
>
> - If network error or non-2xx status:
>   - Set a user-friendly `error` message in Redux or local state.
> - On Jikan rate limiting (HTTP 429) or 500s:
>   - Show a specific message like:
>     - "The anime API is currently busy. Please try again in a moment."
> - Ensure error state does NOT break layout.
>
> Provide updated:
>
> - `fetchAnimeList` thunk with structured error handling.
> - Detail page fetch logic with similar handling.
> - Simple `ErrorBanner` component and usage example.

---

## 8. Race Conditions & Request Cancellation (Deep Dive)

### Prompt 8.1 - Verify and harden race condition handling

**Context / Purpose:** Double-check correctness of debounced search & cancel logic.

**Prompt:**

> Review my current implementation of:
>
> - Debounced search
> - `fetchAnimeList` with AbortController
>
> Goals:
>
> - Ensure that only the latest response updates the Redux state.
> - Prevent flicker when quickly typing.
> - Ensure cleanup on component unmount.
>
> Given my current thunk + hook code (I will paste it), point out issues and provide a corrected version if needed.

---

## 9. Tests (Optional Bonus)

### Prompt 9.1 - Basic tests for slice and components

**Context / Purpose:** Add a bit of testing as bonus.

**Prompt:**

> Using Vitest + React Testing Library in a Vite + React + TS setup:
>
> - Create tests for:
>   - `animeSearchSlice` (reducers & extraReducers).
>   - `SearchPage`:
>     - Renders input.
>     - Dispatches fetch when search term is entered (mocked).
>
> Provide:
>
> - Example `vitest` config snippet (if needed).
> - Sample test files:
>   - `src/features/anime/animeSearchSlice.test.ts`
>   - `src/pages/SearchPage.test.tsx`

---

## 10. Deployment

### Prompt 10.1 - Build & deploy to Vercel (no env vars)

**Context / Purpose:** Ensure the evaluators can run locally & view live demo easily.

**Prompt:**

> I need deployment instructions that match these constraints:
>
> - Local:
>   - `npm install`
>   - `npm run dev` (port 4000)
> - Production build: `npm run build` + `npm run preview` (optional).
> - No environment variables used.
> - Deployed to Vercel.
>
> Provide:
>
> - Recommended `build` command and publish directory for:
>   - Vercel
> - A short "Deployment" section for my `README.md`.
>
> Assume Vite React SPA with client-side routing (need redirect rules).

---

## 11. Final Review & Cleanup

### Prompt 11.1 - Code review & README polish

**Context / Purpose:** Sanity check before submission.

**Prompt:**

> Here is my final file/folder structure and key files (I'll paste summaries).
>
> - Check if:
>   - All assignment requirements are met:
>     - npm only
>     - `npm install` + `npm run dev` on port 4000
>     - React 18+, TS, Redux, react-router-dom
>     - Jikan integration with instant search, server-side pagination
>     - No env vars
>   - Code is clean, typed, and easy to extend.
> - Suggest:
>   - Any small refactors
>   - A concise `README.md` with:
>     - Tech stack
>     - How to run
>     - Live URL
>     - "Bonus Implementation" section listing skeletons, error handling, etc.
>
> Output improved README and list any critical fixes if I missed something.

---

## Note

This file lists the **planned and representative prompts** I used / would use with AI during this project.  
For each real interaction during implementation, I:

- Refer back to the matching section.
- Update or append the exact prompt + which files/components it influenced.

This demonstrates my workflow in collaborating with AI while still owning the architecture, implementation, and final code.
