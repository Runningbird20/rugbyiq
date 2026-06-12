export default function PlaceholderPage({ icon, eyebrow, title, desc, features }) {
  return (
    <div className="ph-page">
      <div className="ph-icon">{icon}</div>
      <div className="ph-eyebrow">{eyebrow}</div>
      <div className="ph-title">{title}</div>
      <div className="ph-desc">{desc}</div>
      <div className="ph-badge">🚧 Placeholder</div>
      <hr className="ph-divider" />
      <div className="ph-features">
        {features.map((f, i) => (
          <div key={i} className="ph-feature">
            <div className="ph-feature-icon">{f.icon}</div>
            <div className="ph-feature-text">
              <div className="ph-feature-title">{f.title}</div>
              <div className="ph-feature-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
