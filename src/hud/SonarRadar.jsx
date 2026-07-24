import React from 'react'

export default function SonarRadar({ depth = 0 }) {
  return (
    <div className="glass-panel" style={{ padding: '12px', borderRadius: '8px', width: '80px', height: '80px', position: 'relative', overflow: 'hidden' }}>
      {/* Concentric radar rings */}
      <div style={{ position: 'absolute', inset: '10px', borderRadius: '50%', border: '1px solid rgba(0,240,255,0.25)' }} />
      <div style={{ position: 'absolute', inset: '24px', borderRadius: '50%', border: '1px solid rgba(0,240,255,0.2)' }} />
      <div style={{ position: 'absolute', inset: '38px', borderRadius: '50%', border: '1px solid rgba(0,240,255,0.15)' }} />
      
      {/* Crosshairs */}
      <div style={{ position: 'absolute', top: '50%', left: '10px', right: '10px', height: '1px', background: 'rgba(0,240,255,0.15)' }} />
      <div style={{ position: 'absolute', left: '50%', top: '10px', bottom: '10px', width: '1px', background: 'rgba(0,240,255,0.15)' }} />

      {/* Rotating Radar Sweep Line */}
      <div
        className="animate-sonar"
        style={{
          position: 'absolute',
          inset: '10px',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, rgba(0,240,255,0.4) 0deg, transparent 60deg, transparent 360deg)',
          pointerEvents: 'none',
        }}
      />

      {/* Target Blip */}
      <div
        className="animate-pulse-glow"
        style={{
          position: 'absolute',
          top: `${30 + (depth % 40)}%`,
          left: `${40 + ((depth * 3) % 30)}%`,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: depth > 1000 ? '#FFD166' : '#00F0FF',
          boxShadow: `0 0 8px ${depth > 1000 ? '#FFD166' : '#00F0FF'}`,
        }}
      />
    </div>
  )
}
