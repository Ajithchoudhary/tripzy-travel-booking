import { readFileSync, writeFileSync } from 'node:fs'

let content = readFileSync('src/data/tours.js', 'utf8')
content = content.replace(
  /id: (\d+),[\s\S]*?image: "[^"]+"/g,
  (block, id) => block.replace(/image: "[^"]+"/, `image: "/images/tours/tour-${id}.jpg"`)
)
content = content.replace(/\n\ntours\.forEach[\s\S]*$/, '\n')
writeFileSync('src/data/tours.js', content)
console.log('Updated tours.js with local image paths')
