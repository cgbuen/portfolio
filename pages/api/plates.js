// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'

export default async function handler(req, res) {
  const platesResponse = await fetch(`${ASSET_DOMAIN}/plates/plates.json?${Date.now()}`)
  const platesResponseJson = await platesResponse.json()
  const response = platesResponseJson.map(plate => {
    plate.src = plate.src === 'n/a' ? plate.src : `${ASSET_DOMAIN}/plates/${plate.src}.svg?${plate.cache_buster}`
    return plate
  })
  res.status(200).json(response)
}
