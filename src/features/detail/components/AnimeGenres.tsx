interface Anime {
  genres: Array<{
    mal_id: number;
    name: string;
  }>;
}

interface AnimeGenresProps {
  anime: Anime;
}

export function AnimeGenres({ anime }: AnimeGenresProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {anime.genres.map((genre) => (
        <span
          key={genre.mal_id}
          className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
}
