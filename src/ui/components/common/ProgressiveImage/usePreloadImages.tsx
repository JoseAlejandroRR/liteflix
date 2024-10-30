import {  useEffect } from 'react'
import { useIsFirstRender } from '../../../utils'

type usePreloadImagesProps = {
  imageUrls: string[]
  onLoad: () => void
}
const LoaderImagesEager: React.FC<usePreloadImagesProps> = ({
  imageUrls, onLoad
}) => {
  const istFirstRender = useIsFirstRender()

  useEffect(() => {
    //let isCancelled = false
    if(istFirstRender) return

    const loadImages = async () => {
      console.log('RECIBI: ', imageUrls)
      const promises = imageUrls.map(
        (src) =>
          new Promise<void>((resolve, reject) => {
            const img = new Image()
            img.src = src
            img.onload = () => resolve()
            img.onerror = () => reject()
          })
      )

      try {
        await Promise.all(promises)
        if(istFirstRender) {
          onLoad()
        }
        //if (!isCancelled) setImagesLoaded(true)
      } catch (error) {
        console.error('Error al precargar imágenes:', error)
      }
    }

    loadImages()
    //isCancelled = true
    return () => {
    }
  }, [imageUrls])

  return (
    <>
    </>
  )
}

export default LoaderImagesEager
