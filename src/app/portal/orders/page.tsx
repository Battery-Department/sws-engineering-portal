"use client"

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Package, 
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  Truck,
  CheckCircle,
  Clock,
  Home,
  CreditCard,
  Battery,
  FileText,
  Menu,
  Bell,
  ChevronRight
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  createdAt: string
  status: string
  total: number
  items: {
    productName: string
    quantity: number
    price: number
  }[]
  trackingNumber?: string
  estimatedDelivery?: string
  deliveryAddress?: string
  carrier?: string
}

export default function OrdersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/portal/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    setOrdersLoading(true)
    // TODO: Replace with actual API call
    setTimeout(() => {
      setOrders([
        {
          id: '1',
          orderNumber: 'ORD-2025-001',
          createdAt: '2025-05-10',
          status: 'delivered',
          total: 4599.00,
          items: [
            { productName: 'Tesla Powerwall 2', quantity: 1, price: 3999.00 },
            { productName: 'LG Chem RESU 10H', quantity: 1, price: 600.00 }
          ],
          trackingNumber: '1Z999AA10123456784',
          estimatedDelivery: '2025-05-12',
          deliveryAddress: '123 Business Ave, San Francisco, CA 94105',
          carrier: 'FedEx'
        },
        {
          id: '2',
          orderNumber: 'ORD-2025-002',
          createdAt: '2025-05-15',
          status: 'in-transit',
          total: 8999.00,
          items: [
            { productName: 'Solar Edge Home Battery', quantity: 2, price: 4499.50 },
            { productName: 'Enphase IQ Battery', quantity: 2, price: 4499.50 }
          ],
          trackingNumber: '1Z999AA10123456785',
          estimatedDelivery: '2025-05-18',
          deliveryAddress: '456 Enterprise St, Austin, TX 78701',
          carrier: 'UPS'
        },
        {
          id: '3',
          orderNumber: 'ORD-2025-003',
          createdAt: '2025-05-16',
          status: 'processing',
          total: 2199.00,
          items: [
            { productName: 'Panasonic EverVolt 2.0', quantity: 1, price: 2199.00 }
          ],
          deliveryAddress: '789 Solar Blvd, Denver, CO 80202',
          carrier: 'USPS'
        },
        {
          id: '4',
          orderNumber: 'ORD-2025-004',
          createdAt: '2025-05-08',
          status: 'delivered',
          total: 15750.00,
          items: [
            { productName: 'Tesla Megapack', quantity: 1, price: 14500.00 },
            { productName: 'Installation Service', quantity: 1, price: 1250.00 }
          ],
          trackingNumber: 'FRT-12345',
          estimatedDelivery: '2025-05-10',
          deliveryAddress: '321 Factory Rd, Detroit, MI 48201',
          carrier: 'Freight'
        }
      ])
      setOrdersLoading(false)
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'in-transit':
        return <Truck className="h-5 w-5 text-blue-500" />
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.productName.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = filterStatus === 'all' || order.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
  })

  if (loading || ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
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
              <Link href="/portal/dashboard" className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Home className="mr-4 h-6 w-6" />
                Dashboard
              </Link>
              <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white bg-blue-600">
                <Package className="mr-4 h-6 w-6" />
                Orders
              </a>
              <Link href="/portal/billing" className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <CreditCard className="mr-4 h-6 w-6" />
                Billing
              </Link>
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
              <Link href="/portal/dashboard" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white bg-blue-600">
                <Package className="mr-3 h-5 w-5" />
                Orders
              </a>
              <Link href="/portal/billing" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <CreditCard className="mr-3 h-5 w-5" />
                Billing
              </Link>
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
              <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
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
              {/* Page header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
                    <p className="mt-1 text-sm text-gray-600">Track and manage your battery orders</p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                      <Package className="h-4 w-4 mr-2" />
                      New Order
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-8">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                          <dd className="text-lg font-medium text-gray-900">{orders.length}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Truck className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">In Transit</dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {orders.filter(o => o.status === 'in-transit').length}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Clock className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Processing</dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {orders.filter(o => o.status === 'processing').length}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Delivered</dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {orders.filter(o => o.status === 'delivered').length}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and filters */}
              <div className="bg-white shadow rounded-lg mb-6">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Search orders..."
                        />
                      </div>
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="all">All Status</option>
                      <option value="processing">Processing</option>
                      <option value="in-transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                    </select>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </button>
                  </div>
                </div>
              </div>

              {/* Orders list */}
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <li key={order.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {getStatusIcon(order.status)}
                            <div className="ml-4">
                              <div className="flex items-center">
                                <h3 className="text-lg font-medium text-gray-900">{order.orderNumber}</h3>
                                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                                  {order.status}
                                </span>
                              </div>
                              <div className="mt-1">
                                <p className="text-sm text-gray-600">
                                  {order.items.map(item => `${item.productName} × ${item.quantity}`).join(', ')}
                                </p>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                  <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  {order.deliveryAddress}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-lg font-medium text-gray-900">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            {order.trackingNumber && (
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <Truck className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                {order.carrier}: {order.trackingNumber}
                              </div>
                            )}
                            <button className="mt-2 text-blue-600 hover:text-blue-500 text-sm font-medium flex items-center">
                              View details
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchQuery || filterStatus !== 'all' 
                      ? "Try adjusting your search or filters"
                      : "You haven't placed any orders yet"
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}