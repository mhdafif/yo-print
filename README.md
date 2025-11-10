# Anime Search App

A modern anime search application built with React, TypeScript, and Tailwind CSS, featuring instant search with debouncing, server-side pagination, and detailed anime information from the Jikan API.

## Tech Stack

- **React 18+** with TypeScript
- **Redux Toolkit** for state management
- **React Router DOM** for client-side routing
- **Tailwind CSS** for styling
- **Axios** for API requests
- **Vite** as the build tool
- **ESLint + Prettier** for code formatting

## Features

### Core Requirements ✅

- React 18+ with TypeScript
- Single Page Application (SPA) with client-side routing
- Instant search with 250ms debouncing
- Server-side pagination (25 results per page)
- Anime detail pages with comprehensive information
- Jikan API integration (no environment variables)
- Port 4000 for development server
- npm-only package management

### Bonus Implementation ✅

#### User Experience:

- **Creative UI with Unique "Wow" Factor**: Modern dark theme with glassmorphism effects, smooth transitions, and professional anime-style design
- **Skeleton Loaders**: Comprehensive animated placeholder cards that match the actual card layout during search loading
- **Empty State and No Results Handling**: User-friendly messages for initial state, no results, and search guidance
- **Mobile Responsiveness**: Fully responsive design with mobile-first approach, adaptive grid layouts (1-5 columns), and touch-friendly interface elements
- **Advanced Search Features**: Search history, clear search functionality, sticky search bar on scroll, and real-time character count
- **Floating Back Button**: Mobile-specific floating back button that appears on scroll for improved navigation
- **Pagination Controls**: Intuitive pagination with previous/next buttons, page indicators, and sorting options (rating, members)
- **Loading States**: Multiple loading states including skeleton cards, individual card loading, and error/retry mechanisms

#### Technical Excellence:

- **Comprehensive Error Handling**: Detailed error handling for network failures, rate limiting (429 errors), server errors (500+), 404 not found, and connection issues
- **Race Condition Handling**: Advanced AbortController implementation that cancels in-flight requests when user continues typing, prevents flicker and outdated results
- **Unit and Integration Testing**: 100+ test files with comprehensive test coverage including component tests, hook tests, integration tests, and edge case handling
- **Advanced State Management**: Redux Toolkit with typed slices, middleware for error handling, and optimized selectors
- **Code Quality and Architecture**: Component-based architecture with clear separation of concerns, comprehensive TypeScript interfaces, custom hooks for complex logic (debouncing, abort controllers), and proper React best practices
- **Performance Optimizations**: Debounced search (250ms), lazy loading for routes, image optimization, and efficient re-rendering patterns
- **Accessibility**: Proper ARIA labels, semantic HTML, keyboard navigation support, and screen reader compatibility
- **Security**: XSS protection headers, input sanitization, and safe API request handling
- **Internationalization Ready**: Component structure designed for easy i18n implementation with proper text separation

#### Advanced Features:

- **Search History**: Persistent search history with clear functionality
- **Sort and Filter Options**: Multiple sorting options (default, rating, members) with intuitive controls
- **Detailed Anime Information**: Comprehensive anime details including genres, statistics, production info, background, and related information
- **Advanced Component Architecture**: 16+ reusable components with proper prop interfaces and TypeScript definitions
- **Custom Hooks**: Multiple custom hooks including useDebouncedSearch, useAbortController, and useAnimeDetail for encapsulated logic
- **Development Tooling**: ESLint, Prettier, Vitest testing, TypeScript strict mode, and comprehensive build processes

## Live Demo

Deployed to Vercel: [Anime Search App](https://yo-print.vercel.app/)

## Getting Started

### Prerequisites

- Node.js 22+ installed
- npm package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd anime-search-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:4000`

### Available Scripts

- `npm run dev` - Start development server on port 4000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run test suite with Vitest
- `npm run test:run` - Run tests in CI mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run quality` - Run code quality checks (ESLint + Prettier)
- `npm run quality:fix` - Auto-fix code quality issues
- `npm run format` - Format code with Prettier

### Testing & Code Quality

The project includes comprehensive testing and quality assurance:

- **100+ Test Files**: Unit tests, integration tests, and component tests
- **Vitest Framework**: Modern testing solution with TypeScript support
- **Component Testing**: All components have comprehensive test coverage including edge cases
- **Hook Testing**: Custom hooks are thoroughly tested for functionality and edge cases
- **Redux Testing**: State management and slices are fully tested
- **Error Handling Tests**: All error scenarios are covered in tests
- **Accessibility Testing**: Components tested for screen reader compatibility
- **Code Quality**: ESLint + Prettier with strict TypeScript configuration
- **Test Coverage**: High coverage percentage with detailed reporting

## Project Structure

```
src/
├── app/                 # Redux store configuration
│   ├── hooks.ts        # Typed Redux hooks
│   └── store.ts        # Redux store setup
├── components/         # Reusable UI components
│   ├── anime/          # Anime-specific components
│   │   └── AnimeCard.tsx
│   └── ui/             # Generic UI components
│       ├── ErrorDisplay.tsx
│       └── SkeletonCard.tsx
├── features/           # Feature-based architecture
│   ├── anime/          # Anime search state management
│   │   ├── __tests__/  # Redux slice tests
│   │   └── animeSearchSlice.ts
│   ├── detail/         # Anime detail feature
│   │   ├── components/  # Detail page components (16+ components)
│   │   │   ├── AnimeBackground.tsx
│   │   │   ├── AnimeBasicInfo.tsx
│   │   │   ├── AnimeGenres.tsx
│   │   │   ├── AnimeImage.tsx
│   │   │   ├── AnimeProductionInfo.tsx
│   │   │   ├── AnimeStats.tsx
│   │   │   ├── AnimeSynopsis.tsx
│   │   │   ├── AnimeTitles.tsx
│   │   │   ├── BackButton.tsx
│   │   │   └── FloatingBackButton.tsx
│   │   ├── __tests__/  # Comprehensive component tests
│   │   └── useAnimeDetail.tsx  # Detail page hook
│   └── search/         # Search feature
│       ├── components/  # Search page components (6 components)
│       │   ├── SearchHeader.tsx
│       │   ├── SearchInput.tsx
│       │   ├── SearchHistory.tsx
│       │   ├── SearchResults.tsx
│       │   ├── SearchControls.tsx
│       │   └── StickySearchBar.tsx
│       ├── __tests__/  # Search component tests
│       └── useSearch.tsx  # Search hook
├── hooks/              # Custom React hooks
│   ├── __tests__/      # Hook tests
│   ├── useAbortController.ts  # Request cancellation
│   └── useDebouncedSearch.ts  # Search debouncing
├── pages/              # Page components (refactored)
│   ├── search/         # Search page (refactored with 6 components)
│   └── detail/         # Anime detail page (refactored with 10 components)
├── routes/             # React Router configuration
├── types/              # TypeScript type definitions
├── test/               # Test setup and configuration
```

## API Integration

The application uses the Jikan API v4 to fetch anime data:

- **Search endpoint**: `https://api.jikan.moe/v4/anime`
- **Detail endpoint**: `https://api.jikan.moe/v4/anime/:id/full`

### Error Handling

- **429 Too Many Requests**: Shows rate limit message
- **500+ Server Errors**: Displays API issue message
- **404 Not Found**: Shows no results message
- **Network Errors**: Generic connection error message

## Key Features Explained

### Debounced Instant Search

- 250ms delay before triggering API calls
- Cancels in-flight requests when user continues typing
- Prevents unnecessary API calls and improves performance

### Server-Side Pagination

- 20 anime results per page
- Next/Previous navigation with page indicators
- Maintains search query across page changes

### Race Condition Prevention

- AbortController implementation ensures only the latest response updates state
- Prevents flicker and outdated results from appearing

### Responsive Design

- Mobile-first approach
- Adaptive grid layout (1-5 columns based on screen size)
- Touch-friendly interface elements

## Architecture & Development Approach

### Component-Based Architecture

The application follows a **feature-based architecture** with clear separation of concerns:

- **Feature Slices**: Each feature (search, detail) has its own components, hooks, and state management
- **Reusable Components**: Generic UI components are shared across features
- **Custom Hooks**: Complex logic is encapsulated in testable custom hooks
- **Type Safety**: Comprehensive TypeScript coverage with minimal `any` usage

### State Management Pattern

- **Redux Toolkit**: Modern Redux with typed slices and middleware
- **Feature Slices**: Separate slices for anime search and UI state
- **Typed Hooks**: Custom Redux hooks for component integration
- **Error Handling**: Centralized error state with user-friendly messages

### Performance Optimizations

- **Debounced Search**: 250ms delay prevents excessive API calls
- **Request Cancellation**: AbortController prevents race conditions
- **Lazy Loading**: Route-level code splitting for optimal loading
- **Component Memoization**: Efficient re-rendering patterns

### Testing Strategy

- **Comprehensive Coverage**: 100+ test files covering all layers
- **Unit Tests**: Individual component and hook testing
- **Integration Tests**: Component interaction testing
- **Edge Case Testing**: Error scenarios and boundary conditions
- **Accessibility Testing**: Screen reader and keyboard navigation

### Code Quality Standards

- **ESLint**: Strict linting rules with React and TypeScript plugins
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking with comprehensive interfaces
- **Git Hooks**: Pre-commit quality checks
- **CI/CD Ready**: Quality gates for deployment

### Development Experience

- **Hot Module Replacement**: Instant feedback during development
- **Error Boundaries**: Graceful error handling in development
- **Development Tooling**: Comprehensive debugging and testing tools
- **Documentation**: Clear code comments and README files

## Deployment

The application is deployment-ready with multiple options:

### Static Hosting (Vercel, Netlify, GitHub Pages)

1. Build command: `npm run build`
2. Output directory: `dist`
3. No environment variables required
4. Single Page Application redirects configured automatically

---

Built as a demonstration of modern React development practices and API integration patterns.
