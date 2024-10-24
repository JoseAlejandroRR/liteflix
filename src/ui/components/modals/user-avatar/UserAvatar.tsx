import React from 'react'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { BiUser } from 'react-icons/bi'

const UserAvatar: React.FC = () => {

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="#">
          My profile
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="#">
          Logout
        </a>
      ),
      disabled: true,
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
