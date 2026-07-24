export default function SceneLabel({ eyebrow, title }) {
  return (
    <div style={{
      position: 'absolute', bottom: '12%', left: '8%', maxWidth: 520,
      color: '#fff', textShadow: '0 2px 20px rgba(0,0,0,0.6)',
    }}>
      {eyebrow && (
        <div style={{ fontSize: 12, letterSpacing: 3, opacity: 0.7, marginBottom: 8 }}>
          {eyebrow}
        </div>
      )}
      <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 600, lineHeight: 1.1 }}>
        {title}
      </h2>
    </div>
  )
}
