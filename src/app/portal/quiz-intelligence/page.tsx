'use client'

// Disable static generation for this page
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Activity,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Eye,
  MousePointer,
  Clock,
  Target,
  Brain,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Download,
  Filter,
  Search,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
// import { useAuth } from '@/contexts/AuthContext'

// Types for Quiz Intelligence
interface LiveSession {
  id: string
  visitorId: string
  currentQuestion: number
  progress: number
  timeElapsed: number
  dropoutRisk: number
  engagementScore: number
  intervention?: string
  device: string
  source: string
  isActive: boolean
}

interface QuizMetrics {
  totalSessions: number
  activeSessions: number
  completionRate: number
  avgCompletionTime: number
  dropoutRate: number
  conversionRate: number
  revenueAttribution: number
  topSources: Array<{ source: string; sessions: number; conversion: number }>
}

interface BehavioralInsight {
  type: 'hesitation' | 'confusion' | 'engagement' | 'dropout'
  questionId: string
  frequency: number
  impact: 'high' | 'medium' | 'low'
  recommendation: string
}

interface InterventionResult {
  type: string
  triggered: number
  successful: number
  successRate: number
  avgImpact: number
}

export default function QuizIntelligencePage() {
  // const { user, loading } = useAuth()
  const user = null; // Temporary for build
  const loading = false; // Temporary for build
  const router = useRouter()
  
  // State management
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('24h')
  const [isRealTime, setIsRealTime] = useState(true)
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([])
  const [metrics, setMetrics] = useState<QuizMetrics | null>(null)
  const [insights, setInsights] = useState<BehavioralInsight[]>([])
  const [interventions, setInterventions] = useState<InterventionResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Real-time updates
  useEffect(() => {
    if (!isRealTime) return

    const interval = setInterval(async () => {
      await fetchLiveData()
    }, 2000) // Update every 2 seconds

    return () => clearInterval(interval)
  }, [isRealTime])

  // Initial data fetch
  useEffect(() => {
    loadDashboardData()
  }, [timeRange])

  const loadDashboardData = async () => {
    setIsLoading(true)
    try {
      await Promise.all([
        fetchMetrics(),
        fetchBehavioralInsights(),
        fetchInterventionResults(),
        fetchLiveData()
      ])
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchLiveData = async () => {
    try {
      const response = await fetch(`/api/quiz/intelligence/live`)
      if (response.ok) {
        const data = await response.json()
        setLiveSessions(data.sessions || [])
      }
    } catch (error) {
      console.error('Failed to fetch live data:', error)
    }
  }

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`/api/quiz/intelligence/metrics?timeRange=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setMetrics(data)
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error)
      // Mock data for demo
      setMetrics({
        totalSessions: 2847,
        activeSessions: 23,
        completionRate: 78.5,
        avgCompletionTime: 142,
        dropoutRate: 21.5,
        conversionRate: 12.8,
        revenueAttribution: 485650,
        topSources: [
          { source: 'facebook_ad', sessions: 1245, conversion: 15.2 },
          { source: 'google_ad', sessions: 892, conversion: 11.4 },
          { source: 'organic', sessions: 534, conversion: 8.9 },
          { source: 'direct', sessions: 176, conversion: 18.7 }
        ]
      })
    }
  }

  const fetchBehavioralInsights = async () => {
    try {
      const response = await fetch(`/api/quiz/intelligence/insights?timeRange=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setInsights(data.insights || [])
      }
    } catch (error) {
      console.error('Failed to fetch insights:', error)
      // Mock data
      setInsights([
        {
          type: 'hesitation',
          questionId: 'primary-tools',
          frequency: 67,
          impact: 'high',
          recommendation: 'Simplify tool selection with categories'
        },
        {
          type: 'dropout',
          questionId: 'budget-range',
          frequency: 45,
          impact: 'high',
          recommendation: 'Move budget question to end of quiz'
        },
        {
          type: 'confusion',
          questionId: 'project-size',
          frequency: 23,
          impact: 'medium',
          recommendation: 'Add visual examples for team sizes'
        }
      ])
    }
  }

  const fetchInterventionResults = async () => {
    try {
      const response = await fetch(`/api/quiz/intelligence/interventions?timeRange=${timeRange}`)
      if (response.ok) {
        const data = await response.json()
        setInterventions(data.results || [])
      }
    } catch (error) {
      console.error('Failed to fetch intervention results:', error)
      // Mock data
      setInterventions([
        { type: 'exit_intent', triggered: 156, successful: 94, successRate: 60.3, avgImpact: 0.85 },
        { type: 'hesitation_help', triggered: 289, successful: 201, successRate: 69.6, avgImpact: 0.72 },
        { type: 'encouragement', triggered: 445, successful: 267, successRate: 60.0, avgImpact: 0.65 },
        { type: 'simplification', triggered: 78, successful: 56, successRate: 71.8, avgImpact: 0.89 }
      ])
    }
  }

  const generateMockLiveSessions = () => {
    const devices = ['mobile', 'desktop', 'tablet']
    const sources = ['facebook_ad', 'google_ad', 'organic', 'direct']
    const names = ['Construction Pro', 'Builder Mike', 'Contractor Sam', 'Project Lead', 'Site Manager']
    
    return Array.from({ length: Math.floor(Math.random() * 25) + 5 }, (_, i) => ({
      id: `session-${i}`,
      visitorId: `visitor-${i}`,
      currentQuestion: Math.floor(Math.random() * 4) + 1,
      progress: Math.random() * 100,
      timeElapsed: Math.floor(Math.random() * 300) + 30,
      dropoutRisk: Math.random(),
      engagementScore: Math.random(),
      intervention: Math.random() > 0.7 ? ['tooltip', 'encouragement', 'simplification'][Math.floor(Math.random() * 3)] : undefined,
      device: devices[Math.floor(Math.random() * devices.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      isActive: true
    }))
  }

  // Use mock data when no live sessions
  const displaySessions = liveSessions.length > 0 ? liveSessions : generateMockLiveSessions()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    router.push('/portal/auth/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Brain style={{ color: '#006FEE' }} size={28} />
              Quiz Intelligence Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Real-time behavioral analytics and optimization</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Time Range Selector */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>

            {/* Real-time Toggle */}
            <button
              onClick={() => setIsRealTime(!isRealTime)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isRealTime 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200 hover:shadow-sm' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
              }`}
            >
              {isRealTime ? <Play size={16} /> : <Pause size={16} />}
              {isRealTime ? 'Live' : 'Paused'}
            </button>

            {/* Refresh Button */}
            <button
              onClick={loadDashboardData}
              className="p-2 rounded-lg text-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              style={{ backgroundColor: '#006FEE' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0050B3'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#006FEE'
              }}
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-8 mt-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'realtime', label: 'Live Sessions', icon: Activity },
            { id: 'behavior', label: 'Behavior Analysis', icon: MousePointer },
            { id: 'experiments', label: 'A/B Experiments', icon: Target },
            { id: 'insights', label: 'AI Insights', icon: Brain }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={activeTab === tab.id ? {
                borderBottomColor: '#006FEE',
                color: '#006FEE'
              } : {}}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                    <p className="text-2xl font-bold text-gray-900">{metrics?.totalSessions.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#EFF6FF' }}>
                    <Users style={{ color: '#006FEE' }} size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <ArrowUp className="text-green-500" size={16} />
                  <span className="text-green-500 font-medium ml-1">12.5%</span>
                  <span className="text-gray-500 ml-2">vs last period</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{metrics?.completionRate}%</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <ArrowUp className="text-green-500" size={16} />
                  <span className="text-green-500 font-medium ml-1">5.2%</span>
                  <span className="text-gray-500 ml-2">vs last period</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{metrics?.conversionRate}%</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#EFF6FF' }}>
                    <Target style={{ color: '#006FEE' }} size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <ArrowUp className="text-green-500" size={16} />
                  <span className="text-green-500 font-medium ml-1">8.7%</span>
                  <span className="text-gray-500 ml-2">vs last period</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue Attribution</p>
                    <p className="text-2xl font-bold text-gray-900">${metrics?.revenueAttribution.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
                    <TrendingUp style={{ color: '#F59E0B' }} size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <ArrowUp className="text-green-500" size={16} />
                  <span className="text-green-500 font-medium ml-1">23.4%</span>
                  <span className="text-gray-500 ml-2">vs last period</span>
                </div>
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100 transition-all duration-200 hover:shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Traffic Sources</h3>
                <div className="space-y-4">
                  {metrics?.topSources.map((source, index) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-blue-500' : 
                          index === 1 ? 'bg-green-500' : 
                          index === 2 ? 'bg-yellow-500' : 'bg-purple-500'
                        }`}></div>
                        <span className="font-medium text-gray-900 capitalize">
                          {source.source.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{source.sessions}</div>
                        <div className="text-sm text-gray-500">{source.conversion}% conv.</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100 transition-all duration-200 hover:shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Behavioral Insights</h3>
                <div className="space-y-4">
                  {insights.slice(0, 3).map((insight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        insight.impact === 'high' ? 'bg-red-100' :
                        insight.impact === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        {insight.type === 'hesitation' && <Clock className={`${
                          insight.impact === 'high' ? 'text-red-600' :
                          insight.impact === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                        }`} size={16} />}
                        {insight.type === 'dropout' && <AlertTriangle className={`${
                          insight.impact === 'high' ? 'text-red-600' :
                          insight.impact === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                        }`} size={16} />}
                        {insight.type === 'confusion' && <AlertCircle className={`${
                          insight.impact === 'high' ? 'text-red-600' :
                          insight.impact === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                        }`} size={16} />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 capitalize">
                          {insight.type} detected
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {insight.recommendation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'realtime' && (
          <div className="space-y-6">
            {/* Live Session Counter */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  Live Sessions ({displaySessions.length})
                </h3>
                <div className="text-sm text-gray-500">
                  Updates every 2 seconds
                </div>
              </div>

              {/* Session Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displaySessions.map((session) => (
                  <div key={session.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                          <span className="text-xs font-medium" style={{ color: '#006FEE' }}>
                            {session.visitorId.slice(-2)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            Q{session.currentQuestion}/4
                          </div>
                          <div className="text-xs text-gray-500">
                            {Math.floor(session.timeElapsed / 60)}:{String(session.timeElapsed % 60).padStart(2, '0')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {session.device === 'mobile' && <Smartphone size={14} className="text-gray-500" />}
                        {session.device === 'desktop' && <Monitor size={14} className="text-gray-500" />}
                        <div className={`w-2 h-2 rounded-full ${
                          session.dropoutRisk > 0.7 ? 'bg-red-500' :
                          session.dropoutRisk > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${session.progress}%`,
                          backgroundColor: '#006FEE'
                        }}
                      ></div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Engagement:</span>
                        <span className="ml-1 font-medium">
                          {Math.round(session.engagementScore * 100)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Risk:</span>
                        <span className="ml-1 font-medium">
                          {Math.round(session.dropoutRisk * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Intervention Badge */}
                    {session.intervention && (
                      <div className="mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {session.intervention}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'behavior' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100 transition-all duration-200 hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Question-by-Question Analysis</h3>
              
              {/* Funnel Visualization */}
              <div className="space-y-4">
                {[
                  { question: 'Team Size', viewed: 100, completed: 95, avgTime: 12 },
                  { question: 'Daily Runtime', viewed: 95, completed: 89, avgTime: 18 },
                  { question: 'Primary Tools', viewed: 89, completed: 82, avgTime: 24 },
                  { question: 'Budget Range', viewed: 82, completed: 78, avgTime: 16 }
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-6">
                    <div className="w-32 text-sm font-medium text-gray-900">
                      {step.question}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div 
                            className="h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                            style={{ 
                              width: `${step.completed}%`,
                              backgroundColor: '#006FEE'
                            }}
                          >
                            {step.completed}%
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 w-20">
                          {step.avgTime}s avg
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Intervention Results */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100 transition-all duration-200 hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Intervention Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {interventions.map((intervention) => (
                  <div key={intervention.type} className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-900 capitalize mb-2">
                      {intervention.type.replace('_', ' ')}
                    </div>
                    <div className="text-2xl font-bold mb-1" style={{ color: '#006FEE' }}>
                      {intervention.successRate}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {intervention.successful}/{intervention.triggered} successful
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Impact: {Math.round(intervention.avgImpact * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experiments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">A/B Experiments</h3>
                <button 
                  className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  style={{ backgroundColor: '#006FEE' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0050B3'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#006FEE'
                  }}>
                  Create Experiment
                </button>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Question Order Optimization</h4>
                      <p className="text-sm text-gray-600">Testing budget question placement</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        Running
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Variant A (Control)</h5>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-2">Standard order</div>
                        <div className="flex justify-between text-sm">
                          <span>Conversion: 12.4%</span>
                          <span>Sessions: 1,423</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Variant B (Test)</h5>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-2">Budget question first</div>
                        <div className="flex justify-between text-sm">
                          <span>Conversion: 15.7%</span>
                          <span>Sessions: 1,389</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-600">Confidence:</span>
                      <span className="ml-1 font-medium text-green-600">94%</span>
                      <span className="text-gray-600 ml-2">Improvement:</span>
                      <span className="ml-1 font-medium text-green-600">+26.6%</span>
                    </div>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-100 transition-all duration-200 hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Brain style={{ color: '#006FEE' }} size={20} />
                AI-Powered Insights
              </h3>

              <div className="space-y-6">
                {insights.map((insight, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        insight.impact === 'high' ? 'bg-red-100' :
                        insight.impact === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        {insight.type === 'hesitation' && <Clock className={`${
                          insight.impact === 'high' ? 'text-red-600' :
                          insight.impact === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                        }`} size={20} />}
                        {insight.type === 'dropout' && <AlertTriangle className={`${
                          insight.impact === 'high' ? 'text-red-600' :
                          insight.impact === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                        }`} size={20} />}
                        {insight.type === 'confusion' && <AlertCircle className={`${
                          insight.impact === 'high' ? 'text-red-600' :
                          insight.impact === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                        }`} size={20} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 capitalize">
                            {insight.type} Pattern Detected
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              insight.impact === 'high' ? 'bg-red-100 text-red-700' :
                              insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {insight.impact} impact
                            </span>
                            <span className="text-sm text-gray-500">
                              {insight.frequency}% frequency
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">
                          Question: <span className="font-medium">{insight.questionId.replace('-', ' ')}</span>
                        </p>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="text-sm font-medium text-blue-900 mb-1">
                            💡 Recommendation
                          </div>
                          <div className="text-sm text-blue-800">
                            {insight.recommendation}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}