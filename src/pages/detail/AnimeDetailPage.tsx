import { AnimeDetailSkeleton } from "../../components/anime/AnimeDetailSkeleton";
import {
  NetworkError,
  NotFoundError,
  RateLimitError,
  ServerError,
  GenericError,
} from "../../components/ui/ErrorDisplay";
import useAnimeDetail from "../../features/detail/useAnimeDetail";
import { BackButton } from "../../features/detail/components/BackButton";
import { FloatingBackButton } from "../../features/detail/components/FloatingBackButton";
import { AnimeImage } from "../../features/detail/components/AnimeImage";
import { AnimeTitles } from "../../features/detail/components/AnimeTitles";
import { AnimeStats } from "../../features/detail/components/AnimeStats";
import { AnimeGenres } from "../../features/detail/components/AnimeGenres";
import { AnimeBasicInfo } from "../../features/detail/components/AnimeBasicInfo";
import { AnimeSynopsis } from "../../features/detail/components/AnimeSynopsis";
import { AnimeBackground } from "../../features/detail/components/AnimeBackground";
import { AnimeProductionInfo } from "../../features/detail/components/AnimeProductionInfo";

export function AnimeDetailPage() {
  const {
    anime,
    isLoading,
    error,
    errorType,
    showFloatBackButton,
    retry,
    handleBack,
  } = useAnimeDetail();

  if (isLoading) {
    return <AnimeDetailSkeleton />;
  }

  if (error || !anime) {
    // Show specific error UI based on error type
    if (errorType === "notFound") {
      return <NotFoundError />;
    } else if (errorType === "rateLimit") {
      return <RateLimitError onRetry={retry} />;
    } else if (errorType === "server") {
      return <ServerError onRetry={retry} />;
    } else if (errorType === "network") {
      return <NetworkError onRetry={retry} />;
    } else {
      return <GenericError onRetry={retry} />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <BackButton onBack={handleBack} />

        <div className="grid md:grid-cols-3 gap-8">
          <AnimeImage anime={anime} />

          <div className="md:col-span-2 space-y-6">
            <AnimeTitles anime={anime} />
            <AnimeStats anime={anime} />
            <AnimeGenres anime={anime} />
            <AnimeBasicInfo anime={anime} />
            <AnimeSynopsis anime={anime} />
            <AnimeBackground anime={anime} />
            <AnimeProductionInfo anime={anime} />
          </div>
        </div>
      </div>

      {/* Floating Back Button for Mobile */}
      {showFloatBackButton && <FloatingBackButton onBack={handleBack} />}
    </div>
  );
}
