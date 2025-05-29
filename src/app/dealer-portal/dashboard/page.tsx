'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowRight,
  Activity
} from 'lucide-react'

export default function DealerDashboard() {
  const router = useRouter()

  const metrics = [
    {
      title: "Active Orders",
      value: "24",
      change: "+12%",
      icon: Package,
      color: "#006FEE"
    },
    {
      title: "Monthly Revenue", 
      value: "$186,420",
      change: "+18.2%",
      icon: TrendingUp,
      color: "#10b981"
    },
    {
      title: "Customer Base",
      value: "2,847",
      change: "+156",
      icon: Users,
      color: "#8b5cf6"
    },
    {
      title: "Profit Margin",
      value: "24.3%",
      change: "+2.1%",
      icon: DollarSign,
      color: "#f59e0b"
    }
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dealer Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your business overview.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${metric.color}15` }}>
                <metric.icon size={24} style={{ color: metric.color }} />
              </div>
              <span className="text-sm font-medium text-green-600">{metric.change}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* CRM Preview Card */}
      <div className="bg-gradient-to-r from-[#006FEE] to-[#005fd4] rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">New CRM Dashboard Available!</h2>
            <p className="text-blue-100 mb-4">
              Track 150+ user data points, analyze behavior patterns, and optimize your sales funnel.
            </p>
            <button 
              onClick={() => router.push('/dealer-portal/crm')}
              className="flex items-center gap-2 bg-white text-[#006FEE] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore CRM Dashboard
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="hidden lg:block">
            <Activity size={120} className="text-blue-200" />
          </div>
        </div>
      </div>
    </div>
  )
}