"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Facebook, 
  Instagram, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Users,
  Eye,
  MousePointer,
  Calendar,
  Filter,
  Plus,
  Download
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"

export default function MetaCampaignsPage() {
  const [dateRange, setDateRange] = useState("last7days")
  const [statusFilter, setStatusFilter] = useState("all")

  const campaigns = [
    {
      id: 1,
      name: "Summer Battery Sale 2024",
      status: "active",
      platform: ["facebook", "instagram"],
      budget: "$5,000",
      spent: "$3,245",
      reach: "125.4K",
      impressions: "456.2K",
      clicks: "8,432",
      ctr: "1.85%",
      conversions: 234,
      cpc: "$0.38",
      performance: "good",
      percentSpent: 65
    },
    {
      id: 2,
      name: "EV Battery Special Offer",
      status: "active",
      platform: ["facebook"],
      budget: "$3,000",
      spent: "$1,890",
      reach: "89.3K",
      impressions: "234.1K",
      clicks: "5,123",
      ctr: "2.19%",
      conversions: 156,
      cpc: "$0.37",
      performance: "excellent",
      percentSpent: 63
    },
    {
      id: 3,
      name: "Spring Maintenance Campaign",
      status: "paused",
      platform: ["instagram"],
      budget: "$2,000",
      spent: "$1,456",
      reach: "67.8K",
      impressions: "189.3K",
      clicks: "3,892",
      ctr: "2.06%",
      conversions: 98,
      cpc: "$0.37",
      performance: "fair",
      percentSpent: 73
    },
    {
      id: 4,
      name: "New Location Announcement",
      status: "completed",
      platform: ["facebook", "instagram"],
      budget: "$1,500",
      spent: "$1,500",
      reach: "45.2K",
      impressions: "123.4K",
      clicks: "2,341",
      ctr: "1.90%",
      conversions: 67,
      cpc: "$0.64",
      performance: "poor",
      percentSpent: 100
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "success" | "secondary"> = {
      active: "success",
      paused: "secondary",
      completed: "default"
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  const getPerformanceBadge = (performance: string) => {
    const colors: Record<string, string> = {
      excellent: "bg-green-100 text-green-800",
      good: "bg-blue-100 text-blue-800",
      fair: "bg-yellow-100 text-yellow-800",
      poor: "bg-red-100 text-red-800"
    }
    return <Badge className={colors[performance]}>{performance}</Badge>
  }

  const getPlatformIcon = (platform: string) => {
    return platform === "facebook" ? <Facebook className="h-4 w-4" /> : <Instagram className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meta Campaign Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage and monitor your Facebook and Instagram campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,091</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">327.7K</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19,888</div>
            <p className="text-xs text-red-600 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              -3% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">555</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +23% from last period
            </p>
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

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaigns</CardTitle>
          <CardDescription>All your Meta advertising campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Campaign</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Budget</th>
                  <th className="text-left py-3 px-4">Reach</th>
                  <th className="text-left py-3 px-4">Clicks</th>
                  <th className="text-left py-3 px-4">CTR</th>
                  <th className="text-left py-3 px-4">CPC</th>
                  <th className="text-left py-3 px-4">Performance</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {campaign.platform.map((p) => (
                            <span key={p} className="text-gray-500">
                              {getPlatformIcon(p)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(campaign.status)}</td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{campaign.spent} / {campaign.budget}</div>
                        <Progress value={campaign.percentSpent} className="h-1 mt-1" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        {campaign.reach}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <MousePointer className="h-4 w-4 text-gray-400" />
                        {campaign.clicks}
                      </div>
                    </td>
                    <td className="py-3 px-4">{campaign.ctr}</td>
                    <td className="py-3 px-4">{campaign.cpc}</td>
                    <td className="py-3 px-4">{getPerformanceBadge(campaign.performance)}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}