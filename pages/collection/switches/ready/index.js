import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function SwitchesPage() {
  const router = useRouter()
  useEffect(() => {
    router.push({
      pathname: '/collection',
      query: { tab: 2, switch_mount_status: 'ready' }
    }, '/collection')
  })

}
