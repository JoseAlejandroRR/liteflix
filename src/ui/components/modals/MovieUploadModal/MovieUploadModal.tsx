import React, { useState } from 'react'
import { Modal, Upload, Input, Button, Progress, notification } from 'antd'
import { PaperClipOutlined } from '@ant-design/icons'
import { TfiClose } from "react-icons/tfi";
import { UploadChangeParam, UploadProps } from 'antd/es/upload'
import LiteflixAPI from '../../../../data/services/LiteflixAPI'
import { MovieDto } from '../../../../data/dto/MovieDto'
import { AxiosError, AxiosRequestConfig } from 'axios'
import Logo from '../../logo/Logo'
import { useAuth } from '../../../../data/hooks/useAuth'
import MovieStatus from '../../../../data/dto/MovieStatus'
import { useMyMovies } from '../../../../data/hooks/useMyMovies'

import './MovieUploadModal.scss'

const { Dragger } = Upload

type StepFinishedProps = {
  movie:MovieDto,
  onClose: () => void
}

const StepFinished:React.FC<StepFinishedProps> = ({ movie, onClose }) => {
  const { getMyMovieList } = useMyMovies()

  const handleClose = async () => {
    getMyMovieList(false).then().catch()

    onClose()
  }

  return (
    <div className="step-finished">
      <Logo />
      <h3>¡Felicitaciones!</h3>
      <p>{movie.title} Movie Title fue correctamente subida.</p>
      <div className="input-container">
        <Button
          className={`upload-button upload-button-valid`}
          type="primary"
          onClick={handleClose}
          aria-label="Ir a Home"
          >
          Ir a Home
        </Button>
      </div>
    </div>
  )
}

interface MovieUploadModalProps {
  open: boolean
  onClose: () => void
}

const maxSizeUpload = Number(import.meta.env.VITE_UPLOAD_SIZE_MAX || 2)

const MovieUploadModal: React.FC<MovieUploadModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const liteflixApi = new LiteflixAPI()
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ progress, setProgress ] = useState<number>(40)
  const [ movie, setMovie ] = useState<MovieDto | null>()
  const [ axiosCtr, setAxiosCtr ] = useState<AbortController | null>(null)
  const [ errorReq, setErrorReq ] = useState<AxiosError | null>(null)
  const [finished, setFinished] = useState<boolean>(false)
  const [submitTries, setSubmitTries] = useState<number>(0)

  const { auth } = useAuth()

  const handleFileChange = (info: UploadChangeParam) => {
    const { fileList } = info
    const fileSelection = fileList.length ? fileList[0].originFileObj : null
    setFile(fileSelection as File)
  }

  const isButtonDisabled = !movie || !title;

  const handleClose = () => {
    setProgress(0)
    setTitle('')
    setFile(null)
    setMovie(null)
    //setRequest(null)
    setAxiosCtr(null)
    setErrorReq(null)
    setFinished(false)
    setSubmitTries(0)
    if (onClose) onClose()
  }

  const customRequest = async () => {
    //setRequest(req)
    handleSubmit()
  }

  const handleSubmit = async () => {

    setSubmitTries(submitTries+1)
    setIsLoading(true)

    const formData = new FormData()
    formData.append('image', file as File)

    const apiRequest = new AbortController()
    setAxiosCtr(apiRequest)

    const config: AxiosRequestConfig = {
      signal: apiRequest.signal,
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        let percent = Math.floor((event.loaded / (event.total ?? event.loaded )) * 100);
        percent = percent > 99 ? 0 : percent 
        if (percent > 0) setProgress(percent)
      }
    }

    let movieDraft: MovieDto | null = null
    try {
      if (!movie) {
        movieDraft = await liteflixApi.createMovie(formData, config)
        if (!movieDraft) return
        setMovie(movieDraft)
      }

      const updateMovie = movieDraft ?? movie

      const fileName = updateMovie!.imageURL?.split(`${import.meta.env.VITE_AWS_BUCKET_PUBLIC_URL}/`)
      const thumbnailURL = await liteflixApi.generateThumbnail(fileName![1])
      updateMovie!.thumbnailURL = thumbnailURL!

      setMovie({...updateMovie! })

    } catch (err) {
      console.log('[handleSubmit]: Error: ', err)
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          const issues = err.response?.data?.error?.issues
          if (issues) {
            issues.forEach((error: any) => notification.error({
              message: `${error.path[0]}`, description: error.message, placement: 'bottomRight'
            }))
          }
        } else if (err.response?.status === 413) {
          notification.error({ message: `Imagen excede los ${maxSizeUpload}MB`, placement:'bottomRight' })
        }
      }
      setErrorReq(err as AxiosError)
    }

    setIsLoading(false)
  }

  const uploadProps: UploadProps = {
    name: 'image',
    action: `${import.meta.env.VITE_LITEFLIX_API}/movies`,
    customRequest: customRequest,
    headers: {
      'Authorization': `Bearer ${auth.token}`
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    openFileDialogOnClick: !file || errorReq ? true : false
  }

  const handleUpdateMovie = async () => {
    try {
      const movieUpdated = await liteflixApi.updateMovie(movie!.id!, {
        title,
        status: MovieStatus.ACTIVE,
        thumbnailURL: movie?.thumbnailURL
      })
      setMovie(movieUpdated)
      setFinished(true)
    } catch (err) {
      console.log('[handleUpdateMovie]: Error', err)
    }
  }

  const handleAbort = (e:React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (movie) return
    axiosCtr?.abort()
  }

  const handleRetry = (e:React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAxiosCtr(null)
    setErrorReq(null)
    handleSubmit()
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
    {
      finished ? (
        <StepFinished movie={movie!} onClose={handleClose} />
      ) : (
        <>
      <h2 className="modal-title">Agregar Película</h2>

      <div className="input-container first">
        <Dragger
          { ...uploadProps}
          name="image"
          multiple={false}
          onChange={handleFileChange}
          className={file ? 'drag-upload-ready' : 'drag-upload-choose'}
          showUploadList={false}
          fileList={[]}
          style={{ ...(isLoading ? { border: '0px'} : {}) }}
          >
            {
             file ? (
                <div className="progress-info">
                  {
                    movie?.imageURL ? (
                      <>
                      <p>100% Cargado</p>
                      </>
                    ) : (
                      <>
                      {
                        errorReq ? (
                          <>
                           <p><b>¡Error!</b> No se pudo cargar la película</p>
                          </>
                        ) : (
                          <>
                           <p>Cargando { progress  }% </p>
                          </>
                        )
                      }
                      </>
                    )
                  }
                  
                  <Progress percent={isLoading ? progress : 100 } showInfo={false} className={`${errorReq ? 'progress-error' : ''}`} />
                  {
                    axiosCtr?.signal.aborted === true ? (
                      <>
                      <Button type="link" color="danger" style={{ color: '#FF0000' }} aria-label="Cancelado">Cancelado</Button>
                      </>
                    ) : (
                      <>
                       {
                        errorReq ? (
                          <>
                          <Button type="link" onClick={handleRetry} aria-label="Reintentar">Reintentar</Button>
                          </>
                        ) : (
                          <>
                          <Button type="link" onClick={handleAbort} aria-label={ movie ? '¡Listo!' : 'Cancelar' }>{ movie ? '¡Listo!' : 'Cancelar' }</Button>
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
                        <>Agregá un archivo o arrástralo y soltalo aqui</>
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
          className={`upload-button ${isButtonDisabled || errorReq !== null ? '' : 'upload-button-valid'}`}
          type="primary"
          disabled={isButtonDisabled || errorReq !== null}
          onClick={handleUpdateMovie}
          loading={isLoading}
          aria-label="Subir Película"
          >
            Subir Película
        </Button>
      </div>
      </>
    )
  }
      
    </Modal>
  )
}

export default MovieUploadModal
