interface Anime {
  studios?: Array<{
    name: string;
  }>;
  producers?: Array<{
    name: string;
  }>;
  duration?: string;
  rating?: string;
}

interface AnimeProductionInfoProps {
  anime: Anime;
}

export function AnimeProductionInfo({ anime }: AnimeProductionInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      {anime.studios && anime.studios.length > 0 && (
        <div>
          <span className="text-slate-400">Studios:</span>
          <p className="text-white font-medium">
            {anime.studios.map((studio) => studio.name).join(", ")}
          </p>
        </div>
      )}

      {anime.producers && anime.producers.length > 0 && (
        <div>
          <span className="text-slate-400">Producers:</span>
          <p className="text-white font-medium">
            {anime.producers.map((producer) => producer.name).join(", ")}
          </p>
        </div>
      )}

      {anime.duration && (
        <div>
          <span className="text-slate-400">Duration:</span>
          <p className="text-white font-medium">{anime.duration}</p>
        </div>
      )}

      {anime.rating && (
        <div>
          <span className="text-slate-400">Rating:</span>
          <p className="text-white font-medium">{anime.rating}</p>
        </div>
      )}
    </div>
  );
}
