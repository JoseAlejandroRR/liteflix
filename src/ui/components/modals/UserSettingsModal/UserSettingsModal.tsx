import { useEffect, useState } from 'react'
import {  Modal, Switch, Typography } from 'antd'
import { TfiClose } from 'react-icons/tfi'
import { useAuth } from '../../../../data/hooks/useAuth'

import './UserSettingsModal.scss'

type UserSettingsModalProps = {
  open: boolean
  onClose: () => void
}

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({
  open, onClose
}) => {
  const [fullRes, setFullRes] = useState<boolean>(false)
  const [preload, setPreload] = useState<boolean>(true)
  const { auth, settings, updateSettings } = useAuth()

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    if (!settings) return

    setFullRes(settings.full4k)
    setPreload(settings.preloadContent)
  }, [auth])

  const updateResolution = (value: boolean) => {
    setFullRes(value)
    updateSettings({
      ...settings, 
      full4k: value
    })
  }

  const updatePreloaders = (value: boolean) => {
    setPreload(value)
    updateSettings({
      ...settings, 
      preloadContent: value
    })
  }
  
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={720}
      className="user-settings-modal"
      centered
      closeIcon={<TfiClose />}
      transitionName="ant-modal-slide-up"
      maskTransitionName="ant-modal-mask-slide-up"
    >
      <Typography.Title level={1}>
        Configuración
      </Typography.Title>

      <div className="input-user">
        <label>Resolución 4k</label>
        <Switch value={fullRes} onChange={updateResolution} />
        <p>Para conexiones lentas o inestables podría afectar la experiencia de usuario </p>
      </div>

      <div className="input-user">
        <label>Precargar mi contenido favorito</label>
        <Switch value={preload} onChange={updatePreloaders} />
        <p>Para conexiones lentas o inestables podría ralentizar la conexion </p>
      </div>

    </Modal>
  )
}

export default UserSettingsModal
