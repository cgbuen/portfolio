import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function KeysetsPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace({
      pathname: '/collection',
      query: { tab: 1, keyset_mount_status: 'unused' }
    }, '/collection')
  })

}
