import React from 'react'
import { X, Cpu } from 'lucide-react'

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
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '16px',
          padding: 'clamp(20px, 4vw, 32px)',
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
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#FFF',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <X size={16} />
        </button>

        {/* Category Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', paddingRight: '40px' }}>
          <Cpu size={14} color="#00F0FF" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#00F0FF', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            SONAR DISCOVERY SCAN • {item.depth}
          </span>
        </div>

        {/* Title */}
        <h2 
          style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: 'clamp(1.3rem, 4vw, 2.2rem)', 
            fontWeight: 800, 
            marginBottom: '8px', 
            color: '#FFF',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
            paddingRight: '40px',
            lineHeight: 1.1
          }}
        >
          {item.title}
        </h2>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#FFD166', fontStyle: 'italic', marginBottom: '20px' }}>
          {item.scientificName || item.subtitle}
        </div>

        {/* Body Text */}
        <p style={{ lineHeight: '1.6', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '24px' }}>
          {item.description}
        </p>

        {/* Specs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', background: 'rgba(0,240,255,0.05)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(0,240,255,0.15)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', opacity: 0.6 }}>BIOLUMINESCENCE</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: '#00F0FF', wordBreak: 'break-word' }}>{item.biolum || 'HIGH (450nm)'}</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', opacity: 0.6 }}>PRESSURE TOLERANCE</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: '#FFD166', wordBreak: 'break-word' }}>{item.pressure || '300+ BAR'}</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', opacity: 0.6 }}>DISCOVERY STATUS</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: '#FFF', wordBreak: 'break-word' }}>{item.status || 'VERIFIED'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
