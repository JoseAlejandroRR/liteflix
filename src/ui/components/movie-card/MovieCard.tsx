import React from 'react';
import ButtonPlay from '../btn-play/ButtonPlay'
import { MovieDto } from '../../../data/dto/MovieDto'

import './MovieCard.scss'

interface MovieCardProps {
  movie: MovieDto
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

  return (
    <div className="movie-card">
      <div className="image-container">
        <img src={movie.thumbnailURL} alt={movie.title} className="movie-image" />
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
  )
}

export default MovieCard
