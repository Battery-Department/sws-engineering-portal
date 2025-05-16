'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Package,
  CreditCard,
  Download,
  ChevronRight,
  AlertCircle,
  BarChart,
  Menu,
  X,
  Home,
  ShoppingCart,
  DollarSign,
  Truck,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/portal/dashboard', icon: Home },
  { name: 'Orders', href: '/portal/orders', icon: ShoppingCart },
  { name: 'Billing', href: '/portal/billing', icon: DollarSign },
  { name: 'Inventory', href: '/portal/inventory', icon: Package, current: true },
  { name: 'Shipping', href: '/portal/shipping', icon: Truck },
  { name: 'Analytics', href: '/portal/analytics', icon: BarChart },
  { name: 'Settings', href: '/portal/settings', icon: Settings },
]

const secondaryNavigation = [
  { name: 'Help', href: '#', icon: HelpCircle },
  { name: 'Sign out', href: '/portal/auth/login', icon: LogOut },
]

export default function InventoryPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const inventory = [
    {
      id: 'BAT-001',
      name: 'Lithium Battery 48V 200Ah',
      sku: 'LB48200',
      status: 'In Stock',
      quantity: 125,
      price: '$2,499.00',
      category: 'Lithium Batteries',
      lastUpdate: 'Dec 14, 2024'
    },
    {
      id: 'BAT-002',
      name: 'Lithium Battery 24V 100Ah',
      sku: 'LB24100',
      status: 'Low Stock',
      quantity: 15,
      price: '$1,299.00',
      category: 'Lithium Batteries',
      lastUpdate: 'Dec 13, 2024'
    },
    {
      id: 'BAT-003',
      name: 'Solar Controller MPPT 60A',
      sku: 'SC60A',
      status: 'Out of Stock',
      quantity: 0,
      price: '$399.00',
      category: 'Controllers',
      lastUpdate: 'Dec 12, 2024'
    },
    {
      id: 'BAT-004',
      name: 'Battery Monitor LCD Display',
      sku: 'BM100',
      status: 'In Stock',
      quantity: 250,
      price: '$149.00',
      category: 'Accessories',
      lastUpdate: 'Dec 14, 2024'
    },
    {
      id: 'BAT-005',
      name: 'Lithium Battery 48V 100Ah',
      sku: 'LB48100',
      status: 'In Stock',
      quantity: 85,
      price: '$1,999.00',
      category: 'Lithium Batteries',
      lastUpdate: 'Dec 14, 2024'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Mobile */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <span className="text-2xl font-bold text-white">Dealer Portal</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(item.href)
                  }}
                >
                  <item.icon
                    className={`${
                      item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                    } mr-4 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <nav className="space-y-1">
              {secondaryNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(item.href)
                  }}
                >
                  <item.icon
                    className="text-gray-400 group-hover:text-gray-300 mr-4 h-6 w-6"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-2xl font-bold text-white">Dealer Portal</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(item.href)
                  }}
                >
                  <item.icon
                    className={`${
                      item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                    } mr-3 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <nav className="space-y-1">
              {secondaryNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(item.href)
                  }}
                >
                  <item.icon
                    className="text-gray-400 group-hover:text-gray-300 mr-3 h-6 w-6"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
              <p className="mt-2 text-sm text-gray-700">
                Manage your battery products and stock levels
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Package className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">87</div>
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
                      <AlertCircle className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Low Stock</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">12</div>
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
                      <X className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Out of Stock</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">4</div>
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
                      <DollarSign className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Value</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">$347K</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search products..."
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </button>
              </div>
            </div>

            {/* Inventory table */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Update
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventory.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.sku}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                          item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.lastUpdate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}