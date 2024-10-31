import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import './NavigationMenu.scss'

export enum MenuAction {
  ADD_MOVIE,
  LOGOUT,
}

type NavigationMenu = {
  onSelectAction: (trigger: MenuAction) => void
}

const NavigationMenu: React.FC<NavigationMenu> = ({
  onSelectAction,
}) => {

  const handlerClick = (e:React.MouseEvent, trigger: MenuAction) => {
    e.preventDefault()
    onSelectAction(trigger)
  }

  return (
    <div className="menu-navigation">
      <ul>
        <li>
          <a href="#" aria-label="Inicio">Inicio</a>
        </li>
        <li>
          <a href="#" aria-label="Series">Series</a>
        </li>
        <li>
          <a href="#" aria-label="Películas">Películas</a>
        </li>
        <li>
          <a href="#" aria-label="Agregados Recientes">Agregadas Recientemente</a>
        </li>
        <li>
          <a href="#" aria-label="Populares">Populares</a>
        </li>
        <li>
          <a href="#" aria-label="Mis Películas">Mis Películas</a>
        </li>
        <li>
          <a href="#" aria-label="Mi Lista">Mi Lista</a>
        </li>
        <li className="highlight">
          <a href="#" aria-label="Agregar película" onClick={(e) => handlerClick(e, MenuAction.ADD_MOVIE)}>
            <AiOutlinePlus /> Agregar Película
          </a>
        </li>
        <li>
          <a href="#" aria-label="Cerrar sesión" onClick={(e) => handlerClick(e, MenuAction.ADD_MOVIE)}>
            Cerrar sessión
          </a>
        </li>
      </ul>
    </div>
  )
}

export default NavigationMenu
