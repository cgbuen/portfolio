// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'

export default async function handler(req, res) {
  const linksResponse = await fetch(`${ASSET_DOMAIN}/resources/links.json?${Date.now()}`)
  const linksResponseJson = await linksResponse.json()
  const response = linksResponseJson.map(link => {
    link.src = `${ASSET_DOMAIN}/resources/${link.src}?${link.cache_buster}`
    return link
  })
  res.status(200).json(response)
}
