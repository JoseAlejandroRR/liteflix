import { AxiosRequestConfig } from 'axios'
import { MovieDto } from '../dto/MovieDto'
import BackendService from './BackendService'

class LiteflixAPI extends BackendService {

  constructor() {
    super(import.meta.env.VITE_LITEFLIX_API)
  }

  async getAllMovies(): Promise<MovieDto[]> {
    const movies: MovieDto[] = []

    const data = await this.get<Record<string, any>>('/movies')

    data.forEach((item: Record<string, any>) => {
      const movie = MovieDto.create({
        id: item.id,
        title: item.title,
        description: item.description,
        imageURL: item.imageURL,
        thumbnailURL: item.imageURL,
      })
      movies.push(movie)
    })

    return movies
  }

  async getMyMovieList(): Promise<MovieDto[]> {
    const movies: MovieDto[] = []

    const data = await this.get<Record<string, any>>('/movies/my-movies')

    data.results.forEach((item: Record<string, any>) => {
      const movie = MovieDto.create({
        id: item.id,
        title: item.title,
        description: item.description,
        releasedAt: new Date(item.releasedAt),
        voteAverage: item.rating,
        imageURL: item.imageURL,
        thumbnailURL: item.thumbnailURL,
      })
      movies.push(movie)
    })

    return movies
  }

  async createMovie(input: FormData, config?: AxiosRequestConfig): Promise<MovieDto | null> {

    const result = await this.post<Record<string, any>>('/movies', input, config)

    if (result.id) {
      const movie = MovieDto.create({
        id: result.id,
        title: result.title,
        description: result.description,
        imageURL: result.imageURL,
        thumbnailURL: result.imageURL,
      })

      return movie
    }

    return null
  }

}

export default LiteflixAPI
