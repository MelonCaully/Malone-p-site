import { motion } from 'framer-motion'
import MagneticField from './MagneticField'
import MouseSpotlight from './MouseSpotlight'

const WORDS = ['Shoot', 'a', 'message.']

const GithubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)
const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const SOCIALS = [
  { Icon: GithubIcon,    href: 'https://github.com/MelonCaully',    label: 'GitHub'    },
  { Icon: LinkedInIcon,  href: 'https://www.linkedin.com/in/malone-ingham-440795355/',  label: 'LinkedIn'  },
  { Icon: InstagramIcon, href: 'https://www.instagram.com/melon_m0t0/', label: 'Instagram' },
]

export default function ContactSection() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#0d0d0d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Interactive magnetic dot field — reacts to mouse */}
      <MagneticField dotColor="245, 158, 11" spacing={38} mouseRadius={130} strength={80} />

      {/* Soft spotlight over the dots */}
      <MouseSpotlight color="245, 158, 11" opacity={0.06} size={600} />

      {/* Section label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#f59e0b',
          marginBottom: 32,
        }}
      >
        — Contact
      </motion.p>

      {/* Headline — word-by-word drop */}
      <h2
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(3rem, 7vw, 6rem)',
          lineHeight: 1.08,
          textAlign: 'center',
          marginBottom: 32,
          fontWeight: 700,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 16px',
        }}
      >
        {WORDS.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.08 + i * 0.14,
              duration: 0.48,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              display: 'inline-block',
              color: i === 2 ? '#f59e0b' : '#f0ede8',
              fontStyle: i === 2 ? 'italic' : 'normal',
            }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Email */}
      <motion.a
        href="mailto:maloneingham@gmail.com"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.42 }}
        style={{
          position: 'relative',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 18,
          color: '#6b7280',
          textDecoration: 'none',
          marginBottom: 52,
          display: 'inline-block',
          transition: 'color 0.22s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#f0ede8'
          e.currentTarget.querySelector('.email-ul').style.width = '100%'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#6b7280'
          e.currentTarget.querySelector('.email-ul').style.width = '0'
        }}
      >
        maloneingham@gmail.com
        <span
          className="email-ul"
          style={{
            position: 'absolute',
            bottom: -4, left: 0,
            height: 1,
            width: 0,
            background: '#f59e0b',
            transition: 'width 0.32s ease',
          }}
        />
      </motion.a>

      {/* Social icons */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.58 }}
        style={{ display: 'flex', gap: 36 }}
      >
        {SOCIALS.map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={{
              color: '#6b7280',
              display: 'block',
              transition: 'color 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#f59e0b'
              e.currentTarget.style.transform = 'scale(1.18) translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6b7280'
              e.currentTarget.style.transform = 'scale(1) translateY(0)'
            }}
          >
            <Icon size={22} strokeWidth={1.5} />
          </a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.72 }}
        style={{
          position: 'absolute',
          bottom: 28,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.2em',
          color: '#374151',
          textTransform: 'uppercase',
        }}
      >
        © 2026 Malone — Built with care
      </motion.p>
    </div>
  )
}
