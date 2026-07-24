import React, { useState } from 'react'
import { Sparkles, Send, ChevronDown, Check, Anchor } from 'lucide-react'
import { audioEngine } from '../engine/AudioEngine'
import CraftConfigurator from '../components/CraftConfigurator'

export default function Scene07AbyssTerminal({ onOpenBooking }) {
  const [openFaq, setOpenFaq] = useState(null)

  const packages = [
    {
      name: 'Neptune Prime',
      badge: 'POPULAR LUXURY CHARTER',
      depth: 'Up to 2,500 Meters',
      duration: '4-Day Voyage',
      price: '$125,000 / berth',
      features: [
        'Private 360° Optical Acrylic Suite',
        'Personal Executive Chef & Marine Biologist',
        'Sunken Galleon & Bioluminescent Dives',
      ],
    },
    {
      name: 'Hadal Explorer',
      badge: 'RECORD EXPEDITION',
      depth: 'Up to 11,000 Meters (Challenger Deep)',
      duration: '8-Day Master Voyage',
      price: '$350,000 / berth',
      features: [
        'Full Trench Descent to Mariana Hadal Floor',
        'Titanium Pressure Capsule Certification',
        'Custom Insignia & Mission Patch',
      ],
    },
    {
      name: 'Research Charter',
      badge: 'SCIENTIFIC PARTNERSHIP',
      depth: 'Custom Depth Profile',
      duration: 'Custom Duration',
      price: 'Institutional Rates',
      features: [
        'Dedicated Payload Bay & Robotic Arm',
        'eDNA Water Sampler Array',
        'Joint Oceanographic Publishing Rights',
      ],
    },
  ]

  const faqs = [
    {
      q: 'How safe is diving to 10,000+ meters in an ABYSS submersible?',
      a: 'ABYSS submersibles feature dual forged Grade 5 titanium pressure spheres certified by DNV-GL to 1.5x maximum operating pressure. Life support systems are backed by 4 independent fail-safe backup channels providing 96 hours of continuous oxygen and CO2 scrubbing.',
    },
    {
      q: 'What physical preparation is required for passengers?',
      a: 'No specialized diving experience is required. Every explorer completes a 1-day safety orientation and acoustic telemetry briefing at ABYSS Mission Control prior to boarding the surface support vessel.',
    },
  ]

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 24px',
        pointerEvents: 'auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div
          className="glass-panel-gold"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '30px',
            marginBottom: '14px',
          }}
        >
          <Sparkles size={14} color="#FFD166" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#FFD166', letterSpacing: '0.2em' }}>
            HADAL ZONE • THE FINAL EXPEDITION STAGE
          </span>
        </div>

        <h2
          className="text-glow-gold"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            fontWeight: 800,
            marginBottom: '12px',
            color: '#FFF',
          }}
        >
          The Abyss Terminal
        </h2>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
          In 1960, humanity touched the ocean floor for 20 minutes. At ABYSS, we invite you to stay.
        </p>
      </div>

      {/* Craft Architecture Configurator */}
      <CraftConfigurator />

      {/* Package Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', margin: '40px 0' }}>
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '28px 24px',
              borderRadius: '14px',
              border: idx === 1 ? '1px solid #FFD166' : '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: idx === 1 ? '#FFD166' : '#00F0FF', letterSpacing: '0.15em', marginBottom: '6px' }}>
                {pkg.badge}
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
                {pkg.name}
              </h3>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: idx === 1 ? '#FFD166' : '#00F0FF', marginBottom: '18px' }}>
                {pkg.price}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {pkg.features.map((f, fIdx) => (
                  <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)' }}>
                    <Check size={14} color={idx === 1 ? '#FFD166' : '#00F0FF'} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                audioEngine.playSonarPing()
                if (onOpenBooking) onOpenBooking(pkg.name)
              }}
              className={idx === 1 ? 'btn-gold' : 'btn-primary'}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>RESERVE {pkg.name.toUpperCase()}</span>
              <Send size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div style={{ maxWidth: '720px', margin: '0 auto 60px auto' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', marginBottom: '24px', color: '#FFF' }}>
          Mission FAQ & Safety Telemetry
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, fIdx) => (
            <div
              key={fIdx}
              className="glass-panel"
              style={{ borderRadius: '10px', overflow: 'hidden' }}
            >
              <button
                onClick={() => {
                  setOpenFaq(openFaq === fIdx ? null : fIdx)
                  audioEngine.playClick()
                }}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: '#FFF',
                  textAlign: 'left',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{faq.q}</span>
                <ChevronDown size={16} color="#00F0FF" style={{ transform: openFaq === fIdx ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
              </button>

              {openFaq === fIdx && (
                <div style={{ padding: '0 20px 16px 20px', fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
