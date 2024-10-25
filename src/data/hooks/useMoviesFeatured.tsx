import { useState } from 'react'
import { MovieDto } from '../dto/MovieDto'
import MoviesHighlightAPI from '../services/MoviesHighlightAPI'

const moviesApi = new MoviesHighlightAPI()

export const useMoviesFeatured = () => {
  const [movies, setMovies] = useState<MovieDto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getMovies = async (): Promise<MovieDto[]> => {
    let movies: MovieDto[] = []

    setLoading(true)
    try {
      movies = await moviesApi.getAll()
      setMovies(movies)
    } catch (err) {
      setError((err as Error).message)
      console.log('[useMoviesFeatured.getMovies]: Error: ', err)
    } finally {
      setLoading(false)
    }

    return movies
  }

  return {
    movies,
    loading,
    error,
    getMovies
  }
}
