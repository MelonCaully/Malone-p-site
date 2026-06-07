import { useEffect, useRef } from 'react'

/**
 * Canvas grid of dots that scatter from the mouse and spring back.
 * All updates happen in rAF — zero React re-renders.
 */
export default function MagneticField({
  dotColor    = '245, 158, 11',
  spacing     = 36,
  mouseRadius = 120,
  strength    = 75,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const ctx = canvas.getContext('2d')
    const SPRING  = 0.07
    const DAMPING = 0.78

    let W, H, dots, raf
    let mx = -9999, my = -9999

    const build = () => {
      W = parent.offsetWidth
      H = parent.offsetHeight
      canvas.width  = W
      canvas.height = H
      dots = []
      for (let x = spacing / 2; x < W; x += spacing)
        for (let y = spacing / 2; y < H; y += spacing)
          dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 })
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mx = e.clientX - r.left
      my = e.clientY - r.top
    }
    const onLeave = () => { mx = -9999; my = -9999 }

    parent.addEventListener('mousemove', onMove, { passive: true })
    parent.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', build)

    const tick = () => {
      ctx.clearRect(0, 0, W, H)

      for (const d of dots) {
        const dx   = d.x - mx
        const dy   = d.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouseRadius && dist > 0) {
          const f = (1 - dist / mouseRadius) * strength
          d.vx += (dx / dist) * f * 0.055
          d.vy += (dy / dist) * f * 0.055
        }

        d.vx += (d.ox - d.x) * SPRING
        d.vy += (d.oy - d.y) * SPRING
        d.vx *= DAMPING
        d.vy *= DAMPING
        d.x  += d.vx
        d.y  += d.vy

        const disp  = Math.hypot(d.x - d.ox, d.y - d.oy)
        const alpha = Math.min(0.10 + disp / 28, 0.65)
        const r     = 1.4 + Math.min(disp / 18, 1.4)

        ctx.beginPath()
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotColor}, ${alpha.toFixed(2)})`
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    build()
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', build)
    }
  }, [dotColor, spacing, mouseRadius, strength])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
