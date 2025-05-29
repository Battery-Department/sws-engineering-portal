"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Activity,
  Code,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar,
  Download,
  Settings,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Zap
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MetaEventsPage() {
  const [dateRange, setDateRange] = useState("last7days")
  const [eventType, setEventType] = useState("all")

  const pixelEvents = [
    {
      name: "PageView",
      count: 125432,
      change: "+12%",
      positive: true,
      status: "active",
      lastFired: "2 minutes ago"
    },
    {
      name: "ViewContent",
      count: 45678,
      change: "+8%",
      positive: true,
      status: "active",
      lastFired: "5 minutes ago"
    },
    {
      name: "AddToCart",
      count: 8234,
      change: "-3%",
      positive: false,
      status: "active",
      lastFired: "12 minutes ago"
    },
    {
      name: "InitiateCheckout",
      count: 3456,
      change: "+15%",
      positive: true,
      status: "active",
      lastFired: "18 minutes ago"
    },
    {
      name: "Purchase",
      count: 1234,
      change: "+23%",
      positive: true,
      status: "active",
      lastFired: "25 minutes ago"
    },
    {
      name: "Lead",
      count: 567,
      change: "+5%",
      positive: true,
      status: "warning",
      lastFired: "1 hour ago"
    },
    {
      name: "CompleteRegistration",
      count: 234,
      change: "-2%",
      positive: false,
      status: "error",
      lastFired: "3 hours ago"
    }
  ]

  const eventActivity = [
    {
      time: "10:45 AM",
      event: "Purchase",
      value: "$1,245",
      status: "success",
      details: "Battery Pack - Model X"
    },
    {
      time: "10:42 AM",
      event: "AddToCart",
      value: "$899",
      status: "pending",
      details: "EV Charging Station"
    },
    {
      time: "10:38 AM",
      event: "ViewContent",
      value: "Product Page",
      status: "info",
      details: "Tesla Battery Replacement"
    },
    {
      time: "10:35 AM",
      event: "PageView",
      value: "Homepage",
      status: "info",
      details: "Direct Traffic"
    },
    {
      time: "10:32 AM",
      event: "Lead",
      value: "Form Submit",
      status: "success",
      details: "Service Inquiry Form"
    }
  ]

  const conversionFunnel = [
    { stage: "PageView", count: 125432, percentage: 100 },
    { stage: "ViewContent", count: 45678, percentage: 36.4 },
    { stage: "AddToCart", count: 8234, percentage: 6.6 },
    { stage: "InitiateCheckout", count: 3456, percentage: 2.8 },
    { stage: "Purchase", count: 1234, percentage: 1.0 }
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; icon: any }> = {
      active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      warning: { color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
      error: { color: "bg-red-100 text-red-800", icon: XCircle }
    }
    const variant = variants[status] || variants.active
    const Icon = variant.icon
    return (
      <Badge className={`${variant.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    )
  }

  const getActivityStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      success: "text-green-600",
      pending: "text-yellow-600",
      info: "text-blue-600",
      error: "text-red-600"
    }
    return colors[status] || "text-gray-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pixel Events</h1>
          <p className="text-gray-500 mt-1">Monitor and manage your Meta Pixel events</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Code className="h-4 w-4 mr-2" />
            View Code
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">189.2K</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +11% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.7%</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.3% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7/10</div>
            <p className="text-xs text-gray-500 mt-1">Events firing correctly</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Event Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-gray-500 mt-1">Match quality score</p>
          </CardContent>
        </Card>
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

        <Select value={eventType} onValueChange={setEventType}>
          <SelectTrigger className="w-[150px]">
            <Zap className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
            <SelectItem value="app">App Events</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Real-Time Activity</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Summary</CardTitle>
              <CardDescription>Performance of your pixel events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pixelEvents.map((event) => (
                  <div key={event.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <Activity className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">{event.name}</h4>
                        <p className="text-sm text-gray-500">Last fired: {event.lastFired}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-medium">{event.count.toLocaleString()}</p>
                        <p className={`text-sm flex items-center justify-end ${event.positive ? 'text-green-600' : 'text-red-600'}`}>
                          {event.positive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                          {event.change}
                        </p>
                      </div>
                      {getStatusBadge(event.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Event Activity</CardTitle>
              <CardDescription>Live feed of pixel events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eventActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className={`w-2 h-2 rounded-full mt-2 ${getActivityStatusColor(activity.status)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{activity.time}</span>
                        <Badge variant="outline">{activity.event}</Badge>
                        <span className="font-medium">{activity.value}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>User journey through your conversion events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionFunnel.map((stage, index) => (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{stage.stage}</span>
                        <span className="text-sm text-gray-500">({stage.count.toLocaleString()} events)</span>
                      </div>
                      <span className="text-sm font-medium">{stage.percentage}%</span>
                    </div>
                    <Progress value={stage.percentage} className="h-3" />
                    {index < conversionFunnel.length - 1 && (
                      <div className="mt-2 text-sm text-gray-500">
                        Drop-off: {(conversionFunnel[index].percentage - conversionFunnel[index + 1].percentage).toFixed(1)}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagnostics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Diagnostics</CardTitle>
              <CardDescription>Check the health of your pixel implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Pixel Status</h4>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Your pixel is installed and sending events correctly.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Event Quality Scores</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Event Match Quality</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-24 h-2" />
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Parameter Completeness</span>
                      <div className="flex items-center gap-2">
                        <Progress value={87} className="w-24 h-2" />
                        <span className="text-sm font-medium">87%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Event Deduplication</span>
                      <div className="flex items-center gap-2">
                        <Progress value={95} className="w-24 h-2" />
                        <span className="text-sm font-medium">95%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">Recommended Actions</h4>
                      <ul className="mt-2 space-y-1 text-sm text-yellow-800">
                        <li>• Add Advanced Matching parameters to improve match rate</li>
                        <li>• Implement Server-Side API for better data accuracy</li>
                        <li>• Add value parameter to Purchase events</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}