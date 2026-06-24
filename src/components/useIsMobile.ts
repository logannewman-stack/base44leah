import { useEffect, useState } from 'react'

/**
 * True when the viewport is phone-sized. Used to shrink the JS-driven 3D
 * geometry (orbit radius, card size) so the immersive sections fit a phone
 * screen instead of spilling off the edges. Desktop is untouched.
 */
export function useIsMobile(query = '(max-width: 640px)') {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [query])

  return isMobile
}
