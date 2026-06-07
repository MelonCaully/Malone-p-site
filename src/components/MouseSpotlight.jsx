import { useEffect, useRef } from 'react'

/**
 * Drops an absolute-positioned radial gradient that follows the mouse.
 * Uses CSS custom properties + direct DOM writes — zero React re-renders.
 * Parent element must have position: relative (or the component sets it).
 */
export default function MouseSpotlight({
  color   = '245, 158, 11',
  opacity = 0.09,
  size    = 540,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    // ensure parent is a positioning context
    const prevPosition = getComputedStyle(parent).position
    if (prevPosition === 'static') parent.style.position = 'relative'

    const move = (e) => {
      const rect = parent.getBoundingClientRect()
      el.style.setProperty('--sx', `${e.clientX - rect.left}px`)
      el.style.setProperty('--sy', `${e.clientY - rect.top}px`)
      if (el.style.opacity === '0') el.style.opacity = '1'
    }
    const leave = () => { el.style.opacity = '0' }

    parent.addEventListener('mousemove', move, { passive: true })
    parent.addEventListener('mouseleave', leave)

    return () => {
      parent.removeEventListener('mousemove', move)
      parent.removeEventListener('mouseleave', leave)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0,
        transition: 'opacity 0.5s ease',
        background: `radial-gradient(${size}px circle at var(--sx,-9999px) var(--sy,-9999px), rgba(${color},${opacity}), transparent 62%)`,
      }}
    />
  )
}
