import React from 'react'
import { Activity } from 'lucide-react'

export default function DepthCounter({ meters = 0 }) {
  const feet = Math.round(meters * 3.28084)

  const getZone = (m) => {
    if (m < 200) return 'EPIPELAGIC (SUNLIGHT ZONE)'
    if (m < 1000) return 'MESOPELAGIC (TWILIGHT ZONE)'
    if (m < 3000) return 'BATHYPELAGIC (MIDNIGHT ZONE)'
    if (m < 6000) return 'ABYSSOPELAGIC (THE ABYSS)'
    return 'HADAL ZONE (TRENCH)'
  }

  return (
    <div className="glass-panel" style={{ padding: '16px 24px', borderRadius: '8px', minWidth: '220px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', opacity: 0.7 }}>
        <Activity size={14} color="#00F0FF" />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Depth Telemetry
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: '#00F0FF', textShadow: '0 0 16px rgba(0,240,255,0.5)' }}>
          {meters.toLocaleString()}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#00F0FF' }}>M</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', opacity: 0.5, marginLeft: 'auto' }}>
          ({feet.toLocaleString()} FT)
        </span>
      </div>
      <div style={{ marginTop: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em' }}>
        ZONE: <span style={{ color: '#FFD166' }}>{getZone(meters)}</span>
      </div>
    </div>
  )
}
