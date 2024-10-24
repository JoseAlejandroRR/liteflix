
export class MovieDto {
  id?: number
  title!: string
  imageURL!: string
  thumbnailURL?: string
  voteCount?: number
  voteAverage?: number
  releasedAt?: Date
  language?: 'en' |'es' | 'pt' | 'fr'

  static create(data: MovieDto) {
    const movie = new MovieDto()
    
    Object.assign(movie, {
      id: data.id,
      title: data.title,
      imageURL: `https://image.tmdb.org/t/p/original${data.imageURL}`,
      thumbnailURL: `https://image.tmdb.org/t/p/w500${data.thumbnailURL}`
    })

    return movie
  }
}
