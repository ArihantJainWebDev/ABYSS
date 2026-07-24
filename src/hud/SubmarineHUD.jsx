import React, { useState } from 'react'
import { audioEngine } from '../engine/AudioEngine'
import { Volume2, VolumeX, Anchor, ChevronDown, Activity, Gauge, Compass as CompassIcon, Wind } from 'lucide-react'

export default function SubmarineHUD({ depth = 0, onQuickJump }) {
  const [isAudioActive, setIsAudioActive] = useState(false)
  const [showNavMenu, setShowNavMenu] = useState(false)

  const bar = (1 + depth / 10).toFixed(1)
  const o2 = (98.4 - (depth / 4000) * 4.2).toFixed(1)
  const feet = Math.round(depth * 3.28084)

  const handleAudioToggle = () => {
    const active = audioEngine.toggleSound()
    setIsAudioActive(active)
    if (active) audioEngine.playClick()
  }

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
      <div className="viewport-glass-reflection" />
      <div className="scanline-overlay" />

      <div className="cockpit-hud-corner tl" />
      <div className="cockpit-hud-corner tr" />
      <div className="cockpit-hud-corner bl" />
      <div className="cockpit-hud-corner br" />

      {/* Sleek Floating Top HUD Bar */}
      <header
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          right: '20px',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Left: Brand & Navigation */}
        <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Anchor size={16} color="#00F0FF" />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.15em', color: '#FFF' }}>
              ABYSS
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setShowNavMenu(!showNavMenu)
                audioEngine.playClick()
              }}
              className="glass-panel"
              style={{
                padding: '8px 16px',
                borderRadius: '30px',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                border: '1px solid var(--hud-border)',
              }}
            >
              SECTORS <ChevronDown size={14} color="#00F0FF" />
            </button>

            {showNavMenu && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '120%',
                  left: 0,
                  width: '200px',
                  borderRadius: '12px',
                  padding: '8px 0',
                  zIndex: 60,
                  boxShadow: '0 12px 40px rgba(0,0,0,0.8)',
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
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      background: 'transparent',
                      border: 'none',
                      color: '#FFF',
                      textAlign: 'left',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,240,255,0.15)')}
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
          className="glass-panel"
          style={{
            pointerEvents: 'auto',
            padding: '8px 24px',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <Activity size={13} color="#00F0FF" style={{ marginRight: '4px' }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: '#00F0FF' }}>
              {depth.toLocaleString()}
            </span>
            <span style={{ color: '#00F0FF', fontSize: '0.8rem' }}>M</span>
            <span style={{ opacity: 0.5, fontSize: '0.68rem', marginLeft: '4px' }}>({feet.toLocaleString()} FT)</span>
          </div>

          <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.15)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Gauge size={13} color={depth > 1000 ? '#FFD166' : '#FFF'} />
            <span style={{ fontWeight: 700, color: depth > 1000 ? '#FFD166' : '#FFF' }}>{bar} BAR</span>
          </div>

          <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.15)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Wind size={13} color="#00F0FF" />
            <span style={{ opacity: 0.8 }}>O2:</span>
            <span style={{ fontWeight: 700, color: '#FFF' }}>{o2}%</span>
          </div>
        </div>

        {/* Right: Sound Toggle & Sonar */}
        <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Sonar Indicator Dot */}
          <div
            className="glass-panel"
            style={{
              padding: '8px 14px',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: '#00F0FF',
            }}
          >
            <div className="animate-pulse-glow" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00F0FF' }} />
            <span>SONAR ACTIVE</span>
          </div>

          {/* Audio Button */}
          <button
            onClick={handleAudioToggle}
            className="glass-panel"
            title={isAudioActive ? 'Mute Ambience' : 'Enable Audio'}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isAudioActive ? '#00F0FF' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              border: '1px solid ' + (isAudioActive ? 'var(--color-cyan-glow)' : 'var(--hud-border)'),
              transition: 'all 0.3s ease',
            }}
          >
            {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </header>
    </>
  )
}
