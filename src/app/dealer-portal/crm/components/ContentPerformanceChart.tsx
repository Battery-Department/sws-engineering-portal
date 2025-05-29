import React, { useState } from 'react'
import { BarChart3, Eye, Clock, MousePointer, TrendingUp } from 'lucide-react'

interface ContentData {
  page: string
  views: number
  avgTime: string
  bounceRate: number
  conversions: number
}

const contentData: ContentData[] = [
  { page: 'FlexVolt 9Ah Battery', views: 3420, avgTime: '3:45', bounceRate: 18.2, conversions: 142 },
  { page: 'Battery Finder Quiz', views: 2890, avgTime: '5:23', bounceRate: 12.5, conversions: 287 },
  { page: 'Dealer Benefits', views: 2156, avgTime: '4:12', bounceRate: 22.3, conversions: 98 },
  { page: 'FlexVolt 15Ah Battery', views: 1987, avgTime: '3:28', bounceRate: 20.1, conversions: 76 },
  { page: 'Bulk Order Calculator', views: 1543, avgTime: '6:45', bounceRate: 8.9, conversions: 123 }
]

export default function ContentPerformanceChart() {
  const [selectedMetric, setSelectedMetric] = useState<'views' | 'time' | 'conversions'>('views')

  const getMetricValue = (item: ContentData) => {
    switch (selectedMetric) {
      case 'views':
        return item.views
      case 'time':
        const [minutes, seconds] = item.avgTime.split(':').map(Number)
        return minutes * 60 + seconds
      case 'conversions':
        return item.conversions
    }
  }

  const maxValue = Math.max(...contentData.map(getMetricValue))

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSelectedMetric('views')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedMetric === 'views'
              ? 'bg-[#006FEE] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Eye size={16} className="inline mr-1" />
          Page Views
        </button>
        <button
          onClick={() => setSelectedMetric('time')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedMetric === 'time'
              ? 'bg-[#006FEE] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Clock size={16} className="inline mr-1" />
          Avg. Time
        </button>
        <button
          onClick={() => setSelectedMetric('conversions')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedMetric === 'conversions'
              ? 'bg-[#006FEE] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <TrendingUp size={16} className="inline mr-1" />
          Conversions
        </button>
      </div>

      <div className="space-y-4">
        {contentData.map((item, index) => {
          const value = getMetricValue(item)
          const percentage = (value / maxValue) * 100

          return (
            <div key={index} className="group">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900 text-sm">{item.page}</h4>
                <span className="text-sm font-semibold text-gray-700">
                  {selectedMetric === 'views' && item.views.toLocaleString()}
                  {selectedMetric === 'time' && item.avgTime}
                  {selectedMetric === 'conversions' && item.conversions}
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-8">
                  <div
                    className="bg-gradient-to-r from-[#006FEE] to-[#005fd4] h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  >
                    <span className="text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span>Bounce: {item.bounceRate}%</span>
                <span>Conv: {((item.conversions / item.views) * 100).toFixed(1)}%</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 text-[#006FEE]">
          <BarChart3 size={20} />
          <span className="font-medium">Performance Insight</span>
        </div>
        <p className="text-sm text-gray-700 mt-1">
          Battery Finder Quiz shows highest engagement with 5:23 avg. time and lowest bounce rate (12.5%)
        </p>
      </div>
    </div>
  )
}