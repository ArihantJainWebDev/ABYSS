import React from 'react'
import { Terminal } from 'lucide-react'

export default function Scene01Surface() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {/* Top-Right: System Init Tag */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(60px, 10vh, 120px)',
          right: 'clamp(16px, 4vw, 60px)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          pointerEvents: 'auto',
        }}
      >
        <span className="text-mono text-cyan" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', opacity: 0.7 }}>
          SYS.INIT
        </span>
        <div style={{ width: 'clamp(20px, 5vw, 120px)', height: '1px', background: 'var(--color-cyan)', opacity: 0.3 }} />
        <Terminal size={12} className="text-cyan" style={{ opacity: 0.5 }} />
      </div>

      {/* Bottom-Left: Main Title Block */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(140px, 20vh, 240px)', /* Pushed much higher to avoid collision with labels */
          left: 'clamp(16px, 4vw, 60px)',
          maxWidth: 'min(520px, calc(100vw - 32px))',
          pointerEvents: 'auto',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 5.5vw, 4.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#FFF',
            marginBottom: '12px',
          }}
        >
          The complete<br />
          <span className="text-cyan">deep sea</span> expedition.
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.75rem, 1.4vw, 1rem)',
            color: 'rgba(255, 255, 255, 0.65)',
            lineHeight: 1.5,
            maxWidth: 'min(400px, calc(100vw - 48px))',
          }}
        >
          Descend into the Hadal Zone inside
          titanium-hulled submersibles with a
          single mission directive.
        </p>
      </div>

      {/* Right-side floating labels with dashed lines (Desktop only) */}
      <div
        className="hide-on-mobile"
        style={{
          position: 'absolute',
          right: 'clamp(24px, 5vw, 60px)',
          bottom: 'clamp(100px, 18vh, 200px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '6px',
        }}
      >
        {['titanium hull', 'mag-drive', 'acrylic dome', 'life support', 'sonar array', 'ballast'].map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="text-mono" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>
              {label}
            </span>
            <div style={{ width: 'clamp(30px, 6vw, 80px)', height: '1px', background: 'rgba(255,255,255,0.15)' }} />
          </div>
        ))}
      </div>

      {/* Bottom-Left: Floating telemetry labels (Desktop only) */}
      <div
        className="hide-on-mobile"
        style={{
          position: 'absolute',
          left: 'clamp(24px, 5vw, 60px)',
          bottom: 'clamp(24px, 4vh, 45px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        {['depth', 'pressure', 'telemetry', 'scroll', 'mission'].map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="text-mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)' }}>
              {label}
            </span>
            <div style={{ width: 'clamp(20px, 5vw, 60px)', height: '1px', background: 'rgba(255,255,255,0.12)' }} />
          </div>
        ))}
      </div>
    </div>
  )
}
