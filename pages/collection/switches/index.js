import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function SwitchesPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace({
      pathname: '/collection',
      query: { tab: 2 }
    }, '/collection')
  })

}
