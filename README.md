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

- **Skeleton Loading**: Animated placeholder cards during search
- **Error Handling**: Comprehensive error handling for API failures, rate limits, and network issues
- **Request Cancellation**: AbortController implementation to prevent race conditions
- **Responsive Design**: Mobile-first design with adaptive layouts
- **Empty States**: User-friendly messages for no results and initial state
- **Type Safety**: Full TypeScript coverage with custom interfaces
- **Modern UI**: Dark theme with smooth transitions and hover effects

## Live Demo

Deployed to Vercel: [Anime Search App](https://your-app-url.vercel.app)

## Getting Started

### Prerequisites

- Node.js 16+ installed
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

## Project Structure

```
src/
├── app/                 # Redux store configuration
│   ├── hooks.ts        # Typed Redux hooks
│   └── store.ts        # Redux store setup
├── components/         # Reusable UI components
│   ├── anime/          # Anime-specific components
│   └── ui/             # Generic UI components
├── features/           # Redux feature slices
│   └── anime/          # Anime search slice
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── search/         # Search page
│   └── detail/         # Anime detail page
├── routes/             # React Router configuration
└── types/              # TypeScript type definitions
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

- 25 anime results per page
- Next/Previous navigation with page indicators
- Maintains search query across page changes

### Race Condition Prevention

- AbortController implementation ensures only the latest response updates state
- Prevents flicker and outdated results from appearing

### Responsive Design

- Mobile-first approach
- Adaptive grid layout (1-5 columns based on screen size)
- Touch-friendly interface elements

## Development Notes

- The application uses a component-based architecture with clear separation of concerns
- Redux Toolkit handles all state management with typed actions and selectors
- Custom hooks encapsulate complex logic (debouncing, abort controllers)
- Comprehensive TypeScript interfaces ensure type safety throughout the application

## Deployment

The application is optimized for deployment on Vercel:

1. Build command: `npm run build`
2. Output directory: `dist`
3. No environment variables required
4. Single Page Application redirects configured automatically

---

Built as a demonstration of modern React development practices and API integration patterns.
