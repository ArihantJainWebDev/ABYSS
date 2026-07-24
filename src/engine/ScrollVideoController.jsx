import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Calculate "object-fit: cover" draw parameters
 * so the source image fills the destination without distortion.
 */
function coverFit(srcW, srcH, dstW, dstH) {
  const srcRatio = srcW / srcH
  const dstRatio = dstW / dstH
  let drawW, drawH, offsetX, offsetY

  if (srcRatio > dstRatio) {
    // Source is wider → crop sides
    drawH = dstH
    drawW = dstH * srcRatio
    offsetX = (dstW - drawW) / 2
    offsetY = 0
  } else {
    // Source is taller → crop top/bottom
    drawW = dstW
    drawH = dstW / srcRatio
    offsetX = 0
    offsetY = (dstH - drawH) / 2
  }

  return { drawW, drawH, offsetX, offsetY }
}

/**
 * Extract every video frame as an ImageBitmap for butter-smooth
 * frame-accurate scroll scrubbing. Uses requestVideoFrameCallback
 * with a seek-based fallback.
 */
function extractFrames(videoSrc) {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.muted = true
    video.playsInline = true
    video.preload = 'auto'
    video.crossOrigin = 'anonymous'
    video.src = videoSrc

    video.addEventListener('error', () => resolve(null))

    video.addEventListener('loadeddata', async () => {
      const vw = video.videoWidth
      const vh = video.videoHeight
      if (!vw || !vh) { resolve(null); return }

      // --- Method 1: requestVideoFrameCallback (Chrome 83+) ---
      if ('requestVideoFrameCallback' in video) {
        const bitmaps = []
        const offscreen = document.createElement('canvas')
        offscreen.width = vw
        offscreen.height = vh
        const octx = offscreen.getContext('2d')

        try {
          await video.play()
        } catch { resolve(null); return }

        await new Promise((res) => {
          let resolved = false

          const capture = () => {
            octx.drawImage(video, 0, 0, vw, vh)
            createImageBitmap(offscreen).then((bmp) => {
              bitmaps.push(bmp)

              if (!video.ended && !video.paused) {
                video.requestVideoFrameCallback(capture)
              } else if (!resolved) {
                resolved = true
                res()
              }
            })
          }

          video.requestVideoFrameCallback(capture)
          video.addEventListener('ended', () => {
            setTimeout(() => { if (!resolved) { resolved = true; res() } }, 200)
          })
          // Safety timeout for very short videos
          setTimeout(() => { if (!resolved) { resolved = true; res() } }, 12000)
        })

        video.pause()
        video.src = '' // release memory

        if (bitmaps.length > 2) {
          resolve({ frames: bitmaps, srcWidth: vw, srcHeight: vh })
          return
        }
      }

      // --- Method 2: Seek-based extraction fallback ---
      try {
        const fps = 24
        const totalFrames = Math.max(4, Math.ceil(video.duration * fps))
        const step = video.duration / totalFrames
        const offscreen = document.createElement('canvas')
        offscreen.width = vw
        offscreen.height = vh
        const octx = offscreen.getContext('2d')
        const bitmaps = []

        for (let i = 0; i < totalFrames; i++) {
          video.currentTime = Math.min(i * step, video.duration - 0.01)
          await new Promise((r) => {
            const onSeeked = () => { video.removeEventListener('seeked', onSeeked); r() }
            video.addEventListener('seeked', onSeeked)
          })
          octx.drawImage(video, 0, 0, vw, vh)
          const bmp = await createImageBitmap(offscreen)
          bitmaps.push(bmp)
        }

        video.src = ''
        if (bitmaps.length > 0) {
          resolve({ frames: bitmaps, srcWidth: vw, srcHeight: vh })
          return
        }
      } catch (e) {
        // fall through
      }

      resolve(null)
    })
  })
}

export default function ScrollVideoController({
  src,
  height = '200vh',
  overlayColor = 'rgba(0,0,0,0.25)',
  children,
}) {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const framesRef = useRef(null)
  const lastFrameRef = useRef(-1)
  const [status, setStatus] = useState('loading')

  // --- Extract frames on mount ---
  useEffect(() => {
    let cancelled = false

    async function init() {
      setStatus('loading')
      const result = await extractFrames(src)
      if (cancelled) return

      if (result && result.frames.length > 2) {
        framesRef.current = result
        setStatus('ready')
      } else {
        setStatus('fallback')
      }
    }

    init()
    return () => { cancelled = true }
  }, [src])

  // --- Resize canvas to viewport & paint first frame ---
  useEffect(() => {
    if (status !== 'ready') return
    const canvas = canvasRef.current
    if (!canvas || !framesRef.current) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Repaint current frame at new size
      paintFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0)
    }

    const paintFrame = (index) => {
      const { frames, srcWidth, srcHeight } = framesRef.current
      const idx = Math.min(frames.length - 1, Math.max(0, index))
      const ctx = canvas.getContext('2d')
      const { drawW, drawH, offsetX, offsetY } = coverFit(
        srcWidth, srcHeight, canvas.width, canvas.height
      )
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(frames[idx], offsetX, offsetY, drawW, drawH)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [status])

  // --- ScrollTrigger → paint the correct frame ---
  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || status !== 'ready') return

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        if (!framesRef.current) return
        const { frames, srcWidth, srcHeight } = framesRef.current
        const index = Math.min(
          frames.length - 1,
          Math.max(0, Math.round(self.progress * (frames.length - 1)))
        )
        if (index !== lastFrameRef.current) {
          lastFrameRef.current = index
          if (canvas) {
            const ctx = canvas.getContext('2d')
            const { drawW, drawH, offsetX, offsetY } = coverFit(
              srcWidth, srcHeight, canvas.width, canvas.height
            )
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(frames[index], offsetX, offsetY, drawW, drawH)
          }
        }
      },
    })

    return () => st.kill()
  }, [status])

  return (
    <section ref={wrapperRef} style={{ position: 'relative', height, width: '100%' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', background: '#010408' }}>

        {/* Canvas for frame-by-frame rendering (covers full viewport) */}
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

        {/* Loading state while frames are being decoded */}
        {status === 'loading' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            background: '#010408',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: '#00F0FF',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              animation: 'pulseGlow 2s ease-in-out infinite',
            }}>
              DECODING TELEMETRY…
            </div>
          </div>
        )}

        {/* Subtle tint overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: overlayColor,
            pointerEvents: 'none',
            zIndex: 4,
          }}
        />

        {/* Content layer */}
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
