// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'

export default async function handler(req, res) {
  const commandsResponse = await fetch(`${ASSET_DOMAIN}/chatbot/commands.json?${Date.now()}`)
  const commandsResponseJson = await commandsResponse.json()
  res.status(200).json(commandsResponseJson)
}
