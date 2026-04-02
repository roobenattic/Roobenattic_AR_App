import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const services = [
  { id: 'signature', name: 'Signature Cut', price: 35, duration: '45 min' },
  { id: 'shave', name: 'Hot Towel Shave', price: 45, duration: '60 min' },
  { id: 'beard', name: 'Beard Sculpt', price: 30, duration: '35 min' },
  { id: 'crown', name: 'Crown Package', price: 90, duration: '90 min' },
  { id: 'fade', name: 'Fade & Line', price: 28, duration: '35 min' },
  { id: 'kids', name: 'Kids Cut', price: 20, duration: '30 min' },
]

const barbers = [
  { id: 'marcus', name: 'Marcus J.', specialty: 'Fade Specialist', emoji: '✂' },
  { id: 'elite', name: 'Élite R.', specialty: 'Beard Expert', emoji: '◈' },
  { id: 'noel', name: 'Noël A.', specialty: 'Classic Cuts', emoji: '✦' },
]

const timeSlots = [
  '9:00 AM', '9:45 AM', '10:30 AM', '11:15 AM',
  '12:00 PM', '1:00 PM', '1:45 PM', '2:30 PM',
  '3:15 PM', '4:00 PM', '4:45 PM', '5:30 PM',
]

const STEPS = ['Sèvis', 'Babe', 'Dat & Lè', 'Enfòmasyon', 'Konfime']

export default function Book() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    service: '',
    barber: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    notes: '',
    styleImage: null,
    styleImageUrl: null,
  })
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef(null)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return
    if (file.size > 10 * 1024 * 1024) {
      alert('Imaj la twò gwo. Chwazi yon imaj ki mwens pase 10MB.')
      return
    }
    const url = URL.createObjectURL(file)
    set('styleImage', file)
    set('styleImageUrl', url)
  }, [])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }, [handleFile])

  const canNext = () => {
    if (step === 0) return !!form.service
    if (step === 1) return !!form.barber
    if (step === 2) return !!form.date && !!form.time
    if (step === 3) return !!form.firstName && !!form.lastName && !!form.phone && !!form.email
    return true
  }

  const handleSubmit = () => {
    navigate('/confirmation', { state: { booking: form } })
  }

  const selectedService = services.find(s => s.id === form.service)

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      {/* Header */}
      <div className="pt-28 pb-10 px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-8" style={{ background: '#c9a84c' }} />
          <span className="text-xs tracking-[0.4em] uppercase" style={{ color: '#c9a84c' }}>
            Rezèvasyon
          </span>
          <span className="h-px w-8" style={{ background: '#c9a84c' }} />
        </div>
        <h1
          className="text-4xl md:text-5xl font-black tracking-tight mb-3"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display"',
            color: '#f5f5f7',
            letterSpacing: '-0.03em',
          }}
        >
          Rezève Randevou
        </h1>
        <p className="text-sm" style={{ color: '#636366' }}>
          Chwazi sèvis ou, babe ou, ak lè ki bon pou ou.
        </p>
      </div>

      {/* Step indicator */}
      <div className="px-6 mb-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between relative">
          {/* Progress line */}
          <div
            className="absolute left-0 right-0 h-px top-4"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          />
          <div
            className="absolute left-0 h-px top-4 transition-all duration-500"
            style={{
              background: 'linear-gradient(90deg, #c9a84c, #e8c96e)',
              width: `${(step / (STEPS.length - 1)) * 100}%`,
            }}
          />
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-col items-center gap-2 relative z-10">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={
                  i < step
                    ? { background: 'linear-gradient(135deg, #c9a84c, #8b6914)', color: '#0a0a0a' }
                    : i === step
                    ? { background: '#c9a84c', color: '#0a0a0a', boxShadow: '0 0 16px rgba(201,168,76,0.5)' }
                    : { background: '#1c1c1e', color: '#3a3a3c', border: '1px solid #2c2c2e' }
                }
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span
                className="text-xs tracking-wider hidden sm:block"
                style={{ color: i <= step ? '#c9a84c' : '#3a3a3c' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">

          {/* STEP 0 — Service */}
          {step === 0 && (
            <div>
              <h2
                className="text-xl font-bold mb-6"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont', color: '#f5f5f7' }}
              >
                Ki sèvis ou vle?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map(svc => (
                  <button
                    key={svc.id}
                    onClick={() => set('service', svc.id)}
                    className="p-5 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: form.service === svc.id ? 'rgba(201,168,76,0.08)' : '#111111',
                      border: form.service === svc.id
                        ? '1px solid rgba(201,168,76,0.5)'
                        : '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: form.service === svc.id ? '#c9a84c' : '#f5f5f7' }}
                      >
                        {svc.name}
                      </span>
                      <span
                        className="text-sm font-bold"
                        style={{ color: '#c9a84c' }}
                      >
                        ${svc.price}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: '#636366' }}>{svc.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — Barber */}
          {step === 1 && (
            <div>
              <h2
                className="text-xl font-bold mb-6"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont', color: '#f5f5f7' }}
              >
                Chwazi babe ou
              </h2>
              <div className="flex flex-col gap-3">
                {barbers.map(b => (
                  <button
                    key={b.id}
                    onClick={() => set('barber', b.id)}
                    className="p-5 rounded-xl flex items-center gap-4 transition-all duration-200"
                    style={{
                      background: form.barber === b.id ? 'rgba(201,168,76,0.08)' : '#111111',
                      border: form.barber === b.id
                        ? '1px solid rgba(201,168,76,0.5)'
                        : '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                      style={{
                        background: form.barber === b.id
                          ? 'rgba(201,168,76,0.15)'
                          : 'rgba(255,255,255,0.04)',
                        border: form.barber === b.id
                          ? '1px solid rgba(201,168,76,0.3)'
                          : '1px solid rgba(255,255,255,0.06)',
                        color: '#c9a84c',
                      }}
                    >
                      {b.emoji}
                    </div>
                    <div className="text-left">
                      <div
                        className="font-semibold text-sm"
                        style={{ color: form.barber === b.id ? '#c9a84c' : '#f5f5f7' }}
                      >
                        {b.name}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: '#636366' }}>
                        {b.specialty}
                      </div>
                    </div>
                    {form.barber === b.id && (
                      <div className="ml-auto text-sm" style={{ color: '#c9a84c' }}>✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Date & Time */}
          {step === 2 && (
            <div>
              <h2
                className="text-xl font-bold mb-6"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont', color: '#f5f5f7' }}
              >
                Ki dat ak lè?
              </h2>
              <div className="mb-6">
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#636366' }}>
                  Dat
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => set('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: '#111111',
                    border: form.date ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    color: '#f5f5f7',
                    colorScheme: 'dark',
                  }}
                />
              </div>

              {form.date && (
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-3" style={{ color: '#636366' }}>
                    Lè
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => set('time', slot)}
                        className="py-2.5 px-3 rounded-lg text-xs font-medium transition-all duration-200"
                        style={{
                          background: form.time === slot ? 'rgba(201,168,76,0.12)' : '#111111',
                          border: form.time === slot
                            ? '1px solid rgba(201,168,76,0.5)'
                            : '1px solid rgba(255,255,255,0.05)',
                          color: form.time === slot ? '#c9a84c' : '#aeaeb2',
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 — Info + Image Upload */}
          {step === 3 && (
            <div>
              <h2
                className="text-xl font-bold mb-6"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont', color: '#f5f5f7' }}
              >
                Enfòmasyon Ou
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {[
                  { key: 'firstName', label: 'Prenon', placeholder: 'Jean' },
                  { key: 'lastName', label: 'Siyati', placeholder: 'Pierre' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#636366' }}>
                      {label}
                    </label>
                    <input
                      type="text"
                      value={form[key]}
                      onChange={e => set(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        background: '#111111',
                        border: form[key] ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.08)',
                        color: '#f5f5f7',
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#636366' }}>
                    Telefòn
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    placeholder="+509 3700 0000"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: '#111111',
                      border: form.phone ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.08)',
                      color: '#f5f5f7',
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#636366' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="jean@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{
                      background: '#111111',
                      border: form.email ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.08)',
                      color: '#f5f5f7',
                    }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#636366' }}>
                  Nòt (opsyonèl)
                </label>
                <textarea
                  value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                  placeholder="Dekri style ou vle a, oswa nenpòt lòt enfòmasyon..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#f5f5f7',
                  }}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#636366' }}>
                  Upload Style Ou Vle A{' '}
                  <span style={{ color: '#3a3a3c', fontWeight: 'normal' }}>(opsyonèl)</span>
                </label>

                {form.styleImageUrl ? (
                  /* Preview */
                  <div
                    className="relative rounded-xl overflow-hidden"
                    style={{ border: '1px solid rgba(201,168,76,0.35)' }}
                  >
                    <img
                      src={form.styleImageUrl}
                      alt="Style reference"
                      className="w-full h-52 object-cover"
                    />
                    <div
                      className="absolute inset-0 flex items-end justify-between p-4"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }}
                    >
                      <div>
                        <div className="text-xs font-medium" style={{ color: '#f5f5f7' }}>
                          {form.styleImage?.name}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: '#636366' }}>
                          {(form.styleImage?.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                      <button
                        onClick={() => { set('styleImage', null); set('styleImageUrl', null) }}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{
                          background: 'rgba(255,59,48,0.15)',
                          border: '1px solid rgba(255,59,48,0.3)',
                          color: '#ff3b30',
                        }}
                      >
                        Retire
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Drop zone */
                  <div
                    onDragOver={e => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    onClick={() => fileRef.current?.click()}
                    className="cursor-pointer rounded-xl flex flex-col items-center justify-center py-12 px-6 transition-all duration-300"
                    style={{
                      background: dragging ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.02)',
                      border: dragging
                        ? '2px dashed rgba(201,168,76,0.6)'
                        : '2px dashed rgba(255,255,255,0.08)',
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                      style={{
                        background: dragging ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(201,168,76,0.15)',
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#aeaeb2' }}>
                      Drag & drop oswa{' '}
                      <span style={{ color: '#c9a84c' }}>klike pou chwazi</span>
                    </p>
                    <p className="text-xs" style={{ color: '#3a3a3c' }}>
                      PNG, JPG, WEBP · Maksimòm 10MB
                    </p>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => handleFile(e.target.files?.[0])}
                />
              </div>
            </div>
          )}

          {/* STEP 4 — Review */}
          {step === 4 && (
            <div>
              <h2
                className="text-xl font-bold mb-6"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont', color: '#f5f5f7' }}
              >
                Verifye Rezèvasyon Ou
              </h2>

              <div
                className="rounded-2xl p-6 mb-6 space-y-4"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(201,168,76,0.15)',
                }}
              >
                {[
                  { label: 'Sèvis', value: selectedService?.name },
                  { label: 'Pri', value: `$${selectedService?.price}` },
                  { label: 'Babe', value: barbers.find(b => b.id === form.barber)?.name },
                  { label: 'Dat', value: form.date },
                  { label: 'Lè', value: form.time },
                  { label: 'Non', value: `${form.firstName} ${form.lastName}` },
                  { label: 'Telefòn', value: form.phone },
                  { label: 'Email', value: form.email },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span className="text-xs tracking-widest uppercase" style={{ color: '#636366' }}>{label}</span>
                    <span className="text-sm font-medium" style={{ color: '#f5f5f7' }}>{value}</span>
                  </div>
                ))}
                {form.notes && (
                  <div className="pt-2">
                    <span className="text-xs tracking-widest uppercase block mb-1" style={{ color: '#636366' }}>Nòt</span>
                    <span className="text-sm" style={{ color: '#aeaeb2' }}>{form.notes}</span>
                  </div>
                )}
              </div>

              {form.styleImageUrl && (
                <div
                  className="rounded-2xl overflow-hidden mb-6"
                  style={{ border: '1px solid rgba(201,168,76,0.15)' }}
                >
                  <div className="px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: '#111111' }}>
                    <span className="text-xs tracking-widest uppercase" style={{ color: '#636366' }}>
                      Style Referans
                    </span>
                  </div>
                  <img
                    src={form.styleImageUrl}
                    alt="Style reference"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="w-full py-4 text-sm font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c, #8b6914)',
                  color: '#0a0a0a',
                  boxShadow: '0 0 40px rgba(201,168,76,0.2)',
                }}
              >
                Konfime Rezèvasyon
              </button>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 4 && (
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="flex-1 py-3.5 text-sm font-medium tracking-widest uppercase rounded-full transition-all duration-200"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#636366',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                >
                  Retounen
                </button>
              )}
              <button
                onClick={() => canNext() && setStep(s => s + 1)}
                disabled={!canNext()}
                className="flex-1 py-3.5 text-sm font-semibold tracking-widest uppercase rounded-full transition-all duration-300"
                style={{
                  background: canNext()
                    ? 'linear-gradient(135deg, #c9a84c, #8b6914)'
                    : '#1c1c1e',
                  color: canNext() ? '#0a0a0a' : '#3a3a3c',
                  cursor: canNext() ? 'pointer' : 'not-allowed',
                }}
              >
                Kontinye
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
