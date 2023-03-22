// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createOptimizedSrc } from 'helpers/imageService'

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default async function handler(req, res) {
  const photographyResponse = await fetch(`${ASSET_DOMAIN}/concerts/concerts.json`)
  const photographyResponseJson = await photographyResponse.json()
  const response = photographyResponseJson
    .filter(photo => photo.active)
    .map(photo => {
      photo.src = createOptimizedSrc(`${ASSET_DOMAIN}/concerts/${photo.roll}+${photo.number}.jpg?${photo.cacheBuster}`, { quality: 80 })
      photo.origHeight = photo.height
      photo.origWidth = photo.width
      photo.alt1 = `${photo.subject}${(photo.venue && photo.venue.includes('n/a')) ? '' : ` @ ${photo.venue}`}`
      photo.alt2 = photo.city === 'Coachella' ? `${photo.city} ${photo.date.substring(0, 4)}` : `${photo.city}, ${MONTHS[parseInt(photo.date.substring(5, 7)) - 1]} ${photo.date.substring(0, 4)}`
      photo.alt = `${photo.alt1}, ${photo.alt2}`
      photo.description = `${photo.alt1}\n${photo.alt2}`
      return photo
    })
  res.status(200).json(response)
}
