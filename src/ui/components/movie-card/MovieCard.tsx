import React, { useState } from 'react';
import ButtonPlay from '../btn-play/ButtonPlay'
import { MovieDto } from '../../../data/dto/MovieDto'
import { AnimationBox } from '../animations/AnimationBox'

import './MovieCard.scss'

interface MovieCardProps {
  movie: MovieDto,
  index: number
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <AnimationBox delay={index * 0.25 +0.25} effect="down-up" style={{ display: isLoaded ? 'block' : 'none' }}>
      <div className="movie-card">
        <div className="image-container">
          <img src={movie.thumbnailURL} alt={movie.title} className="movie-image"
            onLoad={() => setIsLoaded(true)}
          />
          <div className="overlay">
            <ButtonPlay size="xl" />
            <h3 className="movie-title">{movie.title.toUpperCase()}</h3>
          </div>
          <div className="movie-info">
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
