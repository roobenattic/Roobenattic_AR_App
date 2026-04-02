import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const services = [
  {
    icon: '✦',
    name: 'Signature Cut',
    desc: 'Coupe presizyon ak teknik avanse pou yon look rafine.',
    price: '$35',
    duration: '45 min',
  },
  {
    icon: '◈',
    name: 'Hot Towel Shave',
    desc: 'Rasaj tradisyonèl ak pwodui premium pou po ou.',
    price: '$45',
    duration: '60 min',
  },
  {
    icon: '◇',
    name: 'Beard Sculpt',
    desc: 'Design ak fòme bab ou pou yon siluèt pafè.',
    price: '$30',
    duration: '35 min',
  },
  {
    icon: '✧',
    name: 'Crown Package',
    desc: 'Eksperyans konplè — coupe, bab, ak swen po.',
    price: '$90',
    duration: '90 min',
  },
]

const stats = [
  { value: '12+', label: 'Ane Eksperyans' },
  { value: '4k+', label: 'Kliyan Satisfè' },
  { value: '98%', label: 'Taux Satisfaksyon' },
  { value: '5★', label: 'Rating Mwayen' },
]

export default function Home() {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      el.style.setProperty('--mx', `${x * 20}px`)
      el.style.setProperty('--my', `${y * 20}px`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div style={{ background: '#0a0a0a' }}>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
      >
        {/* Background radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Overline */}
        <div
          className="mb-8 flex items-center gap-3"
          style={{ animation: 'fadeDown 0.8s ease both' }}
        >
          <span className="h-px w-8" style={{ background: '#c9a84c' }} />
          <span
            className="text-xs font-medium tracking-[0.4em] uppercase"
            style={{ color: '#c9a84c' }}
          >
            Premium Barbershop
          </span>
          <span className="h-px w-8" style={{ background: '#c9a84c' }} />
        </div>

        {/* Main title */}
        <h1
          className="text-center font-black leading-none mb-6 tracking-tight"
          style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
            letterSpacing: '-0.03em',
            color: '#f5f5f7',
            animation: 'fadeUp 0.9s ease 0.1s both',
          }}
        >
          The Art of
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #c9a84c, #e8c96e, #c9a84c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Precision.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-center max-w-lg text-base leading-relaxed mb-12"
          style={{
            color: '#636366',
            animation: 'fadeUp 1s ease 0.2s both',
          }}
        >
          Rezève randevou ou, upload style ou vle a, epi kite nou kreye
          yon look ki reflète vrè ou — chak fwa.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4"
          style={{ animation: 'fadeUp 1s ease 0.3s both' }}
        >
          <Link
            to="/book"
            className="px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #c9a84c, #8b6914)',
              color: '#0a0a0a',
              boxShadow: '0 0 30px rgba(201,168,76,0.25)',
            }}
          >
            Book Your Appointment
          </Link>
          <Link
            to="/services"
            className="px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:border-gold"
            style={{
              border: '1px solid rgba(201,168,76,0.3)',
              color: '#aeaeb2',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.8)'
              e.currentTarget.style.color = '#c9a84c'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'
              e.currentTarget.style.color = '#aeaeb2'
            }}
          >
            Découvri Sèvis Nou
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: 'fadeUp 1s ease 0.6s both' }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: '#3a3a3c' }}>
            Scroll
          </span>
          <div
            className="w-px h-8"
            style={{
              background: 'linear-gradient(to bottom, #c9a84c, transparent)',
              animation: 'pulse 2s ease infinite',
            }}
          />
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        className="py-16 px-6"
        style={{ borderTop: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span
                className="text-4xl font-black tracking-tight"
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui',
                  background: 'linear-gradient(135deg, #c9a84c, #e8c96e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {s.value}
              </span>
              <span className="text-xs tracking-widest uppercase" style={{ color: '#636366' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background: '#c9a84c' }} />
              <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#c9a84c' }}>
                Sèvis Nou
              </span>
              <span className="h-px w-8" style={{ background: '#c9a84c' }} />
            </div>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui',
                color: '#f5f5f7',
                letterSpacing: '-0.02em',
              }}
            >
              Crafted for{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #c9a84c, #e8c96e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Excellence
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((svc, i) => (
              <Link
                key={svc.name}
                to="/book"
                className="group relative p-8 rounded-2xl transition-all duration-500"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'
                  e.currentTarget.style.background = '#161616'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.background = '#111111'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="text-2xl"
                    style={{ color: '#c9a84c' }}
                  >
                    {svc.icon}
                  </span>
                  <span
                    className="text-2xl font-black tracking-tight"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont',
                      color: '#f5f5f7',
                    }}
                  >
                    {svc.price}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display"',
                    color: '#f5f5f7',
                  }}
                >
                  {svc.name}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#636366' }}>
                  {svc.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-widest uppercase" style={{ color: '#3a3a3c' }}>
                    {svc.duration}
                  </span>
                  <span
                    className="text-xs tracking-widest uppercase transition-colors duration-300"
                    style={{ color: '#c9a84c' }}
                  >
                    Book →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upload CTA ── */}
      <section className="py-24 px-6">
        <div
          className="max-w-4xl mx-auto rounded-3xl p-12 md:p-16 relative overflow-hidden text-center"
          style={{
            background: 'linear-gradient(135deg, #111111 0%, #1c1c1e 100%)',
            border: '1px solid rgba(201,168,76,0.15)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
              style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <h2
              className="text-3xl md:text-4xl font-black mb-4 tracking-tight"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display"',
                color: '#f5f5f7',
                letterSpacing: '-0.02em',
              }}
            >
              Upload Style Ou Vle A
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-md mx-auto" style={{ color: '#636366' }}>
              Pote yon foto referans pandan rezèvasyon ou. Babe nou yo
              pral reprodui look ou vle a ak presizyon.
            </p>
            <Link
              to="/book"
              className="inline-block px-8 py-4 text-sm font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #8b6914)',
                color: '#0a0a0a',
                boxShadow: '0 0 40px rgba(201,168,76,0.2)',
              }}
            >
              Rezève Kounye a
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
