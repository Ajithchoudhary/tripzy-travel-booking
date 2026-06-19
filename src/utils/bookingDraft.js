const DRAFT_KEY = 'tripzyBookingDraft'

export function getBookingDraft() {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setBookingDraft(draft) {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
}

export function clearBookingDraft() {
  sessionStorage.removeItem(DRAFT_KEY)
}

export function generateBookingId() {
  return `TRP-${Date.now().toString(36).toUpperCase()}`
}

export function formatRupee(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`
}
