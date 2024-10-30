import React, { useEffect } from 'react'
import useProgressiveImage from './useProgressiveImage'
import { useIsFirstRender } from '../../../utils'

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
  const src = useProgressiveImage(lowResImage, highResImage)

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
      src={src}
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
