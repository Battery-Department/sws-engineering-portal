'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  AlertCircle,
  Train,
  Cog,
  Factory,
  Wrench,
  MapPin,
  Clock,
  PoundSterling,
  Calendar,
  Layers,
  Settings,
  Shield
} from 'lucide-react'

// SWSE Engineering Requirements Quiz
interface QuizQuestion {
  id: string
  type: 'single-choice' | 'multi-choice' | 'scale' | 'image-choice'
  title: string
  subtitle?: string
  options: QuizOption[]
  required: boolean
  category: string
}

interface QuizOption {
  id: string
  label: string
  value: string | number
  icon?: React.ReactNode
  image?: string
  description?: string
}

interface QuizSession {
  id: string
  currentStep: number
  responses: Record<string, any>
  startTime: Date
  lastActivity: Date
}

// SWSE Engineering Requirements Assessment Questions
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'project-type',
    type: 'image-choice',
    title: 'What type of engineering project do you need help with?',
    subtitle: 'This helps us match you with the right specialist team',
    category: 'project-assessment',
    required: true,
    options: [
      {
        id: 'steam-locomotive',
        label: 'Steam Locomotive Restoration',
        value: 'steam-restoration',
        icon: <Train size={24} />,
        description: 'Heritage railway locomotive restoration and maintenance'
      },
      {
        id: 'cad-design',
        label: 'CAD Design & Engineering',
        value: 'cad-design',
        icon: <Cog size={24} />,
        description: '3D modeling, technical drawings, and design services'
      },
      {
        id: 'plant-repair',
        label: 'Plant & Machinery Repair',
        value: 'plant-repair',
        icon: <Factory size={24} />,
        description: 'Industrial equipment repair and maintenance'
      },
      {
        id: 'bespoke-fabrication',
        label: 'Bespoke Engineering',
        value: 'bespoke-fabrication',
        icon: <Wrench size={24} />,
        description: 'Custom fabrication and engineering solutions'
      }
    ]
  },
  {
    id: 'project-urgency',
    type: 'single-choice',
    title: 'How urgent is your engineering project?',
    subtitle: 'This helps us prioritize resources and provide accurate timelines',
    category: 'timeline-assessment',
    required: true,
    options: [
      { id: 'emergency', label: 'Emergency (24-48 hours)', value: 'emergency', description: 'Breakdown or critical failure requiring immediate attention' },
      { id: 'urgent', label: 'Urgent (1-2 weeks)', value: 'urgent', description: 'Important project with tight deadline' },
      { id: 'standard', label: 'Standard (2-8 weeks)', value: 'standard', description: 'Normal project timeline with flexibility' },
      { id: 'planned', label: 'Planned (2+ months)', value: 'planned', description: 'Long-term project with advance planning' }
    ]
  },
  {
    id: 'project-scope',
    type: 'multi-choice',
    title: 'Which services do you require for this project?',
    subtitle: 'Select all that apply - this helps us provide a comprehensive quote',
    category: 'scope-assessment',
    required: true,
    options: [
      { id: 'design', label: 'Design & Engineering', value: 'design', icon: <Cog size={20} /> },
      { id: 'fabrication', label: 'Fabrication & Machining', value: 'fabrication', icon: <Settings size={20} /> },
      { id: 'installation', label: 'Installation & Assembly', value: 'installation', icon: <Wrench size={20} /> },
      { id: 'testing', label: 'Testing & Commissioning', value: 'testing', icon: <Shield size={20} /> },
      { id: 'certification', label: 'Certification & Documentation', value: 'certification', icon: <CheckCircle size={20} /> },
      { id: 'maintenance', label: 'Ongoing Maintenance', value: 'maintenance', icon: <Clock size={20} /> }
    ]
  },
  {
    id: 'budget-range',
    type: 'single-choice',
    title: 'What is your estimated budget range for this project?',
    subtitle: 'This helps us recommend the most cost-effective solution',
    category: 'budget-assessment',
    required: true,
    options: [
      { id: 'under-5k', label: 'Under £5,000', value: 'under-5k', description: 'Small repairs, basic CAD work, consultations' },
      { id: '5k-15k', label: '£5,000 - £15,000', value: '5k-15k', description: 'Medium fabrication, minor restorations' },
      { id: '15k-50k', label: '£15,000 - £50,000', value: '15k-50k', description: 'Major restoration work, complex projects' },
      { id: 'over-50k', label: 'Over £50,000', value: 'over-50k', description: 'Complete locomotive restoration, large installations' }
    ]
  },
  {
    id: 'project-location',
    type: 'single-choice',
    title: 'Where is your project located?',
    subtitle: 'This affects our travel costs and logistics planning',
    category: 'logistics-assessment',
    required: true,
    options: [
      { id: 'cornwall', label: 'Cornwall', value: 'cornwall', description: 'Our home base - no travel charges' },
      { id: 'south-west', label: 'South West England', value: 'south-west', description: 'Devon, Somerset, Dorset - minimal travel costs' },
      { id: 'uk-mainland', label: 'UK Mainland', value: 'uk-mainland', description: 'England, Wales, Scotland - standard travel rates' },
      { id: 'offshore', label: 'Offshore/International', value: 'offshore', description: 'Islands, Ireland, International - special arrangements' }
    ]
  },
  {
    id: 'experience-level',
    type: 'single-choice',
    title: 'How familiar are you with engineering projects like this?',
    subtitle: 'This helps us tailor our communication and support level',
    category: 'support-assessment',
    required: true,
    options: [
      { id: 'first-time', label: 'First Time', value: 'beginner', description: 'Never done a project like this before' },
      { id: 'some-experience', label: 'Some Experience', value: 'intermediate', description: 'Done similar work but need guidance' },
      { id: 'experienced', label: 'Very Experienced', value: 'experienced', description: 'Know exactly what I need' },
      { id: 'professional', label: 'Industry Professional', value: 'professional', description: 'Work in engineering/railways professionally' }
    ]
  },
  {
    id: 'timeline-flexibility',
    type: 'scale',
    title: 'How flexible are you with project timeline?',
    subtitle: 'More flexibility often means better pricing and quality',
    category: 'timeline-assessment',
    required: true,
    options: [
      { id: 'rigid', label: 'Must be completed by exact date', value: 1 },
      { id: 'somewhat-flexible', label: 'Can accept 1-2 week delay', value: 2 },
      { id: 'flexible', label: 'Can wait for best quality/price', value: 3 },
      { id: 'very-flexible', label: 'No rush - take time needed', value: 4 }
    ]
  },
  {
    id: 'communication-preference',
    type: 'single-choice',
    title: 'How would you prefer to receive project updates?',
    subtitle: 'We provide regular updates throughout your project',
    category: 'communication-assessment',
    required: true,
    options: [
      { id: 'email', label: 'Email Updates', value: 'email', description: 'Weekly progress emails with photos' },
      { id: 'phone', label: 'Phone Calls', value: 'phone', description: 'Regular phone updates and discussions' },
      { id: 'site-visits', label: 'Site Visits', value: 'site-visits', description: 'In-person meetings and inspections' },
      { id: 'digital-portal', label: 'Digital Portal', value: 'portal', description: 'Online dashboard with real-time updates' }
    ]
  }
]

export default function SWSEEngineeringQuiz() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => `swse-${Date.now()}`)

  useEffect(() => {
    // Initialize quiz session
    const session: QuizSession = {
      id: sessionId,
      currentStep: 0,
      responses: {},
      startTime: new Date(),
      lastActivity: new Date()
    }
    localStorage.setItem('swseQuizSession', JSON.stringify(session))
  }, [sessionId])

  const currentQuestion = QUIZ_QUESTIONS[currentStep]
  const isLastStep = currentStep === QUIZ_QUESTIONS.length - 1
  const canProceed = responses[currentQuestion?.id] !== undefined

  const handleResponse = (questionId: string, value: any) => {
    const newResponses = { ...responses, [questionId]: value }
    setResponses(newResponses)
    
    // Update session in localStorage
    const session = JSON.parse(localStorage.getItem('swseQuizSession') || '{}')
    session.responses = newResponses
    session.lastActivity = new Date()
    localStorage.setItem('swseQuizSession', JSON.stringify(session))
  }

  const nextStep = () => {
    if (canProceed && currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else if (isLastStep) {
      completeQuiz()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeQuiz = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call to process results
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store completed session
      const session = JSON.parse(localStorage.getItem('swseQuizSession') || '{}')
      session.completedAt = new Date()
      session.responses = responses
      localStorage.setItem('swseQuizSession', JSON.stringify(session))
      
      // Navigate to results
      router.push('/customer/quiz/results')
    } catch (error) {
      console.error('Error completing quiz:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const progressPercentage = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100

  if (!currentQuestion) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#F8FAFC',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
        color: 'white',
        padding: '24px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Train size={20} />
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>
                SWSE Engineering Requirements Assessment
              </h1>
              <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
                Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercentage}%`,
              height: '100%',
              backgroundColor: 'white',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div style={{ flex: 1, padding: '32px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid #E2E8F0',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#1E293B',
              marginBottom: '8px',
              lineHeight: '1.3'
            }}>
              {currentQuestion.title}
            </h2>
            {currentQuestion.subtitle && (
              <p style={{
                fontSize: '16px',
                color: '#64748B',
                marginBottom: '32px',
                lineHeight: '1.5'
              }}>
                {currentQuestion.subtitle}
              </p>
            )}

            {/* Question Options */}
            <div style={{
              display: 'grid',
              gap: '16px'
            }}>
              {currentQuestion.type === 'image-choice' && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px'
                }}>
                  {currentQuestion.options.map(option => (
                    <button
                      key={option.id}
                      onClick={() => handleResponse(currentQuestion.id, option.value)}
                      style={{
                        padding: '24px',
                        borderRadius: '12px',
                        border: responses[currentQuestion.id] === option.value 
                          ? '2px solid #1E3A8A' 
                          : '2px solid #E2E8F0',
                        backgroundColor: responses[currentQuestion.id] === option.value 
                          ? '#EFF6FF' 
                          : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '12px'
                      }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#1E3A8A'
                        }}>
                          {option.icon}
                        </div>
                        <div>
                          <h3 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#1E293B',
                            margin: 0
                          }}>
                            {option.label}
                          </h3>
                        </div>
                      </div>
                      <p style={{
                        fontSize: '14px',
                        color: '#64748B',
                        margin: 0,
                        lineHeight: '1.4'
                      }}>
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'single-choice' && (
                <div style={{ display: 'grid', gap: '12px' }}>
                  {currentQuestion.options.map(option => (
                    <button
                      key={option.id}
                      onClick={() => handleResponse(currentQuestion.id, option.value)}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '8px',
                        border: responses[currentQuestion.id] === option.value 
                          ? '2px solid #1E3A8A' 
                          : '1px solid #E2E8F0',
                        backgroundColor: responses[currentQuestion.id] === option.value 
                          ? '#EFF6FF' 
                          : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: '2px solid',
                        borderColor: responses[currentQuestion.id] === option.value ? '#1E3A8A' : '#D1D5DB',
                        backgroundColor: responses[currentQuestion.id] === option.value ? '#1E3A8A' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {responses[currentQuestion.id] === option.value && (
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'white'
                          }} />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '500',
                          color: '#1E293B',
                          marginBottom: '4px'
                        }}>
                          {option.label}
                        </div>
                        {option.description && (
                          <div style={{
                            fontSize: '14px',
                            color: '#64748B'
                          }}>
                            {option.description}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'multi-choice' && (
                <div style={{ display: 'grid', gap: '12px' }}>
                  {currentQuestion.options.map(option => {
                    const currentResponses = responses[currentQuestion.id] || []
                    const isSelected = currentResponses.includes(option.value)
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          const current = responses[currentQuestion.id] || []
                          const updated = isSelected 
                            ? current.filter((v: any) => v !== option.value)
                            : [...current, option.value]
                          handleResponse(currentQuestion.id, updated)
                        }}
                        style={{
                          padding: '16px 20px',
                          borderRadius: '8px',
                          border: isSelected 
                            ? '2px solid #1E3A8A' 
                            : '1px solid #E2E8F0',
                          backgroundColor: isSelected 
                            ? '#EFF6FF' 
                            : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}
                      >
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          border: '2px solid',
                          borderColor: isSelected ? '#1E3A8A' : '#D1D5DB',
                          backgroundColor: isSelected ? '#1E3A8A' : 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {isSelected && <CheckCircle size={12} color="white" />}
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {option.icon}
                          <span style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#1E293B'
                          }}>
                            {option.label}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}

              {currentQuestion.type === 'scale' && (
                <div style={{ display: 'grid', gap: '12px' }}>
                  {currentQuestion.options.map(option => (
                    <button
                      key={option.id}
                      onClick={() => handleResponse(currentQuestion.id, option.value)}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '8px',
                        border: responses[currentQuestion.id] === option.value 
                          ? '2px solid #1E3A8A' 
                          : '1px solid #E2E8F0',
                        backgroundColor: responses[currentQuestion.id] === option.value 
                          ? '#EFF6FF' 
                          : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#1E3A8A',
                        minWidth: '24px'
                      }}>
                        {option.value}
                      </div>
                      <span style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#1E293B'
                      }}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: currentStep === 0 ? '#F8FAFC' : 'white',
                color: currentStep === 0 ? '#9CA3AF' : '#374151',
                fontSize: '14px',
                fontWeight: '500',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <div style={{
              fontSize: '14px',
              color: '#64748B',
              fontWeight: '500'
            }}>
              {currentStep + 1} of {QUIZ_QUESTIONS.length}
            </div>

            <button
              onClick={nextStep}
              disabled={!canProceed || isLoading}
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: canProceed && !isLoading ? '#1E3A8A' : '#E2E8F0',
                color: canProceed && !isLoading ? 'white' : '#9CA3AF',
                fontSize: '14px',
                fontWeight: '600',
                cursor: canProceed && !isLoading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              {isLoading ? (
                'Processing...'
              ) : isLastStep ? (
                <>Complete Assessment</>
              ) : (
                <>
                  Next
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}