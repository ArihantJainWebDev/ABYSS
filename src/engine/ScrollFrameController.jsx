import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * "object-fit: cover" math for drawing an image
 * onto a canvas at any aspect ratio.
 */
function coverFit(srcW, srcH, dstW, dstH) {
  const srcRatio = srcW / srcH
  const dstRatio = dstW / dstH
  let drawW, drawH, offsetX, offsetY

  if (srcRatio > dstRatio) {
    drawH = dstH
    drawW = dstH * srcRatio
    offsetX = (dstW - drawW) / 2
    offsetY = 0
  } else {
    drawW = dstW
    drawH = dstW / srcRatio
    offsetX = 0
    offsetY = (dstH - drawH) / 2
  }

  return { drawW, drawH, offsetX, offsetY }
}

/**
 * ScrollFrameController
 * Loads a numbered JPG image sequence and paints the correct frame
 * on a full-viewport canvas based on scroll position.
 */
export default function ScrollFrameController({
  frameDir,
  frameCount = 175,
  height = '200vh',
  overlayColor = 'rgba(0,0,0,0.25)',
  children,
}) {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const lastIndexRef = useRef(-1)
  const [loadProgress, setLoadProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)

  // Build filename: 0001.jpg, 0002.jpg, etc.
  const getFramePath = useCallback(
    (index) => {
      const padded = String(index + 1).padStart(4, '0')
      return `${frameDir}/${padded}.jpg`
    },
    [frameDir]
  )

  // Preload frame images
  useEffect(() => {
    let cancelled = false
    const images = new Array(frameCount)
    let loaded = 0

    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      img.src = getFramePath(i)
      img.onload = () => {
        if (cancelled) return
        images[i] = img
        loaded++
        setLoadProgress(Math.round((loaded / frameCount) * 100))
        if (loaded >= frameCount) {
          imagesRef.current = images
          setIsReady(true)
        }
      }
      img.onerror = () => {
        if (cancelled) return
        loaded++
        setLoadProgress(Math.round((loaded / frameCount) * 100))
        if (loaded >= frameCount) {
          imagesRef.current = images
          setIsReady(true)
        }
      }
    }

    return () => {
      cancelled = true
    }
  }, [frameDir, frameCount, getFramePath])

  // Paint a frame onto canvas with cover-fit
  const paintFrame = useCallback((index) => {
    const canvas = canvasRef.current
    const images = imagesRef.current
    if (!canvas || !images || !images.length) return

    const idx = Math.min(images.length - 1, Math.max(0, index))
    const img = images[idx]
    if (!img || !img.naturalWidth) return

    const ctx = canvas.getContext('2d')
    const { drawW, drawH, offsetX, offsetY } = coverFit(
      img.naturalWidth,
      img.naturalHeight,
      canvas.width,
      canvas.height
    )
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH)
    lastIndexRef.current = idx
  }, [])

  // Resize canvas & repaint
  useEffect(() => {
    if (!isReady) return
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      paintFrame(lastIndexRef.current >= 0 ? lastIndexRef.current : 0)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [isReady, paintFrame])

  // ScrollTrigger → paint correct frame
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper || !isReady) return

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const index = Math.round(self.progress * (frameCount - 1))
        if (index !== lastIndexRef.current) {
          paintFrame(index)
        }
      },
    })

    return () => st.kill()
  }, [isReady, frameCount, paintFrame])

  return (
    <section ref={wrapperRef} style={{ position: 'relative', height, width: '100%' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: '#010408',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />

        {!isReady && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 5,
              background: '#010408',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: '#00F0FF',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              LOADING EXPEDITION TELEMETRY
            </div>
            <div
              style={{
                width: '180px',
                height: '3px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${loadProgress}%`,
                  background: '#00F0FF',
                  transition: 'width 0.15s ease-out',
                }}
              />
            </div>
          </div>
        )}

        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: overlayColor,
            pointerEvents: 'none',
            zIndex: 6,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}
