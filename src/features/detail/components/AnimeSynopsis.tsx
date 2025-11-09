interface Anime {
  synopsis?: string;
}

interface AnimeSynopsisProps {
  anime: Anime;
}

export function AnimeSynopsis({ anime }: AnimeSynopsisProps) {
  if (!anime.synopsis) {
    return null;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-3">Synopsis</h3>
      <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
        {anime.synopsis}
      </p>
    </div>
  );
}
