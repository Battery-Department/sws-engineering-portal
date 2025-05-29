import React from 'react'
import { Users, TrendingUp, Building2, Wrench, Home, Briefcase } from 'lucide-react'

interface Segment {
  name: string
  count: number
  percentage: number
  growth: string
  icon: React.ReactNode
  color: string
}

const segments: Segment[] = [
  {
    name: 'Professional Contractors',
    count: 892,
    percentage: 31.3,
    growth: '+12.5%',
    icon: <Building2 size={20} />,
    color: 'bg-blue-500'
  },
  {
    name: 'DIY Enthusiasts',
    count: 645,
    percentage: 22.6,
    growth: '+8.3%',
    icon: <Home size={20} />,
    color: 'bg-green-500'
  },
  {
    name: 'Tool Dealers',
    count: 523,
    percentage: 18.4,
    growth: '+15.7%',
    icon: <Wrench size={20} />,
    color: 'bg-purple-500'
  },
  {
    name: 'Enterprise Buyers',
    count: 412,
    percentage: 14.5,
    growth: '+21.2%',
    icon: <Briefcase size={20} />,
    color: 'bg-orange-500'
  },
  {
    name: 'Other',
    count: 375,
    percentage: 13.2,
    growth: '+5.1%',
    icon: <Users size={20} />,
    color: 'bg-gray-500'
  }
]

export default function AudienceSegments() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Audience Segments</h2>
        <button className="text-sm text-[#006FEE] hover:text-[#005fd4] font-medium">
          Manage Segments
        </button>
      </div>

      <div className="space-y-4">
        {segments.map((segment) => (
          <div key={segment.name} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${segment.color} bg-opacity-10 rounded-lg`}>
                  <div className={`${segment.color} bg-opacity-100 text-white rounded p-1`}>
                    {segment.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{segment.name}</h3>
                  <p className="text-sm text-gray-600">{segment.count.toLocaleString()} users</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{segment.percentage}%</p>
                <p className="text-sm text-green-600">{segment.growth}</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`${segment.color} h-2 rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${segment.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Total Audience</p>
            <p className="text-2xl font-bold text-gray-900">2,847</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Growth Rate</p>
            <p className="text-lg font-semibold text-green-600">+18.2%</p>
          </div>
        </div>
      </div>
    </div>
  )
}