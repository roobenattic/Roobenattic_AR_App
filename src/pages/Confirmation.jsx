import { useLocation, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export default function Confirmation() {
  const { state } = useLocation()
  const booking = state?.booking
  const canvasRef = useRef(null)

  // Animated gold particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const W = canvas.width = canvas.offsetWidth
    const H = canvas.height = canvas.offsetHeight

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H + H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(Math.random() * 1 + 0.5),
      size: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${p.alpha})`
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W }
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0a' }}>
        <div className="text-center px-6">
          <p className="text-sm mb-6" style={{ color: '#636366' }}>
            Pa gen rezèvasyon aktif.
          </p>
          <Link
            to="/book"
            className="px-8 py-3 text-sm font-semibold tracking-widest uppercase rounded-full"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #8b6914)', color: '#0a0a0a' }}
          >
            Rezève Kounye a
          </Link>
        </div>
      </div>
    )
  }

  const services = {
    signature: 'Signature Cut', shave: 'Hot Towel Shave',
    beard: 'Beard Sculpt', crown: 'Crown Package',
    fade: 'Fade & Line', kids: 'Kids Cut',
  }
  const barbers = {
    marcus: 'Marcus J.', elite: 'Élite R.', noel: 'Noël A.',
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-lg">
        {/* Success icon */}
        <div className="flex justify-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.3)',
              boxShadow: '0 0 60px rgba(201,168,76,0.15)',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8" style={{ background: '#c9a84c' }} />
            <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#c9a84c' }}>
              Konfime
            </span>
            <span className="h-px w-8" style={{ background: '#c9a84c' }} />
          </div>
          <h1
            className="text-4xl font-black mb-3 tracking-tight"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display"',
              color: '#f5f5f7',
              letterSpacing: '-0.02em',
            }}
          >
            Rezèvasyon Ou
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #c9a84c, #e8c96e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Konfime!
            </span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#636366' }}>
            Nou resevwa rezèvasyon ou. Yon konfimasyon ap voye bay{' '}
            <span style={{ color: '#aeaeb2' }}>{booking.email}</span>.
          </p>
        </div>

        {/* Booking card */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{
            background: '#111111',
            border: '1px solid rgba(201,168,76,0.15)',
          }}
        >
          {[
            { label: 'Sèvis', value: services[booking.service] || booking.service },
            { label: 'Babe', value: barbers[booking.barber] || booking.barber },
            { label: 'Dat', value: booking.date },
            { label: 'Lè', value: booking.time },
            { label: 'Kliyan', value: `${booking.firstName} ${booking.lastName}` },
          ].map(({ label, value }, i, arr) => (
            <div
              key={label}
              className="flex justify-between items-center py-3"
              style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
            >
              <span className="text-xs tracking-widest uppercase" style={{ color: '#636366' }}>
                {label}
              </span>
              <span className="text-sm font-medium" style={{ color: '#f5f5f7' }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Style image preview */}
        {booking.styleImageUrl && (
          <div
            className="rounded-2xl overflow-hidden mb-6"
            style={{ border: '1px solid rgba(201,168,76,0.15)' }}
          >
            <div
              className="px-5 py-3 flex items-center gap-2"
              style={{ background: '#111111', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-xs tracking-widest uppercase" style={{ color: '#636366' }}>
                Style Referans
              </span>
            </div>
            <img
              src={booking.styleImageUrl}
              alt="Reference style"
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="block w-full py-4 text-center text-sm font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #c9a84c, #8b6914)',
              color: '#0a0a0a',
            }}
          >
            Retounen Aksèy
          </Link>
          <Link
            to="/book"
            className="block w-full py-4 text-center text-sm font-medium tracking-[0.15em] uppercase rounded-full transition-all duration-200"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#636366',
            }}
          >
            Fè Yon Lòt Rezèvasyon
          </Link>
        </div>
      </div>
    </div>
  )
}
