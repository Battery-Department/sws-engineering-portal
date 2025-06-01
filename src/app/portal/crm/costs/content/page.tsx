'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import { 
  DollarSign, TrendingDown, FileText, Image, 
  Video, Mail, Calculator, Target, Clock, Users 
} from 'lucide-react'

interface ContentCostMetrics {
  totalContentCost: number
  averageCostPerPiece: number
  costPerConversion: number
  monthlyBudget: number
  budgetUsed: number
  costTrend: number
  totalContentGenerated: number
  averageTimeToGenerate: number
}

interface ContentTypeCost {
  type: string
  icon: React.ComponentType<any>
  totalCost: number
  piecesGenerated: number
  avgCostPerPiece: number
  successRate: number
  avgGenerationTime: number
  conversions: number
}

interface CostBreakdown {
  category: string
  amount: number
  percentage: number
  change: number
}

interface CostTrend {
  month: string
  totalCost: number
  pieces: number
  avgCost: number
  efficiency: number
}

interface ROIAnalysis {
  contentType: string
  investment: number
  revenue: number
  roi: number
  conversions: number
  costPerConversion: number
}

export default function ContentCostTrackingPage() {
  const [costMetrics, setCostMetrics] = useState<ContentCostMetrics | null>(null)
  const [contentTypes, setContentTypes] = useState<ContentTypeCost[]>([])
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdown[]>([])
  const [costTrends, setCostTrends] = useState<CostTrend[]>([])
  const [roiAnalysis, setROIAnalysis] = useState<ROIAnalysis[]>([])
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCostData = async () => {
      setLoading(true)
      try {
        const mockMetrics: ContentCostMetrics = {
          totalContentCost: 8945.67,
          averageCostPerPiece: 12.34,
          costPerConversion: 18.75,
          monthlyBudget: 12000,
          budgetUsed: 74.5,
          costTrend: -8.2,
          totalContentGenerated: 725,
          averageTimeToGenerate: 3.4
        }

        const mockContentTypes: ContentTypeCost[] = [
          {
            type: 'Social Media Posts',
            icon: FileText,
            totalCost: 2845.23,
            piecesGenerated: 345,
            avgCostPerPiece: 8.25,
            successRate: 92.4,
            avgGenerationTime: 2.1,
            conversions: 156
          },
          {
            type: 'Product Images',
            icon: Image,
            totalCost: 2134.56,
            piecesGenerated: 124,
            avgCostPerPiece: 17.21,
            successRate: 95.8,
            avgGenerationTime: 4.2,
            conversions: 89
          },
          {
            type: 'Video Content',
            icon: Video,
            totalCost: 1876.45,
            piecesGenerated: 67,
            avgCostPerPiece: 27.99,
            successRate: 88.1,
            avgGenerationTime: 8.7,
            conversions: 134
          },
          {
            type: 'Email Campaigns',
            icon: Mail,
            totalCost: 1456.78,
            piecesGenerated: 89,
            avgCostPerPiece: 16.37,
            successRate: 94.4,
            avgGenerationTime: 3.8,
            conversions: 98
          },
          {
            type: 'Blog Articles',
            icon: FileText,
            totalCost: 632.65,
            piecesGenerated: 56,
            avgCostPerPiece: 11.30,
            successRate: 89.3,
            avgGenerationTime: 6.2,
            conversions: 45
          }
        ]

        const mockCostBreakdown: CostBreakdown[] = [
          { category: 'AI Generation', amount: 5234.56, percentage: 58.5, change: -5.2 },
          { category: 'Image Processing', amount: 1876.34, percentage: 21.0, change: +2.8 },
          { category: 'Video Processing', amount: 987.45, percentage: 11.0, change: -12.4 },
          { category: 'Content Review', amount: 534.23, percentage: 6.0, change: +8.1 },
          { category: 'API Calls', amount: 313.09, percentage: 3.5, change: -15.6 }
        ]

        const mockCostTrends: CostTrend[] = [
          { month: 'Aug 2024', totalCost: 11234, pieces: 567, avgCost: 19.82, efficiency: 67.8 },
          { month: 'Sep 2024', totalCost: 10876, pieces: 634, avgCost: 17.15, efficiency: 71.2 },
          { month: 'Oct 2024', totalCost: 9987, pieces: 698, avgCost: 14.31, efficiency: 75.6 },
          { month: 'Nov 2024', totalCost: 9456, pieces: 712, avgCost: 13.28, efficiency: 78.9 },
          { month: 'Dec 2024', totalCost: 8945, pieces: 725, avgCost: 12.34, efficiency: 82.1 },
          { month: 'Jan 2025', totalCost: 8234, pieces: 789, avgCost: 10.43, efficiency: 85.7 }
        ]

        const mockROIAnalysis: ROIAnalysis[] = [
          {
            contentType: 'Social Media Posts',
            investment: 2845.23,
            revenue: 12456.78,
            roi: 337.8,
            conversions: 156,
            costPerConversion: 18.24
          },
          {
            contentType: 'Product Images',
            investment: 2134.56,
            revenue: 15678.90,
            roi: 634.7,
            conversions: 89,
            costPerConversion: 23.98
          },
          {
            contentType: 'Video Content',
            investment: 1876.45,
            revenue: 18934.56,
            roi: 909.2,
            conversions: 134,
            costPerConversion: 14.00
          },
          {
            contentType: 'Email Campaigns',
            investment: 1456.78,
            revenue: 8765.43,
            roi: 501.6,
            conversions: 98,
            costPerConversion: 14.87
          },
          {
            contentType: 'Blog Articles',
            investment: 632.65,
            revenue: 3456.78,
            roi: 446.4,
            conversions: 45,
            costPerConversion: 14.06
          }
        ]

        setCostMetrics(mockMetrics)
        setContentTypes(mockContentTypes)
        setCostBreakdown(mockCostBreakdown)
        setCostTrends(mockCostTrends)
        setROIAnalysis(mockROIAnalysis)
      } catch (error) {
        console.error('Error fetching content cost data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCostData()
    const interval = setInterval(fetchCostData, 300000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [timeframe])

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`
  }

  const getBudgetStatus = (used: number) => {
    if (used < 70) return { color: 'text-green-600', bg: 'bg-green-100' }
    if (used < 90) return { color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { color: 'text-red-600', bg: 'bg-red-100' }
  }

  const COLORS = ['#006FEE', '#0050B3', '#003A82', '#7C3AED', '#059669']

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6 flex items-center justify-center">
        <div className="text-[#6B7280]">Loading content cost data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#111827]">Cost Per Content</h1>
            <p className="text-[#6B7280] mt-1">Track generation costs and optimization opportunities</p>
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
                  <p className="text-[#6B7280] text-sm font-medium">Total Content Cost</p>
                  <p className="text-2xl font-bold text-[#111827]">{formatCurrency(costMetrics?.totalContentCost || 0)}</p>
                  <p className="text-green-500 text-sm mt-1">{costMetrics?.costTrend}% vs last period</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-[#006FEE]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Avg Cost Per Piece</p>
                  <p className="text-2xl font-bold text-[#111827]">{formatCurrency(costMetrics?.averageCostPerPiece || 0)}</p>
                  <p className="text-green-500 text-sm mt-1">-15.6% vs last period</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Calculator className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Cost Per Conversion</p>
                  <p className="text-2xl font-bold text-[#111827]">{formatCurrency(costMetrics?.costPerConversion || 0)}</p>
                  <p className="text-green-500 text-sm mt-1">-12.3% vs last period</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Budget Used</p>
                  <p className="text-2xl font-bold text-[#111827]">{formatPercentage(costMetrics?.budgetUsed || 0)}</p>
                  <p className="text-[#6B7280] text-sm mt-1">{formatCurrency(costMetrics?.monthlyBudget || 0)} monthly</p>
                </div>
                <div className={`p-3 rounded-lg ${getBudgetStatus(costMetrics?.budgetUsed || 0).bg}`}>
                  <Clock className={`h-6 w-6 ${getBudgetStatus(costMetrics?.budgetUsed || 0).color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Trends */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-[#111827]">Cost Efficiency Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={costTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis yAxisId="left" stroke="#6B7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="totalCost" fill="#006FEE" name="Total Cost ($)" />
                <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#059669" strokeWidth={3} name="Efficiency Score" />
                <Line yAxisId="left" type="monotone" dataKey="avgCost" stroke="#DC2626" strokeWidth={2} name="Avg Cost per Piece ($)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost Breakdown */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {costBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatPercentage(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Content Type Performance */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Cost by Content Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contentTypes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="type" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => formatCurrency(value as number)}
                  />
                  <Bar dataKey="avgCostPerPiece" fill="#006FEE" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Content Type Details */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-[#111827]">Content Type Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Content Type</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Total Cost</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Pieces Generated</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Avg Cost/Piece</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Success Rate</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Avg Time</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Conversions</th>
                  </tr>
                </thead>
                <tbody>
                  {contentTypes.map((content, index) => {
                    const IconComponent = content.icon
                    return (
                      <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F8FAFC]">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5 text-[#6B7280]" />
                            <span className="font-medium text-[#111827]">{content.type}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#111827] font-medium">{formatCurrency(content.totalCost)}</td>
                        <td className="py-3 px-4 text-[#111827]">{formatNumber(content.piecesGenerated)}</td>
                        <td className="py-3 px-4 text-[#111827]">{formatCurrency(content.avgCostPerPiece)}</td>
                        <td className="py-3 px-4">
                          <Badge className={content.successRate > 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {formatPercentage(content.successRate)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-[#6B7280]">{content.avgGenerationTime}min</td>
                        <td className="py-3 px-4 text-[#111827] font-medium">{formatNumber(content.conversions)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ROI Analysis */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-[#111827]">Content ROI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Content Type</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Investment</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Revenue</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">ROI</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Conversions</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Cost/Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  {roiAnalysis.map((item, index) => (
                    <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F8FAFC]">
                      <td className="py-3 px-4 font-medium text-[#111827]">{item.contentType}</td>
                      <td className="py-3 px-4 text-[#111827]">{formatCurrency(item.investment)}</td>
                      <td className="py-3 px-4 text-[#111827] font-medium">{formatCurrency(item.revenue)}</td>
                      <td className="py-3 px-4">
                        <span className="text-green-600 font-bold">{formatPercentage(item.roi)}</span>
                      </td>
                      <td className="py-3 px-4 text-[#111827]">{formatNumber(item.conversions)}</td>
                      <td className="py-3 px-4 text-[#111827]">{formatCurrency(item.costPerConversion)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}