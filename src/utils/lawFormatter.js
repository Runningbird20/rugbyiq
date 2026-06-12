const NOISE = /^(WORLD RUGBY|LAWS OF THE GAME RUGBY UNION \d+|RUGBY UNION \d+)$/i

const NUMBERED   = /^(\d[\d\s]*)\.\s+(.+)/          // 1.  or 1 7. (PDF spacing artifact)
const ROMAN      = /^(i{1,3}|iv|vi{0,3}|ix|x{1,3})\.\s+(.+)/i
const ALPHA      = /^([a-h])\.\s+(.+)/i              // a–h avoids clashing with roman i/v/x
const ALL_CAPS   = /^[A-Z][A-Z\s\-–,''\/()0-9]{2,}$/
const SANCTION   = /^Sanction[\xa0\s]*/i

function isNewBlock(line) {
  return (
    NUMBERED.test(line) ||
    ROMAN.test(line)    ||
    ALPHA.test(line)    ||
    ALL_CAPS.test(line) ||
    SANCTION.test(line)
  )
}

export function formatLawContent(rawText) {
  // ── Step 1: join soft-wrapped continuation lines ──────────────────────────
  const rawLines = rawText.split('\n')
  const joined = []

  for (const raw of rawLines) {
    const line = raw.replace(/\xa0/g, ' ').replace(/\s+\./g, '.').replace(/\s+,/g, ',').trim()

    if (!line) {
      joined.push('')
      continue
    }

    if (NOISE.test(line)) continue   // strip page footers

    if (isNewBlock(line) || !joined.length || joined[joined.length - 1] === '') {
      joined.push(line)
    } else {
      joined[joined.length - 1] += ' ' + line
    }
  }

  // ── Step 2: classify each joined line ────────────────────────────────────
  const items = []

  for (const line of joined) {
    if (!line.trim()) continue

    let m

    if ((m = line.match(NUMBERED))) {
      const num = m[1].replace(/\s/g, '')   // fix "1 7." → "17"
      items.push({ type: 'numbered', label: num + '.', text: m[2].trim() })
      continue
    }

    if ((m = line.match(ROMAN))) {
      items.push({ type: 'roman', label: m[1].toLowerCase() + '.', text: m[2].trim() })
      continue
    }

    if ((m = line.match(ALPHA))) {
      items.push({ type: 'alpha', label: m[1].toLowerCase() + '.', text: m[2].trim() })
      continue
    }

    if (SANCTION.test(line)) {
      const text = line.replace(SANCTION, '').replace(/^:\s*/, '').trim()
      items.push({ type: 'sanction', text: 'Sanction: ' + text })
      continue
    }

    if (ALL_CAPS.test(line)) {
      items.push({ type: 'heading', text: line })
      continue
    }

    items.push({ type: 'para', text: line })
  }

  return items
}
