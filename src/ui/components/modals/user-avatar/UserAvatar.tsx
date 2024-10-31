import React from 'react'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { BiUser } from 'react-icons/bi'
import { MenuAction } from '../NavigationMenuDrawer/NavigationMenu'

type UserAvatarProps = {
  onSelectAction: (trigger: MenuAction) => void
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  onSelectAction
}) => {

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="#" aria-label="Mi cuenta">
          Configuración
        </a>
      ),
      onClick: () => onSelectAction(MenuAction.SETTINGS)
    },
    {
      key: '2',
      label: (
        <a target="#" aria-label="logout">
          Logout
        </a>
      ),
      onClick: () => onSelectAction(MenuAction.LOGOUT)
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" overlayClassName="dropdown-menu-active">
      <Button type="text" style={{ padding: 0 }} aria-label="Mi perfil">
        <Avatar
          size="large"
          icon={<BiUser />}
          style={{ cursor: 'pointer' }}
        />
      </Button>
    </Dropdown>
  )
}

export default UserAvatar
