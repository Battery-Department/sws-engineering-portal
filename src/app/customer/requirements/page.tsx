'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import RequirementsWizard from '@/components/requirements/RequirementsWizard'

export default function RequirementsPage() {
  const router = useRouter()

  const handleComplete = (requirements: any) => {
    // Navigate to project dashboard or confirmation page
    router.push(`/customer/projects/${requirements.id}`)
  }

  return (
    <div>
      <RequirementsWizard onComplete={handleComplete} />
    </div>
  )
}