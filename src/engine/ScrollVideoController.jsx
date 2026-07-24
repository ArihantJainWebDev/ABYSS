import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Extracts all video frames into an array of ImageBitmaps for
 * perfectly smooth, frame-accurate scroll scrubbing.
 * Falls back to direct video.currentTime seeking if extraction fails.
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
      // Attempt requestVideoFrameCallback-based extraction (Chrome 83+)
      if ('requestVideoFrameCallback' in video) {
        const frames = []
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d')

        await video.play()

        await new Promise((res) => {
          const captureFrame = (now, metadata) => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            // Store as ImageData (fast to putImageData later)
            frames.push(ctx.getImageData(0, 0, canvas.width, canvas.height))

            if (!video.ended) {
              video.requestVideoFrameCallback(captureFrame)
            } else {
              res()
            }
          }
          video.requestVideoFrameCallback(captureFrame)

          // Safety timeout – if video is very short, it may end before callback fires
          video.addEventListener('ended', () => {
            setTimeout(res, 100)
          })
        })

        video.pause()
        if (frames.length > 2) {
          resolve({ frames, width: canvas.width, height: canvas.height })
          return
        }
      }

      // Fallback: seek-based extraction for browsers without requestVideoFrameCallback
      try {
        const fps = 30
        const totalFrames = Math.ceil(video.duration * fps)
        const step = video.duration / totalFrames
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d')
        const frames = []

        for (let i = 0; i < totalFrames; i++) {
          video.currentTime = i * step
          await new Promise((r) => {
            const onSeeked = () => {
              video.removeEventListener('seeked', onSeeked)
              r()
            }
            video.addEventListener('seeked', onSeeked)
          })
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          frames.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
        }

        if (frames.length > 0) {
          resolve({ frames, width: canvas.width, height: canvas.height })
          return
        }
      } catch (e) {
        // Fall through
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
  const [status, setStatus] = useState('loading') // loading | ready | fallback

  // --- Frame extraction on mount ---
  useEffect(() => {
    let cancelled = false

    async function init() {
      setStatus('loading')
      const result = await extractFrames(src)
      if (cancelled) return

      if (result && result.frames.length > 2) {
        framesRef.current = result

        // Paint the first frame immediately
        const canvas = canvasRef.current
        if (canvas) {
          canvas.width = result.width
          canvas.height = result.height
          const ctx = canvas.getContext('2d')
          ctx.putImageData(result.frames[0], 0, 0)
        }
        setStatus('ready')
      } else {
        setStatus('fallback')
      }
    }

    init()
    return () => { cancelled = true }
  }, [src])

  // --- ScrollTrigger to paint the correct frame ---
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        if (status === 'ready' && framesRef.current) {
          const { frames, width, height: h } = framesRef.current
          const index = Math.min(
            frames.length - 1,
            Math.max(0, Math.round(self.progress * (frames.length - 1)))
          )
          if (index !== lastFrameRef.current) {
            lastFrameRef.current = index
            const canvas = canvasRef.current
            if (canvas) {
              const ctx = canvas.getContext('2d')
              ctx.putImageData(frames[index], 0, 0)
            }
          }
        }
      },
    })

    return () => st.kill()
  }, [status])

  return (
    <section ref={wrapperRef} style={{ position: 'relative', height, width: '100%' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>

        {/* Canvas-based frame rendering (primary) */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: status === 'ready' ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Loading shimmer while frames decode */}
        {status === 'loading' && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #010810, #021620, #010810)',
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

        {/* Minimal tint overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: overlayColor,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Floating content layer */}
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
