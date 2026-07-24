import React from 'react'
import { Eye, Sun, Sparkles } from 'lucide-react'
import { audioEngine } from '../engine/AudioEngine'

export default function Scene03Reef({ onSelectDiscovery }) {
  const reefDiscoveries = [
    {
      title: '360° Acrylic Viewport Sphere',
      scientificName: 'Submarine Engineering Spec A1',
      depth: '200 METERS',
      description: 'Custom optical-grade acrylic sphere engineered to provide zero-distortion panoramic vision under 21 BAR of hydrostatic pressure.',
      biolum: 'N/A (Sunlit Zone)',
      pressure: '21.0 BAR',
      status: 'VERIFIED HARDWARE',
    },
    {
      title: 'Epipelagic Coral Sanctuary Dive',
      scientificName: 'Luxury Private Charter Expedition',
      depth: '200 METERS',
      description: 'Explore thriving barrier reef ecosystems with marine biologists and private luxury dive concierges.',
      biolum: 'Natural Caustics',
      pressure: '21.0 BAR',
      status: 'AVAILABLE FOR BOOKING',
    },
  ]

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 24px',
        pointerEvents: 'auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <Sun size={16} color="#00F0FF" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#00F0FF', letterSpacing: '0.2em' }}>
            200 METERS • EPIPELAGIC ZONE
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 800, color: '#FFF' }}>
          The Living Reef
        </h2>
      </div>

      {/* Floating Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {reefDiscoveries.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '24px',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => {
              audioEngine.playClick()
              if (onSelectDiscovery) onSelectDiscovery(item)
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#00F0FF'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#00F0FF' }}>
                TARGET 0{idx + 1}
              </span>
              <Sparkles size={14} color="#00F0FF" />
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px', color: '#FFF' }}>
              {item.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: '14px' }}>
              {item.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00F0FF' }}>
              <Eye size={12} /> INSPECT SONAR SCAN
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
