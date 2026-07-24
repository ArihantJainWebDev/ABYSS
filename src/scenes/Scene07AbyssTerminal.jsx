import React from 'react'
import { Server, Send } from 'lucide-react'
import { audioEngine } from '../engine/AudioEngine'

export default function Scene07AbyssTerminal({ onOpenBooking }) {
  const missions = [
    { label: 'NEPTUNE PRIME', depth: '2,500M', dur: '96 HRS', tag: 'CHARTER' },
    { label: 'CHALLENGER DEEP', depth: '11,000M', dur: '192 HRS', tag: 'HADAL' },
    { label: 'SCI RESEARCH', depth: 'CUSTOM', dur: 'VARIABLE', tag: 'SCIENCE' },
  ]

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {/* Top-Right: Zone Label */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(60px, 10vh, 120px)',
          right: 'clamp(16px, 4vw, 60px)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{ width: 'clamp(20px, 5vw, 80px)', height: '1px', background: 'var(--color-gold)', opacity: 0.3 }} />
        <span className="text-mono text-gold" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)', opacity: 0.7 }}>
          11,000M • HADAL ZONE
        </span>
      </div>

      {/* Bottom-Left: Title */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(40px, 8vh, 120px)',
          left: 'clamp(16px, 4vw, 60px)',
          maxWidth: 'min(520px, calc(100vw - 32px))',
        }}
      >
        <div className="text-mono text-gold" style={{ fontSize: 'clamp(0.6rem, 1.1vw, 0.7rem)', marginBottom: '6px', opacity: 0.6 }}>
          <Server size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
          TERMINAL // FINAL_STAGE
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 5vw, 3.8rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#FFF',
            marginBottom: '16px',
          }}
        >
          The abyss<br />
          <span className="text-gold">terminal.</span>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)',
            color: 'rgba(255, 255, 255, 0.65)',
            lineHeight: 1.5,
            maxWidth: 'min(380px, calc(100vw - 48px))',
            marginBottom: '20px',
          }}
        >
          In 1960, humanity touched the ocean floor
          for 20 minutes. At ABYSS, we invite
          you to stay.
        </p>

        <button
          onClick={() => {
            audioEngine.playSonarPing()
            if (onOpenBooking) onOpenBooking('Hadal Explorer')
          }}
          className="btn-primary"
          style={{ pointerEvents: 'auto', borderColor: 'var(--color-gold)', color: 'var(--color-gold)', background: 'var(--color-gold-dim)' }}
        >
          <span>INITIATE BOOKING</span>
          <Send size={14} />
        </button>
      </div>

      {/* Right side: Mission architectures as floating labels (Desktop only) */}
      <div
        className="hide-on-mobile"
        style={{
          position: 'absolute',
          right: 'clamp(24px, 5vw, 60px)',
          bottom: 'clamp(60px, 10vh, 120px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '16px',
          pointerEvents: 'auto',
        }}
      >
        {missions.map((m, i) => (
          <div
            key={i}
            onClick={() => {
              audioEngine.playSonarPing()
              if (onOpenBooking) onOpenBooking(m.label)
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              opacity: 0.7,
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
          >
            <div style={{ textAlign: 'right' }}>
              <div className="text-mono" style={{ fontSize: '0.65rem', color: '#FFF', marginBottom: '2px' }}>
                {m.label}
              </div>
              <div className="text-mono" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>
                {m.depth} / {m.dur}
              </div>
            </div>
            <div style={{ width: 'clamp(20px, 4vw, 50px)', height: '1px', background: 'var(--color-gold)', opacity: 0.4 }} />
            <div className="text-mono text-gold" style={{ fontSize: '0.55rem', padding: '2px 6px', border: '1px solid var(--color-gold)', opacity: 0.6 }}>
              {m.tag}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom-Right: Telemetry readout (Desktop only) */}
      <div
        className="hide-on-mobile"
        style={{
          position: 'absolute',
          right: 'clamp(24px, 5vw, 60px)',
          top: 'clamp(120px, 18vh, 180px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '4px',
        }}
      >
        {['pressure: 1086 bar', 'light: 0.00%', 'temp: 1.4°C', 'hull: nominal'].map((line, i) => (
          <span key={i} className="text-mono" style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.25)' }}>
            {line}
          </span>
        ))}
      </div>
    </div>
  )
}
