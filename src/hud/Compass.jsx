import React from 'react'
import { Compass as CompassIcon } from 'lucide-react'

export default function Compass({ heading = 0 }) {
  const normalizedHeading = (heading * 18) % 360

  return (
    <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '14px' }}>
      <div style={{ position: 'relative', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px dashed rgba(0,240,255,0.4)',
            transform: `rotate(${normalizedHeading}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
        />
        <CompassIcon size={22} color="#00F0FF" />
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', opacity: 0.7, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Sub Gyro
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: '#FFF' }}>
          {Math.round(normalizedHeading)}° NNE
        </div>
      </div>
    </div>
  )
}
