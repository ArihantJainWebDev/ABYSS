import React from 'react'
import { ShieldCheck, Cpu, Waves } from 'lucide-react'

export default function Scene02Dive() {
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
        <div style={{ width: 'clamp(20px, 5vw, 80px)', height: '1px', background: 'var(--color-cyan)', opacity: 0.3 }} />
        <span className="text-mono text-cyan" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.65rem)', opacity: 0.7 }}>
          EPIPELAGIC ZONE
        </span>
      </div>

      {/* Bottom-Left: Title and Data */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(40px, 8vh, 120px)',
          left: 'clamp(16px, 4vw, 60px)',
          maxWidth: 'min(520px, calc(100vw - 32px))',
        }}
      >
        <div className="text-mono text-cyan" style={{ fontSize: 'clamp(0.6rem, 1.1vw, 0.7rem)', marginBottom: '6px', opacity: 0.6 }}>
          SYS.OP // DESCENT_PROTOCOL
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
          Crossing the<br />
          <span className="text-cyan">thermocline.</span>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.75rem, 1.4vw, 0.95rem)',
            color: 'rgba(255, 255, 255, 0.65)',
            lineHeight: 1.5,
            maxWidth: 'min(380px, calc(100vw - 48px))',
          }}
        >
          Sunlight fractures into deep emerald teal.
          Titanium seals engage as atmospheric
          pressure increases beyond surface norms.
        </p>
      </div>

      {/* Right side: Live telemetry readout (Desktop only) */}
      <div
        className="hide-on-mobile"
        style={{
          position: 'absolute',
          right: 'clamp(24px, 5vw, 60px)',
          bottom: 'clamp(80px, 14vh, 160px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
        }}
      >
        {[
          { label: 'HULL', value: '21 BAR', icon: ShieldCheck },
          { label: 'DESCENT', value: '2.4 M/S', icon: Waves },
          { label: 'LS_SYS', value: 'ACTIVE', icon: Cpu },
        ].map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="text-mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)' }}>
                {item.label}
              </span>
              <div style={{ width: 'clamp(20px, 4vw, 50px)', height: '1px', background: 'rgba(255,255,255,0.15)' }} />
              <span className="text-mono text-cyan" style={{ fontSize: '0.65rem' }}>
                {item.value}
              </span>
              <Icon size={10} className="text-cyan" style={{ opacity: 0.5 }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
