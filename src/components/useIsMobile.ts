import { useEffect, useState } from 'react'

/**
 * True when the viewport is phone-sized. Used to shrink the JS-driven 3D
 * geometry (orbit radius, card size) so the immersive sections fit a phone
 * screen instead of spilling off the edges. Desktop is untouched.
 */
export function useIsMobile(query = '(max-width: 640px)') {
  // Initialise synchronously so the heavy 3D sections never mount on mobile,
  // even for the first paint (avoids a flash + a wasted expensive mount).
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [query])

  return isMobile
}
