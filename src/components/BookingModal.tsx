import { useEffect } from 'react'
import { useBooking } from './useBooking'

// Replace with your real booking form / Calendly link when you have it.
const FORM_SRC = 'https://link.virsalabs.io/widget/form/gobc1SHBoXDUXsieNLL9'

export default function BookingModal() {
  const { isOpen, close } = useBooking()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, close])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:items-center"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Book your detail"
    >
      <div
        className="animate-riseIn relative my-auto w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/12 bg-ink-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full bg-brand-500" />
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div>
            <p className="font-display text-xl font-extrabold text-white">
              Book your detail
            </p>
            <p className="mt-1 text-sm text-white/55">Tell us your vehicle — we'll come to you.</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <div className="px-3 pb-4 pt-4">
          <iframe
            src={FORM_SRC}
            title="Book your detail"
            style={{ width: '100%', height: 680, border: 'none', borderRadius: 10, background: '#fff' }}
          />
        </div>
      </div>
    </div>
  )
}
