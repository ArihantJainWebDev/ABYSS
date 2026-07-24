import { useState, useEffect } from 'react'
import { useLenis } from './engine/useLenis.js'
import ScrollVideoController from './engine/ScrollVideoController.jsx'
import SubmarineHUD from './hud/SubmarineHUD.jsx'
import Scene01Surface from './scenes/Scene01Surface.jsx'
import Scene02Dive from './scenes/Scene02Dive.jsx'
import Scene03Reef from './scenes/Scene03Reef.jsx'
import Scene04Bioluminescence from './scenes/Scene04Bioluminescence.jsx'
import Scene05Ruins from './scenes/Scene05Ruins.jsx'
import Scene06Darkness from './scenes/Scene06Darkness.jsx'
import Scene07AbyssTerminal from './scenes/Scene07AbyssTerminal.jsx'
import MarineModal from './components/MarineModal.jsx'
import BookingModal from './components/BookingModal.jsx'
import { audioEngine } from './engine/AudioEngine.js'

export default function App() {
  const [depth, setDepth] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [selectedDiscovery, setSelectedDiscovery] = useState(null)
  const [bookingPackage, setBookingPackage] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  // Track mouse position for 3000m scene flashlight spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Smooth scroll depth calculation (0m -> 4,000m)
  useLenis(() => {
    const scrollTop = window.scrollY
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0
    const calculatedDepth = Math.round(progress * 4000)
    setDepth(calculatedDepth)

    audioEngine.updateDepthFrequency(calculatedDepth)
  })

  const handleQuickJump = (targetDepth) => {
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const targetScroll = (targetDepth / 4000) * maxScroll
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  const handleOpenBooking = (pkgName = 'Neptune Prime') => {
    setBookingPackage(pkgName)
    setIsBookingOpen(true)
  }

  return (
    <div className="abyss-app">
      {/* Persistent Submarine HUD Overlay */}
      <SubmarineHUD depth={depth} onQuickJump={handleQuickJump} />

      {/* Chapter 1: Surface (0m) */}
      <ScrollVideoController src="/video/01-surface.mp4" height="200vh" overlayColor="rgba(0, 20, 30, 0.3)">
        <Scene01Surface onBeginExpedition={() => handleQuickJump(200)} />
      </ScrollVideoController>

      {/* Chapter 2: The Dive (200m) */}
      <ScrollVideoController src="/video/02-dive.mp4" height="150vh" overlayColor="rgba(0, 15, 25, 0.35)">
        <Scene02Dive />
      </ScrollVideoController>

      {/* Chapter 3: The Living Reef (200m - 600m) */}
      <ScrollVideoController src="/video/03-reef.mp4" height="200vh" overlayColor="rgba(2, 12, 22, 0.35)">
        <Scene03Reef onSelectDiscovery={(item) => setSelectedDiscovery(item)} />
      </ScrollVideoController>

      {/* Chapter 4: Bioluminescence (600m - 1500m) */}
      <ScrollVideoController src="/video/04-bioluminescence.mp4" height="200vh" overlayColor="rgba(5, 5, 20, 0.4)">
        <Scene04Bioluminescence onSelectDiscovery={(item) => setSelectedDiscovery(item)} />
      </ScrollVideoController>

      {/* Chapter 5: Sunken Wonders (1500m - 3000m) */}
      <ScrollVideoController src="/video/05-ruins.mp4" height="200vh" overlayColor="rgba(2, 6, 15, 0.45)">
        <Scene05Ruins onSelectDiscovery={(item) => setSelectedDiscovery(item)} />
      </ScrollVideoController>

      {/* Chapter 6: The Dark & Flashlight Spotlight (3000m) */}
      <ScrollVideoController src="/video/06-darkness.mp4" height="200vh" overlayColor="rgba(0, 2, 8, 0.5)">
        {/* Flashlight Spotlight Overlay mapped to mouse position */}
        <div
          className="flashlight-overlay"
          style={{
            '--mouse-x': `${mousePos.x}px`,
            '--mouse-y': `${mousePos.y}px`,
          }}
        />
        <Scene06Darkness onSelectDiscovery={(item) => setSelectedDiscovery(item)} />
      </ScrollVideoController>

      {/* Chapter 7: The Abyss Terminal (4000m Hadal Zone) */}
      <ScrollVideoController src="/video/07-abyss.mp4" height="250vh" overlayColor="rgba(0, 3, 10, 0.35)">
        <Scene07AbyssTerminal onOpenBooking={handleOpenBooking} />
      </ScrollVideoController>

      {/* Interactive Telemetry Modal */}
      <MarineModal item={selectedDiscovery} onClose={() => setSelectedDiscovery(null)} />

      {/* Mission Control Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedPackage={bookingPackage}
      />
    </div>
  )
}
