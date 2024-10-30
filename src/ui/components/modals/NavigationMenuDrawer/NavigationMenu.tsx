import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import './NavigationMenu.scss'

const NavigationMenu: React.FC = () => {

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
          <a href="#" aria-label="Agregadas recientemente">Agregadas Recientemente</a>
        </li>
        <li>
          <a href="#" aria-label="Populares">Populares</a>
        </li>
        <li>
          <a href="#" aria-label="Mis pelícukas">Mis Películas</a>
        </li>
        <li>
          <a href="#" aria-label="Mi Lista">Mi Lista</a>
        </li>
        <li className="highlight">
          <a href="#" aria-label="Agregar película"><AiOutlinePlus /> Agregar Película</a>
        </li>
        <li>
          <a href="#" aria-label="Cerrar sesión">Cerrar sessión</a>
        </li>
      </ul>
    </div>
  )
}

export default NavigationMenu
