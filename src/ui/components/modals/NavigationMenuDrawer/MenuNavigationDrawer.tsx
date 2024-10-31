import React from "react"
import { Button, Drawer, Space } from 'antd'
import NavigationMenu, { MenuAction } from './NavigationMenu'
import UserAvatar from '../user-avatar/UserAvatar'
import BellDotIcon from './../../../../assets/bell-dot-icon.svg?react'

import './MenuNavigationDrawer.scss'

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
          <Button className="action-btn" icon={<BellDotIcon />} onClick={() => {}} aria-label="Notificaciones" />
          <UserAvatar />
        </Space>
      }>
      <NavigationMenu onSelectAction={onActionClicked} />
    </Drawer>
  )
}

export default MenuNavigationDrawer
