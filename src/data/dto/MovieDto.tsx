import MovieStatus from './MovieStatus'

export class MovieDto {
  id?: string
  title!: string
  description?: string
  imageURL!: string
  thumbnailURL?: string
  voteCount?: number
  voteAverage?: number
  releasedAt?: Date
  status?: MovieStatus
  language?: 'en' |'es' | 'pt' | 'fr'

  static create(data: MovieDto) {
    const movie = new MovieDto()
    
    Object.assign(movie, {
      id: data.id,
      title: data.title,
      description: data.description,
      voteAverage: data.voteAverage,
      imageURL: data.imageURL,
      thumbnailURL: data.thumbnailURL,
      status: data.status,
      releasedAt: data.releasedAt,
    })

    return movie
  }
}
