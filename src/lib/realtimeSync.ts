import { io, Socket } from 'socket.io-client'

interface DocumentUpdate {
  documentId: string
  projectId: string
  action: 'created' | 'updated' | 'deleted'
  documentType: string
  timestamp: Date
}

interface ProjectUpdate {
  projectId: string
  action: 'stage_updated' | 'status_changed' | 'document_added'
  data: any
  timestamp: Date
}

export class RealtimeSync {
  private static socket: Socket | null = null
  private static listeners: Map<string, Set<Function>> = new Map()
  
  // Initialize WebSocket connection
  static initialize(userId: string, userType: 'customer' | 'engineer' = 'customer') {
    if (this.socket?.connected) {
      return
    }
    
    this.socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || '', {
      auth: {
        userId,
        userType
      },
      transports: ['websocket', 'polling']
    })
    
    this.setupEventHandlers()
  }
  
  // Setup event handlers
  private static setupEventHandlers() {
    if (!this.socket) return
    
    this.socket.on('connect', () => {
      console.log('Connected to realtime sync')
    })
    
    this.socket.on('disconnect', () => {
      console.log('Disconnected from realtime sync')
    })
    
    this.socket.on('document:update', (data: DocumentUpdate) => {
      this.notifyListeners('document:update', data)
    })
    
    this.socket.on('project:update', (data: ProjectUpdate) => {
      this.notifyListeners('project:update', data)
    })
    
    this.socket.on('notification', (data: any) => {
      this.notifyListeners('notification', data)
    })
  }
  
  // Subscribe to events
  static subscribe(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)?.add(callback)
    
    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(callback)
    }
  }
  
  // Notify all listeners for an event
  private static notifyListeners(event: string, data: any) {
    const listeners = this.listeners.get(event)
    if (listeners) {
      listeners.forEach(callback => callback(data))
    }
  }
  
  // Join project room for updates
  static joinProjectRoom(projectId: string) {
    this.socket?.emit('join:project', projectId)
  }
  
  // Leave project room
  static leaveProjectRoom(projectId: string) {
    this.socket?.emit('leave:project', projectId)
  }
  
  // Emit document created event
  static emitDocumentCreated(documentData: {
    documentId: string
    projectId: string
    documentType: string
    clientId?: string
  }) {
    this.socket?.emit('document:created', {
      ...documentData,
      timestamp: new Date()
    })
  }
  
  // Emit project update event
  static emitProjectUpdate(updateData: {
    projectId: string
    action: string
    data: any
  }) {
    this.socket?.emit('project:updated', {
      ...updateData,
      timestamp: new Date()
    })
  }
  
  // Disconnect socket
  static disconnect() {
    this.socket?.disconnect()
    this.socket = null
    this.listeners.clear()
  }
}

// React hook for real-time sync
export function useRealtimeSync(userId: string, userType: 'customer' | 'engineer' = 'customer') {
  // This would be implemented in a React component
  // Example usage:
  /*
  useEffect(() => {
    RealtimeSync.initialize(userId, userType)
    
    const unsubscribeDoc = RealtimeSync.subscribe('document:update', (data) => {
      // Handle document update
      refetchDocuments()
    })
    
    const unsubscribeProject = RealtimeSync.subscribe('project:update', (data) => {
      // Handle project update
      refetchProject()
    })
    
    return () => {
      unsubscribeDoc()
      unsubscribeProject()
    }
  }, [userId])
  */
}