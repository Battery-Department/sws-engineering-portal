/**
 * Quiz Intelligence Sample Data Generator (Simple SQL Version)
 * Generates 500+ realistic quiz sessions with behavioral micro-interactions
 */

const { PrismaClient } = require('../src/generated/prisma')
const prisma = new PrismaClient()

const TOTAL_SESSIONS = 547
const DAYS_BACK = 30

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

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

async function generateSampleData() {
  console.log('🚀 Starting Quiz Intelligence sample data generation...')
  
  try {
    // Clean existing data
    console.log('🧹 Cleaning existing quiz data...')
    await prisma.$executeRaw`DELETE FROM quiz_conversions`
    await prisma.$executeRaw`DELETE FROM quiz_responses`  
    await prisma.$executeRaw`DELETE FROM quiz_interactions`
    await prisma.$executeRaw`DELETE FROM quiz_ml_features`
    await prisma.$executeRaw`DELETE FROM quiz_user_profiles`
    await prisma.$executeRaw`DELETE FROM quiz_sessions`
    
    console.log(`📊 Generating ${TOTAL_SESSIONS} quiz sessions...`)
    
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
      
      const sourceData = TRAFFIC_SOURCES.find(s => s.name === source)
      const willComplete = Math.random() < 0.785 // 78.5% completion rate
      const willConvert = willComplete && Math.random() < sourceData.conversion
      
      const startedAt = randomDate(DAYS_BACK)
      const baseTime = 142 + (Math.random() * 60 - 30) // ±30 second variation
      const completionTime = willComplete ? baseTime : Math.random() * baseTime * 0.6
      
      const completedAt = willComplete ? 
        new Date(startedAt.getTime() + completionTime * 1000) : null
      
      const sessionId = generateId()
      const visitorId = `visitor-${generateId()}`
      
      // Insert quiz session
      await prisma.$executeRaw`
        INSERT INTO quiz_sessions (
          id, visitor_id, started_at, completed_at, current_question_index,
          utm_source, utm_medium, utm_campaign, device, user_agent,
          ip_address, metadata
        ) VALUES (
          ${sessionId},
          ${visitorId},
          ${startedAt.toISOString()},
          ${completedAt ? completedAt.toISOString() : null},
          ${willComplete ? 3 : Math.floor(Math.random() * 4)},
          ${source},
          ${source.includes('ad') ? 'cpc' : 'organic'},
          ${source.includes('ad') ? `lithi-${source.split('_')[0]}-q4` : null},
          ${device},
          ${device === 'mobile' ? 'Mobile Safari 14.0' : 'Chrome 91.0'},
          ${'192.168.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255)},
          ${JSON.stringify({
            screenResolution: device === 'mobile' ? '375x667' : '1920x1080',
            timezone: 'America/New_York',
            language: 'en-US'
          })}
        )
      `
      
      // Create user profile
      const profileType = ['contractor_solo', 'contractor_team', 'fleet_manager', 'maintenance_tech', 'purchasing_agent'][Math.floor(Math.random() * 5)]
      await prisma.$executeRaw`
        INSERT INTO quiz_user_profiles (
          id, session_id, profile_type, traits, segment, score, created_at
        ) VALUES (
          ${generateId()},
          ${sessionId},
          ${profileType},
          ${JSON.stringify({
            experienceLevel: Math.random() < 0.6 ? 'experienced' : 'beginner',
            pricesensitivity: Math.random() < 0.4 ? 'high' : 'medium',
            techSavvy: device === 'desktop' ? 'high' : 'medium',
            urgency: Math.random() < 0.3 ? 'high' : 'medium'
          })},
          ${profileType.includes('fleet') ? 'b2b' : 'b2c'},
          ${Math.random() * 100},
          ${startedAt.toISOString()}
        )
      `
      
      // Generate responses for completed sessions
      if (willComplete) {
        const questions = ['team-size', 'daily-runtime', 'primary-tools', 'budget-range']
        for (let qIndex = 0; qIndex < questions.length; qIndex++) {
          const questionId = questions[qIndex]
          const selectedOption = Math.floor(Math.random() * 4) // 0-3
          const timeSpent = 15000 + Math.random() * 10000 // 15-25 seconds
          
          await prisma.$executeRaw`
            INSERT INTO quiz_responses (
              id, session_id, question_id, question_index, selected_option, 
              time_spent, created_at
            ) VALUES (
              ${generateId()},
              ${sessionId},
              ${questionId},
              ${qIndex},
              ${selectedOption},
              ${Math.floor(timeSpent)},
              ${new Date(startedAt.getTime() + (qIndex + 1) * (completionTime / 4) * 1000).toISOString()}
            )
          `
        }
      }
      
      // Generate behavioral interactions (simplified)
      const interactionCount = 30 + Math.floor(Math.random() * 40)
      for (let j = 0; j < interactionCount; j++) {
        const interactionTypes = ['click', 'scroll', 'mouse_move', 'focus', 'blur']
        if (Math.random() < 0.15) interactionTypes.push('hesitation')
        if (Math.random() < 0.08) interactionTypes.push('back_button')
        
        const interactionType = interactionTypes[Math.floor(Math.random() * interactionTypes.length)]
        const timestamp = new Date(startedAt.getTime() + Math.random() * (completedAt ? completionTime * 1000 : startedAt.getTime()))
        
        await prisma.$executeRaw`
          INSERT INTO quiz_interactions (
            id, session_id, interaction_type, data, timestamp
          ) VALUES (
            ${generateId()},
            ${sessionId},
            ${interactionType},
            ${JSON.stringify({
              element: 'button',
              x: Math.floor(Math.random() * 400),
              y: Math.floor(Math.random() * 600)
            })},
            ${timestamp.toISOString()}
          )
        `
      }
      
      // Generate ML features
      const hesitationCount = Math.floor(Math.random() * 8)
      const clickCount = Math.floor(Math.random() * 25) + 10
      const engagementScore = Math.min(1, (clickCount * 0.3 + Math.max(0, 10 - hesitationCount) * 0.1))
      const dropoutRisk = Math.min(1, (hesitationCount * 0.1 + Math.random() * 0.3))
      
      await prisma.$executeRaw`
        INSERT INTO quiz_ml_features (
          id, session_id, engagement_score, dropout_risk, hesitation_count,
          click_velocity, scroll_behavior, time_distribution, device_proficiency,
          completion_prediction
        ) VALUES (
          ${generateId()},
          ${sessionId},
          ${engagementScore},
          ${dropoutRisk},
          ${hesitationCount},
          ${clickCount / 60},
          ${Math.random() * 0.8 + 0.2},
          ${Math.random() * 0.9 + 0.1},
          ${profileType === 'contractor_solo' ? 0.8 : 0.65},
          ${willComplete ? 1 : 0}
        )
      `
      
      // Generate conversion if applicable
      if (willConvert) {
        const conversionValue = [250, 500, 750, 1250, 2500][Math.floor(Math.random() * 5)]
        
        await prisma.$executeRaw`
          INSERT INTO quiz_conversions (
            id, session_id, converted_at, conversion_type, value,
            product_category, attribution, metadata
          ) VALUES (
            ${generateId()},
            ${sessionId},
            ${new Date(completedAt.getTime() + Math.random() * 3600000).toISOString()},
            ${'quote_request'},
            ${conversionValue},
            ${'flexvolt_batteries'},
            ${JSON.stringify({ source, medium: source.includes('ad') ? 'cpc' : 'organic' })},
            ${JSON.stringify({ quizScore: Math.random() * 100, recommendedProducts: ['6ah-flexvolt', '9ah-flexvolt'] })}
          )
        `
      }
      
      if (i % 50 === 0) {
        console.log(`   ✅ Generated ${i + 1}/${TOTAL_SESSIONS} sessions`)
      }
    }
    
    // Generate summary statistics
    const totalSessions = await prisma.$queryRaw`SELECT COUNT(*) as count FROM quiz_sessions`
    const completedSessions = await prisma.$queryRaw`SELECT COUNT(*) as count FROM quiz_sessions WHERE completed_at IS NOT NULL`
    const conversions = await prisma.$queryRaw`SELECT COUNT(*) as count FROM quiz_conversions`
    
    console.log('\n📈 Sample Data Generation Complete!')
    console.log('='.repeat(50))
    console.log(`📊 Total Sessions: ${totalSessions[0].count}`)
    console.log(`✅ Completed: ${completedSessions[0].count} (${(completedSessions[0].count/totalSessions[0].count*100).toFixed(1)}%)`)
    console.log(`💰 Conversions: ${conversions[0].count} (${(conversions[0].count/totalSessions[0].count*100).toFixed(1)}%)`)
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