import { contactModal } from './useContactModal'

/** Fixed bottom Book bar on mobile only. */
export default function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white p-3 shadow-2xl md:hidden">
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault()
          contactModal.open()
        }}
        className="flex w-full items-center justify-center rounded-full bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm"
      >
        Book Now
      </a>
    </div>
  )
}
