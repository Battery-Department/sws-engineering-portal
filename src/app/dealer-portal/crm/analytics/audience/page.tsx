'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import { 
  Users, MapPin, Smartphone, Clock, TrendingUp, 
  Globe, Heart, ShoppingCart, Eye, UserCheck 
} from 'lucide-react'

interface AudienceMetrics {
  totalUsers: number
  newUsers: number
  returningUsers: number
  averageSessionDuration: number
  bounceRate: number
  pageViews: number
  conversionRate: number
  engagementRate: number
}

interface DemographicData {
  ageGroups: Array<{ age: string; percentage: number; users: number }>
  genders: Array<{ gender: string; percentage: number; users: number }>
  locations: Array<{ country: string; users: number; percentage: number }>
  devices: Array<{ device: string; users: number; percentage: number }>
}

interface BehaviorData {
  topPages: Array<{ page: string; views: number; avgTime: number }>
  userJourney: Array<{ step: string; users: number; dropoff: number }>
  interests: Array<{ category: string; affinity: number; users: number }>
}

interface AudienceSegment {
  id: string
  name: string
  size: number
  growth: number
  conversionRate: number
  value: number
  description: string
}

export default function AudienceInsightsPage() {
  const [metrics, setMetrics] = useState<AudienceMetrics | null>(null)
  const [demographics, setDemographics] = useState<DemographicData | null>(null)
  const [behavior, setBehavior] = useState<BehaviorData | null>(null)
  const [segments, setSegments] = useState<AudienceSegment[]>([])
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAudienceData = async () => {
      setLoading(true)
      try {
        // Mock audience data
        const mockMetrics: AudienceMetrics = {
          totalUsers: 24567,
          newUsers: 8934,
          returningUsers: 15633,
          averageSessionDuration: 4.2,
          bounceRate: 34.8,
          pageViews: 156789,
          conversionRate: 3.4,
          engagementRate: 72.5
        }

        const mockDemographics: DemographicData = {
          ageGroups: [
            { age: '18-24', percentage: 12.5, users: 3071 },
            { age: '25-34', percentage: 28.7, users: 7051 },
            { age: '35-44', percentage: 24.3, users: 5970 },
            { age: '45-54', percentage: 19.8, users: 4864 },
            { age: '55-64', percentage: 10.2, users: 2506 },
            { age: '65+', percentage: 4.5, users: 1105 }
          ],
          genders: [
            { gender: 'Male', percentage: 58.3, users: 14322 },
            { gender: 'Female', percentage: 39.7, users: 9753 },
            { gender: 'Other', percentage: 2.0, users: 492 }
          ],
          locations: [
            { country: 'United States', users: 12834, percentage: 52.2 },
            { country: 'Canada', users: 3456, percentage: 14.1 },
            { country: 'United Kingdom', users: 2198, percentage: 8.9 },
            { country: 'Australia', users: 1876, percentage: 7.6 },
            { country: 'Germany', users: 1543, percentage: 6.3 },
            { country: 'Other', users: 2660, percentage: 10.9 }
          ],
          devices: [
            { device: 'Desktop', users: 12834, percentage: 52.2 },
            { device: 'Mobile', users: 9827, percentage: 40.0 },
            { device: 'Tablet', users: 1906, percentage: 7.8 }
          ]
        }

        const mockBehavior: BehaviorData = {
          topPages: [
            { page: '/battery-products', views: 23456, avgTime: 5.2 },
            { page: '/dealer-locator', views: 18932, avgTime: 3.8 },
            { page: '/installation-guide', views: 15674, avgTime: 7.1 },
            { page: '/warranty-info', views: 12987, avgTime: 4.6 },
            { page: '/contact-us', views: 9876, avgTime: 2.9 }
          ],
          userJourney: [
            { step: 'Landing Page', users: 24567, dropoff: 0 },
            { step: 'Product Browse', users: 18432, dropoff: 25.0 },
            { step: 'Product Details', users: 13245, dropoff: 28.1 },
            { step: 'Add to Cart', users: 8976, dropoff: 32.2 },
            { step: 'Checkout', users: 5432, dropoff: 39.5 },
            { step: 'Purchase', users: 2134, dropoff: 60.7 }
          ],
          interests: [
            { category: 'Electric Vehicles', affinity: 92.3, users: 18543 },
            { category: 'Renewable Energy', affinity: 87.6, users: 16234 },
            { category: 'Technology', affinity: 78.9, users: 14567 },
            { category: 'Automotive', affinity: 74.2, users: 13298 },
            { category: 'Environmental', affinity: 69.8, users: 12045 }
          ]
        }

        const mockSegments: AudienceSegment[] = [
          {
            id: '1',
            name: 'EV Early Adopters',
            size: 8934,
            growth: 23.4,
            conversionRate: 8.2,
            value: 245.67,
            description: 'Tech-savvy users interested in cutting-edge EV technology'
          },
          {
            id: '2',
            name: 'Fleet Managers',
            size: 5678,
            growth: 18.7,
            conversionRate: 12.4,
            value: 456.78,
            description: 'Commercial users managing vehicle fleets'
          },
          {
            id: '3',
            name: 'DIY Enthusiasts',
            size: 4321,
            growth: 15.2,
            conversionRate: 6.8,
            value: 189.34,
            description: 'Users interested in self-installation and maintenance'
          },
          {
            id: '4',
            name: 'Eco-Conscious Consumers',
            size: 3456,
            growth: 28.9,
            conversionRate: 5.4,
            value: 167.89,
            description: 'Environmentally motivated battery buyers'
          },
          {
            id: '5',
            name: 'Professional Installers',
            size: 2189,
            growth: 31.5,
            conversionRate: 15.7,
            value: 567.23,
            description: 'Certified technicians and installation professionals'
          }
        ]

        setMetrics(mockMetrics)
        setDemographics(mockDemographics)
        setBehavior(mockBehavior)
        setSegments(mockSegments)
      } catch (error) {
        console.error('Error fetching audience data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAudienceData()
    const interval = setInterval(fetchAudienceData, 300000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [timeframe])

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value)
  }

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

  const formatTime = (minutes: number): string => {
    const hrs = Math.floor(minutes)
    const mins = Math.round((minutes - hrs) * 60)
    return `${hrs}:${mins.toString().padStart(2, '0')}`
  }

  const COLORS = ['#006FEE', '#0050B3', '#003A82', '#7C3AED', '#059669', '#DC2626']

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6 flex items-center justify-center">
        <div className="text-[#6B7280]">Loading audience insights...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#111827]">Audience Insights</h1>
            <p className="text-[#6B7280] mt-1">Understand your audience demographics, behavior, and preferences</p>
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
                  <p className="text-[#6B7280] text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-[#111827]">{formatNumber(metrics?.totalUsers || 0)}</p>
                  <p className="text-green-500 text-sm mt-1">+12.4% vs last period</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-[#006FEE]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Engagement Rate</p>
                  <p className="text-2xl font-bold text-[#111827]">{formatPercentage(metrics?.engagementRate || 0)}</p>
                  <p className="text-green-500 text-sm mt-1">+3.2% vs last period</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Avg Session</p>
                  <p className="text-2xl font-bold text-[#111827]">{formatTime(metrics?.averageSessionDuration || 0)}</p>
                  <p className="text-green-500 text-sm mt-1">+8.7% vs last period</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Conversion Rate</p>
                  <p className="text-2xl font-bold text-[#111827]">{formatPercentage(metrics?.conversionRate || 0)}</p>
                  <p className="text-green-500 text-sm mt-1">+1.8% vs last period</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Age Distribution */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Age Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={demographics?.ageGroups}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="age" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }}
                    formatter={(value, name) => [
                      name === 'percentage' ? formatPercentage(value as number) : formatNumber(value as number),
                      name === 'percentage' ? 'Percentage' : 'Users'
                    ]}
                  />
                  <Bar dataKey="percentage" fill="#006FEE" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Device Distribution */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Device Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={demographics?.devices}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ device, percentage }) => `${device}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {demographics?.devices.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatPercentage(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* User Journey */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-[#111827]">User Journey Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={behavior?.userJourney}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="step" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => [
                    name === 'dropoff' ? formatPercentage(value as number) : formatNumber(value as number),
                    name === 'dropoff' ? 'Drop-off Rate' : 'Users'
                  ]}
                />
                <Legend />
                <Bar dataKey="users" fill="#006FEE" name="Users" />
                <Bar dataKey="dropoff" fill="#DC2626" name="Drop-off %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Locations */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Top Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demographics?.locations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-[#6B7280]" />
                      <span className="font-medium text-[#111827]">{location.country}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#111827]">{formatNumber(location.users)}</div>
                      <div className="text-sm text-[#6B7280]">{formatPercentage(location.percentage)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interest Categories */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Interest Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {behavior?.interests.map((interest, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-[#6B7280]" />
                      <span className="font-medium text-[#111827]">{interest.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#006FEE]">{formatPercentage(interest.affinity)}</div>
                      <div className="text-sm text-[#6B7280]">{formatNumber(interest.users)} users</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audience Segments */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-[#111827]">Audience Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Segment</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Size</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Growth</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Conversion</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Avg Value</th>
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {segments.map((segment) => (
                    <tr key={segment.id} className="border-b border-[#E5E7EB] hover:bg-[#F8FAFC]">
                      <td className="py-3 px-4">
                        <div className="font-medium text-[#111827]">{segment.name}</div>
                      </td>
                      <td className="py-3 px-4 text-[#111827]">{formatNumber(segment.size)}</td>
                      <td className="py-3 px-4">
                        <span className="text-green-600 font-medium">+{formatPercentage(segment.growth)}</span>
                      </td>
                      <td className="py-3 px-4 text-[#111827] font-medium">{formatPercentage(segment.conversionRate)}</td>
                      <td className="py-3 px-4 text-[#111827]">{formatCurrency(segment.value)}</td>
                      <td className="py-3 px-4 text-[#6B7280]">{segment.description}</td>
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