import React from "react"
import { Button, Drawer, Space } from 'antd'
import NavigationMenu from './NavigationMenu'
import UserAvatar from '../user-avatar/UserAvatar'
import BellDotIcon from './../../../../assets/bell-dot-icon.svg?react'

import './MenuNavigationDrawer.scss'

type MenuNavigationDrawerProps = {
  open: boolean
  onClose: () => void
}

const MenuNavigationDrawer: React.FC<MenuNavigationDrawerProps> = ({
  open, onClose
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
          <Button className="action-btn" icon={<BellDotIcon />} onClick={() => {}} />
          <UserAvatar />
        </Space>
      }>
      <NavigationMenu />
    </Drawer>
  )
}

export default MenuNavigationDrawer
