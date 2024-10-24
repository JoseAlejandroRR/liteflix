import { useState } from 'react'
import { MovieDto } from '../../../data/dto/MovieDto'
import { AnimationBox } from '../animations/AnimationBox'
import { PiPlay } from 'react-icons/pi'
import { AiOutlinePlus } from 'react-icons/ai'

type FeaturedMovieCardProps = {
  movie: MovieDto
}

const FeaturedMovieCard: React.FC<FeaturedMovieCardProps> = ({ movie }) => {

  return (
    <section className="main-movie" key={movie.id}>

      <img src={movie.imageURL} alt={ movie.title } className="featured-image" />

      <div className="movie-info">

        <AnimationBox duration={1} delay={0.2} effect={'up-down'}>
          <h3>Original de <span>LITEFLIX</span> </h3>
        </AnimationBox>
        <AnimationBox duration={1} delay={0.5} effect={'down-up'}>
          <h1>{ movie.title }</h1>
        </AnimationBox>

        <div className="buttons">
          <div className="animated-button">
            <div>
              <span className="label">
                <PiPlay /> 
                Reproducir
              </span> 
            </div>
          </div>
         
          <div className="animated-button animated-button-with-boders">
            <div>
              <span className="label">
                <AiOutlinePlus /> 
                Mi Lista
              </span> 
            </div>
          </div>
        </div>

      </div>

    </section>
  )
}

export default FeaturedMovieCard
