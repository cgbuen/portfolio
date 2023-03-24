// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'

export default async function handler(req, res) {
  const projectsResponse = await fetch(`${ASSET_DOMAIN}/projects/projects.json`)
  const projectsResponseJson = await projectsResponse.json()
  const response = projectsResponseJson.map(project => {
    project.src = `${ASSET_DOMAIN}/projects/${project.src}`
  })
  res.status(200).json(response)
}
