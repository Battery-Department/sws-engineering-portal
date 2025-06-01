'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts'
import { 
  TestTube, TrendingUp, Users, Target, Clock, 
  CheckCircle, AlertCircle, Play, Pause, Trophy 
} from 'lucide-react'

interface ABTest {
  id: string
  name: string
  status: 'running' | 'completed' | 'paused' | 'planned'
  startDate: string
  endDate: string
  conversionRate: {
    control: number
    variant: number
  }
  visitors: {
    control: number
    variant: number
  }
  confidence: number
  significance: boolean
  winner: 'control' | 'variant' | 'inconclusive'
  metric: string
  description: string
}

interface TestMetrics {
  activeTests: number
  completedTests: number
  averageUplift: number
  winRate: number
  totalVisitors: number
  significantResults: number
}

interface TestResult {
  testName: string
  metric: string
  control: number
  variant: number
  uplift: number
  confidence: number
}

export default function ABTestingPage() {
  const [tests, setTests] = useState<ABTest[]>([])
  const [metrics, setMetrics] = useState<TestMetrics | null>(null)
  const [selectedTest, setSelectedTest] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestData = async () => {
      setLoading(true)
      try {
        // Mock data for A/B tests
        const mockTests: ABTest[] = [
          {
            id: '1',
            name: 'Battery Product Page CTA',
            status: 'running',
            startDate: '2025-01-15',
            endDate: '2025-02-15',
            conversionRate: { control: 3.2, variant: 4.1 },
            visitors: { control: 2834, variant: 2891 },
            confidence: 87.5,
            significance: false,
            winner: 'inconclusive',
            metric: 'Conversion Rate',
            description: 'Testing "Buy Now" vs "Get Quote" button text'
          },
          {
            id: '2',
            name: 'Email Subject Line Test',
            status: 'completed',
            startDate: '2025-01-01',
            endDate: '2025-01-20',
            conversionRate: { control: 12.8, variant: 16.4 },
            visitors: { control: 5432, variant: 5398 },
            confidence: 95.8,
            significance: true,
            winner: 'variant',
            metric: 'Open Rate',
            description: 'Personalized vs generic subject lines'
          },
          {
            id: '3',
            name: 'Landing Page Hero Section',
            status: 'completed',
            startDate: '2024-12-10',
            endDate: '2025-01-10',
            conversionRate: { control: 5.6, variant: 7.2 },
            visitors: { control: 8921, variant: 8847 },
            confidence: 98.2,
            significance: true,
            winner: 'variant',
            metric: 'Sign-up Rate',
            description: 'Video hero vs image hero'
          },
          {
            id: '4',
            name: 'Pricing Page Layout',
            status: 'running',
            startDate: '2025-01-20',
            endDate: '2025-02-20',
            conversionRate: { control: 8.9, variant: 9.7 },
            visitors: { control: 1234, variant: 1198 },
            confidence: 72.3,
            significance: false,
            winner: 'inconclusive',
            metric: 'Quote Requests',
            description: 'Three-column vs two-column pricing'
          },
          {
            id: '5',
            name: 'Newsletter Signup Form',
            status: 'paused',
            startDate: '2025-01-10',
            endDate: '2025-02-10',
            conversionRate: { control: 2.1, variant: 2.8 },
            visitors: { control: 987, variant: 1023 },
            confidence: 68.9,
            significance: false,
            winner: 'inconclusive',
            metric: 'Newsletter Signups',
            description: 'Single-step vs multi-step form'
          }
        ]

        const mockMetrics: TestMetrics = {
          activeTests: 2,
          completedTests: 8,
          averageUplift: 18.7,
          winRate: 72.5,
          totalVisitors: 45632,
          significantResults: 6
        }

        setTests(mockTests)
        setMetrics(mockMetrics)
      } catch (error) {
        console.error('Error fetching A/B test data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestData()
    const interval = setInterval(fetchTestData, 300000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [timeframe])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800 border-green-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'planned': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'paused': return <Pause className="h-4 w-4" />
      case 'planned': return <Clock className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const getWinnerBadge = (winner: string, significance: boolean) => {
    if (!significance) return <Badge className="bg-gray-100 text-gray-800">Inconclusive</Badge>
    if (winner === 'variant') return <Badge className="bg-green-100 text-green-800">Variant Wins</Badge>
    if (winner === 'control') return <Badge className="bg-blue-100 text-blue-800">Control Wins</Badge>
    return <Badge className="bg-gray-100 text-gray-800">Tie</Badge>
  }

  const chartData = tests.map(test => ({
    name: test.name.substring(0, 15) + '...',
    control: test.conversionRate.control,
    variant: test.conversionRate.variant,
    uplift: ((test.conversionRate.variant - test.conversionRate.control) / test.conversionRate.control) * 100
  }))

  const winnerDistribution = [
    { name: 'Variant Wins', value: tests.filter(t => t.winner === 'variant').length, color: '#059669' },
    { name: 'Control Wins', value: tests.filter(t => t.winner === 'control').length, color: '#006FEE' },
    { name: 'Inconclusive', value: tests.filter(t => t.winner === 'inconclusive').length, color: '#6B7280' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6 flex items-center justify-center">
        <div className="text-[#6B7280]">Loading A/B test data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#111827]">A/B Test Results</h1>
            <p className="text-[#6B7280] mt-1">Monitor and analyze conversion optimization experiments</p>
          </div>
          <div className="flex gap-2">
            {(['7d', '30d', '90d'] as const).map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? 'default' : 'outline'}
                onClick={() => setTimeframe(period)}
                className={timeframe === period 
                  ? 'bg-[#006FEE] text-white hover:bg-[#0050B3]' 
                  : 'border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB]'
                }
              >
                {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Active Tests</p>
                  <p className="text-2xl font-bold text-[#111827]">{metrics?.activeTests}</p>
                  <p className="text-[#6B7280] text-sm mt-1">Running experiments</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <TestTube className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Average Uplift</p>
                  <p className="text-2xl font-bold text-[#111827]">+{metrics?.averageUplift}%</p>
                  <p className="text-[#6B7280] text-sm mt-1">From winning variants</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-[#006FEE]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Win Rate</p>
                  <p className="text-2xl font-bold text-[#111827]">{metrics?.winRate}%</p>
                  <p className="text-[#6B7280] text-sm mt-1">Significant results</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Trophy className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Total Visitors</p>
                  <p className="text-2xl font-bold text-[#111827]">{metrics?.totalVisitors.toLocaleString()}</p>
                  <p className="text-[#6B7280] text-sm mt-1">Across all tests</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversion Rate Comparison */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Conversion Rate Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="control" fill="#6B7280" name="Control" />
                  <Bar dataKey="variant" fill="#006FEE" name="Variant" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Test Results Distribution */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Test Results Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={winnerDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {winnerDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tests Table */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-[#111827]">All A/B Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Test Name</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Metric</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Control</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Variant</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Uplift</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Confidence</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test) => {
                    const uplift = ((test.conversionRate.variant - test.conversionRate.control) / test.conversionRate.control) * 100
                    return (
                      <tr key={test.id} className="border-b border-[#E5E7EB] hover:bg-[#F8FAFC]">
                        <td className="py-3 px-4">
                          <div className="font-medium text-[#111827]">{test.name}</div>
                          <div className="text-sm text-[#6B7280]">{test.description}</div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(test.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(test.status)}
                              {test.status}
                            </span>
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-[#111827]">{test.metric}</td>
                        <td className="py-3 px-4">
                          <div className="text-[#111827] font-medium">{test.conversionRate.control}%</div>
                          <div className="text-sm text-[#6B7280]">{test.visitors.control} visitors</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-[#111827] font-medium">{test.conversionRate.variant}%</div>
                          <div className="text-sm text-[#6B7280]">{test.visitors.variant} visitors</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-bold ${uplift > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {uplift > 0 ? '+' : ''}{uplift.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Progress value={test.confidence} className="w-16 h-2" />
                            <span className="text-sm text-[#6B7280]">{test.confidence}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {getWinnerBadge(test.winner, test.significance)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}