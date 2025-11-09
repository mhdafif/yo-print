interface Anime {
  title: string;
  title_english?: string;
  title_japanese?: string;
}

interface AnimeTitlesProps {
  anime: Anime;
}

export function AnimeTitles({ anime }: AnimeTitlesProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-2">{anime.title}</h1>
      {anime.title_english && anime.title_english !== anime.title && (
        <h2 className="text-xl text-slate-400 mb-2">{anime.title_english}</h2>
      )}
      {anime.title_japanese && (
        <h3 className="text-lg text-slate-500 mb-4">{anime.title_japanese}</h3>
      )}
    </div>
  );
}
