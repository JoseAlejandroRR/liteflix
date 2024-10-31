import React from "react"
import { Button, Drawer, Space } from 'antd'
import NavigationMenu, { MenuAction } from './NavigationMenu'
import UserAvatar from '../user-avatar/UserAvatar'
import BellDotIcon from './../../../../assets/bell-dot-icon.svg?react'

import './MenuNavigationDrawer.scss'
import { CiSettings } from "react-icons/ci"

type MenuNavigationDrawerProps = {
  open: boolean
  onClose: () => void
  onActionClicked: (action: MenuAction) => void
}

const MenuNavigationDrawer: React.FC<MenuNavigationDrawerProps> = ({
  open, onClose, onActionClicked
}) => {
  
  const handleClose = () => {
    if (onClose) onClose()
  }

  const handleSettings = () => {
    onActionClicked(MenuAction.SETTINGS)
  }

  const handleNotifications = () => {
    onActionClicked(MenuAction.NOTIFICATIONS)
  }

  return (
    <Drawer open={open} styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      onClose={handleClose}
      className="navigation-menu-drawer"
      extra={
        <Space>
          <Button className="action-btn" icon={<CiSettings />} onClick={handleSettings} aria-label="Configuración" />
          <Button className="action-btn" icon={<BellDotIcon />} onClick={handleNotifications} aria-label="Notificaciones" />
          <UserAvatar onSelectAction={onActionClicked} />
        </Space>
      }>
      <NavigationMenu onSelectAction={onActionClicked} />
    </Drawer>
  )
}

export default MenuNavigationDrawer
