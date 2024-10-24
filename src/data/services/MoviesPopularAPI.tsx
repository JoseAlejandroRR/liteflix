import { MovieDto } from '../dto/MovieDto'
import BackendService from './BackendService'

class MoviesPopularAPI extends BackendService {

  constructor() {
    super(import.meta.env.VITE_MOVIES_POPULAR_API)
  }

  async getAll(): Promise<MovieDto> {
    return this.get<MovieDto>('')
  }

}

export default MoviesPopularAPI
