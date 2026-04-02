import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(10,10,10,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold tracking-widest"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #8b6914)', color: '#0a0a0a' }}
          >
            R
          </div>
          <span
            className="text-sm font-semibold tracking-[0.2em] uppercase"
            style={{ color: '#f5f5f7', letterSpacing: '0.2em' }}
          >
            Roobenattic
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[['/', 'Aksèy'], ['/services', 'Sèvis'], ['/book', 'Rezève']].map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className="text-xs font-medium tracking-widest uppercase transition-colors duration-200"
              style={{
                color: location.pathname === path ? '#c9a84c' : '#aeaeb2',
              }}
              onMouseEnter={e => e.target.style.color = '#c9a84c'}
              onMouseLeave={e => e.target.style.color = location.pathname === path ? '#c9a84c' : '#aeaeb2'}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/book"
            className="px-5 py-2 text-xs font-semibold tracking-widest uppercase rounded-full transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #c9a84c, #8b6914)',
              color: '#0a0a0a',
            }}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: '#c9a84c',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(3px, 3px)'
                  : i === 2 ? 'rotate(-45deg) translate(3px, -3px)'
                  : 'scaleX(0)'
                  : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: 'rgba(10,10,10,0.97)', borderTop: '1px solid rgba(201,168,76,0.1)' }}
        >
          {[['/', 'Aksèy'], ['/services', 'Sèvis'], ['/book', 'Rezève']].map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className="text-sm font-medium tracking-widest uppercase py-2"
              style={{ color: location.pathname === path ? '#c9a84c' : '#aeaeb2' }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/book"
            className="mt-2 px-5 py-3 text-xs font-semibold tracking-widest uppercase rounded-full text-center"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #8b6914)', color: '#0a0a0a' }}
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  )
}
