import React, { useEffect, useState } from 'react'

export const useIsFirstRender = () => {
  const [isFirst, setIsFirst] = useState(true)
  useEffect(() => { setIsFirst(false) }, [])
  return isFirst
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    const handleMediaChange = (e:MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [query])

  return matches
}

export const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T>, handler: (isOut: boolean) => void) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const refId = ref.current?.getAttribute('id')
      const targetId = (event.target as HTMLElement).getAttribute('data-parentId')
      handler(!(refId === targetId))
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handler])
}
