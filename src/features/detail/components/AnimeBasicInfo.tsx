interface Anime {
  type?: string;
  episodes?: number;
  status?: string;
  year?: number;
}

interface AnimeBasicInfoProps {
  anime: Anime;
}

export function AnimeBasicInfo({ anime }: AnimeBasicInfoProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      <div>
        <span className="text-slate-400">Type:</span>
        <p className="text-white font-medium">{anime.type}</p>
      </div>
      <div>
        <span className="text-slate-400">Episodes:</span>
        <p className="text-white font-medium">{anime.episodes || "Unknown"}</p>
      </div>
      <div>
        <span className="text-slate-400">Status:</span>
        <p className="text-white font-medium">{anime.status}</p>
      </div>
      <div>
        <span className="text-slate-400">Year:</span>
        <p className="text-white font-medium">{anime.year || "Unknown"}</p>
      </div>
    </div>
  );
}
