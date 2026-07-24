import React from 'react'
import { Zap, Eye, Moon, Sparkles } from 'lucide-react'
import { audioEngine } from '../engine/AudioEngine'

export default function Scene04Bioluminescence({ onSelectDiscovery }) {
  const biolumDiscoveries = [
    {
      title: 'Bioluminescent Pyrosome Night Dive',
      scientificName: 'Pyrosoma atlanticum',
      depth: '600 METERS',
      description: 'Witness giant cylindrical colonies of bioluminescent tunicates producing pulses of brilliant cyan light in total darkness.',
      biolum: 'HIGH (470nm Cyan)',
      pressure: '61.0 BAR',
      status: 'ACTIVE BIOLOGICAL DISCOVERY',
    },
    {
      title: 'Silent Mag-Drive Thruster Array',
      scientificName: 'Submarine Engineering Spec M4',
      depth: '600 METERS',
      description: 'Hydro-magnetic propulsion operating under 5 decibels, enabling close encounters with sensitive deep sea species.',
      biolum: 'ACOUSTICALLY SILENT',
      pressure: '61.0 BAR',
      status: 'VERIFIED HARDWARE',
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
          <Moon size={16} color="#7000FF" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#7000FF', letterSpacing: '0.2em' }}>
            600 METERS • MESOPELAGIC ZONE
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 800, color: '#FFF' }}>
          Where Light Is Born
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {biolumDiscoveries.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid rgba(112, 0, 255, 0.3)',
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
              e.currentTarget.style.borderColor = 'rgba(112, 0, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#7000FF' }}>
                SPECTRUM 0{idx + 1}
              </span>
              <Zap size={14} color="#00F0FF" />
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px', color: '#FFF' }}>
              {item.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: '14px' }}>
              {item.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00F0FF' }}>
              <Eye size={12} /> INSPECT SPECTRUM DATA
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
