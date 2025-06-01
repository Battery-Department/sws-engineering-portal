'use client'

import { useEffect, useState, useCallback } from 'react'
import { RealtimeSync } from '@/lib/realtimeSync'

interface DocumentUpdate {
  documentId: string
  projectId: string
  action: 'created' | 'updated' | 'deleted'
  documentType: string
  timestamp: Date
}

interface UseDocumentSyncOptions {
  userId: string
  projectId?: string
  onUpdate?: (update: DocumentUpdate) => void
  autoRefetch?: boolean
}

export function useDocumentSync({
  userId,
  projectId,
  onUpdate,
  autoRefetch = true
}: UseDocumentSyncOptions) {
  const [lastUpdate, setLastUpdate] = useState<DocumentUpdate | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  
  // Initialize realtime connection
  useEffect(() => {
    if (!userId) return
    
    RealtimeSync.initialize(userId, 'customer')
    setIsConnected(true)
    
    // Subscribe to document updates
    const unsubscribeDoc = RealtimeSync.subscribe('document:update', (update: DocumentUpdate) => {
      setLastUpdate(update)
      
      // Call custom update handler if provided
      if (onUpdate) {
        onUpdate(update)
      }
      
      // Show notification for new documents
      if (update.action === 'created') {
        addNotification({
          id: `doc-${update.documentId}`,
          type: 'success',
          title: 'New Document Available',
          message: `A new ${update.documentType.replace('_', ' ')} has been added to your project.`,
          timestamp: update.timestamp
        })
      }
    })
    
    // Subscribe to notifications
    const unsubscribeNotif = RealtimeSync.subscribe('notification', (notification: any) => {
      addNotification({
        id: `notif-${Date.now()}`,
        ...notification
      })
    })
    
    // Join project room if projectId is provided
    if (projectId) {
      RealtimeSync.joinProjectRoom(projectId)
    }
    
    return () => {
      unsubscribeDoc()
      unsubscribeNotif()
      if (projectId) {
        RealtimeSync.leaveProjectRoom(projectId)
      }
    }
  }, [userId, projectId, onUpdate])
  
  // Add notification to state
  const addNotification = useCallback((notification: any) => {
    setNotifications(prev => [...prev, notification])
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(notification.id)
    }, 5000)
  }, [])
  
  // Remove notification
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])
  
  // Clear all notifications
  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])
  
  return {
    lastUpdate,
    isConnected,
    notifications,
    removeNotification,
    clearNotifications
  }
}

// Hook for customer document list with auto-refresh
export function useCustomerDocuments(userId: string, projectId?: string) {
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Fetch documents
  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true)
      
      const params = new URLSearchParams()
      if (projectId) {
        params.append('projectId', projectId)
      }
      
      const response = await fetch(`/api/customer/documents?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setDocuments(data.data.documents || [])
      } else {
        throw new Error(data.error || 'Failed to fetch documents')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [projectId])
  
  // Initial fetch
  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])
  
  // Setup realtime sync
  const { lastUpdate, notifications } = useDocumentSync({
    userId,
    projectId,
    onUpdate: (update) => {
      // Refetch documents when an update is received
      if (update.action === 'created' || update.action === 'updated') {
        fetchDocuments()
      } else if (update.action === 'deleted') {
        // Remove deleted document from state
        setDocuments(prev => prev.filter(doc => doc.id !== update.documentId))
      }
    }
  })
  
  return {
    documents,
    loading,
    error,
    refetch: fetchDocuments,
    lastUpdate,
    notifications
  }
}