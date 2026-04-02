import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      className="mt-auto px-6 py-12"
      style={{ borderTop: '1px solid rgba(201,168,76,0.1)', background: '#0a0a0a' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #8b6914)', color: '#0a0a0a' }}
              >
                R
              </div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#f5f5f7' }}>
                Roobenattic
              </span>
            </div>
            <p className="text-xs" style={{ color: '#636366' }}>
              The Art of the Perfect Cut
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            {[['/', 'Aksèy'], ['/services', 'Sèvis'], ['/book', 'Rezève']].map(([path, label]) => (
              <Link
                key={path}
                to={path}
                className="text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: '#636366' }}
                onMouseEnter={e => e.target.style.color = '#c9a84c'}
                onMouseLeave={e => e.target.style.color = '#636366'}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div
          className="mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p className="text-xs" style={{ color: '#3a3a3c' }}>
            © 2026 Roobenattic Barbershop. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#3a3a3c' }}>
            Port-au-Prince, Haiti
          </p>
        </div>
      </div>
    </footer>
  )
}
