'use client'

import React, { useState, useEffect, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Users,
  Clock,
  Battery
} from 'lucide-react'

// Optimized for maximum speed - minimal imports and dependencies
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
  description?: string
}

interface QuizSession {
  sessionId?: string
  currentStep: number
  responses: Record<string, any>
  startTime: Date
  lastActivity: Date
  utmParams: Record<string, string>
  contentId?: string
  campaignId?: string
}

// Hardcoded questions for maximum speed (no API call needed)
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'project-size',
    type: 'image-choice',
    title: 'What size team do you typically work with?',
    subtitle: 'This helps us recommend the right battery fleet size',
    category: 'team-assessment',
    required: true,
    options: [
      {
        id: 'solo',
        label: 'Solo/1-2 People',
        value: 'small',
        icon: <Users size={24} />,
        description: '1-2 workers, residential projects'
      },
      {
        id: 'mid',
        label: 'Mid-Size Team',
        value: 'medium',
        icon: <Users size={24} />,
        description: '3-6 workers, commercial projects'
      },
      {
        id: 'large',
        label: 'Large Crew',
        value: 'large',
        icon: <Users size={24} />,
        description: '7+ workers, major construction'
      }
    ]
  },
  {
    id: 'daily-runtime',
    type: 'single-choice',
    title: 'How many hours do you typically use power tools per day?',
    subtitle: 'This determines your daily battery capacity needs',
    category: 'usage-pattern',
    required: true,
    options: [
      { id: 'light', label: '2-4 hours', value: 'light', description: 'Light usage - finish work, occasional cutting' },
      { id: 'moderate', label: '4-6 hours', value: 'moderate', description: 'Moderate usage - standard construction day' },
      { id: 'heavy', label: '6-8 hours', value: 'heavy', description: 'Heavy usage - full day heavy construction' },
      { id: 'continuous', label: '8+ hours', value: 'continuous', description: 'Continuous usage - non-stop operations' }
    ]
  },
  {
    id: 'primary-tools',
    type: 'multi-choice',
    title: 'Which tools do you use most frequently?',
    subtitle: 'Select all that apply - this affects battery drain calculations',
    category: 'tool-assessment',
    required: true,
    options: [
      { id: 'circular-saw', label: 'Circular Saw', value: 'circular_saw', icon: <Zap size={20} /> },
      { id: 'impact-driver', label: 'Impact Driver', value: 'impact_driver', icon: <Zap size={20} /> },
      { id: 'drill', label: 'Drill', value: 'drill', icon: <Zap size={20} /> },
      { id: 'reciprocating-saw', label: 'Reciprocating Saw', value: 'reciprocating_saw', icon: <Zap size={20} /> },
      { id: 'grinder', label: 'Grinder', value: 'grinder', icon: <Zap size={20} /> },
      { id: 'miter-saw', label: 'Miter Saw', value: 'miter_saw', icon: <Zap size={20} /> }
    ]
  },
  {
    id: 'budget-range',
    type: 'scale',
    title: 'What\'s your typical monthly budget for batteries and power supplies?',
    subtitle: 'This helps us recommend the most cost-effective solution',
    category: 'budget-assessment',
    required: true,
    options: [
      { id: 'budget-1', label: '$500-$1,000', value: 500 },
      { id: 'budget-2', label: '$1,000-$2,500', value: 1000 },
      { id: 'budget-3', label: '$2,500-$5,000', value: 2500 },
      { id: 'budget-4', label: '$5,000+', value: 5000 }
    ]
  }
]

function QuizContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Capture UTM parameters immediately
  const [utmParams] = useState(() => {
    const params: Record<string, string> = {}
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      params.utm_source = urlParams.get('utm_source') || ''
      params.utm_medium = urlParams.get('utm_medium') || ''
      params.utm_campaign = urlParams.get('utm_campaign') || ''
      params.utm_content = urlParams.get('utm_content') || ''
      params.utm_term = urlParams.get('utm_term') || ''
      params.content_id = urlParams.get('content_id') || ''
      params.campaign_id = urlParams.get('campaign_id') || ''
    }
    return params
  })

  const [session, setSession] = useState<QuizSession>({
    currentStep: 0,
    responses: {},
    startTime: new Date(),
    lastActivity: new Date(),
    utmParams,
    contentId: utmParams.content_id,
    campaignId: utmParams.campaign_id
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const currentQuestion = QUIZ_QUESTIONS[session.currentStep]
  const isLastQuestion = session.currentStep === QUIZ_QUESTIONS.length - 1
  const progressPercentage = ((session.currentStep + 1) / QUIZ_QUESTIONS.length) * 100

  // Initialize session with API call
  useEffect(() => {
    if (!isInitialized) {
      initializeSession()
      setIsInitialized(true)
    }
  }, [isInitialized])

  const initializeSession = async () => {
    try {
      // Get device info for analytics
      const deviceInfo = {
        userAgent: navigator.userAgent,
        screen: {
          width: screen.width,
          height: screen.height,
          pixelRatio: window.devicePixelRatio
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language
      }

      const response = await fetch('/api/quiz/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: 'battery-assessment-quiz',
          source: utmParams.utm_source ? 'facebook_ad' : 'direct',
          utmParams,
          deviceInfo,
          contentId: utmParams.content_id,
          campaignId: utmParams.campaign_id,
          landingPage: '/quiz'
        })
      })

      if (response.ok) {
        const data = await response.json()
        setSession(prev => ({
          ...prev,
          sessionId: data.sessionId
        }))

        // Track page view
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'quiz_landing_view', {
            event_category: 'quiz',
            utm_source: utmParams.utm_source,
            utm_campaign: utmParams.utm_campaign,
            content_id: utmParams.content_id
          })
        }
      }
    } catch (error) {
      console.error('Failed to initialize session:', error)
      // Continue with local session if API fails
    }
  }

  // Auto-save progress
  const saveProgress = useCallback(async (updatedSession: QuizSession) => {
    if (!updatedSession.sessionId) return

    try {
      await fetch(`/api/quiz/session/${updatedSession.sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentStep: updatedSession.currentStep,
          responses: updatedSession.responses,
          status: 'in_progress'
        })
      })
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }, [])

  // Handle response selection
  const handleResponse = async (questionId: string, value: any) => {
    const updatedResponses = { ...session.responses }
    
    if (currentQuestion.type === 'multi-choice') {
      const currentValues = updatedResponses[questionId] || []
      if (currentValues.includes(value)) {
        updatedResponses[questionId] = currentValues.filter((v: any) => v !== value)
      } else {
        updatedResponses[questionId] = [...currentValues, value]
      }
    } else {
      updatedResponses[questionId] = value
    }

    const updatedSession = {
      ...session,
      responses: updatedResponses,
      lastActivity: new Date()
    }

    setSession(updatedSession)

    // Save individual response
    if (session.sessionId) {
      try {
        await fetch('/api/quiz/response', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: session.sessionId,
            questionId,
            questionType: currentQuestion.type,
            responseValue: value,
            responseTime: Date.now() - session.lastActivity.getTime()
          })
        })
      } catch (error) {
        console.error('Failed to save response:', error)
      }
    }

    // Auto-advance for single choice questions on mobile
    if (currentQuestion.type === 'single-choice' || currentQuestion.type === 'image-choice') {
      setTimeout(() => {
        if (!isLastQuestion) {
          handleNext(updatedSession)
        }
      }, 500)
    }
  }

  // Navigation
  const handleNext = (sessionToUse = session) => {
    if (sessionToUse.currentStep < QUIZ_QUESTIONS.length - 1) {
      const updatedSession = {
        ...sessionToUse,
        currentStep: sessionToUse.currentStep + 1
      }
      setSession(updatedSession)
      saveProgress(updatedSession)
    } else {
      handleSubmit(sessionToUse)
    }
  }

  const handlePrevious = () => {
    if (session.currentStep > 0) {
      const updatedSession = {
        ...session,
        currentStep: session.currentStep - 1
      }
      setSession(updatedSession)
      saveProgress(updatedSession)
    }
  }

  // Touch gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return

    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0 && !isLastQuestion) {
        handleNext()
      } else if (diff < 0 && session.currentStep > 0) {
        handlePrevious()
      }
    }
  }

  // Submit quiz
  const handleSubmit = async (sessionToUse = session) => {
    setIsSubmitting(true)
    try {
      if (sessionToUse.sessionId) {
        const response = await fetch('/api/quiz/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sessionToUse.sessionId })
        })

        if (response.ok) {
          const data = await response.json()
          
          // Track completion
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'quiz_completed', {
              event_category: 'quiz',
              quiz_score: data.score,
              recommendation_value: data.recommendation?.totalPrice,
              utm_source: utmParams.utm_source,
              content_id: utmParams.content_id
            })
          }

          // Navigate to results with session ID
          router.push(`/quiz/results?session=${sessionToUse.sessionId}`)
          return
        }
      }
      
      // Fallback - store locally and redirect
      localStorage.setItem('quiz-responses', JSON.stringify(sessionToUse.responses))
      localStorage.setItem('quiz-utm', JSON.stringify(utmParams))
      router.push('/quiz/results')
    } catch (error) {
      console.error('Error submitting quiz:', error)
      // Fallback
      localStorage.setItem('quiz-responses', JSON.stringify(sessionToUse.responses))
      router.push('/quiz/results')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    const response = session.responses[currentQuestion.id]
    if (currentQuestion.type === 'multi-choice') {
      return response && response.length > 0
    }
    return response !== undefined && response !== null
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Minimal header - no navigation, maximum speed */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="px-4 py-3">
          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={handlePrevious}
              disabled={session.currentStep === 0}
              className={`p-2 rounded-full transition-all ${
                session.currentStep === 0 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'hover:bg-blue-50 active:scale-95'
              }`}
            >
              <ChevronLeft size={20} className="text-blue-600" />
            </button>
            
            <div className="flex-1">
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            
            <span className="text-sm font-medium text-blue-600 min-w-[3rem] text-right">
              {session.currentStep + 1}/{QUIZ_QUESTIONS.length}
            </span>
          </div>
          
          {/* Battery Department branding */}
          <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
            <Battery size={16} />
            <span className="font-semibold">Battery Department</span>
            <span className="text-gray-400">•</span>
            <span>Find Your Perfect Fleet</span>
          </div>
        </div>
      </header>

      {/* Main Question Content */}
      <main className="px-4 py-6 max-w-md mx-auto">
        <div className="space-y-6">
          {/* Question Header */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {currentQuestion.title}
            </h1>
            {currentQuestion.subtitle && (
              <p className="text-gray-600 text-base leading-relaxed">
                {currentQuestion.subtitle}
              </p>
            )}
          </div>

          {/* Question Options */}
          <div className="space-y-3">
            {currentQuestion.type === 'image-choice' && (
              <div className="grid gap-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = session.responses[currentQuestion.id] === option.value
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleResponse(currentQuestion.id, option.value)}
                      className={`
                        p-4 rounded-2xl border-2 transition-all duration-200 text-left
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-50 scale-[0.98]' 
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25 active:scale-[0.97]'
                        }
                      `}
                      style={{ minHeight: '48px' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          flex-shrink-0 p-2 rounded-xl
                          ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}
                        `}>
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 mb-1">
                            {option.label}
                          </div>
                          {option.description && (
                            <div className="text-sm text-gray-600">
                              {option.description}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <CheckCircle size={20} className="text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {currentQuestion.type === 'single-choice' && (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = session.responses[currentQuestion.id] === option.value
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleResponse(currentQuestion.id, option.value)}
                      className={`
                        w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                        }
                      `}
                      style={{ minHeight: '48px' }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {option.label}
                          </div>
                          {option.description && (
                            <div className="text-sm text-gray-600 mt-1">
                              {option.description}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <CheckCircle size={20} className="text-blue-500" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {currentQuestion.type === 'multi-choice' && (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const selectedValues = session.responses[currentQuestion.id] || []
                  const isSelected = selectedValues.includes(option.value)
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleResponse(currentQuestion.id, option.value)}
                      className={`
                        w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 bg-white hover:border-blue-300'
                        }
                      `}
                      style={{ minHeight: '48px' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          flex-shrink-0 p-1 rounded-lg
                          ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}
                        `}>
                          {option.icon}
                        </div>
                        <div className="flex-1 font-semibold text-gray-900">
                          {option.label}
                        </div>
                        {isSelected && (
                          <CheckCircle size={20} className="text-blue-500" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {currentQuestion.type === 'scale' && (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = session.responses[currentQuestion.id] === option.value
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleResponse(currentQuestion.id, option.value)}
                      className={`
                        w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left
                        ${isSelected 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 bg-white hover:border-green-300'
                        }
                      `}
                      style={{ minHeight: '48px' }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-gray-900">
                          {option.label}
                        </div>
                        {isSelected && (
                          <CheckCircle size={20} className="text-green-500" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Multi-choice helper text */}
          {currentQuestion.type === 'multi-choice' && (
            <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-xl">
              <AlertCircle size={16} />
              <span>You can select multiple options</span>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          {isLastQuestion ? (
            <button
              onClick={() => handleSubmit()}
              disabled={!isCurrentQuestionAnswered() || isSubmitting}
              className={`
                w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-200
                ${isCurrentQuestionAnswered() && !isSubmitting
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:scale-[0.98]'
                  : 'bg-gray-300 cursor-not-allowed'
                }
              `}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Getting Your Results...</span>
                </div>
              ) : (
                'Get My Battery Recommendations'
              )}
            </button>
          ) : (
            <button
              onClick={() => handleNext()}
              disabled={!isCurrentQuestionAnswered()}
              className={`
                w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2
                ${isCurrentQuestionAnswered()
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:scale-[0.98]'
                  : 'bg-gray-300 cursor-not-allowed'
                }
              `}
            >
              <span>Continue</span>
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Swipe hint for first question */}
      {session.currentStep === 0 && (
        <div className="fixed bottom-24 left-0 right-0 text-center text-sm text-gray-500 animate-pulse">
          Swipe left/right to navigate • Tap to select
        </div>
      )}
    </div>
  )
}

export default function QuizLandingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    }>
      <QuizContent />
    </Suspense>
  )
}