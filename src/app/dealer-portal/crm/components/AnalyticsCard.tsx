import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface AnalyticsCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  description?: string
}

export default function AnalyticsCard({ title, value, change, icon, description }: AnalyticsCardProps) {
  const isPositive = change.startsWith('+')
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {change}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      {description && (
        <p className="text-xs text-gray-500 mt-2">{description}</p>
      )}
    </div>
  )
}