"use client"

import React, { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
  ArrowRight,
  Menu,
  Bell,
  Search,
  Home,
  ChevronRight,
  Activity,
  Clock
} from 'lucide-react'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/portal/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const metrics = [
    {
      title: "Active Orders",
      value: "12",
      change: "+2 from last month",
      icon: Package,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Monthly Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: TrendingUp,
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Active Batteries",
      value: "2,350",
      change: "+180 from last month",
      icon: Battery,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Active Customers",
      value: "573",
      change: "+201 since last year",
      icon: Users,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100"
    }
  ]

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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'in-transit':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Mobile */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center px-4">
              <Battery className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Battery Dept</span>
            </div>
            <nav className="mt-8 px-2">
              <a href="#" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white bg-blue-600">
                <Home className="mr-4 h-6 w-6" />
                Dashboard
              </a>
              <a href="/portal/orders" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Package className="mr-4 h-6 w-6" />
                Orders
              </a>
              <a href="/portal/billing" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <CreditCard className="mr-4 h-6 w-6" />
                Billing
              </a>
              <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Battery className="mr-4 h-6 w-6" />
                Inventory
              </a>
              <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <FileText className="mr-4 h-6 w-6" />
                Reports
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center px-4">
              <Battery className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Battery Dept</span>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white bg-blue-600">
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </a>
              <a href="/portal/orders" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Package className="mr-3 h-5 w-5" />
                Orders
              </a>
              <a href="/portal/billing" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <CreditCard className="mr-3 h-5 w-5" />
                Billing
              </a>
              <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Battery className="mr-3 h-5 w-5" />
                Inventory
              </a>
              <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <FileText className="mr-3 h-5 w-5" />
                Reports
              </a>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <div className="inline-block h-9 w-9 rounded-full bg-gray-500"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.name || user.email}</p>
                  <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top nav*/}
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white shadow">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Search className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="inline-block h-8 w-8 rounded-full bg-gray-500"></div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Welcome */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user.name || user.email}</h2>
                <p className="text-gray-600">Here's an overview of your battery management system</p>
              </div>
              
              {/* Metrics */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                {metrics.map((metric) => (
                  <div key={metric.title} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className={`p-3 rounded-md ${metric.bgColor}`}>
                            <metric.icon className={`h-6 w-6 ${metric.iconColor}`} />
                          </div>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{metric.title}</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">{metric.value}</div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">{metric.change}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders & Quick Actions */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Orders */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
                      <Link href="/portal/orders" className="text-sm text-blue-600 hover:text-blue-500">
                        View all →
                      </Link>
                    </div>
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200">
                        {recentOrders.map((order) => (
                          <li key={order.id} className="py-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3">
                                  <h4 className="text-sm font-medium text-gray-900 truncate">{order.id}</h4>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                                    {order.status}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{order.customer}</p>
                                <p className="text-xs text-gray-400">{order.items.join(", ")}</p>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <div className="text-sm font-medium text-gray-900">{order.total}</div>
                                <div className="text-xs text-gray-500">{order.date}</div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Link href="/portal/orders/new" className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
                        <div className="flex-shrink-0">
                          <Package className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="absolute inset-0" aria-hidden="true" />
                          <p className="text-sm font-medium text-gray-900">New Order</p>
                          <p className="text-sm text-gray-500">Create a battery order</p>
                        </div>
                      </Link>
                      
                      <Link href="/portal/billing" className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
                        <div className="flex-shrink-0">
                          <CreditCard className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="absolute inset-0" aria-hidden="true" />
                          <p className="text-sm font-medium text-gray-900">View Billing</p>
                          <p className="text-sm text-gray-500">Manage payments</p>
                        </div>
                      </Link>
                      
                      <Link href="/portal/inventory" className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
                        <div className="flex-shrink-0">
                          <Battery className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="absolute inset-0" aria-hidden="true" />
                          <p className="text-sm font-medium text-gray-900">Inventory</p>
                          <p className="text-sm text-gray-500">Track stock levels</p>
                        </div>
                      </Link>
                      
                      <Link href="#" className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
                        <div className="flex-shrink-0">
                          <Zap className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="absolute inset-0" aria-hidden="true" />
                          <p className="text-sm font-medium text-gray-900">Subscriptions</p>
                          <p className="text-sm text-gray-500">Manage services</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Summary */}
              <div className="mt-8 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Account Summary</h3>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <DollarSign className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <dt className="text-sm font-medium text-gray-500">Total Spent</dt>
                          <dd className="text-lg font-semibold text-gray-900">$15,797.00</dd>
                          <dd className="text-xs text-gray-500">This month</dd>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Truck className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <dt className="text-sm font-medium text-gray-500">Pending Shipments</dt>
                          <dd className="text-lg font-semibold text-gray-900">3</dd>
                          <dd className="text-xs text-gray-500">Arriving this week</dd>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Clock className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <dt className="text-sm font-medium text-gray-500">Next Service</dt>
                          <dd className="text-lg font-semibold text-gray-900">Jun 1</dd>
                          <dd className="text-xs text-gray-500">Maintenance scheduled</dd>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}