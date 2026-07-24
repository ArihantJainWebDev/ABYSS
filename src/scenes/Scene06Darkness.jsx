import React, { useState } from 'react'
import { Flashlight, Sparkles } from 'lucide-react'
import { audioEngine } from '../engine/AudioEngine'

export default function Scene06Darkness({ onSelectDiscovery }) {
  const [activeHotspot, setActiveHotspot] = useState(null)

  const abyssHotspots = [
    {
      id: 'anglerfish',
      x: '30%',
      y: '45%',
      title: 'Melanocetus Johnsonii (Humpback Anglerfish)',
      scientificName: 'Deep Sea Predator Specimen',
      depth: '3000 METERS',
      description: 'Equipped with a modified dorsal fin spine bearing a glowing esca (lure) containing bioluminescent symbiotic bacteria.',
      biolum: 'EMITTED FROM ESCA LURE',
      pressure: '301.0 BAR',
      status: 'LIVE SPECIES DETECTED',
    },
    {
      id: 'vent',
      x: '70%',
      y: '60%',
      title: 'Hydrothermal Black Smoker Vent',
      scientificName: 'Geothermal Mineral Chimney',
      depth: '3000 METERS',
      description: 'Superheated fluids at 380°C rich in iron sulfide spew into near-freezing ocean water, supporting chemosynthetic ecosystems.',
      biolum: 'THERMAL GLOW',
      pressure: '301.0 BAR',
      status: 'GEOTHERMAL ANOMALY',
    },
    {
      id: 'squid',
      x: '50%',
      y: '35%',
      title: 'Architeuthis Dux (Giant Abyssal Squid)',
      scientificName: 'Colossal Cephalopod Specimen',
      depth: '3000 METERS',
      description: 'Elusive predator featuring eyes the size of dinner plates designed to capture faint bioluminescent flashes in pitch black water.',
      biolum: 'FAINT REFLECTIVE GLOW',
      pressure: '301.0 BAR',
      status: 'SHADOW DETECTED ON SONAR',
    },
  ]

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 24px',
        pointerEvents: 'auto',
        textAlign: 'center',
      }}
    >
      <div className="glass-panel" style={{ padding: '24px 36px', borderRadius: '14px', maxWidth: '640px', margin: '0 auto 30px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
          <Flashlight size={16} color="#00F0FF" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00F0FF', letterSpacing: '0.2em' }}>
            3000 METERS • ABYSSOPELAGIC ZONE
          </span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
          The Dark Descends
        </h2>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
          Zero natural light exists. <strong>Move your cursor to sweep the spotlight and reveal hidden species.</strong>
        </p>
      </div>

      {/* Interactive Hotspots */}
      <div style={{ position: 'relative', width: '100%', height: '240px', margin: '0 auto' }}>
        {abyssHotspots.map((spot) => (
          <div
            key={spot.id}
            onClick={() => {
              audioEngine.playSonarPing()
              if (onSelectDiscovery) onSelectDiscovery(spot)
            }}
            onMouseEnter={() => {
              setActiveHotspot(spot.id)
              audioEngine.playClick()
            }}
            onMouseLeave={() => setActiveHotspot(null)}
            style={{
              position: 'absolute',
              top: spot.y,
              left: spot.x,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              zIndex: 30,
            }}
          >
            <div
              className="animate-pulse-glow"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(0, 240, 255, 0.2)',
                border: '1px solid #00F0FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px #00F0FF',
              }}
            >
              <Sparkles size={16} color="#FFF" />
            </div>

            {activeHotspot === spot.id && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '10px',
                  whiteSpace: 'nowrap',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: '#00F0FF',
                  pointerEvents: 'none',
                }}
              >
                SCAN: {spot.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
