export function AnimeDetailSkeleton() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back button skeleton */}
        <div className="h-6 w-24 bg-slate-800 rounded mb-6 animate-pulse" />

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left column - Image */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <div className="w-full aspect-[3/4] bg-slate-800 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Right column - Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Title section */}
            <div>
              <div className="h-10 bg-slate-800 rounded w-3/4 mb-2 animate-pulse" />
              <div className="h-6 bg-slate-800 rounded w-1/2 mb-2 animate-pulse" />
              <div className="h-5 bg-slate-800 rounded w-1/3 animate-pulse" />
            </div>

            {/* Score and stats */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-4 w-12 bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-16 bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-20 bg-slate-800 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-10 bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-12 bg-slate-800 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-16 bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-12 bg-slate-800 rounded animate-pulse" />
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-6 w-20 bg-slate-800 rounded-full animate-pulse"
                />
              ))}
            </div>

            {/* Information grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="h-4 w-8 bg-slate-800 rounded mb-1 animate-pulse" />
                <div className="h-4 w-16 bg-slate-800 rounded animate-pulse" />
              </div>
              <div>
                <div className="h-4 w-16 bg-slate-800 rounded mb-1 animate-pulse" />
                <div className="h-4 w-12 bg-slate-800 rounded animate-pulse" />
              </div>
              <div>
                <div className="h-4 w-10 bg-slate-800 rounded mb-1 animate-pulse" />
                <div className="h-4 w-20 bg-slate-800 rounded animate-pulse" />
              </div>
              <div>
                <div className="h-4 w-8 bg-slate-800 rounded mb-1 animate-pulse" />
                <div className="h-4 w-16 bg-slate-800 rounded animate-pulse" />
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <div className="h-6 w-20 bg-slate-800 rounded mb-3 animate-pulse" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-4 bg-slate-800 rounded animate-pulse"
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Background */}
            <div>
              <div className="h-6 w-20 bg-slate-800 rounded mb-3 animate-pulse" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-4 bg-slate-800 rounded animate-pulse"
                    style={{ width: `${Math.random() * 30 + 70}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Additional information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="h-4 w-12 bg-slate-800 rounded mb-1 animate-pulse" />
                <div className="h-4 w-32 bg-slate-800 rounded animate-pulse" />
              </div>
              <div>
                <div className="h-4 w-16 bg-slate-800 rounded mb-1 animate-pulse" />
                <div className="h-4 w-40 bg-slate-800 rounded animate-pulse" />
              </div>
              <div>
                <div className="h-4 w-16 bg-slate-800 rounded mb-1 animate-pulse" />
                <div className="h-4 w-24 bg-slate-800 rounded animate-pulse" />
              </div>
              <div>
                <div className="h-4 w-10 bg-slate-800 rounded mb-1 animate-pulse" />
                <div className="h-4 w-20 bg-slate-800 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
