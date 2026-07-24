import React, { useState } from 'react'
import { X, CheckCircle, Calendar, Users, ShieldCheck, Sparkles, Send } from 'lucide-react'

export default function BookingModal({ isOpen, onClose, selectedPackage }) {
  const [subTier, setSubTier] = useState(selectedPackage || 'Neptune Prime')
  const [passengers, setPassengers] = useState(2)
  const [launchDate, setLaunchDate] = useState('2026-11-14')
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isOpen) return null

  const handleLaunch = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(1, 4, 10, 0.92)',
        backdropFilter: 'blur(20px)',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel-gold"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '20px',
          padding: 'clamp(24px, 5vw, 40px)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
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

        {!isSubmitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', paddingRight: '40px' }}>
              <Sparkles size={14} color="#FFD166" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#FFD166', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                ABYSS MISSION CONTROL
              </span>
            </div>

            <h2 
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', 
                fontWeight: 800, 
                marginBottom: '24px', 
                color: '#FFF',
                paddingRight: '40px',
                lineHeight: 1.1
              }}
            >
              Reserve Your Expedition
            </h2>

            <form onSubmit={handleLaunch} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Package Selector */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginBottom: '10px' }}>
                  SELECT SUBMERSIBLE VESSEL
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                  {['Neptune Prime', 'Hadal Explorer', 'Research Charter'].map((tier) => (
                    <button
                      type="button"
                      key={tier}
                      onClick={() => setSubTier(tier)}
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        background: subTier === tier ? 'rgba(255,209,102,0.2)' : 'rgba(255,255,255,0.05)',
                        border: '1px solid ' + (subTier === tier ? '#FFD166' : 'rgba(255,255,255,0.1)'),
                        color: '#FFF',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Passengers & Date Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                    <Users size={12} color="#00F0FF" /> PASSENGERS (MAX 4)
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid rgba(0,240,255,0.3)',
                      color: '#FFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                    }}
                  >
                    <option value={1}>1 Explorer (Private Master Suite)</option>
                    <option value={2}>2 Explorers (Duo Charter)</option>
                    <option value={3}>3 Explorers (Family Berth)</option>
                    <option value={4}>4 Explorers (Full Crew Charter)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                    <Calendar size={12} color="#00F0FF" /> LAUNCH WINDOW
                  </label>
                  <input
                    type="date"
                    value={launchDate}
                    onChange={(e) => setLaunchDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px',
                      borderRadius: '8px',
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid rgba(0,240,255,0.3)',
                      color: '#FFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                    }}
                  />
                </div>
              </div>

              {/* Safety Rating */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'rgba(0,240,255,0.06)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(0,240,255,0.2)' }}>
                <ShieldCheck size={20} color="#00F0FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: '#FFF', marginBottom: '4px' }}>
                    DUAL TITANIUM HULL RATED TO 11,000 METERS
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                    Includes life support redundancy for 96 hours, life suit, and surface support vessel.
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px', borderColor: 'var(--color-gold)', color: 'var(--color-gold)', background: 'var(--color-gold-dim)' }}>
                <span>CONFIRM RESERVATION</span>
                <Send size={14} />
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <CheckCircle size={56} color="#FFD166" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', fontWeight: 800, marginBottom: '12px', color: '#FFF' }}>
              EXPEDITION APPROVED
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: '1.6' }}>
              Your reservation for <strong>{subTier}</strong> has been logged in ABYSS Mission Control for <strong>{launchDate}</strong>.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#00F0FF', marginBottom: '32px' }}>
              TELEMETRY: #ABYSS-EXP-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button onClick={onClose} className="btn-primary">
              CLOSE TERMINAL
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
