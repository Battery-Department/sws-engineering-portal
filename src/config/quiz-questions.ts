// Dynamic Quiz Questions Configuration
import { QuizQuestion } from '@/types/quiz-v2';

// Question 1: Client Type Selection
export const CLIENT_TYPE_QUESTION: QuizQuestion = {
  id: 'client-type',
  type: 'visual-cards',
  question: "What type of project are you looking for?",
  subtitle: "This helps us understand your engineering requirements",
  options: [
    {
      id: 'heritage-railway',
      value: 'heritage-railway',
      title: 'Heritage Railway',
      label: '🚂 Heritage Railway',
      description: 'Steam locomotive restoration • 7¼" gauge specialists',
      highlights: ['Expert Restoration', 'Authentic Materials', 'Period Accuracy'],
      visualCard: {
        background: 'linear-gradient(135deg, #8B4513 0%, #654321 100%)',
        hoverEffect: 'translateY(-4px) shadow-xl',
        selectionAnimation: 'pulse-border 0.6s ease-out'
      }
    },
    {
      id: 'industrial',
      value: 'industrial',
      title: 'Industrial Engineering',
      label: '🏭 Industrial Engineering',
      description: 'Plant & machinery repair • Custom fabrication',
      highlights: ['CAD Design', 'FEA Analysis', 'Custom Solutions'],
      visualCard: {
        background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
        hoverEffect: 'translateY(-4px) shadow-lg',
        selectionAnimation: 'pulse-border 0.6s ease-out'
      }
    }
  ]
};

// Heritage Railway Path Questions
export const HERITAGE_RAILWAY_QUESTIONS: QuizQuestion[] = [
  {
    id: 'locomotive-type',
    type: 'single-choice',
    question: "What type of locomotive restoration?",
    subtitle: "We specialize in authentic period restorations",
    options: [
      { id: 'steam-7quarter', value: 'steam-7quarter', label: '🚂 7¼" Gauge Steam', icon: '🚂' },
      { id: 'steam-other', value: 'steam-other', label: '🚃 Other Gauge Steam', icon: '🚃' },
      { id: 'diesel', value: 'diesel', label: '🚄 Diesel Locomotive', icon: '🚄' },
      { id: 'electric', value: 'electric', label: '⚡ Electric Locomotive', icon: '⚡' },
      { id: 'rolling-stock', value: 'rolling-stock', label: '🚋 Rolling Stock', icon: '🚋' },
      { id: 'stationary', value: 'stationary', label: '🏭 Stationary Engine', icon: '🏭' },
      { id: 'track-work', value: 'track-work', label: '🛤️ Track & Infrastructure', icon: '🛤️' },
      { id: 'other', value: 'other', label: '🔧 Other Heritage Project', icon: '🔧' }
    ]
  },
  {
    id: 'restoration-scope',
    type: 'single-choice',
    question: "What's the scope of restoration needed?",
    subtitle: "This helps us estimate timeline and resources",
    options: [
      { id: 'complete', value: 'complete', label: 'Complete restoration', icon: '🔄' },
      { id: 'major', value: 'major', label: 'Major overhaul', icon: '🔧' },
      { id: 'boiler', value: 'boiler', label: 'Boiler work', icon: '🔥' },
      { id: 'mechanical', value: 'mechanical', label: 'Mechanical repairs', icon: '⚙️' },
      { id: 'cosmetic', value: 'cosmetic', label: 'Cosmetic restoration', icon: '🎨' },
      { id: 'maintenance', value: 'maintenance', label: 'Routine maintenance', icon: '🛠️' }
    ]
  },
  {
    id: 'heritage-priorities',
    type: 'ranking',
    question: "Rank your restoration priorities",
    subtitle: "Drag to reorder - we'll focus on your top concerns",
    options: [
      { 
        id: 'authenticity',
        value: 'authenticity',
        label: 'Period authenticity',
        icon: '📜'
      },
      {
        id: 'safety',
        value: 'safety',
        label: 'Modern safety standards',
        icon: '🛡️'
      },
      {
        id: 'performance',
        value: 'performance',
        label: 'Operational performance',
        icon: '⚡'
      },
      {
        id: 'longevity',
        value: 'longevity',
        label: 'Long-term durability',
        icon: '🏗️'
      },
      {
        id: 'cost',
        value: 'cost',
        label: 'Cost effectiveness',
        icon: '💰'
      }
    ]
  },
  {
    id: 'project-complexity',
    type: 'single-choice',
    question: "Project complexity level?",
    subtitle: "This determines the engineering resources required",
    options: [
      {
        id: 'simple',
        value: 'simple',
        label: 'Simple repairs',
        description: 'Basic maintenance and fixes'
      },
      {
        id: 'moderate',
        value: 'moderate',
        label: 'Moderate restoration',
        description: 'Some fabrication required'
      },
      {
        id: 'complex',
        value: 'complex',
        label: 'Complex restoration',
        description: 'Extensive engineering work',
        highlights: ['Most common']
      },
      {
        id: 'extreme',
        value: 'extreme',
        label: 'Complete rebuild',
        description: 'From-scratch reconstruction'
      }
    ]
  },
  {
    id: 'timeline',
    type: 'single-choice',
    question: "When do you need the project completed?",
    subtitle: "We'll schedule resources based on your timeline",
    options: [
      { id: 'urgent', value: 'urgent', label: '🚀 Urgent', description: 'Emergency repair' },
      { id: 'season', value: 'season', label: '🌞 This season', description: 'Ready for operating season' },
      { id: 'year', value: 'year', label: '📅 This year', description: 'Standard timeline' },
      { id: 'flexible', value: 'flexible', label: '📊 Flexible', description: 'Quality over speed' },
      { id: 'planning', value: 'planning', label: '📋 Just planning', description: 'Research phase' }
    ]
  }
];

// Industrial Engineering Path Questions
export const INDUSTRIAL_QUESTIONS: QuizQuestion[] = [
  {
    id: 'industrial-type',
    type: 'multi-choice',
    question: "What type of industrial work do you need?",
    subtitle: "Select all that apply",
    options: [
      {
        id: 'cad-design',
        value: 'cad-design',
        label: '📐 3D CAD Design',
        description: 'SolidWorks & AutoCAD'
      },
      {
        id: 'plant-repair',
        value: 'plant-repair',
        label: '🏭 Plant & Machinery Repair',
        description: 'Industrial equipment'
      },
      {
        id: 'custom-fabrication',
        value: 'custom-fabrication',
        label: '🔨 Custom Fabrication',
        description: 'Bespoke manufacturing'
      },
      {
        id: 'fea-analysis',
        value: 'fea-analysis',
        label: '📊 FEA Analysis',
        description: 'Stress & thermal analysis'
      },
      {
        id: 'reverse-engineering',
        value: 'reverse-engineering',
        label: '🔄 Reverse Engineering',
        description: 'Recreate from existing parts'
      }
    ]
  },
  {
    id: 'industry-sector',
    type: 'single-choice',
    question: "What industry sector?",
    subtitle: "This helps us understand your specific requirements",
    options: [
      { id: 'manufacturing', value: 'manufacturing', label: '🏭 Manufacturing', description: 'Production equipment' },
      { id: 'mining', value: 'mining', label: '⛏️ Mining & Quarrying', description: 'Heavy machinery' },
      { id: 'marine', value: 'marine', label: '⚓ Marine Engineering', description: 'Ships & offshore' },
      { id: 'power', value: 'power', label: '⚡ Power Generation', description: 'Energy sector' },
      { id: 'transport', value: 'transport', label: '🚛 Transport & Logistics', description: 'Fleet equipment' },
      { id: 'other', value: 'other', label: '🏢 Other Industry', description: 'Tell us more' }
    ]
  },
  {
    id: 'materials-needed',
    type: 'multi-choice',
    question: "What materials will be involved?",
    subtitle: "We work with all engineering materials",
    options: [
      { id: 'cast-iron', value: 'cast-iron', label: '🔩 Cast Iron', description: 'Traditional strength' },
      { id: 'steel', value: 'steel', label: '🔧 Steel', description: 'Structural applications' },
      { id: 'stainless', value: 'stainless', label: '✨ Stainless Steel', description: 'Corrosion resistant' },
      { id: 'brass', value: 'brass', label: '🟡 Brass', description: 'Precision components' },
      { id: 'bronze', value: 'bronze', label: '🟤 Bronze', description: 'Bearings & bushings' },
      { id: 'aluminum', value: 'aluminum', label: '⚪ Aluminum', description: 'Lightweight solutions' }
    ]
  },
  {
    id: 'priority',
    type: 'single-choice',
    question: "What's most important to you?",
    subtitle: "We'll tailor our approach to your priorities",
    options: [
      {
        id: 'cost',
        value: 'cost',
        label: '💰 Cost Effectiveness',
        description: 'Best value solution',
        color: '#10B981'
      },
      {
        id: 'quality',
        value: 'quality',
        label: '⭐ Premium Quality',
        description: 'Highest standards',
        color: '#006FEE'
      },
      {
        id: 'speed',
        value: 'speed',
        label: '🚀 Fast Delivery',
        description: 'Quick turnaround',
        color: '#F59E0B'
      },
      {
        id: 'innovation',
        value: 'innovation',
        label: '🔬 Innovation',
        description: 'Cutting-edge solutions',
        color: '#8B5CF6'
      }
    ]
  }
];

// Helper function to get questions based on client path
export const getQuestionsForPath = (clientType: 'heritage-railway' | 'industrial'): QuizQuestion[] => {
  return clientType === 'heritage-railway' ? HERITAGE_RAILWAY_QUESTIONS : INDUSTRIAL_QUESTIONS;
};

// Dynamic question routing logic
export const getNextQuestion = (
  currentQuestionId: string,
  clientType: 'heritage-railway' | 'industrial',
  responses: Record<string, any>
): QuizQuestion | null => {
  const questions = getQuestionsForPath(clientType);
  const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
  
  if (currentIndex === -1) {
    // If not found in path questions, check if it's a base question
    if (currentQuestionId === 'client-type') {
      return questions[0]; // Return first question of the path
    }
    return null;
  }
  
  // Special routing logic based on responses
  if (clientType === 'heritage-railway' && currentQuestionId === 'locomotive-type') {
    const locomotiveType = responses['locomotive-type'];
    // Could add locomotive-specific questions here
  }
  
  if (clientType === 'industrial' && currentQuestionId === 'industrial-type') {
    const industrialTypes = responses['industrial-type'];
    // Could add service-specific questions here
  }
  
  // Return next question in sequence
  return currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null;
};
