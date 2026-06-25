import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useContactModal } from './useContactModal'

const FORM_SRC = 'https://link.virsalabs.io/widget/form/gobc1SHBoXDUXsieNLL9'

/**
 * Full-screen "Book your detail" modal. Black card, gold accent bar, embeds the
 * booking form via iframe. Closes on ESC, backdrop click, or the X button.
 */
export default function ContactModal() {
  const { isOpen, close } = useContactModal()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
          style={{ background: 'rgba(0,0,0,0.88)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Book your detail"
        >
          <motion.div
            className="relative my-auto w-full max-w-[600px] overflow-hidden border border-white/15 bg-black"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold accent bar */}
            <div className="h-1.5 w-full bg-gold" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-8">
              <div>
                <p className="font-display text-3xl uppercase tracking-tightest text-white">
                  Detail on <span className="text-gold">Demand</span>
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest2 text-white/55">Book your detail</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center text-white transition-colors hover:text-gold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            {/* Booking form — kept on a white panel so the embedded form is readable */}
            <div className="px-2 pb-4 pt-4 sm:px-4">
              <iframe
                src={FORM_SRC}
                title="Book your detail"
                style={{ width: '100%', height: 700, border: 'none', background: '#fff' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
