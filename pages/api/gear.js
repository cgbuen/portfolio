// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'

export default async function handler(req, res) {
  const requests = []
  requests.push(fetch(`${ASSET_DOMAIN}/gear/gear.json`))
  requests.push(fetch(`${ASSET_DOMAIN}/gear/gear-desc.json`))
  const responses = await Promise.all(requests)
  const gear = await responses[0].json()
  const gearDescriptions = await responses[1].json()
  const finalResponse = {
    gear,
    gearDescriptions,
  }
  res.status(200).json(finalResponse)
}
