import { useState } from 'react'
import { motion } from 'framer-motion'

const PROJECTS = [
  {
    title: 'Minesweeper',
    desc: 'Classic rebuilt from scratch — custom difficulty scaling, clean dark UI, and a satisfying first-click guarantee.',
    tech: ['JavaScript', 'HTML Canvas', 'CSS3'],
    category: 'Game Dev',
    year: '2023',
    github: 'https://github.com/MelonCaully',
  },
  {
    title: 'Snake',
    desc: 'The timeless arcade game, reimagined with smooth controls, vibrant pixel art, and multiple levels of escalating challenge.',
    tech: ['C++', 'SDL3'],
    category: 'Game Dev',
    year: '2025',
    github: 'https://github.com/MelonCaully',
  },
  {
    title: 'Arcane Odyssey',
    desc: 'Unity 2D platformer. Hand-crafted pixel art, original soundtrack.',
    tech: ['Unity', 'C#', 'Blender'],
    category: 'Game Dev',
    year: '2022',
    github: 'https://github.com/MelonCaully',
  },
  {
    title: 'Studia',
    desc: 'Study tracker web app with built-in AI to parse course materials and generate personalized quizzes. Never miss a review session again.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Pyhton', 'FastAPI'],
    category: 'Full Stack',
    year: '2026',
    github: 'https://github.com/MelonCaully',
  },
  {
    title: 'Playersheet Generator',
    desc: 'D&D character sheet generator that turns your campaign notes into fully formatted sheets, complete with stats, inventory, and backstory sections.',
    tech: ['C#', 'XAML', '.NET MAUI', 'MySQL'],
    category: 'Full Stack',
    year: '2024',
    github: 'https://github.com/MelonCaully',
  },
  {
    title: 'MoodSpace',
    desc: 'Helps students track their mental health alongside their academics. Features mood journaling, stress level tracking, and AI-generated self-care suggestions based on user input.',
    tech: ['Java', 'Spring Boot', 'H2 DB', 'JJWT'],
    category: 'Backend',
    year: '2025',
    github: 'https://github.com/MelonCaully',
  },
  {
    title: 'Safetrip AI',
    desc: 'API that assesses travel safety by analyzing crime data, local news, and user reviews. Provides a safety score and detailed risk factors for any destination worldwide.',
    tech: ['Go', 'PostgreSQL', 'REST'],
    category: 'Backend',
    year: '2025',
    github: 'https://github.com/MelonCaully',
  },
  {
    title: 'Urban Frames',
    desc: 'Street photography series. Motorcycles, city nights, and the people in between.',
    tech: ['35mm Film', 'Digital', 'Lightroom'],
    category: 'Photography',
    year: '2021–26',
    github: null,
    live: '#',
    photo: '/B645B648-81EC-4F83-AC62-DEB05A048FEA.jpg',
  },
]

const CATEGORY_STYLE = {
  'Game Dev':    { color: '#f59e0b', border: 'rgba(245,158,11,0.35)', glow: true },
  'Full Stack':  { color: '#60a5fa', border: 'rgba(96,165,250,0.25)',  glow: false },
  'Backend':     { color: '#a78bfa', border: 'rgba(167,139,250,0.25)', glow: false },
  'Photography': { color: '#d4a574', border: 'rgba(212,165,116,0.25)', glow: false },
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const cat = CATEGORY_STYLE[project.category]
  const isGame = project.category === 'Game Dev'
  const isPhoto = project.category === 'Photography'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: isPhoto ? 'transparent' : '#141414',
        border: `1px solid ${hovered ? cat.border.replace('0.35','0.7').replace('0.25','0.5') : cat.border}`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: isPhoto ? 0 : '22px 22px 18px',
        cursor: 'default',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.25s ease, border-color 0.2s ease',
        animation: isGame && hovered ? 'glowPulse 1.4s ease-in-out infinite' : 'none',
        boxShadow: isGame && hovered ? `0 0 18px rgba(245,158,11,0.35)` : 'none',
      }}
    >
      {/* Photo card background */}
      {isPhoto && (
        <>
          <img
            src={project.photo}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(13,13,13,0.6)' : 'rgba(13,13,13,0.45)', transition: 'background 0.3s' }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '22px 22px 18px', display: 'flex', flexDirection: 'column', height: '100%' }} >
            <PhotoCardContent project={project} cat={cat} hovered={hovered} />
          </div>
        </>
      )}

      {!isPhoto && <CardContent project={project} cat={cat} hovered={hovered} />}
    </motion.div>
  )
}

function CardContent({ project, cat, hovered }) {
  return (
    <>
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: cat.color, padding: '3px 8px', border: `1px solid ${cat.border}`, background: `${cat.color}10` }}>
          {project.category}
        </span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#374151' }}>{project.year}</span>
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)', color: '#f0ede8', fontWeight: 700, lineHeight: 1.2, marginBottom: 10, flex: 0 }}>
        {project.title}
      </h3>

      {/* Description — fades in on hover */}
      <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, lineHeight: 1.7, color: '#6b7280', marginBottom: 14, flex: 1, opacity: hovered ? 1 : 0.6, transition: 'opacity 0.25s' }}>
        {project.desc}
      </p>

      {/* Tech chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
        {project.tech.map(t => (
          <span key={t} style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.05em', color: cat.color, opacity: 0.7, padding: '2px 7px', border: `1px solid ${cat.border}` }}>
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: 16 }}>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6b7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = cat.color}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
          >
            GitHub <span style={{ color: cat.color }}>↗</span>
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6b7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = cat.color}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
          >
            Live <span style={{ color: cat.color }}>↗</span>
          </a>
        )}
      </div>
    </>
  )
}

function PhotoCardContent({ project, cat, hovered }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'auto' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: cat.color, padding: '3px 8px', border: `1px solid ${cat.border}`, background: `${cat.color}18` }}>
          {project.category}
        </span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(240,237,232,0.4)' }}>{project.year}</span>
      </div>
      <div>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)', color: '#f0ede8', fontWeight: 700, lineHeight: 1.2, marginBottom: 8 }}>
          {project.title}
        </h3>
        <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, lineHeight: 1.7, color: 'rgba(240,237,232,0.65)', marginBottom: 12, opacity: hovered ? 1 : 0.7, transition: 'opacity 0.3s' }}>
          {project.desc}
        </p>
        <div style={{ display: 'flex', gap: 16 }}>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: cat.color, textDecoration: 'none' }}>
              View Series ↗
            </a>
          )}
        </div>
      </div>
    </>
  )
}

export default function ProjectsSection() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0d0d0d', display: 'flex', flexDirection: 'column', padding: '40px 64px 36px', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#f59e0b' }}>
            — Selected Work
          </p>
          <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#f0ede8', fontWeight: 700, lineHeight: 1 }}>
            Projects
          </span>
        </div>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'rgba(240,237,232,0.04)', fontWeight: 700, lineHeight: 1 }}>
          08
        </span>
      </div>

      {/* 4×2 Card Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: 12,
        flex: 1,
        minHeight: 0,
      }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
