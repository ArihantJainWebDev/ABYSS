import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis(onScroll) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    if (onScroll) lenis.on('scroll', onScroll)
    return () => lenis.destroy()
  }, [onScroll])
}
