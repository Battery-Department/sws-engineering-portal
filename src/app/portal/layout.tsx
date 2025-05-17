'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import { LithiChat } from '@/components/chat/LithiChat'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {children}
      <LithiChat />
    </AuthProvider>
  )
}