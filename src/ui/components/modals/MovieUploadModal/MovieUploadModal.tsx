import React, { useState } from 'react'
import { Modal, Upload, Input, Button, notification, Progress } from 'antd'
import { PaperClipOutlined } from '@ant-design/icons'
import { TfiClose } from "react-icons/tfi";
import { UploadChangeParam, UploadProps } from 'antd/es/upload'
import { UploadRequestOption, UploadRequestError } from 'rc-upload/lib/interface'
import LiteflixAPI from '../../../../data/services/LiteflixAPI'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { MovieDto } from '../../../../data/dto/MovieDto'

import './MovieUploadModal.scss'

const { Dragger } = Upload;

interface MovieUploadModalProps {
  open: boolean
  onClose: () => void
}

const MovieUploadModal: React.FC<MovieUploadModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const liteflixApi = new LiteflixAPI()
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ progress, setProgress ] = useState<number>(0)
  const [request, setRequest] = useState<UploadRequestOption | null>(null)
  const [ movie, setMovie ] = useState<MovieDto | null>()
  const [ axiosCtr, setAxiosCtr ] = useState<AbortController>()
  const [ errorReq, setErrorReq ] = useState<AxiosError | null>(null)

  const handleFileChange = (info: UploadChangeParam) => {
    const { fileList } = info
    const fileSelection = fileList.length ? fileList[0].originFileObj : null
    setFile(fileSelection as File)
  }

  const isButtonDisabled = !file || !title;

  const handleClose = () => {
    setTitle('')
    setFile(null)
    if (onClose) onClose()
  }

  const customRequest = (req: UploadRequestOption) => {
    console.log('File Changed', req.file)
    setRequest(req)
  }

  const handleSubmit = async () => {
    const { onSuccess, onError, file } = request!

    setIsLoading(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('file', file)

    const apiRequest = new AbortController()
    setAxiosCtr(apiRequest)

    const config: AxiosRequestConfig = {
      signal: apiRequest.signal,
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(event)
        let percent = Math.floor((event.loaded / (event.total ?? event.loaded )) * 100);
        percent = percent > 99 ? 0 : percent 
        console.log("PERCENT: ", percent)
        setProgress(percent)
      }
    }

    try {
      const movie = await liteflixApi.createMovie(formData, config)

      setMovie(movie)

      console.log("MOVIE: ", movie)
      if (onSuccess) onSuccess('Done')
    } catch (err) {
      console.log('[handleSubmit]: Error: ', err)
      setErrorReq(err as AxiosError)
      if (onError) {
        onError(err as UploadRequestError)
      }
    }

    setIsLoading(false)
  }

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'http://localhost:8081/api/v1/movies',
    customRequest: customRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        notification.success({ message: `${info.file.name} file uploaded successfully.` })
      } else if (status === 'error') {
        notification.error({ message: `${info.file.name} file upload failed.` })
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  }

  const handleAbort = (e:React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('CLICK', axiosCtr?.signal.aborted)
    if (movie) return
    axiosCtr?.abort()
  }

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={720}
      className="movie-upload-modal"
      centered
      closeIcon={<TfiClose />}
      transitionName="ant-modal-slide-up"
      maskTransitionName="ant-modal-mask-slide-up"
    >
      <h2 className="modal-title">Agregar Película</h2>

      <div className="input-container">
        <Dragger
          { ...uploadProps}
          name="file"
          multiple={false}
          onChange={handleFileChange}
          className="drag-upload"
          showUploadList={false}
          style={{ ...(isLoading ? { border: '0px'} : {}) }}
          >
            {
              file && request ? (
                <div className="progress-info">
                  {
                    
                  }
                  {
                    movie ? (
                      <>
                      <p>100% Cargado</p>
                      </>
                    ) : (
                      <>
                      {
                        errorReq ? (
                          <>
                           <p>¡Error! No se pudo cargar la película</p>
                          </>
                        ) : (
                          <>
                           <p>Cargando { progress  }%</p>
                          </>
                        )
                      }
                      </>
                    )
                  }
                  
                  <Progress percent={errorReq ? 100 : progress} showInfo={false} className={`${errorReq ? 'progress-error' : ''}`} />
                  {
                    axiosCtr?.signal.aborted === true ? (
                      <>
                      <Button type="link" color="danger" style={{ color: '#FF0000' }}>Aborted</Button>
                      </>
                    ) : (
                      <>
                       {
                        errorReq ? (
                          <>
                          <Button type="link" onClick={() => console.log('TODO retry')}>Reintentar</Button>
                          </>
                        ) : (
                          <>
                          <Button type="link" onClick={handleAbort}>{ movie ? '¡Listo!' : 'Cancelar' }</Button>
                          </>
                        )
                      }
                      </>
                    )
                  }
                </div>
              ) : (
                <>
                  <p className="ant-upload-text">
                    <PaperClipOutlined />
                    Agregá un archivo o arrástralo y soltalo aqui
                  </p>
                </>
              )
            }
        </Dragger>
      </div>

      <div className="input-container">
        <Input
          className="movie-title-input"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="input-container">
        <Button
          className={`upload-button ${isButtonDisabled ? '' : 'upload-button-valid'}`}
          type="primary"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
          >
          Subir Película
        </Button>
      </div>
    </Modal>
  )
}

export default MovieUploadModal
