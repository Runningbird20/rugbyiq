import { useState, useEffect } from 'react'
import { rulebookRegions, genericToc } from '../data/rulebooks'

function RulebookCard({ book, region, onOpen }) {
  const tagClass = book.lawVariation ? 'variation' : 'soon'
  const tagLabel = book.lawVariation ? '⚡ Law Variations' : 'Placeholder'

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

function RulebookModal({ book, region, onClose }) {
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
          {book.lawVariation ? (
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
                <strong>Placeholder content</strong> — The full rulebook PDF for this league will be embedded here. When live, users will be able to read, search, and bookmark sections directly in-app.
              </div>
            </div>
          )}
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
        </div>
        <div className="modal-footer">
          <div className="modal-footer-note">PDF embed coming soon</div>
          <button className="modal-btn">Open Full PDF ↗</button>
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
