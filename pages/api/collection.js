// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const ASSET_DOMAIN = 'https://ph-1080.cgbuen.com'

export default async function handler(req, res) {
  const requests = []
  requests.push(fetch(`${ASSET_DOMAIN}/keyboards/collection.json`))
  requests.push(fetch(`${ASSET_DOMAIN}/keyboards/keysets.json`))
  requests.push(fetch(`${ASSET_DOMAIN}/keyboards/switches.json`))
  const filter = 'Built'
  const responses = await Promise.all(requests)
  const buildsResponse = await responses[0].json()
  const builds = buildsResponse
    .map(build => {
      build.src = `${ASSET_DOMAIN}/keyboards/${build.src}.jpg?${build.cache_buster}`
      if (build.assembly_variant.includes('A') && build.build_status === filter) {
        build.loaded = true
        build.displayed = true
      }
      if (!build.cache_buster) {
        build.cache_buster = null
      }
      return build
    })
    .sort((x, y) => {
      const useDateX = ['TBD', 'N/A'].includes(x.date_built_latest) ? x.date_bought: x.date_built_latest
      const useDateY = ['TBD', 'N/A'].includes(y.date_built_latest) ? y.date_bought: y.date_built_latest
      return useDateX.localeCompare(useDateY)
    })
    .reverse()
  const keysetsResponse = await responses[1].json()
  let keysets = keysetsResponse
    .filter(keyset => ['Mounted', 'Unused'].includes(keyset.mount_status))
    .map(keyset => {
      keyset.src = `${ASSET_DOMAIN}/keyboards/${keyset.src}.jpg`
      return keyset
    })
    .reverse()
  const switchesResponse = await responses[2].json()
  let switches = switchesResponse
    .filter(keyset => ['Tune', 'Ready', 'Mounted', 'Re-tune'].includes(keyset.mount_status))
    .reverse()
  const dates = responses.map(x => new Date(x.headers.get('Last-Modified')).valueOf())

  if (req.query.keyset_mount_status === 'unused') {
    keysets = [...keysets].reverse().sort((x, y) => {
      return x.mount_status === 'Unused' ? -1 : 1
    })
  }
  if (req.query.switch_mount_status === 'ready') {
    switches = [...switches].reverse().sort((x, y) => {
      return x.mount_status === 'Ready' ? -1 : 1
    })
  }
  if (req.query.switch_mount_status === 'tunable') {
    switches = [...switches].reverse().sort((x, y) => {
      return ['Tune', 'Re-tune'].includes(x.mount_status) ? -1 : 1
    })
  }

  const finalResponse = {
    builds,
    keysets,
    switches,
    date: new Date(dates.reduce((a, b) => Math.max(a, b), -Infinity)).toLocaleString()
  }

  res.status(200).json(finalResponse)
}
