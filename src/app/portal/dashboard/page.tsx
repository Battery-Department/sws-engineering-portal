"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  CreditCard, 
  Package, 
  TrendingUp, 
  Users, 
  Zap,
  Battery,
  FileText,
  Truck,
  DollarSign,
  ArrowRight
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/portal/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const recentOrders = [
    {
      id: "ORD-001",
      date: "May 10, 2025",
      status: "delivered",
      total: "$4,599.00",
      items: ["Tesla Powerwall 2", "LG Chem RESU 10H"],
      customer: "Acme Corporation"
    },
    {
      id: "ORD-002", 
      date: "May 15, 2025",
      status: "in-transit",
      total: "$8,999.00",
      items: ["Solar Edge Home Battery × 2", "Enphase IQ Battery × 2"],
      customer: "Global Tech Solutions"
    },
    {
      id: "ORD-003",
      date: "May 16, 2025", 
      status: "processing",
      total: "$2,199.00",
      items: ["Panasonic EverVolt 2.0"],
      customer: "Green Energy Inc"
    }
  ]

  const metrics = [
    {
      title: "Active Orders",
      value: "12",
      change: "+2 from last month",
      icon: Package,
      trend: "up"
    },
    {
      title: "Monthly Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Active Batteries",
      value: "2,350",
      change: "+180 from last month",
      icon: Battery,
      trend: "up"
    },
    {
      title: "Active Customers",
      value: "573",
      change: "+201 since last year",
      icon: Users,
      trend: "up"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'default'
      case 'in-transit':
        return 'secondary'
      case 'processing':
        return 'outline'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered'
      case 'in-transit':
        return 'In Transit'
      case 'processing':
        return 'Processing'
      default:
        return status
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name || user.email}</h1>
          <p className="text-muted-foreground">Here's an overview of your battery management system</p>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button>
            <Package className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your latest orders and their status</CardDescription>
              </div>
              <Link href="/portal/orders">
                <Button variant="ghost" size="sm">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium">{order.id}</p>
                      <Badge variant={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.items.join(", ")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{order.total}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Button className="justify-start h-auto p-4" variant="outline" asChild>
                <Link href="/portal/orders/new">
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 mt-0.5" />
                    <div className="text-left">
                      <div className="font-semibold">Create New Order</div>
                      <div className="text-xs text-muted-foreground">Start a new battery order</div>
                    </div>
                  </div>
                </Link>
              </Button>
              <Button className="justify-start h-auto p-4" variant="outline" asChild>
                <Link href="/portal/billing">
                  <div className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 mt-0.5" />
                    <div className="text-left">
                      <div className="font-semibold">View Billing</div>
                      <div className="text-xs text-muted-foreground">Manage payments & invoices</div>
                    </div>
                  </div>
                </Link>
              </Button>
              <Button className="justify-start h-auto p-4" variant="outline" asChild>
                <Link href="/portal/inventory">
                  <div className="flex items-start gap-3">
                    <Battery className="h-5 w-5 mt-0.5" />
                    <div className="text-left">
                      <div className="font-semibold">Manage Inventory</div>
                      <div className="text-xs text-muted-foreground">Track battery stock levels</div>
                    </div>
                  </div>
                </Link>
              </Button>
              <Button className="justify-start h-auto p-4" variant="outline" asChild>
                <Link href="/portal/subscriptions">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 mt-0.5" />
                    <div className="text-left">
                      <div className="font-semibold">Subscriptions</div>
                      <div className="text-xs text-muted-foreground">Manage recurring services</div>
                    </div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
          <CardDescription>Key metrics and upcoming activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Spent</p>
                <p className="text-2xl font-bold">$15,797.00</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Pending Shipments</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Arriving this week</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Next Service</p>
                <p className="text-2xl font-bold">Jun 1</p>
                <p className="text-xs text-muted-foreground">Maintenance scheduled</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}