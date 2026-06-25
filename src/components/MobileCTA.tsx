import { contactModal } from './useContactModal'

/** Persistent bottom action bar on mobile so "Book" is always one tap away. */
export default function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md md:hidden">
      <a
        href="tel:+15550102030"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-300 text-brand-ink"
        aria-label="Call us"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
        </svg>
      </a>
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault()
          contactModal.open()
        }}
        className="btn-primary h-12 flex-1"
      >
        Book My Detail
      </a>
    </div>
  )
}
