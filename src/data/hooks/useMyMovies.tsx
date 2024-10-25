import { useState } from 'react'
import { MovieDto } from '../dto/MovieDto'
import LiteflixAPI from '../services/LiteflixAPI'
import { CreateMovieDto } from '../dto/CreateMovieDto'
import axios from 'axios'

const liteflixApi = new LiteflixAPI()

export const useMyMovies = () => {
  const [movies, setMovies] = useState<MovieDto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getMovies = async (): Promise<MovieDto[]> => {
    let movies: MovieDto[] = []

    setLoading(true)
    try {
      movies = await liteflixApi.getAllMovies()
      setMovies(movies)
    } catch (err) {
      setError((err as Error).message)
      console.log('[useMyMovies.getMovies]: Error: ', err)
    } finally {
      setLoading(false)
    }

    return movies
  }

  const addMovie = async (input: CreateMovieDto, file: File, config: any): Promise<MovieDto | null> => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append('title', input.title);
      formData.append('file', file);

      //const res = await liteflixApi.createMovie(formData)
      const res = await axios.post(
        "http://localhost:8081/api/v1/movies",
        formData,
        config
      );
      console.log(res)
      const movie = MovieDto.create({
        id: res.data.id,
        title: res.data.title,
        imageURL: res.data.imageURL,
        thumbnailURL: res.data.thumbnailURL
      })
      console.log(movie)
      return movie
    } catch (err) {
      setError((err as Error).message)
      console.log('[useMyMovies.getMovies]: Error: ', err)
    } finally {
      setLoading(false)
    }

    return null
  }

  return {
    movies,
    loading,
    error,
    getMovies,
    addMovie,
  }
}
