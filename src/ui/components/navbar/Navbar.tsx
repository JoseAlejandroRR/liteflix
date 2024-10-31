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
import UserSettingsModal from '../modals/UserSettingsModal/UserSettingsModal'
import { notification } from 'antd'

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [notificationList] = useState([{}])
  const { logout } = useAuth()

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

  const handleCloseSettings = () => {
    setShowSettings(false)
  }

  const onEventMenuClicked = (action: MenuAction) => {
    let close = true

    if (action === MenuAction.ADD_MOVIE) {
      setShowForm(true)
    }

    if (action === MenuAction.LOGOUT) {
      logout()
    }

    if (action === MenuAction.SETTINGS) {
      close = false
      setShowSettings(true)
    }

    if (action === MenuAction.NOTIFICATIONS) {
      close = false
      notification.info({ message: 'Sin notificaciones', placement: 'bottomRight' })
    }

    if (close) {
      setShowMenu(false)
    }
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
          <li className="action-notifications" onClick={() => onEventMenuClicked(MenuAction.NOTIFICATIONS)}>
            <a href="#" aria-label="Notificaciones"> { notificationList.length > 0 ? (<BellDotIcon />) : (<BellIcon />) } </a>
          </li>
          <li className="action-avatar">
          <UserAvatar onSelectAction={onEventMenuClicked} />
          </li>
        </ul>
      </div>
    </nav>
    <MenuNavigationDrawer open={showMenu} onClose={toggleMenu} onActionClicked={onEventMenuClicked} />
    <MovieUploadModal open={showForm} onClose={handleClose} />
    <UserSettingsModal open={showSettings} onClose={handleCloseSettings} />
    </>
  )
}

export default Navbar
