'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  Users, 
  TrendingUp, 
  Eye, 
  Target,
  Activity,
  BarChart3,
  PieChart,
  Clock,
  MousePointer,
  Zap,
  Share2,
  Filter,
  Calendar,
  Download,
  Settings,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  Image,
  Wand2
} from 'lucide-react'
import AnalyticsCard from './components/AnalyticsCard'
import UserProfileViewer from './components/UserProfileViewer'
import EventTimeline from './components/EventTimeline'
import AudienceSegments from './components/AudienceSegments'
import ContentPerformanceChart from './components/ContentPerformanceChart'
import MetaIntegrationStatus from './components/MetaIntegrationStatus'
import QuizFunnelAnalytics from './components/QuizFunnelAnalytics'
import { MetaSimulator } from '@/services/meta-simulator'

export default function CRMDashboard() {
  const [dateRange, setDateRange] = useState('last7days')
  const [selectedSegment, setSelectedSegment] = useState('all')
  const [showMetaData, setShowMetaData] = useState(false)
  const [simulatorStats, setSimulatorStats] = useState<any>(null)
  const [recentEvents, setRecentEvents] = useState<any[]>([])
  const simulatorRef = useRef<MetaSimulator | null>(null)
  const eventCleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    // Initialize simulator
    const simulator = new MetaSimulator({
      userCount: 100,
      eventFrequency: 'normal',
      simulationSpeed: 1
    })
    simulatorRef.current = simulator
    simulator.initialize()

    // Get initial stats
    setSimulatorStats(simulator.getSimulationStats())

    // Start real-time event simulation
    if (showMetaData) {
      eventCleanupRef.current = simulator.startRealTimeSimulation((event) => {
        setRecentEvents(prev => [{
          id: event.eventId,
          type: event.eventName.toLowerCase().replace(/([A-Z])/g, '_$1').toLowerCase(),
          user: event.userId.split('_')[1],
          timestamp: 'just now',
          metaEvent: event
        }, ...prev.slice(0, 9)])
      })
    }

    return () => {
      if (eventCleanupRef.current) {
        eventCleanupRef.current()
      }
    }
  }, [showMetaData])

  const analyticsData = simulatorStats ? {
    totalUsers: simulatorStats.totalUsers,
    activeUsers: simulatorStats.activeUsers,
    avgSessionDuration: '4m 32s',
    bounceRate: '23.4%',
    conversionRate: `${(simulatorStats.conversionRate * 100).toFixed(1)}%`,
    totalEvents: 15234,
    userGrowth: '+18.2%',
    engagementScore: Math.round(simulatorStats.averageEngagement * 100)
  } : {
    totalUsers: 2847,
    activeUsers: 1523,
    avgSessionDuration: '4m 32s',
    bounceRate: '23.4%',
    conversionRate: '3.8%',
    totalEvents: 15234,
    userGrowth: '+18.2%',
    engagementScore: 82
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#111827]">CRM Dashboard</h1>
              <p className="text-[#6B7280] mt-1">Track user behavior, engagement, and conversions</p>
            </div>
            <div className="flex gap-3">
              {/* Meta Data Toggle */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg">
                <span className="text-sm font-medium text-[#374151]">Show Meta Data</span>
                <button
                  onClick={() => setShowMetaData(!showMetaData)}
                  className="text-[#006FEE] hover:text-[#005fd4] transition-colors"
                >
                  {showMetaData ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors">
                <Calendar size={18} />
                <span>Last 7 days</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#F9FAFB] transition-colors">
                <Filter size={18} />
                <span>Filters</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#005fd4] transition-colors">
                <Download size={18} />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Meta Integration Status */}
          <MetaIntegrationStatus showMetaData={showMetaData} />
          
          {/* Quick Actions */}
          <div className="flex gap-4 mt-4">
            <Link href="/portal/crm/content-studio" className="flex-1">
              <div className="p-4 bg-white border-2 border-[#E5E7EB] rounded-lg hover:border-[#006FEE] transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#EFF6FF] rounded-lg group-hover:bg-[#006FEE] transition-colors">
                    <Sparkles className="w-5 h-5 text-[#006FEE] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827]">Content Studio</h3>
                    <p className="text-sm text-[#6B7280]">Create AI-powered content</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/portal/crm/assets" className="flex-1">
              <div className="p-4 bg-white border-2 border-[#E5E7EB] rounded-lg hover:border-[#006FEE] transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#EFF6FF] rounded-lg group-hover:bg-[#006FEE] transition-colors">
                    <Image className="w-5 h-5 text-[#006FEE] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827]">Asset Library</h3>
                    <p className="text-sm text-[#6B7280]">Manage marketing assets</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/portal/crm/generate" className="flex-1">
              <div className="p-4 bg-white border-2 border-[#E5E7EB] rounded-lg hover:border-[#006FEE] transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#EFF6FF] rounded-lg group-hover:bg-[#006FEE] transition-colors">
                    <Wand2 className="w-5 h-5 text-[#006FEE] group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827]">Quick Generate</h3>
                    <p className="text-sm text-[#6B7280]">Generate content instantly</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsCard
            title="Total Users"
            value={analyticsData.totalUsers.toLocaleString()}
            change={analyticsData.userGrowth}
            icon={<Users className="text-[#006FEE]" />}
            description="Unique visitors tracked"
          />
          <AnalyticsCard
            title="Active Users"
            value={analyticsData.activeUsers.toLocaleString()}
            change="+12.5%"
            icon={<Activity className="text-green-600" />}
            description="Currently browsing"
          />
          <AnalyticsCard
            title="Avg. Session"
            value={analyticsData.avgSessionDuration}
            change="+0.8%"
            icon={<Clock className="text-purple-600" />}
            description="Time spent on site"
          />
          <AnalyticsCard
            title="Conversion Rate"
            value={analyticsData.conversionRate}
            change="+0.3%"
            icon={<Target className="text-orange-600" />}
            description="Visitors to customers"
          />
        </div>

        {/* User Behavior Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#111827]">User Behavior Analytics</h2>
                <div className="text-sm text-[#6B7280]">150+ data points tracked</div>
              </div>
              <ContentPerformanceChart />
            </div>
          </div>
          <div className="lg:col-span-1">
            <QuizFunnelAnalytics />
          </div>
        </div>

        {/* Audience Insights and Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AudienceSegments />
          <EventTimeline events={recentEvents} showMetaData={showMetaData} />
        </div>

        {/* Meta Data Preview Section */}
        {showMetaData && (
          <div className="bg-[#111827] text-white rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Meta Pixel Data Preview</h3>
              <span className="text-sm bg-[#10B981]/20 text-[#10B981] px-3 py-1 rounded-full">
                Live Simulation
              </span>
            </div>
            <div className="bg-black/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre>{JSON.stringify(simulatorRef.current?.exportMetaCompatibleData() || {}, null, 2)}</pre>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-[#9CA3AF]">Event Format:</span>
                <span className="ml-2">Meta Conversions API</span>
              </div>
              <div>
                <span className="text-[#9CA3AF]">Hashing:</span>
                <span className="ml-2">SHA-256 (PII Protected)</span>
              </div>
              <div>
                <span className="text-[#9CA3AF]">Test Mode:</span>
                <span className="ml-2 text-[#F59E0B]">Enabled</span>
              </div>
            </div>
          </div>
        )}

        {/* User Profile Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#111827]">User Profiles</h2>
            <button className="text-[#006FEE] hover:text-[#005fd4] font-medium">
              View All Users
            </button>
          </div>
          <UserProfileViewer />
        </div>

        {/* Data Points Visualization */}
        <div className="mt-8 bg-gradient-to-r from-[#006FEE] to-[#005fd4] rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Comprehensive User Tracking</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold mb-1">150+</div>
              <div className="text-blue-100">Data Points</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">98.5%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">Real-time</div>
              <div className="text-blue-100">Event Tracking</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">GDPR</div>
              <div className="text-blue-100">Compliant</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}