import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'hero',        label: 'Home'    },
  { id: 'about',       label: 'About'   },
  { id: 'projects',    label: 'Work'    },
  { id: 'games',       label: 'Play'    },
  { id: 'credentials', label: 'Skills'  },
  { id: 'contact',     label: 'Contact' },
]

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const [active, setActive]   = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight
      const sy = window.scrollY
      setVisible(sy > vh * 0.75)
      const idx = Math.min(Math.floor(sy / vh), SECTIONS.length - 1)
      setActive(SECTIONS[Math.max(0, idx)].id)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            zIndex: 1000,
            padding: '14px 48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(13, 13, 13, 0.9)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(245, 158, 11, 0.08)',
          }}
        >
          {/* Wordmark */}
          <button
            onClick={() => goTo('hero')}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 21,
              color: '#f0ede8',
              background: 'none',
              border: 'none',
              letterSpacing: '-0.02em',
              padding: 0,
            }}
          >
            malone
            <span style={{ color: '#f59e0b' }}>.</span>
          </button>

          {/* Nav links */}
          <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
            {SECTIONS.map((s) => (
              <li key={s.id} style={{ position: 'relative' }}>
                <button
                  onClick={() => goTo(s.id)}
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: active === s.id ? '#f59e0b' : '#6b7280',
                    background: 'none',
                    border: 'none',
                    padding: '4px 0 6px',
                    position: 'relative',
                    transition: 'color 0.2s',
                  }}
                >
                  {s.label}
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        height: 1,
                        background: '#f59e0b',
                        borderRadius: 1,
                      }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
