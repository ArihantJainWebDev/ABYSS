import React, { useState } from 'react'
import { Cpu, ShieldCheck, Eye, Wind, Sparkles } from 'lucide-react'
import { audioEngine } from '../engine/AudioEngine'

export default function CraftConfigurator() {
  const [activeModule, setActiveModule] = useState('titanium')

  const modules = {
    titanium: {
      title: 'Dual Titanium Pressure Capsule',
      badge: 'GRADE 5 FORGED TITANIUM ALLOY',
      icon: ShieldCheck,
      spec1: '120mm Wall Thickness',
      spec2: 'Rated to 1,100 BAR (11,000m)',
      spec3: 'DNV-GL Safety Certified 1.5x',
      description: 'Forged under extreme temperature and pressure, the inner sphere remains at a comfortable 1 ATM surface pressure regardless of ocean depth.',
    },
    acrylic: {
      title: '360° Optical Acrylic Dome',
      badge: 'OPTICAL-GRADE FUSED QUARTZ',
      icon: Eye,
      spec1: '210mm Dome Thickness',
      spec2: 'Refractive Index Matched',
      spec3: 'Zero Distortional Curvature',
      description: 'Crafted from a single block of optical acrylic to deliver unrestricted, ultra-clear panoramic views of deep sea marine life.',
    },
    propulsion: {
      title: 'Acoustic Mag-Drive Thrusters',
      badge: 'HYDRO-MAGNETIC PROPULSION',
      icon: Cpu,
      spec1: 'Decibel Output < 5 dB',
      spec2: 'Vector Thrust 360° Control',
      spec3: 'Zero-Emissions Battery System',
      description: 'Magnetic levitation thrusters eliminate gearbox noise entirely, allowing silent approach within centimeters of delicate deep ocean species.',
    },
    lifesupport: {
      title: '96-Hour Redundant Life Support',
      badge: 'QUADRUPLE O2 SCRUBBING MATRIX',
      icon: Wind,
      spec1: 'Dual O2 Reserve Tanks',
      spec2: 'LiOH CO2 Absorbers',
      spec3: 'Autonomous Emergency Ascent',
      description: 'Complete atmospheric management system maintaining optimal 21% oxygen levels with emergency surface ascent weights.',
    },
  }

  const current = modules[activeModule]
  const IconComp = current.icon

  return (
    <div className="glass-panel" style={{ borderRadius: '16px', padding: '36px', border: '1px solid rgba(0,240,255,0.3)', margin: '40px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Sparkles size={18} color="#00F0FF" />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#00F0FF', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          INTERACTIVE VESSEL ARCHITECTURE
        </span>
      </div>

      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, marginBottom: '24px', color: '#FFF' }}>
        Neptune Prime Submersible Craft
      </h3>

      {/* Module Selector Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
        {[
          { key: 'titanium', label: 'PRESSURE HULL' },
          { key: 'acrylic', label: 'ACRYLIC DOME' },
          { key: 'propulsion', label: 'MAG-DRIVE' },
          { key: 'lifesupport', label: 'LIFE SUPPORT' },
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => {
              setActiveModule(btn.key)
              audioEngine.playClick()
            }}
            style={{
              padding: '14px 10px',
              borderRadius: '8px',
              background: activeModule === btn.key ? 'rgba(0,240,255,0.2)' : 'rgba(255,255,255,0.04)',
              border: '1px solid ' + (activeModule === btn.key ? '#00F0FF' : 'rgba(255,255,255,0.1)'),
              color: activeModule === btn.key ? '#00F0FF' : '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.1em',
              transition: 'all 0.3s ease',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Craft Schematic Preview Box */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center', background: 'rgba(0,240,255,0.03)', padding: '28px', borderRadius: '12px', border: '1px solid rgba(0,240,255,0.15)' }}>
        {/* SVG Submarine Schematic */}
        <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
            {/* Sub Hull */}
            <path
              d="M 50,100 Q 120,40 280,40 L 340,65 Q 370,100 340,135 L 280,160 Q 120,160 50,100 Z"
              fill={activeModule === 'titanium' ? 'rgba(0, 240, 255, 0.4)' : 'rgba(10, 30, 50, 0.6)'}
              stroke="#00F0FF"
              strokeWidth="2"
              style={{ transition: 'all 0.4s ease' }}
            />
            {/* Acrylic Dome */}
            <circle
              cx="310"
              cy="100"
              r="35"
              fill={activeModule === 'acrylic' ? 'rgba(255, 209, 102, 0.6)' : 'rgba(255, 255, 255, 0.2)'}
              stroke="#FFD166"
              strokeWidth="2"
              style={{ transition: 'all 0.4s ease' }}
            />
            {/* Mag Drive Thrusters */}
            <rect
              x="140"
              y="20"
              width="60"
              height="20"
              rx="4"
              fill={activeModule === 'propulsion' ? '#7000FF' : 'rgba(0,240,255,0.2)'}
              stroke="#00F0FF"
              style={{ transition: 'all 0.4s ease' }}
            />
            <rect
              x="140"
              y="160"
              width="60"
              height="20"
              rx="4"
              fill={activeModule === 'propulsion' ? '#7000FF' : 'rgba(0,240,255,0.2)'}
              stroke="#00F0FF"
              style={{ transition: 'all 0.4s ease' }}
            />
            {/* Life Support Indicator */}
            <circle
              cx="180"
              cy="100"
              r="22"
              fill={activeModule === 'lifesupport' ? 'rgba(0, 240, 255, 0.6)' : 'none'}
              stroke="#00F0FF"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        {/* Selected Module Specs */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <IconComp size={18} color="#00F0FF" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#00F0FF', letterSpacing: '0.15em' }}>
              {current.badge}
            </span>
          </div>

          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px', color: '#FFF' }}>
            {current.title}
          </h4>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '20px' }}>
            {current.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#FFD166', display: 'flex', alignItems: 'center', gap: '6px' }}>
              • {current.spec1}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#FFD166', display: 'flex', alignItems: 'center', gap: '6px' }}>
              • {current.spec2}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#FFD166', display: 'flex', alignItems: 'center', gap: '6px' }}>
              • {current.spec3}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
