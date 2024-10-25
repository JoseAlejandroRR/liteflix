
export class CreateMovieDto {
  id?: number
  title!: string
  description?: string
  voteCount?: number
  voteAverage?: number
  releasedAt?: Date
  language?: 'en' |'es' | 'pt' | 'fr'
}
