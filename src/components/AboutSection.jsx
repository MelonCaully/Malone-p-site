import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MouseSpotlight from './MouseSpotlight'

const TECH = [
  'JavaScript', 'TypeScript', 'Java', 'Python', 'Go', 'C++',
  'React', 'Next.js', 'Node.js', 'AngularJS', 'FastAPI', 'Spring Boot',
  'Unity', 'Unreal', 'SDL3',
  'PostgreSQL', 'Docker', 'AWS', 'Git',
]

const ROLES = ['Developer.', 'Photographer.', 'Game Dev.']

export default function AboutSection() {
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#141414', display: 'flex', overflow: 'hidden' }}>
      <MouseSpotlight color="245, 158, 11" opacity={0.07} size={580} />

      {/* LEFT — photo */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ flex: '0 0 38%', position: 'relative', overflow: 'hidden' }}
      >
        <img
          src="/476B7FE2-9DE2-487B-8744-C740F266BC9B.jpg"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top, #141414, transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, width: 80, height: '100%', background: 'linear-gradient(to left, #141414, transparent)', pointerEvents: 'none' }} />
      </motion.div>

      {/* RIGHT — text */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 68px', overflowY: 'auto' }}>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 24 }}
        >
          — About
        </motion.p>

        {/* Pull-quote with rotating third line */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2, duration: 0.65 }}
          style={{ marginBottom: 28 }}
        >
          <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', lineHeight: 1.35, color: '#f0ede8', marginBottom: 6 }}>
            I build for the web.
          </p>
          <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', lineHeight: 1.35, color: '#f59e0b', fontStyle: 'italic', marginBottom: 6 }}>
            I shoot for the street.
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, height: 'clamp(2rem, 3vw, 2.6rem)', overflow: 'hidden' }}>
            <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', color: '#f0ede8', opacity: 0.5 }}>I am a</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 0.5 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', color: '#f0ede8', fontStyle: 'italic', display: 'inline-block' }}
              >
                {ROLES[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.55 }}
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, lineHeight: 1.9, color: '#6b7280', marginBottom: 32, maxWidth: 420 }}
        >
          <p style={{ marginBottom: 10 }}>Full-stack developer. I build end-to-end web applications with a focus on clean architecture and real user value.</p>
          <p>When I'm not writing code I'm out with a camera — motorcycles, cityscapes, quiet moments. And when I'm not behind a lens, I'm building games.</p>
        </motion.div>

        {/* Tech chips with magnet hover */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 12 }}
          >
            Stack
          </motion.p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {TECH.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.28 }}
                whileHover={{ y: -3, borderColor: 'rgba(245,158,11,0.5)', color: '#f0ede8' }}
                style={{ padding: '5px 11px', fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#9ca3af', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', transition: 'color 0.2s' }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
