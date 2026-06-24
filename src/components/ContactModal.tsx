import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useContactModal } from './useContactModal'

const FORM_SRC = 'https://link.virsalabs.io/widget/form/gobc1SHBoXDUXsieNLL9'

/**
 * Full-screen "Speak with a representative" modal for the mono (light) site.
 * White card, blue→violet accent bar, embeds the GoHighLevel form via iframe.
 * Closes on ESC, backdrop click, or the X button.
 */
export default function ContactModal() {
  const { isOpen, close } = useContactModal()

  // ESC to close + lock background scroll while open.
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
          style={{ background: 'rgba(0,0,0,0.85)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Speak with a representative"
        >
          <motion.div
            className="relative my-auto w-full max-w-[600px] overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent bar — blue → soft violet, matching the site */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#4f7cff] via-[#6f80f8] to-[#8f86ef]" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-8">
              <div>
                <p className="font-display text-2xl font-bold leading-none text-neutral-900">
                  FrontDesk <span className="bg-gradient-to-r from-[#4f7cff] to-[#8f86ef] bg-clip-text text-transparent">AI</span>
                </p>
                <p className="mt-2 text-sm font-medium text-neutral-500">Let&apos;s Talk Growth</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-neutral-100"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            {/* GHL form */}
            <div className="px-2 pb-4 pt-4 sm:px-4">
              <iframe
                src={FORM_SRC}
                title="Speak with a representative"
                style={{ width: '100%', height: 700, border: 'none', borderRadius: 12 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
