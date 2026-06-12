const NAV_LINKS = [
  { id: 'trainer', label: 'Position Trainer' },
  { id: 'rulebooks', label: 'Rule Books' },
  { id: 'compare', label: 'Compare Rules' },
  { id: 'signals', label: 'Ref Signals' },
  { id: 'ruleofday', label: 'Rule of the Day' },
]

export default function Nav({ activePage, onNavigate }) {
  return (
    <nav>
      <div className="nav-logo">Rugby<span>IQ</span></div>
      <div className="nav-links">
        {NAV_LINKS.map(link => (
          <div
            key={link.id}
            className={`nav-link${activePage === link.id ? ' active' : ''}`}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </div>
        ))}
      </div>
    </nav>
  )
}
