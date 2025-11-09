import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { AnimeDetail } from '../../types/animeDetail'

export function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [anime, setAnime] = useState<AnimeDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      if (!id) return

      try {
        setIsLoading(true)
        setError(null)

        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
        setAnime(response.data.data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status
          if (status === 429) {
            setError('The anime API is currently busy. Please try again in a moment.')
          } else if (status && status >= 500) {
            setError('The anime API is experiencing issues. Please try again later.')
          } else if (status === 404) {
            setError('Anime not found.')
          } else {
            setError('Failed to fetch anime details. Please check your connection.')
          }
        } else {
          setError('An unexpected error occurred.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnimeDetail()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center">
        <div className="text-white text-xl">Loading anime details...</div>
      </div>
    )
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4">
        <div className="text-red-400 text-xl mb-4 text-center">
          {error || 'Anime not found'}
        </div>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Search
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          ← Back to Search
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{anime.title}</h1>
              {anime.title_english && anime.title_english !== anime.title && (
                <h2 className="text-xl text-slate-400 mb-2">{anime.title_english}</h2>
              )}
              {anime.title_japanese && (
                <h3 className="text-lg text-slate-500 mb-4">{anime.title_japanese}</h3>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Score:</span>
                <span className="text-yellow-500 font-bold">★ {anime.scored}</span>
                <span className="text-slate-500">({anime.scored_by?.toLocaleString()} users)</span>
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

            <div className="flex flex-wrap gap-2">
              {anime.genres.map((genre: any) => (
                <span
                  key={genre.mal_id}
                  className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Type:</span>
                <p className="text-white font-medium">{anime.type}</p>
              </div>
              <div>
                <span className="text-slate-400">Episodes:</span>
                <p className="text-white font-medium">{anime.episodes || 'Unknown'}</p>
              </div>
              <div>
                <span className="text-slate-400">Status:</span>
                <p className="text-white font-medium">{anime.status}</p>
              </div>
              <div>
                <span className="text-slate-400">Year:</span>
                <p className="text-white font-medium">{anime.year || 'Unknown'}</p>
              </div>
            </div>

            {anime.synopsis && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Synopsis</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {anime.synopsis}
                </p>
              </div>
            )}

            {anime.background && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Background</h3>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {anime.background}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              {anime.studios && anime.studios.length > 0 && (
                <div>
                  <span className="text-slate-400">Studios:</span>
                  <p className="text-white font-medium">
                    {anime.studios.map((studio: any) => studio.name).join(', ')}
                  </p>
                </div>
              )}

              {anime.producers && anime.producers.length > 0 && (
                <div>
                  <span className="text-slate-400">Producers:</span>
                  <p className="text-white font-medium">
                    {anime.producers.map((producer: any) => producer.name).join(', ')}
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
          </div>
        </div>
      </div>
    </div>
  )
}