import MovieStatus from './MovieStatus'

export class UpdateMovieDto {
  id?: string
  title!: string
  description?: string
  voteCount?: number
  voteAverage?: number
  releasedAt?: Date
  status?: MovieStatus
  language?: 'en' |'es' | 'pt' | 'fr'
}
