"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  UserPlus, 
  Target, 
  TrendingUp,
  Calendar,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function MetaAudiencesPage() {
  const audiences = [
    {
      id: 1,
      name: "EV Owners - High Intent",
      type: "custom",
      size: "45.2K",
      status: "active",
      match_rate: 78,
      last_updated: "2 days ago",
      campaigns_using: 3,
      description: "Users who visited EV battery pages and configurator"
    },
    {
      id: 2,
      name: "Lookalike - Best Customers",
      type: "lookalike",
      size: "1.2M",
      status: "active",
      match_rate: 82,
      last_updated: "1 week ago",
      campaigns_using: 5,
      description: "1% lookalike of highest value customers"
    },
    {
      id: 3,
      name: "Cart Abandoners - 30 Days",
      type: "custom",
      size: "8.7K",
      status: "active",
      match_rate: 71,
      last_updated: "3 hours ago",
      campaigns_using: 2,
      description: "Users who added items but didn't purchase"
    },
    {
      id: 4,
      name: "Newsletter Subscribers",
      type: "custom",
      size: "23.4K",
      status: "building",
      match_rate: 65,
      last_updated: "5 days ago",
      campaigns_using: 0,
      description: "Active email subscribers from last 6 months"
    },
    {
      id: 5,
      name: "Service Customers - Inactive",
      type: "custom",
      size: "15.8K",
      status: "inactive",
      match_rate: 69,
      last_updated: "2 weeks ago",
      campaigns_using: 0,
      description: "Customers with no service in 90+ days"
    }
  ]

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      custom: "bg-blue-100 text-blue-800",
      lookalike: "bg-purple-100 text-purple-800",
      saved: "bg-gray-100 text-gray-800"
    }
    return <Badge className={colors[type]}>{type}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "success" | "secondary"> = {
      active: "success",
      building: "secondary",
      inactive: "default"
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audience Manager</h1>
          <p className="text-gray-500 mt-1">Create and manage your Meta advertising audiences</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Audience
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Audiences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500 mt-1">5 active campaigns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.3M</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Match Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-gray-500 mt-1">Across all audiences</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active Audiences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-gray-500 mt-1">Used in campaigns</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Audiences</CardTitle>
          <CardDescription>Manage your custom and lookalike audiences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {audiences.map((audience) => (
              <div key={audience.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{audience.name}</h3>
                      {getTypeBadge(audience.type)}
                      {getStatusBadge(audience.status)}
                    </div>
                    <p className="text-gray-600 mt-1">{audience.description}</p>
                    <div className="flex items-center gap-6 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{audience.size}</span>
                        <span className="text-gray-500">people</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{audience.match_rate}%</span>
                        <span className="text-gray-500">match rate</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-500">Updated {audience.last_updated}</span>
                      </div>
                    </div>
                    {audience.campaigns_using > 0 && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          Used in {audience.campaigns_using} campaign{audience.campaigns_using > 1 ? 's' : ''}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Match Quality</span>
                    <span className="font-medium">{audience.match_rate}%</span>
                  </div>
                  <Progress value={audience.match_rate} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audience Insights</CardTitle>
          <CardDescription>Performance metrics for your top audiences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Top Performing Audiences</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">EV Owners - High Intent</span>
                    <span className="text-sm font-medium">2.3% CTR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lookalike - Best Customers</span>
                    <span className="text-sm font-medium">1.9% CTR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cart Abandoners - 30 Days</span>
                    <span className="text-sm font-medium">1.7% CTR</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Audience Growth</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New users this week</span>
                    <span className="text-sm font-medium text-green-600">+12,340</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total audience size</span>
                    <span className="text-sm font-medium">1.3M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. audience quality</span>
                    <span className="text-sm font-medium">73%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}