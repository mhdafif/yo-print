interface Anime {
  background?: string;
}

interface AnimeBackgroundProps {
  anime: Anime;
}

export function AnimeBackground({ anime }: AnimeBackgroundProps) {
  if (!anime.background) {
    return null;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-3">Background</h3>
      <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
        {anime.background}
      </p>
    </div>
  );
}
