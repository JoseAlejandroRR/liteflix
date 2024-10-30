
import { createContext, useContext, useEffect, useState } from 'react'
import MainMovieSection from '../components/main-movie/MainMoviewSection'
import Navbar from '../components/navbar/Navbar'
import PopularMoviesList from '../components/popular-movies-list/PopularMoviesList'
import { useMoviesFeatured } from '../../data/hooks/useMoviesFeatured'
import { useAuth } from '../../data/hooks/useAuth'
//import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import './HomePage.scss'

const moviesSize = Number(import.meta.env.VITE_MOVIES_FEATURED_LIMIT ?? 5)

type HomeContextProps = {
  isLoading: boolean,
  isReady: boolean
  notifyStatus: (status: boolean) => void
}

const HomeContext = createContext<HomeContextProps>({
  isLoading: false,
  isReady: false,
  notifyStatus: () => {}
})

export const useHomePage = () => useContext(HomeContext)

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const { movies: moviesFeatured, getMovies: getFeaturedMovies } = useMoviesFeatured()
  const { auth } = useAuth()
  //const navigate = useNavigate()

  useEffect(() => {
    if (!auth.token) {
      //navigate('/login')
    }
  }, [auth])

  const notifyStatus = (loading: boolean) => {
    setIsLoading(loading)
    if (isReady === false) {
      setIsReady(true)
    }
  }

  useEffect(() => {
    getFeaturedMovies()
  }, [])

  return (
    <HomeContext.Provider value={{ isLoading, isReady, notifyStatus }}>
      <div className="home-page">
        <Navbar />
        <div className="content">
          <MainMovieSection movies={moviesFeatured.slice(0, moviesSize)} />
          <PopularMoviesList length={moviesSize} />
        </div>
      </div>
      {
        isReady ? (
          <>
          </>
        ) : (
          <div className="home-page-loading">
             <Spin style={{ position: 'absolute' }} indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </div>
        )
      }
   </HomeContext.Provider>
  )
}

//<LoaderImagesEager onLoad={() => {}} imageUrls={moviesFeatured.slice(1, moviesSize).map((movie) => movie.imageURL)} />

export default HomePage
