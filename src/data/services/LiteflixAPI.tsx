import { AxiosRequestConfig } from 'axios'
import { MovieDto } from '../dto/MovieDto'
import BackendService from './BackendService'
import { UpdateMovieDto } from '../dto/UpdateMovieDto'

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
        thumbnailURL: item.thumbnailURL,
        releasedAt: item.releasedAt ? new Date(item.releasedAt) : undefined,
        voteAverage: item.rating,
      })
      movies.push(movie)
    })

    return movies
  }

  async getMyMovieList(cache: boolean = true): Promise<MovieDto[]> {
    const movies: MovieDto[] = []

    const data = await this.get<Record<string, any>>('/movies/my-movies', {
      ...(cache ? {} : { params:  {
        'timestamp': Date.now(),
      } })
    })

    data.results.forEach((item: Record<string, any>) => {
      const movie = MovieDto.create({
        id: item.id,
        title: item.title,
        description: item.description,
        releasedAt: item.releasedAt ? new Date(item.releasedAt) : undefined,
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
        voteAverage: result.rating ?? undefined,
        releasedAt: result.releasedAt ? new Date(result.releasedAt) : undefined,
        thumbnailURL: result.thumbnailURL,
      })

      return movie
    }

    return null
  }

  async updateMovie(movieId: string, input: UpdateMovieDto): Promise<MovieDto | null> {

    const result = await this.put<Record<string, any>>(`/movies/${movieId}`, {
      title: input.title,
      description: input.description,
      rating: input.voteAverage,
      releasedAt: input.releasedAt,
      thumbnailURL: input.thumbnailURL,
      status: input.status
    })

    if (result.id) {
      const movie = MovieDto.create({
        id: result.id,
        title: result.title,
        description: result.description,
        voteAverage: result.rating ?? undefined,
        releasedAt: result.releasedAt ? new Date(result.releasedAt) : undefined,
        imageURL: result.imageURL,
        thumbnailURL: result.imageURL,
      })

      return movie
    }

    return null
  }

  async generateThumbnail(imageURL: string,): Promise<string | null> {
    const result = await this.get<Record<string, any>>(`/`, {
      params: {
        imageURL
      },
      baseURL:import.meta.env.VITE_LITEFLIX_LAMBDA_IMAGES
    })

    return result?.thumbnailURL ?? null
  }
}

export default LiteflixAPI
