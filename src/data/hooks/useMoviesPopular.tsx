import { useState } from 'react'
import { MovieDto } from '../dto/MovieDto'
import MoviesPopularAPI from '../services/MoviesPopularAPI'

const moviesApi = new MoviesPopularAPI()

export const useMoviesPopular = () => {
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
      console.log('[useMoviesPopular.getMovies]: Error: ', err)
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
