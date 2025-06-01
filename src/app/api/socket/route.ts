import { NextRequest, NextResponse } from 'next/server'
import { Server as SocketIOServer } from 'socket.io'
import { createServer } from 'http'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// WebSocket server instance
let io: SocketIOServer | null = null

export async function GET(request: NextRequest) {
  // WebSocket upgrade is handled by the server
  // This endpoint provides connection info
  return NextResponse.json({
    status: 'WebSocket server ready',
    url: process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001'
  })
}

// Initialize WebSocket server (called from server initialization)
export function initializeWebSocketServer(server: any) {
  if (io) return io
  
  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NEXTAUTH_URL || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  })
  
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)
    
    const userId = socket.handshake.auth.userId
    const userType = socket.handshake.auth.userType
    
    // Join user-specific room
    if (userId) {
      socket.join(`user:${userId}`)
    }
    
    // Handle joining project rooms
    socket.on('join:project', async (projectId: string) => {
      try {
        // Verify user has access to project
        const hasAccess = await verifyProjectAccess(userId, projectId, userType)
        if (hasAccess) {
          socket.join(`project:${projectId}`)
          socket.emit('joined:project', { projectId })
        }
      } catch (error) {
        socket.emit('error', { message: 'Failed to join project room' })
      }
    })
    
    // Handle leaving project rooms
    socket.on('leave:project', (projectId: string) => {
      socket.leave(`project:${projectId}`)
    })
    
    // Handle document created events
    socket.on('document:created', async (data) => {
      try {
        // Notify all users in the project room
        io?.to(`project:${data.projectId}`).emit('document:update', {
          ...data,
          action: 'created'
        })
        
        // Notify specific client if provided
        if (data.clientId) {
          io?.to(`user:${data.clientId}`).emit('notification', {
            type: 'document',
            title: 'New Document Available',
            message: `A new ${data.documentType} has been generated for your project.`,
            timestamp: new Date()
          })
        }
      } catch (error) {
        console.error('Error broadcasting document creation:', error)
      }
    })
    
    // Handle project update events
    socket.on('project:updated', async (data) => {
      try {
        // Notify all users in the project room
        io?.to(`project:${data.projectId}`).emit('project:update', data)
        
        // Get project client for notifications
        const project = await prisma.project.findUnique({
          where: { id: data.projectId },
          include: {
            client: {
              include: {
                user: true
              }
            }
          }
        })
        
        if (project?.client?.user?.id) {
          let notificationMessage = ''
          switch (data.action) {
            case 'stage_complete':
              notificationMessage = `Stage "${data.data.stageName}" has been completed.`
              break
            case 'status_changed':
              notificationMessage = `Project status updated to ${data.data.newStatus}.`
              break
            case 'document_added':
              notificationMessage = `New document added to your project.`
              break
            default:
              notificationMessage = `Your project has been updated.`
          }
          
          io?.to(`user:${project.client.user.id}`).emit('notification', {
            type: 'project',
            title: 'Project Update',
            message: notificationMessage,
            projectRef: project.projectRef,
            timestamp: new Date()
          })
        }
      } catch (error) {
        console.error('Error broadcasting project update:', error)
      }
    })
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
    })
  })
  
  return io
}

// Verify user has access to project
async function verifyProjectAccess(
  userId: string, 
  projectId: string, 
  userType: string
): Promise<boolean> {
  if (!userId || !projectId) return false
  
  if (userType === 'engineer') {
    // Engineers have access to all projects
    return true
  }
  
  // Check if customer has access to project
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      client: {
        user: {
          id: userId
        }
      }
    }
  })
  
  return !!project
}

// Broadcast document update to relevant users
export async function broadcastDocumentUpdate(
  projectId: string,
  documentData: any,
  action: 'created' | 'updated' | 'deleted'
) {
  if (!io) return
  
  io.to(`project:${projectId}`).emit('document:update', {
    ...documentData,
    action,
    timestamp: new Date()
  })
}

// Broadcast project update to relevant users
export async function broadcastProjectUpdate(
  projectId: string,
  action: string,
  data: any
) {
  if (!io) return
  
  io.to(`project:${projectId}`).emit('project:update', {
    projectId,
    action,
    data,
    timestamp: new Date()
  })
}