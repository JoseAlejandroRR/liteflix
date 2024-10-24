import React, { useState } from 'react'
import { Dropdown, MenuProps, Typography } from 'antd'
import { DownOutlined, CheckOutlined } from '@ant-design/icons'

import './DropdownMenu.scss'

export type DropdownMenuItem = {
  key: string
  label: string
}

type DropdownMenuProps = {
  menu: DropdownMenuItem[]
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ menu }) => {
  const [selected, setSelected] = useState('Populares');

  const handlerClick = (key: string) => {
    setSelected(key)
  }

  const items: MenuProps['items'] = menu.map((item) => ({
    key: item.key,
    label:  (
      <span>
        { item.label } {selected === item.label && <CheckOutlined />}
      </span>
    ),
    onClick: () => handlerClick(item.label) 
  }))

  return (
    <div className="dropdown-menu">
      <Dropdown menu={{items}} trigger={['click']} placement="bottomLeft" overlayClassName="dropdown-menu-active">
        <Typography.Text className="item-selected"
          style={{ color: 'white', cursor: 'pointer', textTransform: 'uppercase' }}
          >
          Ver: <span>{selected}</span> <DownOutlined />
        </Typography.Text>
      </Dropdown>
    </div>
  )
}

export default DropdownMenu
