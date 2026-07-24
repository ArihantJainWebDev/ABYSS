import React from 'react'
import { X, ShieldAlert, Compass, Eye, Cpu } from 'lucide-react'

export default function MarineModal({ item, onClose }) {
  if (!item) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 5, 12, 0.85)',
        backdropFilter: 'blur(12px)',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '640px',
          borderRadius: '16px',
          padding: '32px',
          position: 'relative',
          border: '1px solid rgba(0,240,255,0.4)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(0,240,255,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#FFF',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} />
        </button>

        {/* Category Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Cpu size={14} color="#00F0FF" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#00F0FF', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            SONAR DISCOVERY SCAN • {item.depth}
          </span>
        </div>

        {/* Title */}
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, marginBottom: '8px', color: '#FFF' }}>
          {item.title}
        </h2>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#FFD166', fontStyle: 'italic', marginBottom: '20px' }}>
          {item.scientificName || item.subtitle}
        </div>

        {/* Body Text */}
        <p style={{ lineHeight: '1.7', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', marginBottom: '28px' }}>
          {item.description}
        </p>

        {/* Specs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', background: 'rgba(0,240,255,0.05)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(0,240,255,0.15)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', opacity: 0.6 }}>BIOLUMINESCENCE</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: '#00F0FF' }}>{item.biolum || 'HIGH (450nm)'}</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', opacity: 0.6 }}>PRESSURE TOLERANCE</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: '#FFD166' }}>{item.pressure || '300+ BAR'}</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', opacity: 0.6 }}>DISCOVERY STATUS</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: '#FFF' }}>{item.status || 'VERIFIED'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
