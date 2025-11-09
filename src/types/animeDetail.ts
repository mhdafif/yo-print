export interface AnimeDetail {
  mal_id: number
  title: string
  title_english?: string
  title_japanese?: string
  images: {
    jpg: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
    webp: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
  }
  type: string
  episodes?: number
  status: string
  airing: boolean
  scored: number
  scored_by?: number
  rank?: number
  popularity: number
  members: number
  favorites: number
  synopsis?: string
  background?: string
  season?: string
  year?: number
  broadcast?: {
    day?: string
    time?: string
    timezone?: string
    string?: string
  }
  genres: Array<{
    mal_id: number
    type: string
    name: string
    url: string
  }>
  themes?: Array<{
    mal_id: number
    type: string
    name: string
    url: string
  }>
  demographics?: Array<{
    mal_id: number
    type: string
    name: string
    url: string
  }>
  studios?: Array<{
    mal_id: number
    type: string
    name: string
    url: string
  }>
  producers?: Array<{
    mal_id: number
    type: string
    name: string
    url: string
  }>
  duration?: string
  rating?: string
}