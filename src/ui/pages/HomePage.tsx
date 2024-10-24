
import { useEffect } from 'react'
import MainMovieSection from '../components/main-movie/MainMoviewSection'
import Navbar from '../components/navbar/Navbar'
import PopularMoviesList from '../components/popular-movies-list/PopularMoviesList'
import { useMoviesPopular } from '../../data/hooks/useMoviesPopular'

import './HomePage.scss'

const HomePage: React.FC =  () => {
  const { movies: moviesHighligh, getHighlightMovies } = useMoviesPopular()

  const moviesSize = 4

  useEffect(() => {
    getHighlightMovies()
  }, [])

  return (
    <>
      <div className="home-page">
        <Navbar />
        <div className="content">
          <MainMovieSection movies={moviesHighligh.slice(0, moviesSize)} />
          <PopularMoviesList movies={moviesHighligh.slice(0, moviesSize)} />
        </div>
      </div>
    </>
  )
}

export default HomePage
