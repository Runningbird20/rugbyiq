import { useState } from 'react'
import Nav from './components/Nav'
import TrainerPage from './components/TrainerPage'
import RulebooksPage from './components/RulebooksPage'
import PlaceholderPage from './components/PlaceholderPage'

const PAGES = {
  compare: {
    icon: '⚖️',
    eyebrow: 'Coming Soon',
    title: 'Side-by-Side Rule Comparison',
    desc: 'Pick any two leagues or governing bodies and see how their regulations stack up on a specific topic — scrum laws, eligibility, match duration, disciplinary codes, and more.',
    features: [
      { icon: '🔍', title: 'Topic Picker', desc: 'Select a rule category — scrums, lineouts, substitutions, scoring — and instantly pull the relevant section from each league\'s regulations.' },
      { icon: '🗂️', title: 'League Selector', desc: 'Choose from any two of the leagues in the Rule Books library — men\'s, women\'s, domestic, or international — for a direct comparison.' },
      { icon: '🔔', title: 'Difference Highlights', desc: 'Key divergences are flagged automatically so you can focus on what actually differs, not what\'s the same across every union.' },
    ],
  },
  signals: {
    icon: '🟨',
    eyebrow: 'Coming Soon',
    title: 'Referee Signal Glossary',
    desc: 'Every official World Rugby referee hand signal, illustrated and explained. Tap any signal to see the corresponding law, when it\'s used, and what players should do next.',
    features: [
      { icon: '🖐️', title: 'All 30+ Signals', desc: 'Full coverage from try awarded and penalty to knock-on, scrum infringements, lineout calls, and sin bin — every signal a referee makes on the pitch.' },
      { icon: '🔗', title: 'Linked to the Laws', desc: 'Each signal links directly to the relevant World Rugby law so you can read the full rule context, not just the gesture.' },
      { icon: '🔎', title: 'Searchable & Filterable', desc: 'Search by signal name, law number, or situation. Filter by phase of play — set piece, open play, disciplinary — to find what you need fast.' },
    ],
  },
  ruleofday: {
    icon: '📖',
    eyebrow: 'Coming Soon',
    title: 'Rule of the Day',
    desc: 'One law, every day. Surface an obscure, commonly misunderstood, or often-debated rule each visit — with a plain-English explanation and the official law reference.',
    features: [
      { icon: '🎲', title: 'Daily Rotation', desc: 'A new rule surfaces each day, drawn from a curated bank of laws worth knowing — from the obvious to the ones that always start arguments on the pitch.' },
      { icon: '💬', title: 'Plain English First', desc: 'Every rule is explained in plain language before the official text — so players and coaches actually understand it, not just referees.' },
      { icon: '📌', title: 'Save & Share', desc: 'Bookmark rules you want to remember or share them with teammates — useful for coaches who want to highlight a law before a match.' },
    ],
  },
}

export default function App() {
  const [activePage, setActivePage] = useState('trainer')

  return (
    <>
      <Nav activePage={activePage} onNavigate={setActivePage} />
      {activePage === 'trainer' && <TrainerPage />}
      {activePage === 'rulebooks' && <RulebooksPage />}
      {activePage === 'compare' && <PlaceholderPage {...PAGES.compare} />}
      {activePage === 'signals' && <PlaceholderPage {...PAGES.signals} />}
      {activePage === 'ruleofday' && <PlaceholderPage {...PAGES.ruleofday} />}
    </>
  )
}
