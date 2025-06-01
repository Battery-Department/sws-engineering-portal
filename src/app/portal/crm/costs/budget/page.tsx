'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import { 
  DollarSign, TrendingUp, TrendingDown, AlertTriangle, 
  PieChart as PieChartIcon, Target, Calendar, Users,
  Building2, CheckCircle, XCircle, Clock
} from 'lucide-react'

interface BudgetMetrics {
  totalBudget: number
  totalSpent: number
  remaining: number
  percentageUsed: number
  projectedOverrun: number
  savingsOpportunity: number
  performanceScore: number
  daysRemaining: number
}

interface DepartmentBudget {
  department: string
  icon: React.ComponentType<any>
  allocated: number
  spent: number
  remaining: number
  percentageUsed: number
  trend: number
  status: 'on-track' | 'warning' | 'critical'
  projectedTotal: number
}

interface BudgetCategory {
  category: string
  budget: number
  actual: number
  variance: number
  variancePercentage: number
}

interface BudgetTrend {
  month: string
  budgeted: number
  actual: number
  forecast: number
  variance: number
}

interface BudgetAlert {
  id: string
  type: 'warning' | 'critical' | 'info'
  department: string
  message: string
  amount: number
  impact: 'high' | 'medium' | 'low'
}

interface SpendingForecast {
  month: string
  projected: number
  budget: number
  confidence: number
}

export default function BudgetTrackingPage() {
  const [budgetMetrics, setBudgetMetrics] = useState<BudgetMetrics | null>(null)
  const [departments, setDepartments] = useState<DepartmentBudget[]>([])
  const [categories, setCategories] = useState<BudgetCategory[]>([])
  const [budgetTrends, setBudgetTrends] = useState<BudgetTrend[]>([])
  const [alerts, setAlerts] = useState<BudgetAlert[]>([])
  const [forecast, setForecast] = useState<SpendingForecast[]>([])
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('quarter')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBudgetData = async () => {
      setLoading(true)
      try {
        const mockMetrics: BudgetMetrics = {
          totalBudget: 850000,
          totalSpent: 578456.89,
          remaining: 271543.11,
          percentageUsed: 68.1,
          projectedOverrun: 45678.90,
          savingsOpportunity: 34567.89,
          performanceScore: 78.5,
          daysRemaining: 42
        }

        const mockDepartments: DepartmentBudget[] = [
          {
            department: 'Sales & Marketing',
            icon: TrendingUp,
            allocated: 250000,
            spent: 187500,
            remaining: 62500,
            percentageUsed: 75.0,
            trend: +8.2,
            status: 'warning',
            projectedTotal: 267000
          },
          {
            department: 'Operations',
            icon: Building2,
            allocated: 180000,
            spent: 126000,
            remaining: 54000,
            percentageUsed: 70.0,
            trend: -2.4,
            status: 'on-track',
            projectedTotal: 172000
          },
          {
            department: 'Technology',
            icon: DollarSign,
            allocated: 200000,
            spent: 145000,
            remaining: 55000,
            percentageUsed: 72.5,
            trend: +5.1,
            status: 'warning',
            projectedTotal: 210000
          },
          {
            department: 'Human Resources',
            icon: Users,
            allocated: 120000,
            spent: 72000,
            remaining: 48000,
            percentageUsed: 60.0,
            trend: -5.8,
            status: 'on-track',
            projectedTotal: 110000
          },
          {
            department: 'Customer Service',
            icon: Users,
            allocated: 100000,
            spent: 47956.89,
            remaining: 52043.11,
            percentageUsed: 48.0,
            trend: -12.3,
            status: 'on-track',
            projectedTotal: 85000
          }
        ]

        const mockCategories: BudgetCategory[] = [
          { category: 'Personnel Costs', budget: 350000, actual: 325678.90, variance: -24321.10, variancePercentage: -6.9 },
          { category: 'Technology & Infrastructure', budget: 180000, actual: 195234.56, variance: +15234.56, variancePercentage: +8.5 },
          { category: 'Marketing & Advertising', budget: 120000, actual: 134567.89, variance: +14567.89, variancePercentage: +12.1 },
          { category: 'Facilities & Equipment', budget: 80000, actual: 72345.67, variance: -7654.33, variancePercentage: -9.6 },
          { category: 'Training & Development', budget: 60000, actual: 45678.90, variance: -14321.10, variancePercentage: -23.9 },
          { category: 'Travel & Entertainment', budget: 40000, actual: 52345.67, variance: +12345.67, variancePercentage: +30.9 },
          { category: 'Professional Services', budget: 20000, actual: 18234.56, variance: -1765.44, variancePercentage: -8.8 }
        ]

        const mockBudgetTrends: BudgetTrend[] = [
          { month: 'Aug 2024', budgeted: 141667, actual: 138234, forecast: 140000, variance: -3433 },
          { month: 'Sep 2024', budgeted: 141667, actual: 145678, forecast: 143000, variance: +4011 },
          { month: 'Oct 2024', budgeted: 141667, actual: 152345, forecast: 150000, variance: +10678 },
          { month: 'Nov 2024', budgeted: 141667, actual: 148234, forecast: 147000, variance: +6567 },
          { month: 'Dec 2024', budgeted: 141667, actual: 156789, forecast: 155000, variance: +15122 },
          { month: 'Jan 2025', budgeted: 141667, actual: 154234, forecast: 152000, variance: +12567 }
        ]

        const mockAlerts: BudgetAlert[] = [
          {
            id: '1',
            type: 'critical',
            department: 'Sales & Marketing',
            message: 'Budget overrun projected by end of quarter',
            amount: 17000,
            impact: 'high'
          },
          {
            id: '2',
            type: 'warning',
            department: 'Technology',
            message: 'Infrastructure costs trending 15% above budget',
            amount: 10000,
            impact: 'medium'
          },
          {
            id: '3',
            type: 'info',
            department: 'Human Resources',
            message: 'Potential savings opportunity identified',
            amount: 8000,
            impact: 'low'
          },
          {
            id: '4',
            type: 'warning',
            department: 'Travel & Entertainment',
            message: 'Category exceeding budget by 30.9%',
            amount: 12345.67,
            impact: 'medium'
          }
        ]

        const mockForecast: SpendingForecast[] = [
          { month: 'Feb 2025', projected: 158000, budget: 141667, confidence: 85 },
          { month: 'Mar 2025', projected: 162000, budget: 141667, confidence: 78 },
          { month: 'Apr 2025', projected: 165000, budget: 141667, confidence: 72 },
          { month: 'May 2025', projected: 168000, budget: 141667, confidence: 65 },
          { month: 'Jun 2025', projected: 172000, budget: 141667, confidence: 58 }
        ]

        setBudgetMetrics(mockMetrics)
        setDepartments(mockDepartments)
        setCategories(mockCategories)
        setBudgetTrends(mockBudgetTrends)
        setAlerts(mockAlerts)
        setForecast(mockForecast)
      } catch (error) {
        console.error('Error fetching budget data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBudgetData()
    const interval = setInterval(fetchBudgetData, 300000) // Refresh every 5 minutes
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
      case 'on-track': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="h-5 w-5 text-red-600" />
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'info': return <CheckCircle className="h-5 w-5 text-blue-600" />
      default: return null
    }
  }

  const COLORS = ['#006FEE', '#059669', '#DC2626', '#F59E0B', '#7C3AED', '#06B6D4']

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] p-6 flex items-center justify-center">
        <div className="text-[#6B7280]">Loading budget data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#111827]">Budget Tracking</h1>
            <p className="text-[#6B7280] mt-1">Monitor budget allocation and spending across departments</p>
          </div>
          <div className="flex gap-2">
            {(['month', 'quarter', 'year'] as const).map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? 'default' : 'outline'}
                onClick={() => setTimeframe(period)}
                className={timeframe === period 
                  ? 'bg-[#006FEE] text-white hover:bg-[#0050B3]' 
                  : 'border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB]'
                }
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Budget Alerts */}
        {alerts.filter(a => a.type === 'critical').length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <span className="font-semibold">Critical Budget Alert:</span> {alerts.filter(a => a.type === 'critical').length} department(s) 
              projected to exceed budget this quarter. Immediate action required.
            </AlertDescription>
          </Alert>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Total Budget</p>
                  <p className="text-2xl font-bold text-[#111827]">{formatCurrency(budgetMetrics?.totalBudget || 0)}</p>
                  <p className="text-[#6B7280] text-sm mt-1">{budgetMetrics?.daysRemaining} days remaining</p>
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
                  <p className="text-[#6B7280] text-sm font-medium">Total Spent</p>
                  <p className="text-2xl font-bold text-[#111827]">{formatCurrency(budgetMetrics?.totalSpent || 0)}</p>
                  <p className="text-[#6B7280] text-sm mt-1">{formatPercentage(budgetMetrics?.percentageUsed || 0)} used</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <PieChartIcon className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Projected Overrun</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(budgetMetrics?.projectedOverrun || 0)}</p>
                  <p className="text-[#6B7280] text-sm mt-1">By end of period</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6B7280] text-sm font-medium">Savings Opportunity</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(budgetMetrics?.savingsOpportunity || 0)}</p>
                  <p className="text-[#6B7280] text-sm mt-1">Identified potential</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget vs Actual Trend */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-[#111827]">Budget vs Actual Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={budgetTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Legend />
                <Area type="monotone" dataKey="budgeted" stackId="1" stroke="#006FEE" fill="#DBEAFE" name="Budgeted" />
                <Area type="monotone" dataKey="actual" stackId="2" stroke="#DC2626" fill="#FEE2E2" name="Actual" />
                <Line type="monotone" dataKey="forecast" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" name="Forecast" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Breakdown */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Department Budget Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept, index) => {
                  const IconComponent = dept.icon
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-[#6B7280]" />
                          <span className="font-medium text-[#111827]">{dept.department}</span>
                        </div>
                        <Badge className={getStatusColor(dept.status)}>
                          {dept.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              dept.percentageUsed < 70 ? 'bg-green-500' : 
                              dept.percentageUsed < 90 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(dept.percentageUsed, 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6B7280]">
                          {formatCurrency(dept.spent)} / {formatCurrency(dept.allocated)}
                        </span>
                        <span className={dept.trend > 0 ? 'text-red-600' : 'text-green-600'}>
                          {dept.trend > 0 ? '+' : ''}{dept.trend}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-[#111827]">Budget by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, variancePercentage }) => `${category}: ${variancePercentage > 0 ? '+' : ''}${variancePercentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="budget"
                  >
                    {categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Budget Variance Table */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-[#111827]">Budget Variance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    <th className="text-left py-3 px-4 text-[#6B7280] font-medium">Category</th>
                    <th className="text-right py-3 px-4 text-[#6B7280] font-medium">Budget</th>
                    <th className="text-right py-3 px-4 text-[#6B7280] font-medium">Actual</th>
                    <th className="text-right py-3 px-4 text-[#6B7280] font-medium">Variance</th>
                    <th className="text-right py-3 px-4 text-[#6B7280] font-medium">Variance %</th>
                    <th className="text-center py-3 px-4 text-[#6B7280] font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={index} className="border-b border-[#E5E7EB] hover:bg-[#F8FAFC]">
                      <td className="py-3 px-4 font-medium text-[#111827]">{category.category}</td>
                      <td className="py-3 px-4 text-right text-[#111827]">{formatCurrency(category.budget)}</td>
                      <td className="py-3 px-4 text-right text-[#111827]">{formatCurrency(category.actual)}</td>
                      <td className={`py-3 px-4 text-right font-medium ${category.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {category.variance > 0 ? '+' : ''}{formatCurrency(Math.abs(category.variance))}
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${category.variancePercentage > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {category.variancePercentage > 0 ? '+' : ''}{formatPercentage(category.variancePercentage)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {Math.abs(category.variancePercentage) < 10 ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                        ) : category.variancePercentage > 20 ? (
                          <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Spending Forecast */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-[#111827]">Spending Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={forecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Legend />
                <Bar dataKey="budget" fill="#006FEE" name="Budget" />
                <Bar dataKey="projected" fill="#DC2626" name="Projected Spending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-[#111827]">Budget Alerts & Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border ${
                    alert.type === 'critical' ? 'border-red-200 bg-red-50' :
                    alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                    'border-blue-200 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-[#111827]">{alert.department}</p>
                        <Badge className={`${alert.impact === 'high' ? 'bg-red-100 text-red-800' : alert.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                          {alert.impact} impact
                        </Badge>
                      </div>
                      <p className="text-[#6B7280] text-sm mt-1">{alert.message}</p>
                      <p className="text-[#111827] font-medium text-sm mt-1">
                        Amount: {formatCurrency(alert.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}