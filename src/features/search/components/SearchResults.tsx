import { AnimeCard } from "../../../components/anime/AnimeCard";
import { SkeletonCard } from "../../../components/ui/SkeletonCard";
import { AnimeSummary } from "../../../types/anime";

interface SearchResultsProps {
  results: AnimeSummary[];
  searchInput: string;
  isLoading: boolean;
  error: string | null;
}

export function SearchResults({
  results,
  searchInput,
  isLoading,
  error,
}: SearchResultsProps) {
  if (error) {
    return (
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        {Array.from({ length: 20 }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (searchInput.trim() && results.length === 0) {
    return (
      <div className="text-center text-slate-400 py-16">
        <p className="text-lg">No anime found for '{searchInput}'</p>
      </div>
    );
  }

  if (results.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-24">
        {results.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    );
  }

  return null;
}
