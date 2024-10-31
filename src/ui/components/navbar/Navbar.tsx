import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import MenuNavigationDrawer from '../modals/NavigationMenuDrawer/MenuNavigationDrawer'
import UserAvatar from '../modals/user-avatar/UserAvatar'
import MovieUploadModal from '../modals/MovieUploadModal/MovieUploadModal'
import MenuIcon from './../../../assets/menu.svg?react'
import BellIcon from './../../../assets/bell-icon.svg?react'
import BellDotIcon from './../../../assets/bell-dot-icon.svg?react'
import { useAuth } from '../../../data/hooks/useAuth'
import Logo from '../logo/Logo'

import './Navbar.scss'
import { MenuAction } from '../modals/NavigationMenuDrawer/NavigationMenu'

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [notificationList] = useState([{}])
  const { auth, logout } = useAuth()


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

  const onEventMenuClicked = (action: MenuAction) => {
    if (action === MenuAction.ADD_MOVIE) {
      setShowForm(true)
    }

    if (action === MenuAction.LOGOUT) {
      logout()
    }

    setShowMenu(false)
  }

  return (
    <>
    <nav className="navbar">
      <div className="logo">
        <Logo />
      </div>
      <div className="actions">
        <ul className="left-actions">
          <li className="action-add"><a href="#" onClick={handleShowForm} aria-label="Agregar película"><AiOutlinePlus/> Agregar Película</a></li>
          <li className="action-menu"><a href="#" onClick={toggleMenu} aria-label="Menú"><MenuIcon/></a></li>
        </ul>
        <ul className="right-actions">
          <li className="action-menu"><a href="#" onClick={toggleMenu} aria-label="Menú"><MenuIcon/></a></li>
          <li className="action-notifications">
            <a href="#" aria-label="Notificaciones"> { notificationList.length > 0 ? (<BellDotIcon />) : (<BellIcon />) } </a>
          </li>
          <li className="action-avatar" title={auth.user?.firstname}>
          <UserAvatar />
          </li>
        </ul>
      </div>
    </nav>
    <MenuNavigationDrawer open={showMenu} onClose={toggleMenu} onActionClicked={onEventMenuClicked} />
    <MovieUploadModal open={showForm} onClose={handleClose} />
    </>
  )
}

export default Navbar
