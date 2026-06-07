import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ShinyText from './ShinyText'

const ALL_PHOTOS = [
  '/0D61DC95-5BD5-4094-8231-A5B03C7EEC53.jpg',
  '/17A948CF-5267-443A-B340-43649067F5E6.jpg',
  '/22429526-15C5-4A2A-B069-7A4A2C1E532E.jpg',
  '/476B7FE2-9DE2-487B-8744-C740F266BC9B.jpg',
  '/6AF46DD7-53A6-4FBB-8202-3541CD2EF75A.jpg',
  '/B645B648-81EC-4F83-AC62-DEB05A048FEA.jpg',
  '/E9B6EF17-4F98-463A-BD67-EC3CB8649AD1.jpg',
]

// Duplicate for seamless infinite loop
const STRIP = [...ALL_PHOTOS, ...ALL_PHOTOS]

const CTAS = [
  { label: 'GitHub',   href: 'https://github.com/MelonCaully' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume',   href: '#' },
]

export default function HeroSection() {
  const { scrollY } = useScroll()
  const [vh] = useState(() => typeof window !== 'undefined' ? window.innerHeight : 900)
  const textY   = useTransform(scrollY, [0, vh], [0, -vh * 0.26])
  const fadeOut = useTransform(scrollY, [0, vh * 0.55], [1, 0])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: '#0d0d0d',
        overflow: 'hidden',
      }}
    >
      {/* ── Infinite photo strip (full-height, edge-to-edge) ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'stretch',
          overflow: 'hidden',
        }}
      >
        <div className="photo-strip">
          {STRIP.map((src, i) => (
            <div
              key={i}
              data-cursor="photo"
              style={{
                flex: '0 0 420px',
                height: '100vh',
                overflow: 'hidden',
              }}
            >
              <img
                src={src}
                alt=""
                loading={i < 3 ? 'eager' : 'lazy'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Left dark gradient — makes text readable ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.88) 25%, rgba(13,13,13,0.5) 50%, rgba(13,13,13,0.1) 75%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* ── Top + bottom vignette ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(13,13,13,0.5) 0%, transparent 12%, transparent 88%, rgba(13,13,13,0.55) 100%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />

      {/* ── Text overlay (parallax) ── */}
      <motion.div
        style={{
          y: textY,
          opacity: fadeOut,
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 84px',
          maxWidth: 560,
          zIndex: 10,
        }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#f59e0b',
            marginBottom: 24,
          }}
        >
          — Portfolio
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(3rem, 5.5vw, 5.2rem)',
            lineHeight: 1.0,
            fontWeight: 700,
            color: '#f0ede8',
            marginBottom: 18,
          }}
        >
          <span style={{ display: 'block', lineHeight: 1.0, marginBottom: 6 }}>
            <ShinyText
              text="Hi, I'm"
              color="#f0ede8"
              shineColor="#6b7280"
              speed={10}
              spread={90}
              direction="left"
            />
          </span>
          <span style={{ display: 'block', lineHeight: 1.05 }}>
            <ShinyText
              text="Malone."
              color="#f59e0b"
              shineColor="#fef9e7"
              speed={12}
              spread={120}
              direction="left"
              style={{ fontStyle: 'italic' }}
            />
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 13,
            lineHeight: 2.0,
            color: '#6b7280',
            marginBottom: 40,
            letterSpacing: '0.02em',
          }}
        >
          Full-stack developer.
          <br />
          Street photographer.
          <br />
          Both at once.
        </motion.p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {CTAS.map((btn, i) => (
            <motion.a
              key={btn.label}
              href={btn.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68 + i * 0.1, duration: 0.4 }}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 22px',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#f0ede8',
                textDecoration: 'none',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                overflow: 'hidden',
                transition: 'color 0.28s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('.fill').style.transform = 'scaleX(1)'
                e.currentTarget.style.color = '#0d0d0d'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('.fill').style.transform = 'scaleX(0)'
                e.currentTarget.style.color = '#f0ede8'
              }}
            >
              <span
                className="fill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#f59e0b',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
              />
              <span style={{ position: 'relative', zIndex: 1 }}>{btn.label}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: 84,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 10,
        }}
      >
        <div style={{ width: 1, height: 36, background: 'rgba(245,158,11,0.4)' }} />
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 9,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#6b7280',
        }}>
          Scroll
        </span>
      </motion.div>
    </div>
  )
}
