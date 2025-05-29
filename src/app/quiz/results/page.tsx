'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  CheckCircle, 
  Star, 
  Users, 
  Clock, 
  Zap, 
  DollarSign,
  ShoppingCart,
  Share2,
  Download,
  ArrowRight,
  Battery,
  Wrench,
  TrendingUp,
  Phone,
  MessageCircle
} from 'lucide-react'

interface QuizResults {
  sessionId?: string
  teamSize: string
  dailyRuntime: string
  tools: string[]
  budget: number
  recommendation: BatteryRecommendation
  savings: number
  confidence: number
  utmParams?: Record<string, string>
}

interface BatteryRecommendation {
  packageName: string
  totalPrice: number
  originalPrice: number
  batteries: Array<{
    type: '6Ah' | '9Ah' | '15Ah'
    quantity: number
    price: number
    runtime: string
  }>
  totalRuntime: string
  perfectFor: string[]
  whyChosen: string
  confidenceScore: number
  savings: number
  savingsPercentage: number
}

export default function QuizResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session')
  
  const [results, setResults] = useState<QuizResults | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [leadCaptured, setLeadCaptured] = useState(false)

  useEffect(() => {
    loadResults()
  }, [sessionId])

  const loadResults = async () => {
    try {
      if (sessionId) {
        // Load from API
        const response = await fetch(`/api/quiz/complete?sessionId=${sessionId}`)
        if (response.ok) {
          const data = await response.json()
          
          // Get session details for UTM tracking
          const sessionResponse = await fetch(`/api/quiz/session/${sessionId}`)
          const sessionData = sessionResponse.ok ? await sessionResponse.json() : {}
          
          setResults({
            sessionId,
            teamSize: sessionData.responses?.['project-size'] || 'medium',
            dailyRuntime: sessionData.responses?.['daily-runtime'] || 'moderate',
            tools: sessionData.responses?.['primary-tools'] || [],
            budget: sessionData.responses?.['budget-range'] || 1000,
            recommendation: data.recommendation,
            savings: data.recommendation.savings,
            confidence: data.score || 94,
            utmParams: sessionData.utmParams
          })
        } else {
          throw new Error('Failed to load results from API')
        }
      } else {
        // Fallback to localStorage
        const localResponses = JSON.parse(localStorage.getItem('quiz-responses') || '{}')
        const localUtm = JSON.parse(localStorage.getItem('quiz-utm') || '{}')
        const calculatedResults = calculateRecommendation(localResponses)
        
        setResults({
          teamSize: localResponses['project-size'] || 'medium',
          dailyRuntime: localResponses['daily-runtime'] || 'moderate',
          tools: localResponses['primary-tools'] || [],
          budget: localResponses['budget-range'] || 1000,
          recommendation: calculatedResults,
          savings: calculatedResults.savings,
          confidence: calculatedResults.confidenceScore,
          utmParams: localUtm
        })
      }
      
      setIsLoading(false)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      
      // Track results view
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'quiz_results_viewed', {
          event_category: 'quiz',
          session_id: sessionId,
          recommendation_value: results?.recommendation?.totalPrice
        })
      }
      
    } catch (error) {
      console.error('Error loading results:', error)
      setIsLoading(false)
    }
  }

  const calculateRecommendation = (responses: any): BatteryRecommendation => {
    const teamSize = responses['project-size'] || 'medium'
    const runtime = responses['daily-runtime'] || 'moderate'
    const tools = responses['primary-tools'] || []
    const budget = responses['budget-range'] || 1000

    let recommendation: BatteryRecommendation

    if (teamSize === 'small') {
      recommendation = {
        packageName: 'Starter Crew Package',
        totalPrice: 1270,
        originalPrice: 1649,
        batteries: [
          { type: '6Ah', quantity: 2, price: 190, runtime: '8 hours' },
          { type: '9Ah', quantity: 2, price: 250, runtime: '13 hours' },
          { type: '15Ah', quantity: 2, price: 490, runtime: '20 hours' }
        ],
        totalRuntime: '64 hours continuous work',
        perfectFor: ['1-3 person teams', 'Residential projects', 'Daily construction work'],
        whyChosen: 'Perfect balance of power and portability for small teams',
        confidenceScore: 94,
        savings: 379,
        savingsPercentage: 23
      }
    } else if (teamSize === 'large') {
      recommendation = {
        packageName: 'Full Workforce Solution',
        totalPrice: 8875,
        originalPrice: 11095,
        batteries: [
          { type: '6Ah', quantity: 15, price: 1425, runtime: '60 hours' },
          { type: '9Ah', quantity: 20, price: 2500, runtime: '130 hours' },
          { type: '15Ah', quantity: 15, price: 3675, runtime: '150 hours' }
        ],
        totalRuntime: '450 hours continuous work',
        perfectFor: ['7-12 person teams', 'General contractors', 'Major projects'],
        whyChosen: 'Enterprise-grade solution for maximum productivity',
        confidenceScore: 96,
        savings: 2220,
        savingsPercentage: 20
      }
    } else {
      recommendation = {
        packageName: 'Mid-Size Crew Package',
        totalPrice: 4425,
        originalPrice: 5530,
        batteries: [
          { type: '6Ah', quantity: 10, price: 950, runtime: '40 hours' },
          { type: '9Ah', quantity: 10, price: 1250, runtime: '65 hours' },
          { type: '15Ah', quantity: 5, price: 1225, runtime: '50 hours' }
        ],
        totalRuntime: '224 hours continuous work',
        perfectFor: ['4-6 person teams', 'Commercial projects', 'Professional contractors'],
        whyChosen: 'Most popular choice - optimal power for growing teams',
        confidenceScore: 92,
        savings: 1105,
        savingsPercentage: 20
      }
    }

    return recommendation
  }

  const handleAddToCart = async () => {
    if (!results) return

    // Track conversion event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        event_category: 'ecommerce',
        value: results.recommendation.totalPrice,
        currency: 'USD',
        item_name: results.recommendation.packageName,
        quiz_session: sessionId,
        utm_source: results.utmParams?.utm_source,
        content_id: results.utmParams?.content_id
      })
    }

    // Track quiz conversion in database
    if (sessionId) {
      try {
        await fetch('/api/quiz/conversion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            conversionType: 'cart_add',
            conversionValue: results.recommendation.totalPrice,
            productIds: [results.recommendation.packageName]
          })
        })
      } catch (error) {
        console.error('Failed to track conversion:', error)
      }
    }

    // Store recommendation and redirect
    localStorage.setItem('recommended-package', JSON.stringify(results.recommendation))
    router.push('/customer/products?recommended=true')
  }

  const handleRequestQuote = () => {
    if (!results) return

    // Track lead generation
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'lead_generation',
        value: results.recommendation.totalPrice,
        quiz_session: sessionId,
        utm_source: results.utmParams?.utm_source
      })
    }

    setLeadCaptured(true)
    
    // Redirect to contact form with pre-filled data
    const contactData = {
      package: results.recommendation.packageName,
      value: results.recommendation.totalPrice,
      teamSize: results.teamSize,
      utm: results.utmParams
    }
    
    localStorage.setItem('contact-prefill', JSON.stringify(contactData))
    router.push('/customer/contact?source=quiz')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Battery Fleet Recommendation',
        text: `I just got my personalized battery recommendation: ${results?.recommendation.packageName} - Save $${results?.savings}!`,
        url: window.location.href,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <div className="relative">
            <div className="w-20 h-20 mx-auto">
              <Battery size={80} className="text-blue-500 animate-pulse" />
            </div>
            <div className="absolute inset-0 animate-spin">
              <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-500 rounded-full mx-auto"></div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">Analyzing Your Needs...</h2>
            <p className="text-gray-600">Calculating the perfect battery solution for your team</p>
          </div>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    )
  }

  if (!results) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-green-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Minimal Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-green-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle size={24} className="text-green-500" />
              <div>
                <h1 className="font-bold text-gray-900">Quiz Complete!</h1>
                <p className="text-sm text-gray-600">{results.confidence}% Match Confidence</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Confidence Score */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-green-200">
          <div className="text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  stroke="#10b981" 
                  strokeWidth="8" 
                  fill="none"
                  strokeDasharray={`${results.confidence * 2.51} 251`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">{results.confidence}%</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Perfect Match Found!</h2>
              <p className="text-gray-600">Based on your team size, daily usage, and budget preferences</p>
            </div>
          </div>
        </div>

        {/* Recommendation Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-blue-200">
          <div className="space-y-6">
            {/* Package Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-3">
                <Star size={16} className="fill-current" />
                Recommended for You
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {results.recommendation.packageName}
              </h3>
              <p className="text-gray-600 mb-4">{results.recommendation.whyChosen}</p>
              
              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl font-bold text-green-600">
                    ${results.recommendation.totalPrice.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${results.recommendation.originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  <TrendingUp size={14} />
                  Save ${results.savings.toLocaleString()} ({results.recommendation.savingsPercentage}%)
                </div>
              </div>
            </div>

            {/* Battery Breakdown */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Battery size={18} />
                What's Included
              </h4>
              {results.recommendation.batteries.map((battery, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Zap size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {battery.quantity}× {battery.type} FlexVolt
                      </div>
                      <div className="text-sm text-gray-600">{battery.runtime} total runtime</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${battery.price}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle size={18} />
                Perfect For
              </h4>
              <div className="space-y-2">
                {results.recommendation.perfectFor.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Runtime Summary */}
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock size={20} className="text-blue-600" />
                <span className="font-semibold text-blue-900">Total Runtime</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {results.recommendation.totalRuntime}
              </div>
              <div className="text-sm text-blue-700 mt-1">
                Continuous operation across your entire team
              </div>
            </div>
          </div>
        </div>

        {/* UTM Attribution Display (for testing) */}
        {results.utmParams && process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 rounded-2xl p-4 text-xs">
            <h4 className="font-semibold mb-2">UTM Tracking (Dev Only)</h4>
            <div className="space-y-1">
              {Object.entries(results.utmParams).map(([key, value]) => (
                value && <div key={key}><strong>{key}:</strong> {value}</div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-lg mx-auto space-y-3">
          <button
            onClick={handleAddToCart}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-2xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            <span>Add ${results.recommendation.totalPrice.toLocaleString()} Package to Cart</span>
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={handleRequestQuote}
              className="flex-1 py-3 px-4 border-2 border-blue-200 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              Request Quote
            </button>
            <button
              onClick={() => router.push('/customer/chat')}
              className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              Ask Questions
            </button>
          </div>

          <div className="text-center text-xs text-gray-500 space-y-1">
            <div>🔒 Zero-hassle replacements • 30-day money back guarantee</div>
            <div>📞 Expert support • Direct-to-jobsite delivery available</div>
            <div>💰 Volume discounts available • Financing options</div>
          </div>
        </div>
      </div>

      {/* Bottom spacing for fixed footer */}
      <div className="h-48"></div>
    </div>
  )
}