import React from 'react'
import { Zap, Eye, Moon } from 'lucide-react'
import { audioEngine } from '../engine/AudioEngine'

export default function Scene04Bioluminescence({ onSelectDiscovery }) {
  const discoveries = [
    {
      title: 'Pyrosoma atlanticum',
      scientificName: 'Pyrosoma atlanticum',
      depth: '600 METERS',
      description: 'Bioluminescent tunicate colony producing 470nm cyan light pulses.',
      biolum: 'HIGH (470nm Cyan)',
      pressure: '61.0 BAR',
      status: 'LIVE DETECTION',
    },
    {
      title: 'Mag-Drive Thruster Array',
      scientificName: 'Engineering Spec M4',
      depth: '600 METERS',
      description: 'Hydro-magnetic propulsion under 5 decibels.',
      biolum: 'SILENT',
      pressure: '61.0 BAR',
      status: 'VERIFIED',
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
          600M • MESOPELAGIC
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
          <Moon size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          BIO_SCAN // ACTIVE
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
          Where light<br />
          <span className="text-cyan">is born.</span>
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
          Colonies of bioluminescent organisms
          generate pulsing waves of cyan light
          in total darkness — visible only from
          a silent approach.
        </p>
      </div>

      {/* Right side: Clickable spec labels (Desktop only) */}
      <div
        className="hide-on-mobile"
        style={{
          position: 'absolute',
          right: 'clamp(24px, 5vw, 60px)',
          bottom: 'clamp(60px, 10vh, 120px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px',
          pointerEvents: 'auto',
        }}
      >
        {discoveries.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              audioEngine.playClick()
              if (onSelectDiscovery) onSelectDiscovery(item)
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              padding: '6px 0',
              opacity: 0.7,
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
          >
            <span className="text-mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textAlign: 'right', maxWidth: '180px' }}>
              {item.title}
            </span>
            <div style={{ width: 'clamp(20px, 4vw, 50px)', height: '1px', background: 'var(--color-cyan)', opacity: 0.4 }} />
            <Zap size={10} className="text-cyan" style={{ opacity: 0.5 }} />
          </div>
        ))}
      </div>
    </div>
  )
}
