import React, { useState } from 'react'
import { Dropdown, MenuProps, Typography } from 'antd'
import { DownOutlined, CheckOutlined } from '@ant-design/icons'

import './DropdownMenu.scss'

export type DropdownMenuItem = {
  key: string
  label: string
}

type DropdownMenuProps = {
  menu: DropdownMenuItem[],
  defaultValue?: DropdownMenuItem, 
  onSelected?: (item: DropdownMenuItem) => void
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  menu, defaultValue, onSelected
}) => {
  const [selected, setSelected] = useState<DropdownMenuItem>(defaultValue ?? menu[0]);

  const handlerClick = (item: DropdownMenuItem) => {
    setSelected(item)
    if (onSelected) onSelected(item)
  }

  const items: MenuProps['items'] = menu.map((item) => ({
    key: item.key,
    label:  (
      <span>
        { item.label } {selected.key === item.key && <CheckOutlined />}
      </span>
    ),
    onClick: () => handlerClick(item)
  }))

  return (
    <div className="dropdown-menu">
      <Dropdown menu={{items}} trigger={['click']} placement="bottomLeft" overlayClassName="dropdown-menu-active dropdown-menu-categories-active">
        <Typography.Text className="item-selected"
          style={{ color: 'white', cursor: 'pointer', textTransform: 'uppercase' }}
          >
          Ver: <span>{selected.label}</span> <DownOutlined />
        </Typography.Text>
      </Dropdown>
    </div>
  )
}

export default DropdownMenu
