import React from 'react'
import { Eye, Sun } from 'lucide-react'
import { audioEngine } from '../engine/AudioEngine'

export default function Scene03Reef({ onSelectDiscovery }) {
  const discoveries = [
    {
      title: '360° Acrylic Viewport Sphere',
      scientificName: 'Engineering Spec A1',
      depth: '200 METERS',
      description: 'Zero-distortion panoramic sphere under 21 BAR.',
      biolum: 'N/A',
      pressure: '21.0 BAR',
      status: 'VERIFIED',
    },
    {
      title: 'Epipelagic Coral Sanctuary',
      scientificName: 'Private Charter',
      depth: '200 METERS',
      description: 'Barrier reef observation with marine biologists.',
      biolum: 'Natural Caustics',
      pressure: '21.0 BAR',
      status: 'BOOKING OPEN',
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
          200M • EPIPELAGIC
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
          <Sun size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          ENV_DATA // REEF_SECTOR
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
          The living<br />
          <span className="text-cyan">reef.</span>
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
          Thriving barrier reef ecosystems mapped
          through optical-grade acrylic with
          zero-distortion curvature.
        </p>
      </div>

      {/* Right side: Clickable spec cards (Desktop only) */}
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
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
          >
            <span className="text-mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textAlign: 'right', maxWidth: '180px' }}>
              {item.title}
            </span>
            <div style={{ width: 'clamp(20px, 4vw, 50px)', height: '1px', background: 'var(--color-cyan)', opacity: 0.4 }} />
            <Eye size={10} className="text-cyan" style={{ opacity: 0.5 }} />
          </div>
        ))}
      </div>
    </div>
  )
}
