import { PrismaClient } from '../generated/prisma';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "file:./prisma/dev.db",
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Connect to the existing SWSE database
export async function getRecentMessages(limit: number = 10) {
  try {
    const messages = await prisma.message.findMany({
      take: limit,
      orderBy: { timestamp: 'desc' },
      include: {
        user: true,
        session: true,
      },
    });
    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function getChatSessions(userId?: string, limit: number = 20) {
  try {
    const sessions = await prisma.chatSession.findMany({
      where: userId ? { userId } : {},
      take: limit,
      orderBy: { updatedAt: 'desc' },
      include: {
        user: true,
        messages: {
          take: 1,
          orderBy: { timestamp: 'desc' },
        },
        tags: true,
      },
    });
    return sessions;
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return [];
  }
}

export async function getUserStats() {
  try {
    const [userCount, sessionCount, messageCount] = await Promise.all([
      prisma.user.count(),
      prisma.chatSession.count(),
      prisma.message.count(),
    ]);
    
    return {
      totalUsers: userCount,
      totalSessions: sessionCount,
      totalMessages: messageCount,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalUsers: 0,
      totalSessions: 0,
      totalMessages: 0,
    };
  }
}