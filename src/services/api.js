const REVIEWS_URL = 'https://jsonplaceholder.typicode.com/comments?_limit=6'

export async function fetchTourReviews() {
  // mock data — replace with a real API later if you want
  await new Promise((r) => setTimeout(r, 600))
  return [
    { id: 1, author: 'Aisha K.', rating: 5, text: 'Best trip of my life, the guides were amazing.' },
    { id: 2, author: 'Daniel R.', rating: 4.5, text: 'Well organized and great value for money.' },
    { id: 3, author: 'Priya M.', rating: 5, text: 'Loved every moment, will book again soon.' },
  ]
}
export async function submitContactForm(formData) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  if (!response.ok) throw new Error('Failed to submit form')
  return response.json()
}
