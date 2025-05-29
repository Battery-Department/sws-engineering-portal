#!/usr/bin/env node

/**
 * Quiz Data Seeding Script for Production
 * Seeds initial quiz data and sample sessions for demonstration
 */

const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function seedQuizData() {
  console.log('🌱 Seeding Quiz Data...');
  
  try {
    // Check if quiz already exists
    const existingQuiz = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM quizzes WHERE id = 'battery-assessment-quiz'
    `;
    
    if (existingQuiz[0]?.count > 0) {
      console.log('✅ Quiz already exists, skipping seed');
      return;
    }
    
    // Create default quiz if it doesn't exist
    await prisma.$executeRaw`
      INSERT INTO quizzes (id, title, description, type, questions, settings)
      VALUES (
        'battery-assessment-quiz',
        'Battery Fleet Assessment',
        'Find the perfect battery solution for your construction team',
        'lead_generation',
        '[
          {
            "id": "team-size",
            "type": "image-choice",
            "title": "What size team do you typically work with?",
            "options": [
              {"id": "solo", "label": "Solo/1-2 People", "value": "small"},
              {"id": "mid", "label": "Mid-Size Team", "value": "medium"},
              {"id": "large", "label": "Large Crew", "value": "large"}
            ]
          },
          {
            "id": "daily-runtime",
            "type": "single-choice",
            "title": "How many hours do you use power tools per day?",
            "options": [
              {"id": "light", "label": "2-4 hours", "value": "light"},
              {"id": "moderate", "label": "4-6 hours", "value": "moderate"},
              {"id": "heavy", "label": "6-8 hours", "value": "heavy"},
              {"id": "continuous", "label": "8+ hours", "value": "continuous"}
            ]
          },
          {
            "id": "primary-tools",
            "type": "multi-choice",
            "title": "Which tools do you use most frequently?",
            "options": [
              {"id": "circular-saw", "label": "Circular Saw", "value": "circular_saw"},
              {"id": "impact-driver", "label": "Impact Driver", "value": "impact_driver"},
              {"id": "drill", "label": "Drill", "value": "drill"},
              {"id": "grinder", "label": "Grinder", "value": "grinder"}
            ]
          },
          {
            "id": "budget-range",
            "type": "scale",
            "title": "What is your typical monthly budget for batteries?",
            "options": [
              {"id": "budget-1", "label": "$500-$1,000", "value": 500},
              {"id": "budget-2", "label": "$1,000-$2,500", "value": 1000},
              {"id": "budget-3", "label": "$2,500-$5,000", "value": 2500},
              {"id": "budget-4", "label": "$5,000+", "value": 5000}
            ]
          }
        ]',
        '{
          "allowSkip": false,
          "showProgress": true,
          "enableSwipeNavigation": true,
          "analyticsEnabled": true
        }'
      )
    `;
    
    console.log('✅ Quiz created successfully');
    
    // Add sample experiment if it doesn't exist
    const existingExperiment = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM quiz_experiments 
      WHERE experiment_name = 'Question Order Optimization'
    `;
    
    if (existingExperiment[0]?.count === 0) {
      await prisma.$executeRaw`
        INSERT INTO quiz_experiments (
          experiment_name, 
          quiz_id, 
          variant_a, 
          variant_b, 
          status
        ) VALUES (
          'Question Order Optimization',
          'battery-assessment-quiz',
          '{"questionOrder": ["team-size", "daily-runtime", "primary-tools", "budget-range"]}',
          '{"questionOrder": ["budget-range", "team-size", "primary-tools", "daily-runtime"]}',
          'running'
        )
      `;
      console.log('✅ Sample experiment created');
    }
    
    console.log('🎉 Quiz data seeding complete!');
    
  } catch (error) {
    console.error('❌ Error seeding quiz data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  seedQuizData()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { seedQuizData };