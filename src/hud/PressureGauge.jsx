import React from 'react'
import { Gauge } from 'lucide-react'

export default function PressureGauge({ meters = 0 }) {
  const bar = (1 + meters / 10).toFixed(1)
  const psi = Math.round(bar * 14.5038)
  const isHighPressure = meters > 1000

  return (
    <div className="glass-panel" style={{ padding: '16px 24px', borderRadius: '8px', minWidth: '200px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', opacity: 0.7 }}>
        <Gauge size={14} color={isHighPressure ? '#FFD166' : '#00F0FF'} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Hydrostatic Pressure
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.8rem',
            fontWeight: 800,
            color: isHighPressure ? '#FFD166' : '#FFF',
            textShadow: isHighPressure ? '0 0 16px rgba(255,209,102,0.5)' : 'none',
          }}
        >
          {bar}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: isHighPressure ? '#FFD166' : '#00F0FF' }}>
          BAR
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.5, marginLeft: 'auto' }}>
          {psi.toLocaleString()} PSI
        </span>
      </div>
      <div style={{ marginTop: '6px', width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${Math.min(100, (meters / 4000) * 100)}%`,
            background: isHighPressure ? 'linear-gradient(90deg, #00F0FF, #FFD166)' : '#00F0FF',
            transition: 'width 0.3s ease-out',
          }}
        />
      </div>
    </div>
  )
}
