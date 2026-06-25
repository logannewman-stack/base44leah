import { motion } from 'framer-motion'
import { contactModal } from './useContactModal'
import { useIsMobile } from './useIsMobile'

/**
 * Mobile-only floating "Chat with a Representative" pill, fixed just below the
 * navbar. Slides down on load and opens the contact-form modal when tapped.
 * Hidden on tablet/desktop.
 *
 * A flex-centered wrapper handles horizontal centering; the button itself only
 * animates `y`/opacity so Framer's transform doesn't fight a CSS translate.
 */
export default function FloatingChatButton() {
  const isMobile = useIsMobile()
  if (!isMobile) return null

  return (
    // sm:hidden is a second guard so it never shows on larger screens.
    // pointer-events-none lets taps pass through the empty wrapper to the page.
    <div className="pointer-events-none fixed inset-x-0 top-[4.75rem] z-40 flex justify-center px-4 sm:hidden">
      <motion.button
        type="button"
        onClick={() => contactModal.open()}
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Chat with a representative"
        className="pointer-events-auto flex items-center gap-2 whitespace-nowrap rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-blue opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-blue" />
        </span>
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        Chat with a Representative
      </motion.button>
    </div>
  )
}
