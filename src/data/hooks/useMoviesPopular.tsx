import { useState } from "react"
import { MovieDto } from "../dto/MovieDto"
import MoviesHighlightAPI from "../services/MoviesHighlightAPI"

const moviesApi = new MoviesHighlightAPI()

export const useMoviesPopular = () => {
  const [movies, setMovies] = useState<MovieDto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getHighlightMovies = async (): Promise<MovieDto[]> => {
    let movies: MovieDto[] = []

    setLoading(true)
    try {
      movies = await moviesApi.getAll()
      setMovies(movies)
    } catch (err) {
      setError((err as Error).message)
      console.log('[getHighlightMovies]: Error: ', err)
    } finally {
      setLoading(false)
    }

    return movies
  }

  return {
    movies,
    loading,
    error,
    getHighlightMovies
  }
}
