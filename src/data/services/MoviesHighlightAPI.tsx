import { MovieDto } from '../dto/MovieDto'
import BackendService from './BackendService'

class MoviesHighlightAPI extends BackendService {

  constructor() {
    super(import.meta.env.VITE_MOVIES_HIGHLIGHT_API)
  }

  async getAll(): Promise<MovieDto[]> {
    const movies: MovieDto[] = []

    const data = await this.get<Record<string, any>>('')

    data.results.forEach((item: Record<string, any>) => {
      const movie = MovieDto.create({
        id: item.id,
        title: item.title,
        voteCount: item.vote_average,
        voteAverage: item.vote_count,
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

export default MoviesHighlightAPI
