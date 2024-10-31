import React, { useEffect, useState } from 'react'
import MovieCard from '../movie-card/MovieCard'
import DropdownMenu, { DropdownMenuItem } from '../dropdown-menu/DropdownMenu'
import { useMoviesPopular } from '../../../data/hooks/useMoviesPopular'
import { useMyMovies } from '../../../data/hooks/useMyMovies'
import { notification, Spin } from 'antd'
import { useIsFirstRender } from '../../utils'
import { useAuth } from '../../../data/hooks/useAuth'

type PopularMoviesList = {
  length: number
}

const items: DropdownMenuItem[] = [
  {
    key: '1', label: 'Populares'
  },
  {
    key: '2', label: 'Mis Películas'
  },
]

const PopularMoviesList: React.FC<PopularMoviesList> = ({ length }) => {
  const {
    movies: moviesPopular, loading: loadingPopular,
    getMovies: getPopularMovies, error: errorPopular
  } = useMoviesPopular()
  const {
    movies: myMovies, isLoading: loadingMyMovies,
    getMyMovieList: getMyMovies, error: errorMyMovies,
  } = useMyMovies()
  const [ category, setCategory ] = useState<DropdownMenuItem>(items[0])
  const [ isReady, setIsReady ] = useState<boolean>(false)
  const [ isRenderList, setIsRenderList ] = useState<boolean>(false)
  const { auth, settings } = useAuth()

  const movies = category.key === items[0].key ? moviesPopular : myMovies
  const isLoading = loadingMyMovies || loadingPopular
  const checkError = errorPopular || errorMyMovies
  const istFirstRender = useIsFirstRender()

  useEffect(() => {
    if (istFirstRender && auth.token, settings) {
      if (settings.preloadContent) {
        getPopularMovies().then(() => {
          return getMyMovies(false)
        }).then(() => {
          console.info('[PreloadedData] Success')
        }).catch((err) => {
          console.log('[LoadingCacheData] Error: ', err)
        })
      }
    }

    if (category.key === items[0].key) {
      getPopularMovies()
      return
    }

    if (category.key === items[1].key) {
      getMyMovies()
      return
    }
  }, [category])

  useEffect(() => {
    if (isReady === true) return
    setIsReady(true)
  }, [isReady])

  useEffect(() => {
    if (!checkError) return
    notification.info({ message: 'Categoria no disponible', placement: 'bottomRight' })
  }, [checkError])

  const handleCategorySelected = (item: DropdownMenuItem) => {
    setCategory(item)
    setIsRenderList(true)
  }

  if (!isReady) return <>Cargando</>

  return (
    <aside className="sidebar-popular-movies">
      <DropdownMenu defaultValue={items[0]} menu={items} onSelected={handleCategorySelected} />
      {
        isLoading && (
          <>
            <Spin />
          </>
        )
      }
      <ul>
        {movies && movies.slice(0, length).map((movie, index) => (
          <li key={movie.id}>
              <MovieCard key={movie.id} movie={movie}
                index={index} show={isReady} delay={ isRenderList ? (index * 0.25) + 0.5 : (index * .25) + 2 } />
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default PopularMoviesList
