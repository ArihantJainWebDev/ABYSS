import { useState, useEffect } from 'react'
import { useLenis } from './engine/useLenis.js'
import MasterScrollEngine from './engine/MasterScrollEngine.jsx'
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

  // Track mouse position for Scene 6 flashlight spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useLenis()

  const handleDepthChange = (newDepth) => {
    setDepth(newDepth)
    audioEngine.updateDepthFrequency(newDepth)
  }

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
      {/* Persistent Cockpit HUD Overlay */}
      <SubmarineHUD depth={depth} onQuickJump={handleQuickJump} />

      {/* Master Scroll Engine with Single Fixed Viewport Canvas */}
      <MasterScrollEngine onDepthChange={handleDepthChange}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          {/* Section 1: Surface (0m - 500m scroll space) */}
          <div style={{ height: '170vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scene01Surface onBeginExpedition={() => handleQuickJump(200)} />
          </div>

          {/* Section 2: The Dive (200m) */}
          <div style={{ height: '150vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scene02Dive />
          </div>

          {/* Section 3: Living Reef (600m) */}
          <div style={{ height: '170vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scene03Reef onSelectDiscovery={(item) => setSelectedDiscovery(item)} />
          </div>

          {/* Section 4: Bioluminescence (1500m) */}
          <div style={{ height: '170vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scene04Bioluminescence onSelectDiscovery={(item) => setSelectedDiscovery(item)} />
          </div>

          {/* Section 5: Sunken Wonders (3000m) */}
          <div style={{ height: '170vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scene05Ruins onSelectDiscovery={(item) => setSelectedDiscovery(item)} />
          </div>

          {/* Section 6: The Dark & Flashlight (3500m) */}
          <div style={{ height: '170vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {depth >= 2500 && (
              <div
                className="flashlight-overlay"
                style={{
                  '--mouse-x': `${mousePos.x}px`,
                  '--mouse-y': `${mousePos.y}px`,
                }}
              />
            )}
            <Scene06Darkness onSelectDiscovery={(item) => setSelectedDiscovery(item)} />
          </div>

          {/* Section 7: The Abyss Terminal (4000m Hadal Zone) */}
          <div style={{ height: '220vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scene07AbyssTerminal onOpenBooking={handleOpenBooking} />
          </div>
        </div>
      </MasterScrollEngine>

      {/* Discovery Modal */}
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
