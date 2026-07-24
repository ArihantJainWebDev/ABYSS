import React from 'react'
import { Anchor, Eye, Sparkles } from 'lucide-react'
import { audioEngine } from '../engine/AudioEngine'

export default function Scene05Ruins({ onSelectDiscovery }) {
  const relicDiscoveries = [
    {
      title: 'Sunken Galleon Archeology Charter',
      scientificName: '17th-Century Treasure Shipwreck Site',
      depth: '1500 METERS',
      description: 'Navigate ancient wooden hulls preserved by cold abyssal waters. Includes 3D laser photogrammetry mapping.',
      biolum: 'N/A',
      pressure: '151.0 BAR',
      status: 'PROTECTED ARCHAEOLOGY SITE',
    },
    {
      title: 'Scientific Research & Payload Missions',
      scientificName: 'Suboceanic Exploration Partnership',
      depth: '1500 METERS',
      description: 'Partner with oceanographic institutions to collect deep-water eDNA samples and deploy deep seafloor sensors.',
      biolum: 'VARIES',
      pressure: '151.0 BAR',
      status: 'OPEN FOR SCIENTIFIC CHARTER',
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
          <Anchor size={16} color="#FFD166" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#FFD166', letterSpacing: '0.2em' }}>
            1500 METERS • BATHYPELAGIC ZONE
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 800, color: '#FFF' }}>
          What The Sea Keeps
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {relicDiscoveries.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 209, 102, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => {
              audioEngine.playPressureCreak()
              if (onSelectDiscovery) onSelectDiscovery(item)
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FFD166'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 209, 102, 0.3)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#FFD166' }}>
                ARCHAEOLOGY 0{idx + 1}
              </span>
              <Sparkles size={14} color="#FFD166" />
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px', color: '#FFF' }}>
              {item.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: '14px' }}>
              {item.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#FFD166' }}>
              <Eye size={12} /> INSPECT ARCHAEOLOGY TELEMETRY
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
