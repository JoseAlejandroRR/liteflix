import React from 'react'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { BiUser } from 'react-icons/bi'
import { useAuth } from '../../../../data/hooks/useAuth'

const UserAvatar: React.FC = () => {
  const { logout } = useAuth()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="#">
          Mi Cuenta
        </a>
      ),
      disabled: true,
    },
    {
      key: '2',
      label: (
        <a target="#">
          Logout
        </a>
      ),
      onClick: logout
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" overlayClassName="dropdown-menu-active">
      <Button type="text" style={{ padding: 0 }}>
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
