import { Link } from "react-router-dom";
import { AnimeSummary } from "../../types/anime";

interface AnimeCardProps {
  anime: AnimeSummary;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link to={`/anime/${anime.mal_id}`} className="block">
      <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group transform">
        <div className="aspect-[3/4] w-full overflow-hidden bg-slate-700">
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform ease-out"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3
            className="font-semibold text-white text-lg mb-2 overflow-hidden h-12"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: "1.5rem",
              maxHeight: "3rem",
            }}
          >
            {anime.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
            <span className="bg-slate-700 px-2 py-1 rounded">{anime.type}</span>
            {anime.year && <span>{anime.year}</span>}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="text-white font-medium">
                {anime.score?.toFixed(2) || "N/A"}
              </span>
            </div>
            <div className="text-slate-400 text-sm">
              {anime.members?.toLocaleString() || 0} members
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
