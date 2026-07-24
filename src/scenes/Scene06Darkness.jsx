import React, { useState } from 'react'
import { Flashlight, Crosshair } from 'lucide-react'
import { audioEngine } from '../engine/AudioEngine'

export default function Scene06Darkness({ onSelectDiscovery }) {
  const [activeHotspot, setActiveHotspot] = useState(null)

  const abyssHotspots = [
    {
      id: 'anglerfish',
      x: '25%',
      y: '40%',
      title: 'Melanocetus johnsonii',
      scientificName: 'Deep Sea Predator',
      depth: '3000 METERS',
      description: 'Modified dorsal fin spine bearing a glowing esca lure with bioluminescent symbiotic bacteria.',
      biolum: 'ESCA LURE',
      pressure: '301.0 BAR',
      status: 'LIVE SPECIES',
    },
    {
      id: 'vent',
      x: '65%',
      y: '55%',
      title: 'Black Smoker Vent',
      scientificName: 'Geothermal Chimney',
      depth: '3000 METERS',
      description: 'Superheated fluids at 380°C rich in iron sulfide supporting chemosynthetic ecosystems.',
      biolum: 'THERMAL GLOW',
      pressure: '301.0 BAR',
      status: 'GEOTHERMAL',
    },
    {
      id: 'squid',
      x: '45%',
      y: '30%',
      title: 'Architeuthis dux',
      scientificName: 'Colossal Cephalopod',
      depth: '3000 METERS',
      description: 'Dinner-plate-sized eyes capture faint bioluminescent flashes in pitch-black water.',
      biolum: 'REFLECTIVE',
      pressure: '301.0 BAR',
      status: 'SONAR SHADOW',
    },
  ]

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {/* Top-Right: Zone Label */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(60px, 10vh, 120px)',
          right: 'clamp(16px, 4vw, 60px)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{ width: 'clamp(20px, 5vw, 80px)', height: '1px', background: 'var(--color-cyan)', opacity: 0.3 }} />
        <span className="text-mono text-cyan" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)', opacity: 0.7 }}>
          3000M • ABYSSOPELAGIC
        </span>
      </div>

      {/* Bottom-Left: Title */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(40px, 8vh, 120px)',
          left: 'clamp(16px, 4vw, 60px)',
          maxWidth: 'min(520px, calc(100vw - 32px))',
        }}
      >
        <div className="text-mono text-cyan" style={{ fontSize: 'clamp(0.6rem, 1.1vw, 0.7rem)', marginBottom: '6px', opacity: 0.6 }}>
          <Flashlight size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          SPOTLIGHT_PROTOCOL // ACTIVE
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 5vw, 3.8rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#FFF',
            marginBottom: '16px',
          }}
        >
          The dark<br />
          <span className="text-cyan">descends.</span>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)',
            color: 'rgba(255, 255, 255, 0.65)',
            lineHeight: 1.5,
            maxWidth: 'min(380px, calc(100vw - 48px))',
          }}
        >
          Zero natural light exists at this depth.
          Sweep the viewport to reveal hidden
          biomass targets on sonar.
        </p>
      </div>

      {/* Interactive Hotspots scattered across viewport */}
      {abyssHotspots.map((spot) => (
        <div
          key={spot.id}
          style={{
            position: 'absolute',
            top: spot.y,
            left: spot.x,
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
            zIndex: 30,
            pointerEvents: 'auto',
          }}
          onClick={() => {
            audioEngine.playSonarPing()
            if (onSelectDiscovery) onSelectDiscovery(spot)
          }}
          onMouseEnter={() => {
            setActiveHotspot(spot.id)
            audioEngine.playClick()
          }}
          onMouseLeave={() => setActiveHotspot(null)}
        >
          <div
            style={{
              width: 'clamp(20px, 3.5vw, 30px)',
              height: 'clamp(20px, 3.5vw, 30px)',
              borderRadius: '50%',
              background: 'rgba(0, 229, 255, 0.1)',
              border: '1px solid var(--color-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px var(--color-cyan-glow)',
              animation: 'pulseGlow 2s infinite',
            }}
          >
            <Crosshair size={10} className="text-cyan" />
          </div>

          {activeHotspot === spot.id && (
            <div
              className="text-mono text-cyan"
              style={{
                position: 'absolute',
                top: '110%',
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                padding: '4px 8px',
                fontSize: '0.55rem',
                background: 'rgba(3, 8, 14, 0.9)',
                border: '1px solid var(--color-cyan)',
                pointerEvents: 'none',
              }}
            >
              {spot.title}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
