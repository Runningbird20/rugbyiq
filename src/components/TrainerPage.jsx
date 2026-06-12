import { useState } from 'react'
import { positions } from '../data/positions'
import RadarChart from './RadarChart'

const DOT_POSITIONS = [
  { cx: 122, cy: 290, fill: 'white' },
  { cx: 150, cy: 290, fill: 'white' },
  { cx: 178, cy: 290, fill: 'white' },
  { cx: 132, cy: 310, fill: 'white' },
  { cx: 168, cy: 310, fill: 'white' },
  { cx: 112, cy: 328, fill: 'white' },
  { cx: 188, cy: 328, fill: 'white' },
  { cx: 150, cy: 346, fill: 'white' },
  { cx: 150, cy: 368, fill: '#e0e8ff' },
  { cx: 118, cy: 388, fill: '#e0e8ff' },
  { cx: 55,  cy: 420, fill: '#e0e8ff' },
  { cx: 120, cy: 412, fill: '#e0e8ff' },
  { cx: 175, cy: 412, fill: '#e0e8ff' },
  { cx: 245, cy: 420, fill: '#e0e8ff' },
  { cx: 150, cy: 440, fill: '#e0e8ff' },
]

export default function TrainerPage() {
  const [selectedPos, setSelectedPos] = useState(null)

  const pos = selectedPos !== null ? positions[selectedPos] : null

  function selectPos(idx) {
    setSelectedPos(idx)
  }

  return (
    <>
      <div className="hero">
        <div className="hero-eyebrow">Position Guide</div>
        <h1>Know Your Role</h1>
        <p>Select any position on the pitch to explore technique cues, key responsibilities, and the physical profile for each position.</p>
      </div>

      <div className="main-layout">
        {/* Pitch */}
        <div className="pitch-card">
          <div className="pitch-label">Tap a position</div>
          <svg className="pitch" viewBox="0 0 300 480" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="480" fill="#2D6A4F"/>
            <rect x="0" y="0" width="300" height="48" fill="#2A6348" opacity="0.5"/>
            <rect x="0" y="96" width="300" height="48" fill="#2A6348" opacity="0.5"/>
            <rect x="0" y="192" width="300" height="48" fill="#2A6348" opacity="0.5"/>
            <rect x="0" y="288" width="300" height="48" fill="#2A6348" opacity="0.5"/>
            <rect x="0" y="384" width="300" height="48" fill="#2A6348" opacity="0.5"/>
            <rect x="20" y="20" width="260" height="440" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
            <line x1="20" y1="240" x2="280" y2="240" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
            <line x1="20" y1="100" x2="280" y2="100" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
            <line x1="20" y1="380" x2="280" y2="380" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
            <line x1="20" y1="28" x2="280" y2="28" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
            <line x1="20" y1="452" x2="280" y2="452" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
            <text x="150" y="235" fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="middle" fontFamily="Inter,sans-serif" fontWeight="600">HALFWAY</text>

            {DOT_POSITIONS.map((dot, i) => (
              <g
                key={i}
                className={`pos-dot${selectedPos === i ? ' active' : ''}`}
                onClick={() => selectPos(i)}
              >
                <circle className="dot-ring" cx={dot.cx} cy={dot.cy} r="13" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4"/>
                <circle className="dot-circle" cx={dot.cx} cy={dot.cy} r="10" fill={dot.fill} opacity="0.92"/>
                <text x={dot.cx} y={dot.cy + 4} textAnchor="middle" fill="#111" fontSize="9" fontWeight="700" fontFamily="Barlow Condensed,sans-serif">{i + 1}</text>
              </g>
            ))}

            {/* Legend */}
            <circle cx="40" cy="50" r="6" fill="white" opacity="0.9"/>
            <text x="50" y="54" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="Inter,sans-serif">Forwards</text>
            <circle cx="40" cy="64" r="6" fill="#e0e8ff" opacity="0.9"/>
            <text x="50" y="68" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="Inter,sans-serif">Backs</text>
          </svg>
        </div>

        {/* Panel area */}
        <div className="panel-area">
          {/* Position tabs */}
          <div className="pos-tabs">
            {positions.map((p, i) => (
              <button
                key={i}
                className={`pos-tab${selectedPos === i ? ' active' : ''}`}
                title={p.name}
                onClick={() => selectPos(i)}
              >
                #{p.num}
              </button>
            ))}
          </div>

          {/* Position card */}
          <div className="position-card">
            <div className="pos-header">
              <div className={`pos-number${pos ? ' highlighted' : ''}`}>
                {pos ? pos.num : '—'}
              </div>
              <div className="pos-title-block">
                <div className="pos-group-tag">{pos ? pos.group : 'Select a position'}</div>
                <div className="pos-name">{pos ? pos.name : 'Choose from the pitch'}</div>
                <div className="pos-tagline">
                  {pos ? pos.tagline : 'Tap any player dot on the pitch diagram, or use the tabs above.'}
                </div>
              </div>
            </div>
            {pos && (
              <div className="pos-body">
                <div>
                  <div className="section-label">Key Responsibilities</div>
                  <div className="role-pills">
                    {pos.roles.map((r, i) => <span key={i} className="role-pill">{r}</span>)}
                  </div>
                </div>
                <div>
                  <div className="section-label">Technique Cues</div>
                  <div className="technique-list">
                    {pos.tech.map((t, i) => <div key={i} className="technique-item">{t}</div>)}
                  </div>
                </div>
                <div>
                  <div className="section-label">Physical Profile</div>
                  <RadarChart key={selectedPos} stats={pos.stats} />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}
