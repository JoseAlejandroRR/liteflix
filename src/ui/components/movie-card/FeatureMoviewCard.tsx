import { MovieDto } from '../../../data/dto/MovieDto'
import { AnimationBox } from '../animations/AnimationBox'
import { PiPlay } from 'react-icons/pi'
import { LoadingOutlined } from '@ant-design/icons'
import { AiOutlinePlus } from 'react-icons/ai'
import { useEffect } from 'react'
import { Spin } from 'antd'
import { useHomePage } from '../../../data/hooks/home/connectHome'

type FeaturedMovieCardProps = {
  movie: MovieDto
}

const FeaturedMovieCard: React.FC<FeaturedMovieCardProps> = ({ movie }) => {
  const { isLoading, notifyStatus } = useHomePage()

  useEffect(() => {
    notifyStatus(true)
  }, [movie])

  const handlerLoad = () => {
    notifyStatus(false)
  }

  return (
    <section className="main-movie">

      <img src={movie.imageURL} alt={ movie.title } style={{ display: isLoading ? 'none' : 'block' }}
        className="featured-image" onLoad={handlerLoad}
      />
      {
        isLoading && (
          <>
             <Spin style={{ position: 'absolute' }} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </>
        )
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
