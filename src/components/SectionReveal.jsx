import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function SectionReveal({ id, bg = '#0d0d0d', children }) {
  const ref = useRef(null)

  // 0 = section top at viewport bottom (just appearing)
  // 1 = section top near viewport top (fully settled)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.04'],
  })

  // All values are scroll-driven → fully bidirectional
  const opacity = useTransform(scrollYProgress, [0, 0.3],  [0, 1])
  const scale   = useTransform(scrollYProgress, [0, 0.8],  [0.75, 1])
  const y       = useTransform(scrollYProgress, [0, 0.8],  [160, 0])
  const rotateZ = useTransform(scrollYProgress, [0, 0.8],  [-6, 0])
  const rotateX = useTransform(scrollYProgress, [0, 0.8],  [18, 0])
  const blurVal = useTransform(scrollYProgress, [0, 0.55], [12, 0])
  const filter  = useTransform(blurVal, v => `blur(${v}px)`)

  return (
    <section
      id={id}
      ref={ref}
      style={{ height: '100vh', overflow: 'hidden', background: bg, position: 'relative' }}
    >
      {/* Perspective wrapper — sits outside the transform so it doesn't get clipped */}
      <div style={{ width: '100%', height: '100%', perspective: '1600px', perspectiveOrigin: '50% 30%' }}>
        <motion.div
          style={{
            opacity,
            scale,
            y,
            rotateZ,
            rotateX,
            filter,
            width: '100%',
            height: '100%',
            transformOrigin: 'center 70%',
            willChange: 'transform, opacity, filter',
          }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
