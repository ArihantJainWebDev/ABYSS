import React from 'react'
import { Wind, BatteryCharging, Thermometer, ShieldAlert } from 'lucide-react'

export default function TelemetryBar({ depth = 0 }) {
  const o2 = (98.4 - (depth / 4000) * 4.2).toFixed(1)
  const battery = Math.max(72, Math.round(96 - (depth / 4000) * 16))
  const temp = Math.max(1.2, (24 - (depth / 1000) * 6.5)).toFixed(1)
  const stress = Math.min(78, Math.round((depth / 4000) * 68))

  return (
    <div
      className="glass-panel"
      style={{
        padding: '10px 20px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Wind size={14} color="#00F0FF" />
        <span style={{ opacity: 0.6 }}>O2:</span>
        <span style={{ fontWeight: 700, color: '#FFF' }}>{o2}%</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <BatteryCharging size={14} color="#00F0FF" />
        <span style={{ opacity: 0.6 }}>PWR:</span>
        <span style={{ fontWeight: 700, color: '#FFF' }}>{battery}%</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Thermometer size={14} color={depth > 1000 ? '#00F0FF' : '#FFD166'} />
        <span style={{ opacity: 0.6 }}>TEMP:</span>
        <span style={{ fontWeight: 700, color: '#FFF' }}>{temp}°C</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <ShieldAlert size={14} color={stress > 50 ? '#FFD166' : '#00F0FF'} />
        <span style={{ opacity: 0.6 }}>STRESS:</span>
        <span style={{ fontWeight: 700, color: stress > 50 ? '#FFD166' : '#FFF' }}>{stress}%</span>
      </div>
    </div>
  )
}
