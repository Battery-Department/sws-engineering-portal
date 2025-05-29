'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DealerPortalPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dealer-portal/dashboard')
  }, [router])

  return null
}