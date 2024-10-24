import React, { useState } from 'react'
import { AiOutlinePlus, AiOutlineMenu, AiOutlineBell } from 'react-icons/ai'
import MenuNavigationDrawer from '../modals/NavigationMenuDrawer/MenuNavigationDrawer'
import UserAvatar from '../modals/user-avatar/UserAvatar'
import MovieUploadModal from '../modals/MovieUploadModal/MovieUploadModal'

import './Navbar.scss'

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)

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
        <a href="#">
          <span>LITE</span>FLIX
        </a>
      </div>
      <div className="actions">
        <ul className="left-actions">
          <li className="action-add"><a href="#" onClick={handleShowForm}><AiOutlinePlus/> Agregar Película</a></li>
          <li className="action-menu"><a href="#"><AiOutlineMenu/></a></li>
        </ul>
        <ul className="right-actions">
          <li className="action-menu"><a href="#" onClick={toggleMenu}><AiOutlineMenu/></a></li>
          <li className="action-notifications"><a href="#"><AiOutlineBell/></a></li>
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
