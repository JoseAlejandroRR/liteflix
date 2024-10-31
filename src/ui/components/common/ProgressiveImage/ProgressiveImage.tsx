import React, { useEffect, useState } from 'react'
import useProgressiveImage from './useProgressiveImage'
import { useIsFirstRender } from '../../../utils'
import { getFileNameFromPath, getImageFromCache } from '.'

interface ProgressiveImageProps extends React.InputHTMLAttributes<HTMLImageElement>  {
  lowResImage: string,
  highResImage: string,
  onLoadLowRes?: () => void
  onLoadHighRes?: () => void,
  qualityHigher?: boolean
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  lowResImage, highResImage, onLoadLowRes, onLoadHighRes, qualityHigher , ...props
}) => {
  const istFirstRender = useIsFirstRender()
  const [highSrc, setHighSrc] = useState<string | undefined>(undefined)
  const src = useProgressiveImage(lowResImage, highSrc)

  useEffect(() => {
    (async () => {
      let fileURL = highResImage
      if (qualityHigher !== true) {
        const fileKey = getFileNameFromPath(highResImage).split('.')[0]
        fileURL = await getImageFromCache(`cache/high/${fileKey}.webp`, highResImage)
      }
      setHighSrc(fileURL)
    })()
  }, [highResImage])

  useEffect(() => {
    if (istFirstRender === true && onLoadLowRes) {
      onLoadLowRes()
    }
    
    if (istFirstRender === false && onLoadHighRes) {
      onLoadHighRes()
    }
  }, [src])

  return (
    <img
      src={highSrc}
      style={{
        transition: 'filter 0.3s ease',
        filter: src === lowResImage ? 'blur(10px)' : 'blur(0)',
        ...props.style,
      }}
      { ...props }
    />
  )
}

export default ProgressiveImage
