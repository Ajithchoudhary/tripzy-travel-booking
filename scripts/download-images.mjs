import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public', 'images')
const tourImages = {
  1: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop',
  2: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop',
  3: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
  4: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
  5: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
  6: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
  7: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
  8: 'https://images.unsplash.com/photo-1512632578880-169f6425c6a?w=600&h=400&fit=crop',
  9: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=400&fit=crop',
  10: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop',
  11: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&h=400&fit=crop',
  12: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=400&fit=crop',
  13: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=400&fit=crop',
  14: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
  15: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&h=400&fit=crop',
  16: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop',
  17: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=600&h=400&fit=crop',
  18: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop',
  19: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=600&h=400&fit=crop',
  20: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
  21: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&h=400&fit=crop',
  22: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=400&fit=crop',
  23: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
  24: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop',
  25: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop',
  26: 'https://images.unsplash.com/photo-1537996194471-e657df975b4?w=600&h=400&fit=crop',
  27: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
  28: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&h=400&fit=crop',
  29: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&h=400&fit=crop',
  30: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&h=400&fit=crop',  }
const backgrounds = {
  'hero-bg.jpg': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80',
  'cta-bg.jpg': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=60',
  'about-story.jpg': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop', }
async function download(url, dest) {
  await mkdir(dirname(dest), { recursive: true })
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    await writeFile(dest, buf)
    console.log('Saved', dest)
  } catch (err) {
    console.warn('Skip', dest, err.message)
  }
}
await mkdir(join(publicDir, 'tours'), { recursive: true })
await mkdir(join(publicDir, 'bg'), { recursive: true })
for (const [id, url] of Object.entries(tourImages)) {
  await download(url, join(publicDir, 'tours', `tour-${id}.jpg`))
}
for (const [name, url] of Object.entries(backgrounds)) {
  await download(url, join(publicDir, 'bg', name))
}
console.log('All images downloaded.')
