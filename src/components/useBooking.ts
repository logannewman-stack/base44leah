import { useSyncExternalStore } from 'react'

/** Tiny global store so any "Book" button anywhere can open the booking modal. */
let isOpen = false
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export const booking = {
  open() {
    if (!isOpen) {
      isOpen = true
      emit()
    }
  },
  close() {
    if (isOpen) {
      isOpen = false
      emit()
    }
  },
}

export function useBooking() {
  const open = useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => isOpen,
    () => isOpen,
  )
  return { isOpen: open, open: booking.open, close: booking.close }
}
