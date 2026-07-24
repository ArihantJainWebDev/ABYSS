import React from 'react'
import { ShieldCheck, Cpu, Waves } from 'lucide-react'

export default function Scene02Dive() {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '0 24px',
        pointerEvents: 'auto',
      }}
    >
      <div className="glass-panel" style={{ padding: '36px', borderRadius: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
          <Waves size={18} color="#00F0FF" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#00F0FF', letterSpacing: '0.2em' }}>
            DESCENT PROTOCOL ENGAGED • 200M
          </span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', fontWeight: 800, marginBottom: '12px', color: '#FFF' }}>
          Crossing The Water Barrier
        </h2>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '24px' }}>
          Natural sunlight refracts into deep emerald teal. Titanium seals lock automatically as atmospheric pressure increases.
        </p>

        {/* Minimal Telemetry Line */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#00F0FF' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} /> HULL: NOMINAL
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cpu size={14} /> LIFE SUPPORT: 96H
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Waves size={14} /> SPEED: 2.4 M/S
          </span>
        </div>
      </div>
    </div>
  )
}
