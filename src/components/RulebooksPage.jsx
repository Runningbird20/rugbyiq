import { useState, useEffect } from 'react'
import { rulebookRegions, genericToc } from '../data/rulebooks'
import { formatLawContent } from '../utils/lawFormatter'

function RulebookCard({ book, region, onOpen }) {
  const tagClass = book.available ? 'available' : book.lawVariation ? 'variation' : 'soon'
  const tagLabel = book.available ? '✓ Available' : book.lawVariation ? '⚡ Law Variations' : 'Placeholder'

  return (
    <div className="rb-card" onClick={() => onOpen(book, region)}>
      <div className="rb-card-league">{book.league}</div>
      <div className="rb-card-name">{book.name}</div>
      <div className="rb-card-desc">{book.desc}</div>
      <div className="rb-card-footer">
        <span className={`rb-card-tag ${tagClass}`}>{tagLabel}</span>
        <span className="rb-open-icon">→</span>
      </div>
    </div>
  )
}

function LawViewer({ laws }) {
  const [selectedLaw, setSelectedLaw] = useState(null)

  const lawNumbers = Object.keys(laws).sort((a, b) => Number(a) - Number(b))

  if (selectedLaw) {
    const law = laws[selectedLaw]
    return (
      <div className="law-viewer">
        <button className="law-back-btn" onClick={() => setSelectedLaw(null)}>
          ← All Laws
        </button>
        <div className="law-heading">
          <span className="law-num-badge">Law {selectedLaw}</span>
          <span className="law-heading-title">{law.title}</span>
        </div>
        <div className="law-content">
          {law.content
            ? formatLawContent(law.content).map((item, i) => {
                if (item.type === 'heading') {
                  return <div key={i} className="law-section-heading">{item.text}</div>
                }
                if (item.type === 'numbered') {
                  return (
                    <div key={i} className="law-numbered">
                      <span className="law-label">{item.label}</span>
                      <span>{item.text}</span>
                    </div>
                  )
                }
                if (item.type === 'alpha') {
                  return (
                    <div key={i} className="law-alpha">
                      <span className="law-label">{item.label}</span>
                      <span>{item.text}</span>
                    </div>
                  )
                }
                if (item.type === 'roman') {
                  return (
                    <div key={i} className="law-roman">
                      <span className="law-label">{item.label}</span>
                      <span>{item.text}</span>
                    </div>
                  )
                }
                if (item.type === 'sanction') {
                  return <div key={i} className="law-sanction">{item.text}</div>
                }
                return <p key={i} className="law-para">{item.text}</p>
              })
            : <p className="law-empty">Content not available for this section.</p>
          }
        </div>
      </div>
    )
  }

  return (
    <div className="law-viewer">
      <div className="law-toc-intro">
        Select a law to read the full text from the 2026 World Rugby Laws of the Game.
      </div>
      <div className="law-toc-grid">
        {lawNumbers.map(num => (
          <button
            key={num}
            className="law-toc-btn"
            onClick={() => setSelectedLaw(num)}
          >
            <span className="law-toc-num">Law {num}</span>
            <span className="law-toc-title">{laws[num].title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function RulebookModal({ book, region, onClose }) {
  const [laws, setLaws] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!book.lawsFile) return
    setLoading(true)
    setLaws(null)
    fetch(book.lawsFile)
      .then(r => r.json())
      .then(data => { setLaws(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [book.lawsFile])

  const toc = book.toc || genericToc

  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-header-text">
            <div className="modal-league-tag">{region} · {book.league}</div>
            <div className="modal-title">{book.name}</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Available rulebook with live law data */}
          {book.lawsFile && (
            loading
              ? <div className="law-loading">Loading laws…</div>
              : laws
                ? <LawViewer key={book.league} laws={laws} />
                : <div className="law-loading">Could not load law data.</div>
          )}

          {/* Placeholder / variation banner for unavailable books */}
          {!book.lawsFile && (
            book.lawVariation ? (
              <div className="variation-banner">
                <div className="vi">⚡</div>
                <div className="vt">
                  <strong>Law variations apply</strong> — This competition operates under World Rugby-approved law variations specific to the women's game. The core Laws of the Game remain the same; variations affect elements like scrum procedure and maul rules at certain competition levels. The full variation table will be embedded here when live.
                </div>
              </div>
            ) : (
              <div className="placeholder-banner">
                <div className="placeholder-icon">📋</div>
                <div className="placeholder-text">
                  <strong>Placeholder content</strong> — The full rulebook for this league will be embedded here. When live, users will be able to read, search, and bookmark sections directly in-app.
                </div>
              </div>
            )
          )}

          {/* Static TOC for unavailable books */}
          {!book.lawsFile && (
            <div className="rb-section-block">
              <div className="rb-section-title">Table of Contents</div>
              <div className="rb-toc-list">
                {toc.map((item, i) => (
                  <div key={i} className="rb-toc-item">
                    <span>
                      <span className="rb-toc-num">{String(i + 1).padStart(2, '0')}</span>
                      {item}
                    </span>
                    <span className="rb-toc-placeholder">Placeholder</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <div className="modal-footer-note">
            {book.available ? '2026 World Rugby Laws of the Game' : 'PDF embed coming soon'}
          </div>
          <button className="modal-btn" style={book.available ? { opacity: 1, cursor: 'default' } : {}}>
            {book.available ? '2026 Edition' : 'Open Full PDF ↗'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function RulebooksPage() {
  const [query, setQuery] = useState('')
  const [modalBook, setModalBook] = useState(null)
  const [modalRegion, setModalRegion] = useState(null)

  const q = query.toLowerCase().trim()

  const filteredRegions = rulebookRegions
    .map(region => ({
      ...region,
      books: q
        ? region.books.filter(book =>
            (book.league + ' ' + book.name + ' ' + book.desc + ' ' + region.region + ' women')
              .toLowerCase()
              .includes(q)
          )
        : region.books,
    }))
    .filter(region => region.books.length > 0)

  function openModal(book, region) {
    setModalBook(book)
    setModalRegion(region)
  }

  function closeModal() {
    setModalBook(null)
    setModalRegion(null)
  }

  useEffect(() => {
    document.body.style.overflow = modalBook ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalBook])

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <div className="rb-hero">
        <div className="hero-eyebrow">Official Regulations</div>
        <h1>Rule Books</h1>
        <p>Select your league or governing body to view the official laws of the game. Covers unions and competitions from North America, Europe, and beyond.</p>
        <div className="rb-search-bar">
          <input
            className="rb-search-input"
            type="text"
            placeholder="Search leagues, unions, competitions…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rb-main">
        {filteredRegions.map(region => (
          <div key={region.region} className="rb-region">
            <div className="rb-region-header">
              <span className="rb-region-flag">{region.flag}</span>
              <span className="rb-region-name">{region.region}</span>
              <span className="rb-region-count">
                {region.books.length} rulebook{region.books.length !== 1 ? 's' : ''}
              </span>
            </div>
            {region.note && (
              <div className="rb-region-note">{region.note}</div>
            )}
            <div className="rb-grid">
              {region.books.map(book => (
                <RulebookCard
                  key={book.league}
                  book={book}
                  region={region.region}
                  onOpen={openModal}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {modalBook && (
        <RulebookModal book={modalBook} region={modalRegion} onClose={closeModal} />
      )}
    </>
  )
}
