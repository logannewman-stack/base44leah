import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { salon } from '../data/salon'
import { useBookingModal } from './useContactModal'

const SERVICES = [
  'Hair Extensions',
  'Color & Balayage',
  'Haircut & Style',
  'Manicure',
  'Pedicure',
  'Bridal / Event',
  'Not sure yet',
]

/**
 * "Book an appointment" modal for the salon (light theme).
 * Collects the request and opens the guest's email client pre-filled to the
 * salon — a dependency-free way to capture bookings with no backend.
 * Closes on ESC, backdrop click, or the X button.
 */
export default function BookingModal() {
  const { isOpen, close } = useBookingModal()
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: SERVICES[0], date: '', notes: '' })

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, close])

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Appointment request — ${form.name || 'New guest'}`
    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Service: ${form.service}`,
      `Preferred date: ${form.date || 'Flexible'}`,
      '',
      `Notes: ${form.notes || '—'}`,
    ].join('\n')
    window.location.href = `mailto:${salon.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
          style={{ background: 'rgba(20,18,16,0.55)', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Book an appointment"
        >
          <motion.div
            className="relative my-auto w-full max-w-[520px] overflow-hidden rounded-[6px] border border-ink-900/10 bg-cream-50 shadow-card"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1 w-full bg-gradient-to-r from-champagne-400 via-champagne-500 to-champagne-600" />

            <div className="flex items-start justify-between gap-4 px-7 pt-7">
              <div>
                <p className="text-[0.6rem] font-medium uppercase tracking-luxe text-champagne-600">
                  {salon.fullName}
                </p>
                <p className="mt-1.5 font-display text-3xl font-semibold text-ink-900">Book your visit</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-900/5"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={submit} className="px-7 pb-7 pt-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name" className="sm:col-span-2">
                  <input required value={form.name} onChange={update('name')} className={inputCls} placeholder="Your name" />
                </Field>
                <Field label="Phone">
                  <input required value={form.phone} onChange={update('phone')} className={inputCls} placeholder="(515) 000-0000" inputMode="tel" />
                </Field>
                <Field label="Email">
                  <input required type="email" value={form.email} onChange={update('email')} className={inputCls} placeholder="you@email.com" />
                </Field>
                <Field label="Service">
                  <select value={form.service} onChange={update('service')} className={inputCls}>
                    {SERVICES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Preferred date">
                  <input type="date" value={form.date} onChange={update('date')} className={inputCls} />
                </Field>
                <Field label="Notes" className="sm:col-span-2">
                  <textarea
                    value={form.notes}
                    onChange={update('notes')}
                    rows={3}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us about your hair goals, inspiration, or anything else…"
                  />
                </Field>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-ink-900 px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-cream-100 transition-colors hover:bg-ink-700"
              >
                Send Request
              </button>
              <p className="mt-4 text-center text-[0.72rem] leading-relaxed text-taupe-600">
                Prefer to talk? Call or text{' '}
                <a href={salon.phoneHref} className="font-medium text-ink-900 underline underline-offset-2">
                  {salon.phoneDisplay}
                </a>
                . We&apos;ll confirm your appointment within one business day.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const inputCls =
  'w-full rounded-[4px] border border-ink-900/15 bg-cream-100/60 px-4 py-2.5 text-[0.92rem] text-ink-900 outline-none transition-colors placeholder:text-taupe-500 focus:border-champagne-500 focus:bg-cream-50'

function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[0.62rem] font-medium uppercase tracking-[0.14em] text-taupe-600">{label}</span>
      {children}
    </label>
  )
}
