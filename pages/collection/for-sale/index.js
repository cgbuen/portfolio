import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function SwitchesPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace({
      pathname: '/collection',
      query: { filter: 'for-sale' }
    }, '/collection')
  })

}
