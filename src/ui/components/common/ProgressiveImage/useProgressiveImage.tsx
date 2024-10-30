import { useState, useEffect } from 'react'

function useProgressiveImage(lowResSrc: string, highResSrc?: string): string {
  const [src, setSrc] = useState<string>(lowResSrc)

  useEffect(() => {
    if (!highResSrc) return

    const img = new Image()
    img.src = highResSrc

    img.onload = () => {
      setSrc(highResSrc)
    }

    return () => {
      img.onload = null
    }
  }, [highResSrc])

  return src
}

export default useProgressiveImage
