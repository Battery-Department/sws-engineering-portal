"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Package, 
  Search,
  Filter,
  Download,
  ChevronRight,
  Calendar,
  MapPin,
  Truck,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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
    switch (status.toLowerCase()) {
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

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in-transit':
        return <Truck className="h-4 w-4 text-blue-500" />
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Package className="h-4 w-4 text-gray-500" />
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Track and manage your battery orders</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Package className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === 'in-transit').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === 'processing').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID, customer, or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex h-10 w-full md:w-auto items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                {/* Order Info */}
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(order.status)}
                    <h3 className="text-lg font-semibold">{order.orderNumber}</h3>
                    <Badge variant={getStatusColor(order.status)}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Ordered on {new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span>{item.productName} × {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    {order.deliveryAddress && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{order.deliveryAddress}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="space-y-4 lg:text-right">
                  <div className="text-2xl font-bold">${order.total.toFixed(2)}</div>
                  
                  {order.trackingNumber && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <span>{order.carrier}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tracking: {order.trackingNumber}
                      </div>
                    </div>
                  )}
                  
                  {order.status === 'delivered' && order.estimatedDelivery && (
                    <div className="text-sm text-muted-foreground">
                      Delivered on {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </div>
                  )}
                  
                  {order.status !== 'delivered' && order.estimatedDelivery && (
                    <div className="text-sm text-muted-foreground">
                      Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </div>
                  )}
                  
                  <div className="flex gap-2 justify-start lg:justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/portal/orders/${order.orderNumber}`}>
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Invoice
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              {searchQuery || filterStatus !== 'all' 
                ? "Try adjusting your search or filters"
                : "You haven't placed any orders yet"
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}