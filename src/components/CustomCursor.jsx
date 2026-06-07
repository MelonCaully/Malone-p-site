import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ref   = useRef(null)
  const [state, setState] = useState('default')

  useEffect(() => {
    // Use pointer: coarse media query — reliable on Windows (maxTouchPoints is unreliable)
    const isCoarseOnly =
      window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(pointer: fine)').matches
    if (isCoarseOnly) return

    const onMove = (e) => {
      if (!ref.current) return
      ref.current.style.left = e.clientX + 'px'
      ref.current.style.top  = e.clientY + 'px'
    }

    const onOver = (e) => {
      const t = e.target
      if (t.closest('[data-cursor="photo"]')) setState('photo')
      else if (t.closest('a, button'))        setState('link')
      else                                    setState('default')
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover',  onOver)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover',  onOver)
    }
  }, [])

  const size = state === 'photo' ? 78 : state === 'link' ? 30 : 18

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        left: -200,
        top: -200,
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        border: state === 'photo'
          ? '1px solid rgba(245,158,11,0.85)'
          : '1.5px solid #f59e0b',
        background: state === 'photo' ? 'rgba(13,13,13,0.55)' : 'transparent',
        backdropFilter: state === 'photo' ? 'blur(4px)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'width 0.2s ease, height 0.2s ease, border 0.15s ease, background 0.15s ease',
      }}
    >
      {state === 'photo' && (
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 8,
          letterSpacing: '0.1em',
          color: '#f59e0b',
          whiteSpace: 'nowrap',
        }}>
          VIEW ↗
        </span>
      )}
    </div>
  )
}
