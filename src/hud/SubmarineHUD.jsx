import React, { useState } from 'react'
import { Anchor, ChevronDown, Activity, Gauge, Wind } from 'lucide-react'
import { audioEngine } from '../engine/AudioEngine'

export default function SubmarineHUD({ depth = 0, onQuickJump }) {
  const [showNavMenu, setShowNavMenu] = useState(false)

  const bar = (1 + depth / 10).toFixed(1)
  const o2 = (98.4 - (depth / 4000) * 4.2).toFixed(1)
  const feet = Math.round(depth * 3.28084)

  const navStops = [
    { label: 'Surface (0m)', depth: 0 },
    { label: 'The Dive (200m)', depth: 200 },
    { label: 'Living Reef (600m)', depth: 600 },
    { label: 'Bioluminescence (1500m)', depth: 1500 },
    { label: 'The Dark (3000m)', depth: 3000 },
    { label: 'The Abyss (Hadal)', depth: 4000 },
  ]

  return (
    <>
      {/* Submarine Viewport & Scanlines Overlay */}
      <div className="viewport-cockpit-frame" />
      <div className="scanline-overlay" />

      {/* Schematic Corner Reticles */}
      <div className="cockpit-hud-corner tl" />
      <div className="cockpit-hud-corner tr" />
      <div className="cockpit-hud-corner bl" />
      <div className="cockpit-hud-corner br" />

      {/* Sleek Floating Top HUD Bar */}
      <header
        style={{
          position: 'fixed',
          top: '3vmin',
          left: '3vmin',
          right: '3vmin',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pointerEvents: 'none',
          gap: '12px',
        }}
      >
        {/* Left: Brand & Navigation */}
        <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="glass-panel" style={{ padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <Anchor size={14} className="text-cyan" />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.2em' }}>
              ABYSS
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setShowNavMenu(!showNavMenu)
                audioEngine.playClick()
              }}
              className="glass-panel text-mono"
              style={{
                padding: '6px 12px',
                color: 'var(--color-cyan)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontSize: '0.7rem',
                border: '1px solid var(--hud-border)',
                background: 'transparent',
              }}
            >
              SECTORS <ChevronDown size={12} />
            </button>

            {showNavMenu && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '180px',
                  padding: '4px 0',
                  marginTop: '4px',
                  zIndex: 60,
                }}
              >
                {navStops.map((stop) => (
                  <button
                    key={stop.depth}
                    onClick={() => {
                      if (onQuickJump) onQuickJump(stop.depth)
                      setShowNavMenu(false)
                      audioEngine.playSonarPing()
                    }}
                    className="text-mono"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'transparent',
                      border: 'none',
                      color: '#FFF',
                      textAlign: 'left',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-cyan-dim)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span>{stop.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Unified Ultra-Sleek Telemetry Pill */}
        <div
          className="glass-panel text-mono"
          style={{
            pointerEvents: 'auto',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '50vw',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <Activity size={12} className="text-cyan hide-on-mobile" style={{ marginRight: '4px' }} />
            <span className="text-cyan" style={{ fontSize: '1rem', fontWeight: 600 }}>
              {depth.toLocaleString()}
            </span>
            <span className="text-cyan" style={{ fontSize: '0.7rem' }}>M</span>
            <span className="text-muted hide-on-mobile" style={{ fontSize: '0.65rem', marginLeft: '4px' }}>
              ({feet.toLocaleString()} FT)
            </span>
          </div>

          <div className="hide-on-mobile" style={{ width: '1px', height: '12px', background: 'var(--color-grid)' }} />

          <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Gauge size={12} color={depth > 1000 ? 'var(--color-gold)' : 'var(--text-muted)'} />
            <span style={{ color: depth > 1000 ? 'var(--color-gold)' : 'var(--text-muted)' }}>{bar} BAR</span>
          </div>

          <div className="hide-on-mobile" style={{ width: '1px', height: '12px', background: 'var(--color-grid)' }} />

          <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Wind size={12} className="text-cyan" />
            <span className="text-muted">O2:</span>
            <span>{o2}%</span>
          </div>
        </div>

        {/* Right: Sonar Indicator */}
        <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <div
            className="glass-panel text-mono"
            style={{
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.65rem',
              color: 'var(--color-cyan)',
            }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-cyan)', animation: 'pulseGlow 2s infinite' }} />
            <span>SONAR</span>
          </div>
        </div>
      </header>
    </>
  )
}
