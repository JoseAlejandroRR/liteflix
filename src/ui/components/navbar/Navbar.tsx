import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import MenuNavigationDrawer from '../modals/NavigationMenuDrawer/MenuNavigationDrawer'
import UserAvatar from '../modals/user-avatar/UserAvatar'
import MovieUploadModal from '../modals/MovieUploadModal/MovieUploadModal'
import MenuIcon from './../../../assets/menu.svg?react'
import BellIcon from './../../../assets/bell-icon.svg?react'
import BellDotIcon from './../../../assets/bell-dot-icon.svg?react'
import Logo from '../logo/Logo'

import './Navbar.scss'

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [notificationList] = useState([{}])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleShowForm = (e:React.MouseEvent) => {
    e.preventDefault()
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
  }

  return (
    <>
    <nav className="navbar">
      <div className="logo">
        <Logo />
      </div>
      <div className="actions">
        <ul className="left-actions">
          <li className="action-add"><a href="#" onClick={handleShowForm}><AiOutlinePlus/> Agregar Película</a></li>
          <li className="action-menu"><a href="#" onClick={toggleMenu}><MenuIcon/></a></li>
        </ul>
        <ul className="right-actions">
          <li className="action-menu"><a href="#" onClick={toggleMenu}><MenuIcon/></a></li>
          <li className="action-notifications">
            <a href="#" aria-label="Ver notificaciones"> { notificationList.length > 0 ? (<BellDotIcon />) : (<BellIcon />) } </a>
          </li>
          <li className="action-avatar">
          <UserAvatar />
          </li>
        </ul>
      </div>
    </nav>
    <MenuNavigationDrawer open={showMenu} onClose={toggleMenu} />
    <MovieUploadModal open={showForm} onClose={handleClose} />
    </>
  )
}

export default Navbar
