import React from 'react'
import { ArrowDown, Compass } from 'lucide-react'
import { audioEngine } from '../engine/AudioEngine'

export default function Scene01Surface({ onBeginExpedition }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '0 24px',
        pointerEvents: 'auto',
      }}
    >
      <div
        className="glass-panel"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 18px',
          borderRadius: '30px',
          marginBottom: '20px',
        }}
      >
        <Compass size={14} color="#00F0FF" />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00F0FF' }}>
          DEEP SEA EXPLORATION CO.
        </span>
      </div>

      <h1
        className="text-glow-cyan"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          marginBottom: '16px',
          color: '#FFF',
        }}
      >
        Explore The Last Frontier
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          color: 'rgba(255, 255, 255, 0.85)',
          maxWidth: '600px',
          margin: '0 auto 32px auto',
          lineHeight: 1.6,
          fontWeight: 300,
        }}
      >
        Descend thousands of meters into unexplored ocean trenches inside titanium-hulled luxury submersibles.
      </p>

      <button
        onClick={() => {
          audioEngine.playSonarPing()
          if (onBeginExpedition) onBeginExpedition()
        }}
        className="btn-primary"
      >
        <span>BEGIN EXPEDITION</span>
        <ArrowDown size={16} />
      </button>
    </div>
  )
}
