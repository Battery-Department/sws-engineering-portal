import React from 'react'
import { PlayCircle, Users, CheckCircle, ShoppingCart, TrendingUp } from 'lucide-react'

interface FunnelStep {
  name: string
  users: number
  rate: number
  icon: React.ReactNode
  color: string
}

const funnelSteps: FunnelStep[] = [
  {
    name: 'Quiz Started',
    users: 2890,
    rate: 100,
    icon: <PlayCircle size={20} />,
    color: 'bg-blue-500'
  },
  {
    name: 'Questions Completed',
    users: 2456,
    rate: 85,
    icon: <Users size={20} />,
    color: 'bg-indigo-500'
  },
  {
    name: 'Results Viewed',
    users: 2234,
    rate: 77.3,
    icon: <CheckCircle size={20} />,
    color: 'bg-purple-500'
  },
  {
    name: 'Product Selected',
    users: 1678,
    rate: 58.1,
    icon: <ShoppingCart size={20} />,
    color: 'bg-green-500'
  }
]

export default function QuizFunnelAnalytics() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Quiz Funnel Performance</h2>
        <div className="text-sm text-gray-500">Last 7 days</div>
      </div>

      <div className="space-y-4 mb-6">
        {funnelSteps.map((step, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${step.color} bg-opacity-10 rounded-lg`}>
                  <div className={`${step.color} bg-opacity-100 text-white rounded p-1`}>
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{step.name}</h4>
                  <p className="text-sm text-gray-600">{step.users.toLocaleString()} users</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">{step.rate}%</p>
                {index > 0 && (
                  <p className="text-xs text-red-600">
                    -{(funnelSteps[index - 1].rate - step.rate).toFixed(1)}%
                  </p>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${step.color} h-3 rounded-full transition-all duration-500 ease-out`}
                  style={{ width: `${step.rate}%` }}
                />
              </div>
              {index < funnelSteps.length - 1 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-1">
                  <div className="w-0.5 h-4 bg-gray-300"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="text-green-600" size={20} />
          <h4 className="font-semibold text-green-900">Conversion Insights</h4>
        </div>
        <p className="text-sm text-green-800">
          58.1% quiz completion to product selection rate - 12% above industry average
        </p>
        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-green-700">Avg. Quiz Time</p>
            <p className="font-semibold text-green-900">2m 34s</p>
          </div>
          <div>
            <p className="text-green-700">Top Result</p>
            <p className="font-semibold text-green-900">9Ah FlexVolt (42%)</p>
          </div>
        </div>
      </div>
    </div>
  )
}