/**
 * Quiz Intelligence Sample Data Generator
 * Generates 500+ realistic quiz sessions with behavioral micro-interactions
 * for testing and demonstration of the Quiz Intelligence Dashboard
 */

const { PrismaClient } = require('../src/generated/prisma')
const prisma = new PrismaClient()

// Configuration
const TOTAL_SESSIONS = 547
const DAYS_BACK = 30
const COMPLETION_RATE = 0.785 // 78.5%
const CONVERSION_RATE = 0.128 // 12.8%

// Sample data pools
const TRAFFIC_SOURCES = [
  { name: 'facebook_ad', weight: 45, conversion: 0.152 },
  { name: 'google_ad', weight: 32, conversion: 0.114 },
  { name: 'organic', weight: 18, conversion: 0.089 },
  { name: 'direct', weight: 5, conversion: 0.187 }
]

const DEVICE_TYPES = [
  { name: 'mobile', weight: 65 },
  { name: 'desktop', weight: 30 },
  { name: 'tablet', weight: 5 }
]

const USER_PROFILES = [
  { type: 'contractor_solo', weight: 35, avgTime: 95, dropoutRate: 0.18 },
  { type: 'contractor_team', weight: 25, avgTime: 142, dropoutRate: 0.22 },
  { type: 'fleet_manager', weight: 20, avgTime: 186, dropoutRate: 0.15 },
  { type: 'maintenance_tech', weight: 15, avgTime: 124, dropoutRate: 0.28 },
  { type: 'purchasing_agent', weight: 5, avgTime: 203, dropoutRate: 0.12 }
]

const QUIZ_QUESTIONS = [
  {
    id: 'team-size',
    text: 'How many people are on your crew?',
    options: ['Just me', '2-5 people', '6-15 people', '16+ people'],
    avgTimeSpent: 12000,
    hesitationRate: 0.15
  },
  {
    id: 'daily-runtime',
    text: 'How many hours per day do you typically use battery tools?',
    options: ['1-3 hours', '4-6 hours', '7-9 hours', '10+ hours'],
    avgTimeSpent: 18000,
    hesitationRate: 0.22
  },
  {
    id: 'primary-tools',
    text: 'What are your primary battery-powered tools?',
    options: ['Drills/Drivers', 'Saws/Grinders', 'Lighting/Fans', 'Multi-tool kit'],
    avgTimeSpent: 24000,
    hesitationRate: 0.35
  },
  {
    id: 'budget-range',
    text: 'What\'s your budget for battery upgrades?',
    options: ['Under $500', '$500-$1500', '$1500-$3000', '$3000+'],
    avgTimeSpent: 16000,
    hesitationRate: 0.28
  }
]

const INTERVENTION_TYPES = [
  'exit_intent',
  'hesitation_help',
  'encouragement',
  'simplification',
  'tooltip_assist'
]

// Utility functions
function randomChoice(items, weights) {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
  let random = Math.random() * totalWeight
  
  for (let i = 0; i < items.length; i++) {
    random -= weights[i]
    if (random <= 0) return items[i]
  }
  return items[items.length - 1]
}

function randomDate(daysBack) {
  const now = new Date()
  const pastDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000))
  return new Date(pastDate.getTime() + Math.random() * (now.getTime() - pastDate.getTime()))
}

function generateInteractionEvents(sessionId, userProfile, deviceType, completed) {
  const events = []
  const baseEventCount = deviceType === 'mobile' ? 45 : 68
  const eventCount = baseEventCount + Math.floor(Math.random() * 40) - 20
  
  // Generate realistic behavioral patterns
  for (let i = 0; i < eventCount; i++) {
    const eventTypes = [
      'click', 'scroll', 'focus', 'blur', 'mouse_move', 
      'key_press', 'page_visibility', 'form_interaction'
    ]
    
    if (Math.random() < 0.15) eventTypes.push('hesitation')
    if (Math.random() < 0.08) eventTypes.push('back_button')
    if (Math.random() < 0.05) eventTypes.push('focus_loss')
    
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    const timestamp = new Date(Date.now() - Math.random() * 86400000) // Last 24 hours
    
    events.push({
      sessionId,
      interactionType: eventType,
      data: generateEventData(eventType, deviceType),
      timestamp
    })
  }
  
  // Add intervention events for some sessions
  if (Math.random() < 0.3) {
    const interventionType = INTERVENTION_TYPES[Math.floor(Math.random() * INTERVENTION_TYPES.length)]
    events.push({
      sessionId,
      interactionType: 'intervention_triggered',
      data: { 
        interventionType,
        successful: Math.random() < 0.65,
        triggerReason: Math.random() < 0.5 ? 'high_dropout_risk' : 'hesitation_detected'
      },
      timestamp: new Date(Date.now() - Math.random() * 86400000)
    })
  }
  
  return events
}

function generateEventData(eventType, deviceType) {
  const baseData = {
    userAgent: deviceType === 'mobile' ? 'Mobile Safari' : 'Chrome Desktop',
    viewport: deviceType === 'mobile' ? { width: 375, height: 667 } : { width: 1920, height: 1080 }
  }
  
  switch (eventType) {
    case 'click':
      return {
        ...baseData,
        x: Math.floor(Math.random() * (deviceType === 'mobile' ? 375 : 1920)),
        y: Math.floor(Math.random() * (deviceType === 'mobile' ? 667 : 1080)),
        element: ['button', 'option', 'next', 'back'][Math.floor(Math.random() * 4)]
      }
    
    case 'scroll':
      return {
        ...baseData,
        scrollY: Math.floor(Math.random() * 500),
        direction: Math.random() < 0.7 ? 'down' : 'up'
      }
    
    case 'mouse_move':
      return {
        ...baseData,
        x: Math.floor(Math.random() * (deviceType === 'mobile' ? 375 : 1920)),
        y: Math.floor(Math.random() * (deviceType === 'mobile' ? 667 : 1080)),
        speed: Math.random() * 100
      }
    
    case 'hesitation':
      return {
        ...baseData,
        timeOnQuestion: Math.floor(Math.random() * 45000) + 15000, // 15-60 seconds
        mouseMovements: Math.floor(Math.random() * 50) + 10,
        clicksWithoutProgress: Math.floor(Math.random() * 5)
      }
    
    case 'focus_loss':
      return {
        ...baseData,
        duration: Math.floor(Math.random() * 30000) + 2000, // 2-32 seconds
        reason: ['tab_switch', 'window_blur', 'phone_call'][Math.floor(Math.random() * 3)]
      }
    
    default:
      return baseData
  }
}

function generateMLFeatures(sessionId, userProfile, behaviorEvents) {
  const hesitationEvents = behaviorEvents.filter(e => e.interactionType === 'hesitation').length
  const clickEvents = behaviorEvents.filter(e => e.interactionType === 'click').length
  const focusLossEvents = behaviorEvents.filter(e => e.interactionType === 'focus_loss').length
  
  const engagementScore = Math.min(1, (clickEvents * 0.3 + Math.max(0, 10 - hesitationEvents) * 0.1))
  const dropoutRisk = Math.min(1, (hesitationEvents * 0.1 + focusLossEvents * 0.2))
  
  return {
    sessionId,
    engagementScore,
    dropoutRisk,
    hesitationCount: hesitationEvents,
    clickVelocity: clickEvents / 60, // clicks per minute estimate
    scrollBehavior: Math.random() * 0.8 + 0.2, // 0.2-1.0 normalized
    timeDistribution: Math.random() * 0.9 + 0.1, // 0.1-1.0 normalized
    deviceProficiency: userProfile.type === 'contractor_solo' ? 0.8 : 0.65,
    completionPrediction: Math.random() < COMPLETION_RATE ? 1 : 0
  }
}

async function generateSampleData() {
  console.log('🚀 Starting Quiz Intelligence sample data generation...')
  
  try {
    // Clean existing data
    console.log('🧹 Cleaning existing quiz data...')
    
    // Try to delete from tables if they exist
    try {
      await prisma.$executeRaw`DELETE FROM quiz_ml_features`
      await prisma.$executeRaw`DELETE FROM quiz_interactions`
      await prisma.$executeRaw`DELETE FROM quiz_conversions`
      await prisma.$executeRaw`DELETE FROM quiz_responses`
      await prisma.$executeRaw`DELETE FROM quiz_sessions`
      await prisma.$executeRaw`DELETE FROM quiz_user_profiles`
      console.log('✅ Existing data cleaned')
    } catch (error) {
      console.log('⚠️ Some tables may not exist yet, continuing...')
    }
    
    // Generate quiz sessions
    console.log(`📊 Generating ${TOTAL_SESSIONS} quiz sessions...`)
    const sessions = []
    
    for (let i = 0; i < TOTAL_SESSIONS; i++) {
      // Determine session characteristics
      const source = randomChoice(
        TRAFFIC_SOURCES.map(s => s.name),
        TRAFFIC_SOURCES.map(s => s.weight)
      )
      
      const device = randomChoice(
        DEVICE_TYPES.map(d => d.name),
        DEVICE_TYPES.map(d => d.weight)
      )
      
      const userProfile = randomChoice(
        USER_PROFILES,
        USER_PROFILES.map(p => p.weight)
      )
      
      const sourceData = TRAFFIC_SOURCES.find(s => s.name === source)
      const willComplete = Math.random() < COMPLETION_RATE
      const willConvert = willComplete && Math.random() < sourceData.conversion
      
      const startedAt = randomDate(DAYS_BACK)
      const baseTime = userProfile.avgTime + (Math.random() * 60 - 30) // ±30 second variation
      const completionTime = willComplete ? baseTime : Math.random() * baseTime * 0.6
      
      const completedAt = willComplete ? 
        new Date(startedAt.getTime() + completionTime * 1000) : null
      
      // Create session
      const session = await prisma.quizSession.create({
        data: {
          visitorId: `visitor-${Date.now()}-${i}`,
          startedAt,
          completedAt,
          currentQuestionIndex: willComplete ? 3 : Math.floor(Math.random() * 4),
          responses: willComplete ? {} : null,
          utmSource: source,
          utmMedium: source.includes('ad') ? 'cpc' : 'organic',
          utmCampaign: source.includes('ad') ? `lithi-${source.split('_')[0]}-q4` : null,
          device,
          userAgent: device === 'mobile' ? 'Mobile Safari 14.0' : 'Chrome 91.0',
          ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          metadata: {
            screenResolution: device === 'mobile' ? '375x667' : '1920x1080',
            timezone: 'America/New_York',
            language: 'en-US'
          }
        }
      })
      
      sessions.push({ ...session, userProfile, willConvert })
      
      // Create user profile
      await prisma.quizUserProfile.create({
        data: {
          sessionId: session.id,
          profileType: userProfile.type,
          traits: {
            experienceLevel: Math.random() < 0.6 ? 'experienced' : 'beginner',
            pricesensitivity: Math.random() < 0.4 ? 'high' : 'medium',
            techSavvy: device === 'desktop' ? 'high' : 'medium',
            urgency: Math.random() < 0.3 ? 'high' : 'medium'
          },
          segment: userProfile.type.includes('fleet') ? 'b2b' : 'b2c',
          score: Math.random() * 100,
          createdAt: startedAt
        }
      })
      
      // Generate responses for completed sessions
      if (willComplete) {
        for (let qIndex = 0; qIndex < QUIZ_QUESTIONS.length; qIndex++) {
          const question = QUIZ_QUESTIONS[qIndex]
          const selectedOption = Math.floor(Math.random() * question.options.length)
          
          await prisma.quizResponse.create({
            data: {
              sessionId: session.id,
              questionId: question.id,
              questionIndex: qIndex,
              selectedOption,
              timeSpent: question.avgTimeSpent + (Math.random() * 10000 - 5000), // ±5 second variation
              createdAt: new Date(startedAt.getTime() + (qIndex + 1) * (completionTime / 4) * 1000)
            }
          })
        }
      }
      
      // Generate behavioral interactions
      const interactions = generateInteractionEvents(session.id, userProfile, device, willComplete)
      for (const interaction of interactions) {
        await prisma.quizInteraction.create({ data: interaction })
      }
      
      // Generate ML features
      const mlFeatures = generateMLFeatures(session.id, userProfile, interactions)
      await prisma.quizMlFeatures.create({ data: mlFeatures })
      
      // Generate conversion if applicable
      if (willConvert) {
        const conversionValue = [250, 500, 750, 1250, 2500][Math.floor(Math.random() * 5)]
        
        await prisma.quizConversion.create({
          data: {
            sessionId: session.id,
            convertedAt: new Date(completedAt.getTime() + Math.random() * 3600000), // Within 1 hour
            conversionType: 'quote_request',
            value: conversionValue,
            productCategory: 'flexvolt_batteries',
            attribution: {
              source,
              medium: source.includes('ad') ? 'cpc' : 'organic',
              campaign: source.includes('ad') ? `lithi-${source.split('_')[0]}-q4` : null
            },
            metadata: {
              quizScore: Math.random() * 100,
              recommendedProducts: ['6ah-flexvolt', '9ah-flexvolt']
            }
          }
        })
      }
      
      if (i % 50 === 0) {
        console.log(`   ✅ Generated ${i + 1}/${TOTAL_SESSIONS} sessions`)
      }
    }
    
    // Generate summary statistics
    const stats = {
      totalSessions: sessions.length,
      completedSessions: sessions.filter(s => s.completedAt).length,
      conversions: sessions.filter(s => s.willConvert).length,
      deviceBreakdown: {
        mobile: sessions.filter(s => s.device === 'mobile').length,
        desktop: sessions.filter(s => s.device === 'desktop').length,
        tablet: sessions.filter(s => s.device === 'tablet').length
      },
      sourceBreakdown: TRAFFIC_SOURCES.reduce((acc, source) => {
        acc[source.name] = sessions.filter(s => s.utmSource === source.name).length
        return acc
      }, {})
    }
    
    console.log('\n📈 Sample Data Generation Complete!')
    console.log('='.repeat(50))
    console.log(`📊 Total Sessions: ${stats.totalSessions}`)
    console.log(`✅ Completed: ${stats.completedSessions} (${(stats.completedSessions/stats.totalSessions*100).toFixed(1)}%)`)
    console.log(`💰 Conversions: ${stats.conversions} (${(stats.conversions/stats.totalSessions*100).toFixed(1)}%)`)
    console.log('\n📱 Device Breakdown:')
    Object.entries(stats.deviceBreakdown).forEach(([device, count]) => {
      console.log(`   ${device}: ${count} (${(count/stats.totalSessions*100).toFixed(1)}%)`)
    })
    console.log('\n🚦 Traffic Sources:')
    Object.entries(stats.sourceBreakdown).forEach(([source, count]) => {
      console.log(`   ${source}: ${count} (${(count/stats.totalSessions*100).toFixed(1)}%)`)
    })
    console.log('\n🎯 Ready for Quiz Intelligence Dashboard testing!')
    
  } catch (error) {
    console.error('❌ Error generating sample data:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the generator
if (require.main === module) {
  generateSampleData()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

module.exports = { generateSampleData }