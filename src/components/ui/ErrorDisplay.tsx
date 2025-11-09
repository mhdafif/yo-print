import { Link } from "react-router-dom";

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorDisplay({
  error,
  onRetry,
  showRetry = false,
}: ErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Error Title */}
        <h2 className="text-2xl font-bold text-white mb-4">
          Oops! Something went wrong
        </h2>

        {/* Error Message */}
        <p className="text-slate-300 mb-8 leading-relaxed">{error}</p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </button>
          )}

          <Link
            to="/"
            className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium text-center"
          >
            Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
}

// Specific error components for different cases
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorDisplay
      error="Failed to fetch anime details. Please check your internet connection and try again."
      onRetry={onRetry}
      showRetry={!!onRetry}
    />
  );
}

export function NotFoundError() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full flex items-center justify-center">
            <span className="text-4xl font-bold text-slate-400">404</span>
          </div>
        </div>

        {/* Error Title */}
        <h2 className="text-3xl font-bold text-white mb-4">Anime Not Found</h2>

        {/* Error Message */}
        <p className="text-slate-300 mb-8 leading-relaxed">
          We couldn't find the anime you're looking for. It might have been
          removed or the ID is incorrect.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Search
        </Link>
      </div>
    </div>
  );
}

export function RateLimitError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorDisplay
      error="The anime API is currently experiencing high traffic. Please wait a moment and try again."
      onRetry={onRetry}
      showRetry={!!onRetry}
    />
  );
}

export function ServerError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorDisplay
      error="The anime API is currently experiencing issues. Please try again later."
      onRetry={onRetry}
      showRetry={!!onRetry}
    />
  );
}

export function GenericError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorDisplay
      error="An unexpected error occurred. Please try again or contact support if the problem persists."
      onRetry={onRetry}
      showRetry={!!onRetry}
    />
  );
}
