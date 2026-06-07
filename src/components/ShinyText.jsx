export default function ShinyText({
  text,
  speed = 2,
  delay = 0,
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  direction = 'left',
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  style = {},
  className = '',
}) {
  if (disabled) {
    return <span style={{ color, ...style }} className={className}>{text}</span>
  }

  const animName = direction === 'left' ? 'shinyLeft' : 'shinyRight'

  return (
    <span
      onMouseEnter={pauseOnHover ? (e) => { e.currentTarget.style.animationPlayState = 'paused' } : undefined}
      onMouseLeave={pauseOnHover ? (e) => { e.currentTarget.style.animationPlayState = 'running' } : undefined}
      style={{
        background: `linear-gradient(90deg, ${color} 0%, ${color} 38%, ${shineColor} 50%, ${color} 62%, ${color} 100%)`,
        backgroundSize: `${spread * 2}% 100%`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
        animation: `${animName} ${speed}s linear infinite`,
        animationDelay: `${delay}s`,
        animationDirection: yoyo ? 'alternate' : 'normal',
        ...style,
      }}
      className={className}
    >
      {text}
    </span>
  )
}
