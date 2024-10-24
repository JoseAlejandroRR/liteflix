import React from "react"
import { Button, Drawer, Space } from 'antd'
import NavigationMenu from './NavigationMenu'
import { AiOutlineBell } from 'react-icons/ai'
import UserAvatar from "../user-avatar/UserAvatar"

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
          <Button className="action-btn" icon={<AiOutlineBell />} onClick={() => {}} />
          <UserAvatar />
        </Space>
      }>
      <NavigationMenu />
    </Drawer>
  )
}

export default MenuNavigationDrawer
