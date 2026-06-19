import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const url = 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200&q=80'
const dest = 'C:/Users/HP/tripzy/public/images/bg/auth-bg.jpg'

try {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Status ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(dest, buf)
  console.log('Downloaded new background successfully!')
} catch (err) {
  console.error('Download failed:', err.message)
}
