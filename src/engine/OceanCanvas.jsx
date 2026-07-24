import { useEffect, useRef } from 'react'

export default function OceanCanvas({ depth = 0, mousePos = { x: 0, y: 0 } }) {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Particles Data
    const bubbles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 4 + 1,
      speed: Math.random() * 1.5 + 0.5,
      wobble: Math.random() * Math.PI * 2,
    }))

    const spores = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      pulse: Math.random() * 0.02 + 0.01,
      color: ['#00F0FF', '#7000FF', '#00A896', '#FFD166'][Math.floor(Math.random() * 4)],
    }))

    const fishSchool = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.8,
      speed: Math.random() * 1.2 + 0.8,
      size: Math.random() * 8 + 12,
      offset: Math.random() * Math.PI * 2,
    }))

    let time = 0

    const render = () => {
      time += 0.02
      ctx.clearRect(0, 0, width, height)

      // 1. Dynamic Background Color Interpolation based on Depth
      let bgGradient
      if (depth < 200) {
        bgGradient = ctx.createLinearGradient(0, 0, 0, height)
        bgGradient.addColorStop(0, '#00A896')
        bgGradient.addColorStop(0.5, '#028090')
        bgGradient.addColorStop(1, '#05668D')
      } else if (depth < 600) {
        bgGradient = ctx.createLinearGradient(0, 0, 0, height)
        bgGradient.addColorStop(0, '#05668D')
        bgGradient.addColorStop(0.6, '#021B2B')
        bgGradient.addColorStop(1, '#010E1A')
      } else if (depth < 1500) {
        bgGradient = ctx.createLinearGradient(0, 0, 0, height)
        bgGradient.addColorStop(0, '#010E1A')
        bgGradient.addColorStop(0.6, '#040A14')
        bgGradient.addColorStop(1, '#02050B')
      } else if (depth < 3000) {
        bgGradient = ctx.createLinearGradient(0, 0, 0, height)
        bgGradient.addColorStop(0, '#02050B')
        bgGradient.addColorStop(1, '#010307')
      } else {
        bgGradient = ctx.createLinearGradient(0, 0, 0, height)
        bgGradient.addColorStop(0, '#010307')
        bgGradient.addColorStop(1, '#000103')
      }
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, width, height)

      // 2. Surface Sun Rays (0m - 200m)
      if (depth < 300) {
        const rayAlpha = Math.max(0, 1 - depth / 300) * 0.25
        ctx.save()
        ctx.fillStyle = 'rgba(255, 245, 200, ' + rayAlpha + ')'
        for (let i = 0; i < 5; i++) {
          const rayX = (width / 4) * i + Math.sin(time + i) * 40
          ctx.beginPath()
          ctx.moveTo(rayX, 0)
          ctx.lineTo(rayX + 120, height)
          ctx.lineTo(rayX + 60, height)
          ctx.lineTo(rayX - 60, 0)
          ctx.closePath()
          ctx.fill()
        }
        ctx.restore()
      }

      // 3. Ascending Bubbles (0m - 1000m)
      if (depth < 1000) {
        const bubbleAlpha = Math.max(0.1, 1 - depth / 1000)
        ctx.strokeStyle = 'rgba(0, 240, 255, ' + (bubbleAlpha * 0.4) + ')'
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (bubbleAlpha * 0.15) + ')'
        bubbles.forEach((b) => {
          b.y -= b.speed
          b.wobble += 0.03
          const currentX = b.x + Math.sin(b.wobble) * 12
          if (b.y < -10) {
            b.y = height + 10
            b.x = Math.random() * width
          }
          ctx.beginPath()
          ctx.arc(currentX, b.y, b.r, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
        })
      }

      // 4. Fish Shoals (200m - 800m)
      if (depth >= 150 && depth < 900) {
        const fishAlpha = Math.min(1, Math.max(0, (depth - 150) / 100)) * Math.max(0, 1 - (depth - 600) / 300)
        ctx.fillStyle = 'rgba(0, 240, 255, ' + (fishAlpha * 0.6) + ')'
        fishSchool.forEach((f) => {
          f.x += f.speed
          if (f.x > width + 30) f.x = -30
          const fY = f.y + Math.sin(time * 2 + f.offset) * 15
          ctx.beginPath()
          ctx.ellipse(f.x, fY, f.size, f.size * 0.35, 0, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      // 5. Bioluminescent Spores & Jellyfish (500m - 2500m)
      if (depth >= 400 && depth < 2800) {
        spores.forEach((s) => {
          s.x += s.vx
          s.y += s.vy
          if (s.x < 0 || s.x > width) s.vx *= -1
          if (s.y < 0 || s.y > height) s.vy *= -1

          s.alpha += s.pulse
          if (s.alpha > 0.9 || s.alpha < 0.2) s.pulse *= -1

          ctx.save()
          ctx.shadowBlur = 12
          ctx.shadowColor = s.color
          ctx.fillStyle = s.color
          ctx.globalAlpha = Math.min(1, s.alpha)
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })
      }

      // 6. Whale Parallax Silhouette (1200m - 2000m)
      if (depth >= 1000 && depth <= 2200) {
        const whaleX = ((time * 15) % (width + 600)) - 300
        const whaleY = height * 0.45 + Math.sin(time * 0.5) * 20
        ctx.save()
        ctx.fillStyle = 'rgba(2, 12, 24, 0.4)'
        ctx.shadowBlur = 30
        ctx.shadowColor = '#00F0FF'
        ctx.beginPath()
        // Simple elegant whale contour
        ctx.ellipse(whaleX, whaleY, 180, 50, -0.05, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // 7. Flashlight & Abyssal Creatures Spotlight (3000m+)
      if (depth >= 2500) {
        const spotlightX = mousePos.x || width / 2
        const spotlightY = mousePos.y || height / 2

        // Draw abyssal creatures that shine when illuminated
        ctx.save()
        ctx.shadowBlur = 20
        ctx.shadowColor = '#00F0FF'

        // Anglerfish glowing lure at fixed world position
        const lureX = width * 0.35
        const lureY = height * 0.4
        const distToLure = Math.hypot(spotlightX - lureX, spotlightY - lureY)
        if (distToLure < 250) {
          ctx.fillStyle = '#00F0FF'
          ctx.beginPath()
          ctx.arc(lureX, lureY, 8 + Math.sin(time * 5) * 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = 'rgba(0, 240, 255, 0.25)'
          ctx.font = '12px "Space Grotesk"'
          ctx.fillText('ANOMALY: Melanocetus johnsonii (Anglerfish)', lureX + 20, lureY + 4)
        }

        // Hydrothermal vent at bottom right
        const ventX = width * 0.75
        const ventY = height * 0.7
        const distToVent = Math.hypot(spotlightX - ventX, spotlightY - ventY)
        if (distToVent < 280) {
          ctx.fillStyle = '#FFD166'
          ctx.beginPath()
          ctx.arc(ventX, ventY, 12, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = 'rgba(255, 209, 102, 0.4)'
          ctx.font = '12px "Space Grotesk"'
          ctx.fillText('ACTIVE THERMAL VENT (380°C)', ventX + 20, ventY + 4)
        }

        ctx.restore()
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [depth, mousePos])

  return (
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
  )
}
