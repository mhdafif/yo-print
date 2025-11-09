interface Anime {
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  title: string;
}

interface AnimeImageProps {
  anime: Anime;
}

export function AnimeImage({ anime }: AnimeImageProps) {
  return (
    <div className="md:col-span-1">
      <div className="sticky top-8">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full rounded-lg shadow-2xl"
        />
      </div>
    </div>
  );
}
