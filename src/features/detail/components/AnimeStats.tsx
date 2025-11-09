interface Anime {
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
}

interface AnimeStatsProps {
  anime: Anime;
}

export function AnimeStats({ anime }: AnimeStatsProps) {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-slate-400">Score:</span>
        <span className="text-yellow-500 font-bold">
          ★ {anime.score?.toFixed(2) || "N/A"}
        </span>
        <span className="text-slate-500">
          ({anime.scored_by?.toLocaleString()} users)
        </span>
      </div>
      {anime.rank && (
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Rank:</span>
          <span className="text-white font-bold">#{anime.rank}</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className="text-slate-400">Popularity:</span>
        <span className="text-white font-bold">#{anime.popularity}</span>
      </div>
    </div>
  );
}
