import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

/* ─── Pong background ─────────────────────────────────────── */
function PongCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = canvas.offsetWidth, H = canvas.offsetHeight
    canvas.width = W; canvas.height = H

    const state = {
      ball: { x: W / 2, y: H / 2, vx: 1.4, vy: 1.1, r: 5 },
      p1: { y: H / 2 },
      p2: { y: H / 2 },
      PH: 60, PW: 6,
    }

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
      state.ball.x = W / 2; state.ball.y = H / 2
    }
    window.addEventListener('resize', onResize)

    let raf
    const tick = () => {
      const { ball, p1, p2, PH, PW } = state
      ball.x += ball.vx; ball.y += ball.vy

      // Bounce off top/bottom
      if (ball.y < ball.r || ball.y > H - ball.r) ball.vy *= -1

      // AI paddles (lazy tracking)
      p1.y += (ball.y - p1.y) * 0.04
      p2.y += (ball.y - p2.y) * 0.04
      p1.y = Math.max(PH / 2, Math.min(H - PH / 2, p1.y))
      p2.y = Math.max(PH / 2, Math.min(H - PH / 2, p2.y))

      // Bounce off paddles
      if (ball.x < PW + 20 + ball.r && Math.abs(ball.y - p1.y) < PH / 2) ball.vx = Math.abs(ball.vx)
      if (ball.x > W - PW - 20 - ball.r && Math.abs(ball.y - p2.y) < PH / 2) ball.vx = -Math.abs(ball.vx)

      // Reset if out of bounds
      if (ball.x < 0 || ball.x > W) { ball.x = W / 2; ball.y = H / 2; ball.vx *= -1 }

      // Draw
      ctx.clearRect(0, 0, W, H)
      ctx.globalAlpha = 0.09

      // Ball
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
      ctx.fillStyle = '#f59e0b'
      ctx.fill()

      // Paddles
      const drawPaddle = (x, cy) => {
        ctx.fillStyle = '#f59e0b'
        ctx.fillRect(x, cy - PH / 2, PW, PH)
      }
      drawPaddle(20, p1.y)
      drawPaddle(W - 20 - PW, p2.y)

      // Center dashed line
      ctx.setLineDash([8, 12])
      ctx.strokeStyle = '#f59e0b'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={canvasRef} className="pong-canvas" style={{ width: '100%', height: '100%' }} />
}

/* ─── Minesweeper ─────────────────────────────────────────── */
const ROWS = 9, COLS = 9, MINES = 10
const CELL = 34

const NUM_COLORS = ['', '#34d399', '#60a5fa', '#f87171', '#818cf8', '#fb923c', '#2dd4bf', '#f0ede8', '#9ca3af']

function makeEmpty() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, adj: 0, revealed: false, flagged: false, exploded: false }))
  )
}

function withMines(grid, fr, fc) {
  const safe = new Set()
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) {
      const nr = fr + dr, nc = fc + dc
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) safe.add(nr * COLS + nc)
    }

  const g = grid.map(r => r.map(c => ({ ...c })))
  let placed = 0
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS)
    const c = Math.floor(Math.random() * COLS)
    if (!safe.has(r * COLS + c) && !g[r][c].mine) { g[r][c].mine = true; placed++ }
  }

  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (!g[r][c].mine) {
        let adj = 0
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && g[nr][nc].mine) adj++
          }
        g[r][c].adj = adj
      }

  return g
}

function flood(g, r, c) {
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return
  if (g[r][c].revealed || g[r][c].flagged || g[r][c].mine) return
  g[r][c].revealed = true
  if (g[r][c].adj === 0)
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++) flood(g, r + dr, c + dc)
}

function Minesweeper() {
  const [grid, setGrid] = useState(makeEmpty)
  const [phase, setPhase] = useState('idle')
  const [flags, setFlags] = useState(0)
  const [time, setTime] = useState(0)
  const [flagMode, setFlagMode] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (phase === 'playing') timerRef.current = setInterval(() => setTime(t => t + 1), 1000)
    else clearInterval(timerRef.current)
    return () => clearInterval(timerRef.current)
  }, [phase])

  const reset = useCallback(() => { setGrid(makeEmpty()); setPhase('idle'); setFlags(0); setTime(0); setFlagMode(false) }, [])

  const reveal = useCallback((r, c) => {
    if (phase === 'won' || phase === 'lost') return
    if (grid[r][c].flagged) return

    let g = grid.map(row => row.map(cell => ({ ...cell })))

    if (phase === 'idle') { g = withMines(g, r, c); setPhase('playing') }
    if (g[r][c].revealed) return

    if (g[r][c].mine) {
      g = g.map(row => row.map(cell => ({ ...cell, revealed: cell.mine ? true : cell.revealed })))
      g[r][c].exploded = true
      setGrid(g); setPhase('lost'); return
    }

    flood(g, r, c)
    const won = g.flat().every(cell => cell.revealed || cell.mine)
    setGrid(g)
    if (won) setPhase('won')
  }, [grid, phase])

  const doFlag = useCallback((e, r, c) => {
    e.preventDefault()
    if (phase === 'idle' || phase === 'won' || phase === 'lost') return
    if (grid[r][c].revealed) return
    const g = grid.map(row => row.map(cell => ({ ...cell })))
    g[r][c].flagged = !g[r][c].flagged
    setFlags(f => g[r][c].flagged ? f + 1 : f - 1)
    setGrid(g)
  }, [grid, phase])

  const handleCellClick = useCallback((r, c) => {
    if (flagMode) {
      const fakeEvt = { preventDefault: () => {} }
      doFlag(fakeEvt, r, c)
    } else {
      reveal(r, c)
    }
  }, [flagMode, doFlag, reveal])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      {/* HUD */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: '#f59e0b', background: '#141414', border: '1px solid rgba(245,158,11,0.2)', padding: '8px 20px', letterSpacing: '0.08em' }}>
        <span>💣 {MINES - flags}</span>
        <button
          onClick={reset}
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: phase === 'won' ? '#34d399' : phase === 'lost' ? '#f87171' : '#f59e0b', background: 'none', border: '1px solid currentColor', padding: '3px 10px', letterSpacing: '0.1em', cursor: 'pointer' }}
        >
          {phase === 'won' ? 'YOU WIN ↺' : phase === 'lost' ? 'DEAD ↺' : 'NEW ↺'}
        </button>
        <span>⏱ {time}s</span>
      </div>

      {/* Grid */}
      <div
        style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`, gap: 2, position: 'relative' }}
        onContextMenu={e => e.preventDefault()}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => {
            let bg = '#1e1e1e'
            if (cell.revealed) bg = cell.exploded ? '#450a0a' : '#141414'
            else if (cell.flagged) bg = '#1a1500'

            return (
              <div
                key={`${r}-${c}`}
                className="ms-cell"
                onClick={() => handleCellClick(r, c)}
                onContextMenu={e => doFlag(e, r, c)}
                style={{
                  width: CELL, height: CELL,
                  background: bg,
                  border: `1px solid ${cell.revealed ? '#222' : cell.flagged ? 'rgba(245,158,11,0.4)' : '#2e2e2e'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, cursor: 'pointer',
                  boxShadow: cell.exploded ? '0 0 12px rgba(239,68,68,0.6)' : 'none',
                }}
              >
                {cell.flagged && !cell.revealed && <span style={{ fontSize: 14 }}>🚩</span>}
                {cell.revealed && cell.mine && <span style={{ fontSize: 14 }}>{cell.exploded ? '💥' : '💣'}</span>}
                {cell.revealed && !cell.mine && cell.adj > 0 && (
                  <span style={{ color: NUM_COLORS[cell.adj], fontFamily: '"JetBrains Mono", monospace', fontSize: 13, fontWeight: 700 }}>
                    {cell.adj}
                  </span>
                )}
              </div>
            )
          })
        )}

        {/* Win overlay */}
        {phase === 'won' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(13,13,13,0.88)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 28, color: '#34d399', fontStyle: 'italic' }}>Clear.</span>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#6b7280' }}>{time}s — not bad.</span>
          </motion.div>
        )}
      </div>

      {/* Flag mode toggle (mobile / preference) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={() => setFlagMode(f => !f)}
          style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: flagMode ? '#f59e0b' : '#6b7280',
            background: flagMode ? 'rgba(245,158,11,0.08)' : 'transparent',
            border: `1px solid ${flagMode ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.07)'}`,
            padding: '4px 12px', cursor: 'pointer',
          }}
        >
          {flagMode ? '🚩 flag mode on' : '🚩 flag mode off'}
        </button>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#374151' }}>or right-click</span>
      </div>
    </div>
  )
}

/* ─── Full Section ────────────────────────────────────────── */
export default function GamesSection() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

      {/* Pong background */}
      <PongCanvas />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 10 }}
        >
          — Play
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#f0ede8', fontWeight: 700, textAlign: 'center', marginBottom: 4 }}
        >
          While you're here —
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: '#6b7280', textAlign: 'center', marginBottom: 24, letterSpacing: '0.04em' }}
        >
          Minesweeper. One of mine. Give it a go.
        </motion.p>

        {/* Game */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <Minesweeper />
        </motion.div>
      </div>
    </div>
  )
}
