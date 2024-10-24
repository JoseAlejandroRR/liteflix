import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import './NavigationMenu.scss'

const NavigationMenu: React.FC = () => {

  return (
    <div className="menu-navigation">
      <ul>
        <li>
          <a href="#" title="">Inicio</a>
        </li>
        <li>
          <a href="#" title="">Series</a>
        </li>
        <li>
          <a href="#" title="">Películas</a>
        </li>
        <li>
          <a href="#" title="">Agregadas Recientemente</a>
        </li>
        <li>
          <a href="#" title="">Populares</a>
        </li>
        <li>
          <a href="#" title="">Mis Películas</a>
        </li>
        <li>
          <a href="#" title="">Mi Lista</a>
        </li>
        <li className="highlight">
          <a href="#" title=""><AiOutlinePlus /> Agregar Película</a>
        </li>
        <li>
          <a href="#" title="">Cerrar sessión</a>
        </li>
      </ul>
    </div>
  )
}

export default NavigationMenu
