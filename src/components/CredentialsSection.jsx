import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MouseSpotlight from './MouseSpotlight'

/* ── Animated count-up number ── */
function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const duration = 1400
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.floor(eased * to))
      if (t < 1) requestAnimationFrame(tick)
      else setVal(to)
    }
    requestAnimationFrame(tick)
  }, [inView, to])

  return <span ref={ref}>{val}{suffix}</span>
}

/* ── Skill pod ── */
const POD_COLORS = {
  Languages:              { accent: '#f59e0b', bg: 'rgba(245,158,11,0.06)',  border: 'rgba(245,158,11,0.18)' },
  'Frameworks & Libraries': { accent: '#60a5fa', bg: 'rgba(96,165,250,0.06)',  border: 'rgba(96,165,250,0.18)' },
  'Tools & Cloud':         { accent: '#a78bfa', bg: 'rgba(167,139,250,0.06)', border: 'rgba(167,139,250,0.18)' },
  'Game Dev':             { accent: '#34d399', bg: 'rgba(52,211,153,0.06)',   border: 'rgba(52,211,153,0.18)' },
}

const SKILL_GROUPS = [
  { label: 'Languages',               skills: ['JavaScript', 'TypeScript', 'Java', 'Python', 'Go', 'C++', 'SQL'] },
  { label: 'Frameworks & Libraries',  skills: ['React', 'AngularJS', 'Next.js', 'Node.js', 'FastAPI', 'Spring Boot'] },
  { label: 'Tools & Cloud',           skills: ['Docker', 'AWS', 'PostgreSQL', 'Redis', 'Git', 'Linux'] },
  { label: 'Game Dev',                skills: ['Unity', 'C#', 'Unreal Engine', 'SDL3', 'Blender'] },
]

function SkillPod({ group, index }) {
  const c = POD_COLORS[group.label]
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.45 }}
      style={{ padding: '16px 18px', background: c.bg, border: `1px solid ${c.border}`, borderRadius: 2 }}
    >
      <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.accent, marginBottom: 12 }}>
        {group.label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {group.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.1 + si * 0.04 }}
            whileHover={{ scale: 1.06, color: c.accent }}
            style={{ padding: '4px 10px', fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#9ca3af', background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.07)`, display: 'inline-block', transition: 'color 0.15s' }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function CredentialsSection() {
  return (
    <div
      style={{
        width: '100%', height: '100%', overflow: 'hidden',
        background: '#141414',
        backgroundImage: 'radial-gradient(rgba(245,158,11,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        display: 'flex', flexDirection: 'column',
        padding: '44px 68px 40px',
        position: 'relative',
      }}
    >
      <MouseSpotlight color="245, 158, 11" opacity={0.08} size={480} />

      {/* Ambient glow blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '5%',  width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Section label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 28, flexShrink: 0, position: 'relative' }}
      >
        — Background
      </motion.p>

      <div style={{ display: 'flex', gap: 48, flex: 1, minHeight: 0, position: 'relative' }}>

        {/* ── LEFT — Education + Stats ── */}
        <div style={{ flex: '0 0 36%', display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* WVU Glowing Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="edu-card-glow"
            style={{
              position: 'relative',
              padding: '28px 26px 24px',
              background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1200 100%)',
              border: '1px solid rgba(245,158,11,0.3)',
              overflow: 'hidden',
            }}
          >
            {/* Scan line */}
            <div className="scan-line" />

            {/* Corner accents */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '2px solid #f59e0b', borderLeft: '2px solid #f59e0b' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '2px solid #f59e0b', borderRight: '2px solid #f59e0b' }} />

            {/* Tag */}
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', padding: '2px 8px', display: 'inline-block', marginBottom: 18 }}>
              Education
            </span>

            {/* University */}
            <motion.h3
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', color: '#f0ede8', fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}
            >
              West Virginia<br />University
            </motion.h3>

            <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: '#f59e0b', letterSpacing: '0.05em', marginBottom: 5 }}>
              Bachelor's, Computer Science
            </p>
            <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#6b7280', marginBottom: 20 }}>
              Aug 2020 — Aug 2025
            </p>

            {/* Progress bar */}
            <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 5 }}>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1.4, ease: 'easeOut' }}
                style={{ height: '100%', background: 'linear-gradient(to right, #f59e0b, #fde68a)', transformOrigin: 'left' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: '#374151', letterSpacing: '0.12em' }}>2020</span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: '#f59e0b', letterSpacing: '0.12em', opacity: 0.7 }}>COMPLETE</span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: '#374151', letterSpacing: '0.12em' }}>2025</span>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}
          >
            {[
              { to: 5, suffix: '', label: 'yrs studying' },
              { to: 8, suffix: '+', label: 'projects' },
              { to: 16, suffix: '+', label: 'technologies' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{ padding: '14px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}
              >
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', color: '#f59e0b', fontWeight: 700, lineHeight: 1 }}>
                  <CountUp to={stat.to} suffix={stat.suffix} />
                </div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#374151', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 5 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 }}
            style={{ fontFamily: '"Playfair Display", serif', fontSize: 12, fontStyle: 'italic', color: '#374151', lineHeight: 1.6, paddingLeft: 14, borderLeft: '2px solid rgba(245,158,11,0.15)', marginTop: 'auto' }}
          >
            "Built things before I finished studying them."
          </motion.p>
        </div>

        {/* ── RIGHT — Skill pods ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto', paddingRight: 4 }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 6 }}
          >
            Skills
          </motion.p>
          {SKILL_GROUPS.map((group, i) => (
            <SkillPod key={group.label} group={group} index={i} />
          ))}
        </div>

      </div>
    </div>
  )
}
