import { useEffect } from 'react'
import { MovieDto } from '../../../data/dto/MovieDto'
import { AnimationBox } from '../animations/AnimationBox'
import { PiPlay } from 'react-icons/pi'
import { AiOutlinePlus } from 'react-icons/ai'
import ProgressiveImage from '../common/ProgressiveImage/ProgressiveImage'
import { useHomePage } from '../../pages/HomePage'

type FeaturedMovieCardProps = {
  movie: MovieDto
  qualityHigher: boolean
}

const FeaturedMovieCard: React.FC<FeaturedMovieCardProps> = ({ movie, qualityHigher }) => {
  const { isLoading, notifyStatus } = useHomePage()

  useEffect(() => {
    //notifyStatus(true)
  }, [movie])

  const handlerLoad = () => {
    notifyStatus(false)
  }

  return (
    <section className="main-movie">
      <ProgressiveImage className="featured-image" lowResImage={movie.thumbnailURL!} highResImage={movie.imageURL}
        onLoadHighRes={handlerLoad} alt={movie.title} qualityHigher={qualityHigher} />
      {/*
        isLoading && (
          <>
             <Spin style={{ position: 'absolute' }} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </>
        )*/
      }
      <div className="movie-info" style={{ display: isLoading ? 'none' : 'block' }}>
        <AnimationBox duration={1} delay={1} effect={'up-down'}>
          <h3>Original de <span>LITEFLIX</span> </h3>
        </AnimationBox>
        <AnimationBox duration={1} delay={1.5} effect={'down-up'}>
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
