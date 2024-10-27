import React, { useEffect, useState } from 'react'
import MovieCard from '../movie-card/MovieCard'
import DropdownMenu, { DropdownMenuItem } from '../dropdown-menu/DropdownMenu'
import { AnimationBox } from '../animations/AnimationBox'
import { useMoviesPopular } from '../../../data/hooks/useMoviesPopular'
import { useMyMovies } from '../../../data/hooks/useMyMovies'
import { notification, Spin } from 'antd'

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
    movies: myMovies, loading: loadingMyMovies,
    getMyMovieList: getMyMovies, error: errorMyMovies,
  } = useMyMovies()
  const [ category, setCategory ] = useState<DropdownMenuItem>(items[0])

  const movies = category.key === items[0].key ? moviesPopular : myMovies

  const isLoading = loadingMyMovies || loadingPopular
  const checkError = errorPopular || errorMyMovies

  useEffect(() => {
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
    console.log(checkError)
    if (!checkError) return
    notification.info({ message: 'Categoria no disponible', placement: 'bottomRight' })
  }, [checkError])

  /*const popularMovies = [
    { title: 'HOUSE OF CARDS', image: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABfDBXd9joUxbI6ThPWavzQ753B-EtfISnu7-pGrxSnRBTF37Pw_KXXTHkIglVudu_aycJzyfD8ftoyeuQDVo5tIvMUdLvsvIzAslTHptQ1SwCXX2QcVijxE2dA.jpg?r=43d' },
    { title: 'THE ETERNAL SUNSHINE OF A MIND', image: 'https://media.self.com/photos/5969182f9bf47f696c418d39/master/pass/game-of-thrones-final.jpg' },
    { title: 'STRANGER THINGS', image: 'https://image.tmdb.org/t/p/w500/4KHEK6AQFHhv4TDtL3KLReePB05.jpg' },
    { title: 'MARSEILLE', image: 'https://image.tmdb.org/t/p/w500/3m0j3hCS8kMAaP9El6Vy5Lqnyft.jpg' },
  ]*/

  const handleCategorySelected = (item: DropdownMenuItem) => {
    console.log("SELECTED: ", item)
    setCategory(item)
  }

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
            <AnimationBox delay={index * 0.25} effect="down-up">
              <MovieCard key={movie.id} movie={movie} />
            </AnimationBox>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default PopularMoviesList
