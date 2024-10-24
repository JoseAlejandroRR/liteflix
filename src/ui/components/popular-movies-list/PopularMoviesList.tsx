import React from 'react'
import MovieCard from '../movie-card/MovieCard'
import DropdownMenu, { DropdownMenuItem } from '../dropdown-menu/DropdownMenu'
import { AnimationBox } from '../animations/AnimationBox'
import { MovieDto } from '../../../data/dto/MovieDto'

type PopularMoviesList = {
  movies: MovieDto[]
}

const PopularMoviesList: React.FC<PopularMoviesList> = ({ movies }) => {
  /*const popularMovies = [
    { title: 'HOUSE OF CARDS', image: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABfDBXd9joUxbI6ThPWavzQ753B-EtfISnu7-pGrxSnRBTF37Pw_KXXTHkIglVudu_aycJzyfD8ftoyeuQDVo5tIvMUdLvsvIzAslTHptQ1SwCXX2QcVijxE2dA.jpg?r=43d' },
    { title: 'THE ETERNAL SUNSHINE OF A MIND', image: 'https://media.self.com/photos/5969182f9bf47f696c418d39/master/pass/game-of-thrones-final.jpg' },
    { title: 'STRANGER THINGS', image: 'https://image.tmdb.org/t/p/w500/4KHEK6AQFHhv4TDtL3KLReePB05.jpg' },
    { title: 'MARSEILLE', image: 'https://image.tmdb.org/t/p/w500/3m0j3hCS8kMAaP9El6Vy5Lqnyft.jpg' },
  ]*/

  const items: DropdownMenuItem[] = [
    {
      key: '1', label: 'Populares'
    },
    {
      key: '2', label: 'Mis Películas'
    },
  ]

  return (
    <aside className="sidebar-popular-movies">
      <DropdownMenu menu={items} />
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <AnimationBox delay={index * 0.1} effect="down-up">
              <MovieCard key={movie.title} movie={movie} />
            </AnimationBox>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default PopularMoviesList
