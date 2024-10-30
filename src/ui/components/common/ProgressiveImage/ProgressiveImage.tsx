import React, { useEffect, useState } from 'react'
import useProgressiveImage from './useProgressiveImage'
import { useIsFirstRender } from '../../../utils'
import { getFileNameFromPath, getImageFromCache } from '.'

interface ProgressiveImageProps extends React.InputHTMLAttributes<HTMLImageElement>  {
  lowResImage: string,
  highResImage: string,
  onLoadLowRes?: () => void
  onLoadHighRes?: () => void
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  lowResImage, highResImage, onLoadLowRes, onLoadHighRes, ...props
}) => {
  const istFirstRender = useIsFirstRender()
  const [highSrc, setHighSrc] = useState<string | undefined>(undefined)
  const src = useProgressiveImage(lowResImage, highSrc)

  useEffect(() => {
    (async () => {
      const fileKey = getFileNameFromPath(highResImage).split('.')[0]
      const cacheURL = await getImageFromCache(`cache/high/${fileKey}.webp`, highResImage)
      setHighSrc(cacheURL)
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
