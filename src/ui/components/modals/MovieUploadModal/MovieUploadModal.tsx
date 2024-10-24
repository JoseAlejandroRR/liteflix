import React, { useState } from 'react'
import { Modal, Upload, Input, Button } from 'antd'
import { PaperClipOutlined } from '@ant-design/icons'

import './MovieUploadModal.scss'
import { UploadChangeParam } from 'antd/es/upload';

const { Dragger } = Upload;

interface MovieUploadModalProps {
  open: boolean
  onClose: () => void
}

const MovieUploadModal: React.FC<MovieUploadModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (info: UploadChangeParam) => {
    const { fileList } = info
    const fileSelection = fileList.length ? fileList[0].originFileObj : null
    setFile(fileSelection as File)
  }

  const isButtonDisabled = !file || !title;

  const handleClose = () => {
    if (onClose) onClose()
  }

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={720}
      className="movie-upload-modal"
      centered
      closeIcon={<span className="close-icon">X</span>}
      transitionName="ant-modal-slide-up"
      maskTransitionName="ant-modal-mask-slide-up"
    >
      <h2 className="modal-title">Agregar Película</h2>

      <div className="input-container">
        <Dragger
          name="file"
          multiple={false}
          onChange={(info ) => {
            console.log(info)
            handleFileChange(info)
          }}
          className="drag-upload"
          showUploadList={false}
          >
          <p className="ant-upload-text"><PaperClipOutlined />Agregá un archivo o arrástralo y soltalo aqui</p>
        </Dragger>
      </div>

      <div className="input-container">
        <Input
          className="movie-title-input"
          placeholder="título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="input-container">
        <Button
          className="upload-button"
          type="primary"
          disabled={isButtonDisabled}
          >
          Subir Película
        </Button>
      </div>
    </Modal>
  )
}

export default MovieUploadModal
