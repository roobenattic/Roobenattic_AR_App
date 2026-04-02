import { Link } from 'react-router-dom'

const services = [
  {
    icon: '✦',
    name: 'Signature Cut',
    desc: 'Coupe presizyon ak teknik avanse. Chak detail kalkile pou kreye yon look ki ekzakteman koresponn ak fòm viza ou ak pèsonalite ou.',
    price: '$35',
    duration: '45 min',
    includes: ['Konsiltasyon', 'Wash & Blow Dry', 'Styling Finish'],
  },
  {
    icon: '◈',
    name: 'Hot Towel Shave',
    desc: 'Eksperyans rasaj klasik ak sèvyèt cho, krem premium, ak razo dwat. Yon ritual ki repozan epi ki ba ou yon po douce tankou swa.',
    price: '$45',
    duration: '60 min',
    includes: ['Hot Towel Treatment', 'Pre-Shave Oil', 'Post-Shave Balm'],
  },
  {
    icon: '◇',
    name: 'Beard Sculpt',
    desc: 'Design ak fòme bab ou selon siluèt ou vle a. Nou itilize pwodui premium pou nouri pwal yo epi kenbe fòm nan pou pi lontan.',
    price: '$30',
    duration: '35 min',
    includes: ['Beard Wash', 'Sculpting & Lining', 'Beard Oil Finish'],
  },
  {
    icon: '✧',
    name: 'Crown Package',
    desc: 'Pakè konplè pou nèg ki vle tou — coupe presizyon, bab sculpté, ak swen po ak pwodui luxe. Eksperyans ultimate.',
    price: '$90',
    duration: '90 min',
    includes: ['Signature Cut', 'Hot Towel Shave', 'Beard Sculpt', 'Scalp Massage'],
    featured: true,
  },
  {
    icon: '◉',
    name: 'Fade & Line',
    desc: 'Fade nèt ak liy presizyon sou fwon ak kò. Teknik modèn pou yon look pwòp ak kontanporen.',
    price: '$28',
    duration: '35 min',
    includes: ['Taper Fade', 'Edge Lining', 'Styling'],
  },
  {
    icon: '◐',
    name: 'Kids Cut',
    desc: 'Coupe pou ti gason 12 an ak pi jèn. Anvironnman ki alèz, babe ki gen pasyans ak eksperyans ak jenn kliyan.',
    price: '$20',
    duration: '30 min',
    includes: ['Consultation', 'Cut & Style', 'Fun Experience'],
  },
]

export default function Services() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      {/* Header */}
      <section className="pt-36 pb-16 px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-8" style={{ background: '#c9a84c' }} />
          <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#c9a84c' }}>
            Meni Sèvis
          </span>
          <span className="h-px w-8" style={{ background: '#c9a84c' }} />
        </div>
        <h1
          className="text-5xl md:text-6xl font-black mb-4 tracking-tight"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display"',
            color: '#f5f5f7',
            letterSpacing: '-0.03em',
          }}
        >
          Sèvis{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #c9a84c, #e8c96e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Nou
          </span>
        </h1>
        <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: '#636366' }}>
          Chak sèvis kreye avèk swen, presizyon, ak pwodui premium
          pou bay ou yon rezilta eksepsyonèl.
        </p>
      </section>

      {/* Services grid */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc) => (
            <div
              key={svc.name}
              className="relative p-8 rounded-2xl flex flex-col"
              style={{
                background: svc.featured ? 'linear-gradient(135deg, #1a1500, #111111)' : '#111111',
                border: svc.featured
                  ? '1px solid rgba(201,168,76,0.35)'
                  : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {svc.featured && (
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
                  style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)' }}
                >
                  Popular
                </div>
              )}

              <div className="flex items-start justify-between mb-6">
                <span className="text-3xl" style={{ color: '#c9a84c' }}>{svc.icon}</span>
                <div className="text-right">
                  <div
                    className="text-3xl font-black tracking-tight"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display"',
                      color: '#f5f5f7',
                    }}
                  >
                    {svc.price}
                  </div>
                  <div className="text-xs tracking-widest uppercase mt-0.5" style={{ color: '#3a3a3c' }}>
                    {svc.duration}
                  </div>
                </div>
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
              <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: '#636366' }}>
                {svc.desc}
              </p>

              <ul className="space-y-2 mb-8">
                {svc.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs" style={{ color: '#aeaeb2' }}>
                    <span style={{ color: '#c9a84c' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/book"
                className="block w-full py-3 text-center text-xs font-semibold tracking-widest uppercase rounded-xl transition-all duration-300"
                style={
                  svc.featured
                    ? { background: 'linear-gradient(135deg, #c9a84c, #8b6914)', color: '#0a0a0a' }
                    : { border: '1px solid rgba(201,168,76,0.25)', color: '#c9a84c' }
                }
                onMouseEnter={e => {
                  if (!svc.featured) e.currentTarget.style.borderColor = 'rgba(201,168,76,0.6)'
                }}
                onMouseLeave={e => {
                  if (!svc.featured) e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)'
                }}
              >
                Rezève Sèvis Sa
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
