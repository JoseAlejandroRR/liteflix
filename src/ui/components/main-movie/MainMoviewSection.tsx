import React, { useEffect, useState } from 'react'
import { Skeleton } from 'antd'
import FeaturedMovieCard from '../movie-card/FeatureMoviewCard'
import { MovieDto } from '../../../data/dto/MovieDto'

import './MainMovieSection.scss'
import { useHomePage } from '../../pages/HomePage'

type MainMovieSectionProps = {
  movies: MovieDto[]
}

const MainMovieSection: React.FC<MainMovieSectionProps> = ({ movies }) => {
  const [currentMovie, setCurrentMovie] = useState<number>(0)
  const { isReady } = useHomePage()

  useEffect(() => {
    if (!isReady) {
      return
    }

    const interval = setInterval(() => {
        let newIndex = currentMovie + 1
        if (newIndex >= movies.length) newIndex = 0
        setCurrentMovie(newIndex)
    }, 10000)

    return () => clearInterval(interval)
  }, [currentMovie, movies])

  if (movies.length < 1) return <Skeleton />

  return (
    <>
    <FeaturedMovieCard key={movies[currentMovie].id} movie={movies[currentMovie]} />
    </>
  )
}

export default MainMovieSection
