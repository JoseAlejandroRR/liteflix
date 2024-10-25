
import { useEffect } from 'react'
import MainMovieSection from '../components/main-movie/MainMoviewSection'
import Navbar from '../components/navbar/Navbar'
import PopularMoviesList from '../components/popular-movies-list/PopularMoviesList'
import { useMoviesFeatured } from '../../data/hooks/useMoviesFeatured'

import './HomePage.scss'

const HomePage: React.FC =  () => {
  const { movies: moviesFeatured, getMovies: getFeaturedMovies } = useMoviesFeatured()

  const moviesSize = Number(import.meta.env.VITE_MOVIES_FEATURED_LIMIT ?? 5)

  useEffect(() => {
    getFeaturedMovies()
  }, [])

  return (
    <>
      <div className="home-page">
        <Navbar />
        <div className="content">
          <MainMovieSection movies={moviesFeatured.slice(0, moviesSize)} />
          <PopularMoviesList length={moviesSize} />
        </div>
      </div>
    </>
  )
}

export default HomePage
