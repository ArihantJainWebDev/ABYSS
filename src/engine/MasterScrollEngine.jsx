import React, { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Cover-fit math for rendering on canvas
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

const SCENES_CONFIG = [
  { id: '01-surface', label: 'SURFACE (0M)', frames: 176 },
  { id: '02-dive', label: 'THE DIVE (200M)', frames: 176 },
  { id: '03-reef', label: 'LIVING REEF (600M)', frames: 176 },
  { id: '04-bioluminescence', label: 'BIOLUMINESCENCE (1500M)', frames: 176 },
  { id: '05-ruins', label: 'SUNKEN RUINS (3000M)', frames: 176 },
  { id: '06-darkness', label: 'THE DARK (3500M)', frames: 176 },
  { id: '07-abyss', label: 'THE ABYSS (4000M)', frames: 176 },
]

export default function MasterScrollEngine({ children, onDepthChange }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [loadedCount, setLoadedCount] = useState(0)
  const [isReady, setIsReady] = useState(false)

  const scenesImagesRef = useRef([])
  const activeSceneRef = useRef(0)
  const activeFrameRef = useRef(0)

  // Step 1: Preload frames (sampling 1 in every 2 frames for speed & 60fps smooth rendering)
  useEffect(() => {
    let cancelled = false
    const sampleStep = 2
    let totalToLoad = 0

    SCENES_CONFIG.forEach((cfg) => {
      totalToLoad += Math.floor(cfg.frames / sampleStep)
    })

    let count = 0
    const scenesImages = SCENES_CONFIG.map(() => [])

    SCENES_CONFIG.forEach((scene, sceneIdx) => {
      const frameCount = Math.floor(scene.frames / sampleStep)
      for (let i = 0; i < frameCount; i++) {
        const frameNum = String(i * sampleStep + 1).padStart(4, '0')
        const img = new Image()
        img.src = `/frames/${scene.id}/${frameNum}.jpg`

        img.onload = () => {
          if (cancelled) return
          scenesImages[sceneIdx][i] = img
          count++
          setLoadedCount(Math.round((count / totalToLoad) * 100))
          if (count >= totalToLoad) {
            scenesImagesRef.current = scenesImages
            setIsReady(true)
          }
        }
        img.onerror = () => {
          if (cancelled) return
          count++
          setLoadedCount(Math.round((count / totalToLoad) * 100))
          if (count >= totalToLoad) {
            scenesImagesRef.current = scenesImages
            setIsReady(true)
          }
        }
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  // Draw frame to canvas with smooth crossfade blending between adjacent scenes
  const drawFrameWithCrossfade = useCallback((sceneIdx, localProgress) => {
    const canvas = canvasRef.current
    if (!canvas || !scenesImagesRef.current.length) return

    const ctx = canvas.getContext('2d')
    const totalScenes = SCENES_CONFIG.length

    const currentSceneImages = scenesImagesRef.current[sceneIdx]
    if (!currentSceneImages || !currentSceneImages.length) return

    const currentFrameIdx = Math.min(
      currentSceneImages.length - 1,
      Math.floor(localProgress * currentSceneImages.length)
    )
    const currentImg = currentSceneImages[currentFrameIdx]
    if (!currentImg || !currentImg.naturalWidth) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = 1.0

    // Draw primary current scene frame
    const primaryFit = coverFit(
      currentImg.naturalWidth,
      currentImg.naturalHeight,
      canvas.width,
      canvas.height
    )
    ctx.drawImage(currentImg, primaryFit.offsetX, primaryFit.offsetY, primaryFit.drawW, primaryFit.drawH)

    // Smooth Crossfade: If localProgress > 0.80 and there is a next scene, crossfade to next scene frame 0
    if (localProgress > 0.80 && sceneIdx < totalScenes - 1) {
      const nextSceneImages = scenesImagesRef.current[sceneIdx + 1]
      if (nextSceneImages && nextSceneImages[0] && nextSceneImages[0].naturalWidth) {
        const nextImg = nextSceneImages[0]
        const fadeAlpha = (localProgress - 0.80) / 0.20 // 0 to 1 over last 20%
        ctx.globalAlpha = Math.min(1, Math.max(0, fadeAlpha))
        const nextFit = coverFit(
          nextImg.naturalWidth,
          nextImg.naturalHeight,
          canvas.width,
          canvas.height
        )
        ctx.drawImage(nextImg, nextFit.offsetX, nextFit.offsetY, nextFit.drawW, nextFit.drawH)
        ctx.globalAlpha = 1.0
      }
    }
  }, [])

  // Resize listener
  useEffect(() => {
    if (!isReady) return
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawFrameWithCrossfade(activeSceneRef.current, activeFrameRef.current)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isReady, drawFrameWithCrossfade])

  // GSAP ScrollTrigger Timeline over total container
  useEffect(() => {
    const container = containerRef.current
    if (!container || !isReady) return

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.2,
      onUpdate: (self) => {
        const totalProgress = self.progress // 0 to 1
        const calculatedDepth = Math.round(totalProgress * 4000)
        if (onDepthChange) onDepthChange(calculatedDepth)

        const totalScenes = SCENES_CONFIG.length
        const rawSceneProgress = totalProgress * totalScenes
        const sceneIdx = Math.min(totalScenes - 1, Math.floor(rawSceneProgress))
        const localProgress = rawSceneProgress - sceneIdx

        activeSceneRef.current = sceneIdx
        activeFrameRef.current = localProgress
        drawFrameWithCrossfade(sceneIdx, localProgress)
      },
    })

    return () => st.kill()
  }, [isReady, drawFrameWithCrossfade, onDepthChange])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '1400vh' }}>
      {/* Fixed Full-Screen Background Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Loading Screen Overlay */}
      {!isReady && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: '#010408',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#FFF',
              letterSpacing: '0.1em',
            }}
          >
            ABYSS EXPEDITION INITIALIZING
          </div>

          <div
            style={{
              width: '260px',
              height: '4px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${loadedCount}%`,
                background: 'linear-gradient(90deg, #00F0FF, #FFD166)',
                transition: 'width 0.2s ease-out',
              }}
            />
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: '#00F0FF',
              letterSpacing: '0.15em',
            }}
          >
            DECODING SUB-OCEANIC TELEMETRY FRAMES ({loadedCount}%)
          </div>
        </div>
      )}

      {/* Children Layer */}
      {isReady && children}
    </div>
  )
}
