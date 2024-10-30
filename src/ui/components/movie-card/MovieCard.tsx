import React, { useRef, useState } from 'react'
import ButtonPlay from '../btn-play/ButtonPlay'
import { MovieDto } from '../../../data/dto/MovieDto'
import { AnimationBox } from '../animations/AnimationBox'
import { useMediaQuery, useClickOutside } from '../../utils'

import './MovieCard.scss'

interface MovieCardProps {
  movie: MovieDto,
  index: number,
  show?: boolean,
  delay?: number
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, show, delay }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasFocus, setHasFocus] = useState(false)
  const isMobileView = useMediaQuery('(max-width: 780px)')
  const cardRef = useRef(null)

  useClickOutside(cardRef, (out) => {
    if (!isMobileView) return

    if (out) {
      if (hasFocus === false) return
      setTimeout(() => {
        setHasFocus(false)
        console.log(hasFocus)
      }, 100)
    } else {
      setHasFocus(true)
    }
  })

  return (
    <AnimationBox delay={ delay ?? 1} effect="down-up" style={{ display: show && isLoaded ? 'block' : 'none' }}>
      <div ref={cardRef} id={movie.id} className={`movie-card ${isMobileView ? 'movie-card-mobile' : ''} ${hasFocus ? 'movie-card-active' : ''}`}>
        <div className="image-container">
          <img src={movie.thumbnailURL} alt={movie.title} className="movie-image"
            onLoad={() => setIsLoaded(true)}
          />
          <div className="overlay">
            <ButtonPlay size="xl" />
            <h3 className="movie-title">{movie.title.toUpperCase()}</h3>
          </div>
          <div className="movie-info" data-parentid={movie.id}>
            <div className="movie-details">
              <ButtonPlay/>
              <h3 className="movie-title">{movie.title.toUpperCase()}</h3>
            </div>
            <div className="info-extra">
              <span className="movie-rating">
                { movie.voteAverage ? `★ ${movie.voteAverage.toFixed(1)}` : '' }
              </span>
              <span className="movie-year">
              { movie.releasedAt ? `${movie.releasedAt.getFullYear()}` : '' }
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimationBox>
  )
}

export default MovieCard
