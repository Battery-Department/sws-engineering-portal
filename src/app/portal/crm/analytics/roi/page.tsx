'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import { DashboardAggregator } from '@/services/analytics/dashboard-aggregator'
import { 
  TrendingUp, TrendingDown, DollarSign, Target, 
  Calendar, ArrowUpRight, ArrowDownRight, BarChart3 
} from 'lucide-react'

interface ROIMetrics {
  totalRevenue: number
  totalInvestment: number
  roi: number
  roas: number
  averageOrderValue: number
  conversionRate: number
  customerLifetimeValue: number
  costPerAcquisition: number
}

interface CampaignROI {
  id: string
  name: string
  investment: number
  revenue: number
  roi: number
  conversions: number
  period: string
  status: 'active' | 'completed' | 'paused'
}

interface ROITrend {
  month: string
  revenue: number
  investment: number
  roi: number
  conversions: number
}

export default function ROITrackingPage() {
  const [roiMetrics, setROIMetrics] = useState<ROIMetrics | null>(null)
  const [campaignData, setCampaignData] = useState<CampaignROI[]>([])
  const [roiTrends, setROITrends] = useState<ROITrend[]>([])
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [loading, setLoading] = useState(true)

  const aggregator = new DashboardAggregator()

  useEffect(() => {
    const fetchROIData = async () => {
      setLoading(true)
      try {
        // Simulate API calls with mock data
        const mockROIMetrics: ROIMetrics = {
          totalRevenue: 156780,
          totalInvestment: 42300,
          roi: 271.5,
          roas: 3.71,
          averageOrderValue: 89.45,
          conversionRate: 4.2,
          customerLifetimeValue: 245.80,
          costPerAcquisition: 23.75
        }

        const mockCampaigns: CampaignROI[] = [
          {
            id: '1',
            name: 'Meta Lead Gen Campaign',
            investment: 8500,
            revenue: 34200,
            roi: 302.4,
            conversions: 156,
            period: 'Last 30 days',
            status: 'active'
          },
          {
            id: '2',
            name: 'Google Ads - EV Batteries',
            investment: 12300,
            revenue: 45600,
            roi: 270.7,
            conversions: 203,
            period: 'Last 30 days',
            status: 'active'
          },
          {
            id: '3',
            name: 'Content Marketing ROI',
            investment: 6800,
            revenue: 18900,
            roi: 178.0,
            conversions: 89,
            period: 'Last 30 days',
            status: 'active'
          },
          {
            id: '4',
            name: 'Email Campaign Series',
            investment: 2100,
            revenue: 8750,
            roi: 316.7,
            conversions: 67,
            period: 'Last 30 days',
            status: 'completed'
          },
          {
            id: '5',
            name: 'Retargeting Campaign',
            investment: 4200,
            revenue: 12400,
            roi: 195.2,
            conversions: 45,
            period: 'Last 30 days',
            status: 'active'
          }
        ]

        const mockTrends: ROITrend[] = [
          { month: 'Aug 2024', revenue: 98500, investment: 28400, roi: 246.8, conversions: 412 },
          { month: 'Sep 2024', revenue: 112300, investment: 32100, roi: 249.8, conversions: 486 },
          { month: 'Oct 2024', revenue: 134600, investment: 38200, roi: 252.4, conversions: 567 },
          { month: 'Nov 2024', revenue: 145200, investment: 40800, roi: 255.9, conversions: 623 },
          { month: 'Dec 2024', revenue: 156780, investment: 42300, roi: 271.5, conversions: 698 },
          { month: 'Jan 2025', revenue: 163400, investment: 43900, roi: 272.3, conversions: 724 }
        ]

        setROIMetrics(mockROIMetrics)
        setCampaignData(mockCampaigns)
        setROITrends(mockTrends)
      } catch (error) {
        console.error('Error fetching ROI data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchROIData()
    const interval = setInterval(fetchROIData, 300000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [timeframe])

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const pieData = campaignData.slice(0, 5).map(campaign => ({
    name: campaign.name.substring(0, 20) + '...',
    value: campaign.revenue,
    investment: campaign.investment,
    roi: campaign.roi
  }))

  const COLORS = ['#006FEE', '#0050B3', '#003A82', '#7C3AED', '#059669']

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6 flex items-center justify-center">
        <div className="text-[#6B7280]">Loading ROI data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#111827]">ROI Tracking</h1>
            <p className="text-[#6B7280] mt-1">Monitor return on investment across all campaigns and channels</p>
          </div>
          <div className="flex gap-2">
            {(['7d', '30d', '90d', '1y'] as const).map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? 'default' : 'outline'}
                onClick={() => setTimeframe(period)}
                className={timeframe === period 
                  ? 'bg-[#006FEE] text-white hover:bg-[#0050B3]' 
                  : 'border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB]'
                }
              >
                {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : period === '90d' ? '90 Days' : '1 Year'}
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
                  <p className="text-[#6B7280] text-sm font-medium">Total ROI</p>
                  <p className="text-2xl font-bold text-[#111827]">{formatPercentage(roiMetrics?.roi || 0)}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-green-500 text-sm ml-1">+12.4% vs last period</span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">ROAS</p>
                  <p className="text-2xl font-bold text-[#111827]">{roiMetrics?.roas.toFixed(2)}x</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-green-500 text-sm ml-1">+0.23x vs last period</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-[#006FEE]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-[#111827]">{formatCurrency(roiMetrics?.totalRevenue || 0)}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-green-500 text-sm ml-1">+18.2% vs last period</span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Cost Per Acquisition</p>
                  <p className="text-2xl font-bold text-[#111827]">{formatCurrency(roiMetrics?.costPerAcquisition || 0)}</p>
                  <div className="flex items-center mt-2">
                    <ArrowDownRight className="h-4 w-4 text-green-500" />
                    <span className="text-green-500 text-sm ml-1">-8.4% vs last period</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ROI Trends Chart */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-[#111827]">ROI Trends Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={roiTrends}>
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
                <Bar yAxisId="left" dataKey="revenue" fill="#006FEE" name="Revenue" />
                <Bar yAxisId="left" dataKey="investment" fill="#E5E7EB" name="Investment" />
                <Line yAxisId="right" type="monotone" dataKey="roi" stroke="#059669" strokeWidth={3} name="ROI %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Campaign */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Revenue Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Key Performance Indicators */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                <span className="text-[#6B7280] font-medium">Average Order Value</span>
                <span className="text-[#111827] font-bold">{formatCurrency(roiMetrics?.averageOrderValue || 0)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                <span className="text-[#6B7280] font-medium">Conversion Rate</span>
                <span className="text-[#111827] font-bold">{formatPercentage(roiMetrics?.conversionRate || 0)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                <span className="text-[#6B7280] font-medium">Customer Lifetime Value</span>
                <span className="text-[#111827] font-bold">{formatCurrency(roiMetrics?.customerLifetimeValue || 0)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                <span className="text-[#6B7280] font-medium">Total Investment</span>
                <span className="text-[#111827] font-bold">{formatCurrency(roiMetrics?.totalInvestment || 0)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Performance Table */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-[#111827]">Campaign ROI Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Campaign</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Investment</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Revenue</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">ROI</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Conversions</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignData.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-[#E5E7EB] hover:bg-[#F8FAFC]">
                      <td className="py-3 px-4">
                        <div className="font-medium text-[#111827]">{campaign.name}</div>
                        <div className="text-sm text-[#6B7280]">{campaign.period}</div>
                      </td>
                      <td className="py-3 px-4 text-[#111827]">{formatCurrency(campaign.investment)}</td>
                      <td className="py-3 px-4 text-[#111827] font-medium">{formatCurrency(campaign.revenue)}</td>
                      <td className="py-3 px-4">
                        <span className={`font-bold ${campaign.roi > 200 ? 'text-green-600' : 'text-[#006FEE]'}`}>
                          {formatPercentage(campaign.roi)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#111827]">{campaign.conversions}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </td>
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