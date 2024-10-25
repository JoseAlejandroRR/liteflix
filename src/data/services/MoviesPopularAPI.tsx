import { MovieDto } from '../dto/MovieDto'
import BackendService from './BackendService'

class MoviesPopularAPI extends BackendService {

  constructor() {
    super(import.meta.env.VITE_MOVIES_POPULAR_API)
  }

  async getAll(): Promise<MovieDto[]> {
    const movies: MovieDto[] = []

    const data = await this.get<Record<string, any>>('')

    data.results.forEach((item: Record<string, any>) => {
      const movie = MovieDto.create({
        id: item.id,
        title: item.title,
        voteCount: item.vote_count,
        voteAverage: item.vote_average,
        imageURL: `https://image.tmdb.org/t/p/original${item.poster_path}`,
        thumbnailURL: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        releasedAt: new Date(item.release_date),
        language: 'en'
      })
      movies.push(movie)
    })

    return movies
  }

}

export default MoviesPopularAPI
