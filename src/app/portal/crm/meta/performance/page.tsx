"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Users,
  Eye,
  MousePointer,
  Target,
  ShoppingCart,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function MetaPerformancePage() {
  const [dateRange, setDateRange] = useState("last7days")
  const [metric, setMetric] = useState("impressions")

  const performanceData = [
    { date: 'Mon', impressions: 45000, clicks: 890, conversions: 23, spend: 245 },
    { date: 'Tue', impressions: 52000, clicks: 1020, conversions: 31, spend: 289 },
    { date: 'Wed', impressions: 48000, clicks: 950, conversions: 27, spend: 267 },
    { date: 'Thu', impressions: 61000, clicks: 1200, conversions: 38, spend: 312 },
    { date: 'Fri', impressions: 58000, clicks: 1150, conversions: 35, spend: 298 },
    { date: 'Sat', impressions: 72000, clicks: 1450, conversions: 42, spend: 356 },
    { date: 'Sun', impressions: 69000, clicks: 1380, conversions: 40, spend: 341 }
  ]

  const adSetPerformance = [
    { name: 'EV Enthusiasts', spend: 890, conversions: 67, cpa: 13.28, roas: 3.2 },
    { name: 'Battery Replacement', spend: 650, conversions: 52, cpa: 12.50, roas: 3.5 },
    { name: 'Service Reminders', spend: 430, conversions: 28, cpa: 15.36, roas: 2.8 },
    { name: 'New Customer Offer', spend: 320, conversions: 19, cpa: 16.84, roas: 2.4 }
  ]

  const deviceBreakdown = [
    { device: 'Mobile', value: 68, color: '#006FEE' },
    { device: 'Desktop', value: 28, color: '#17C964' },
    { device: 'Tablet', value: 4, color: '#F5A524' }
  ]

  const metrics = {
    impressions: { label: 'Impressions', value: '405K', change: '+12%', positive: true },
    clicks: { label: 'Clicks', value: '8,040', change: '+8%', positive: true },
    ctr: { label: 'CTR', value: '1.98%', change: '-0.05%', positive: false },
    conversions: { label: 'Conversions', value: '236', change: '+23%', positive: true },
    cpc: { label: 'CPC', value: '$0.34', change: '-8%', positive: true },
    cpa: { label: 'CPA', value: '$14.21', change: '-12%', positive: true },
    spend: { label: 'Total Spend', value: '$2,108', change: '+5%', positive: false },
    roas: { label: 'ROAS', value: '3.1x', change: '+0.3', positive: true }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ad Performance</h1>
          <p className="text-gray-500 mt-1">Monitor your Meta advertising performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="last7days">Last 7 days</SelectItem>
            <SelectItem value="last30days">Last 30 days</SelectItem>
            <SelectItem value="last90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(metrics).slice(0, 4).map(([key, metric]) => (
          <Card key={key}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs flex items-center mt-1 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.positive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {metric.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Daily performance metrics for the selected period</CardDescription>
            </div>
            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="impressions">Impressions</SelectItem>
                <SelectItem value="clicks">Clicks</SelectItem>
                <SelectItem value="conversions">Conversions</SelectItem>
                <SelectItem value="spend">Spend</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey={metric} 
                  stroke="#006FEE" 
                  strokeWidth={2}
                  dot={{ fill: '#006FEE', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ad Set Performance</CardTitle>
            <CardDescription>Performance breakdown by ad set</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {adSetPerformance.map((adSet) => (
                <div key={adSet.name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{adSet.name}</h4>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {adSet.roas}x ROAS
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Spend</p>
                      <p className="font-medium">${adSet.spend}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Conversions</p>
                      <p className="font-medium">{adSet.conversions}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">CPA</p>
                      <p className="font-medium">${adSet.cpa}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>Performance by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {deviceBreakdown.map((device) => (
                <div key={device.device} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                    <span className="text-sm">{device.device}</span>
                  </div>
                  <span className="text-sm font-medium">{device.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
          <CardDescription>Additional performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(metrics).slice(4).map(([key, metric]) => (
              <div key={key} className="p-4 border rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                <p className="text-xl font-bold">{metric.value}</p>
                <p className={`text-xs flex items-center mt-1 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.positive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {metric.change}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}