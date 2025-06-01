import React from 'react'
import { 
  Eye, 
  MousePointer, 
  ShoppingCart, 
  FileText, 
  Download,
  MessageSquare,
  Play,
  CheckCircle
} from 'lucide-react'

interface Event {
  id: number | string
  type: string
  user: string
  page?: string
  product?: string
  quiz?: string
  result?: string
  timestamp: string
  metaEvent?: any
}

interface EventTimelineProps {
  events: Event[]
  showMetaData?: boolean
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'page_view':
      return <Eye size={16} className="text-blue-600" />
    case 'quiz_start':
      return <Play size={16} className="text-purple-600" />
    case 'quiz_complete':
      return <CheckCircle size={16} className="text-green-600" />
    case 'add_to_cart':
      return <ShoppingCart size={16} className="text-orange-600" />
    case 'download':
      return <Download size={16} className="text-gray-600" />
    case 'contact':
      return <MessageSquare size={16} className="text-indigo-600" />
    default:
      return <MousePointer size={16} className="text-gray-600" />
  }
}

const getEventDescription = (event: Event) => {
  switch (event.type) {
    case 'page_view':
      return `viewed ${event.page}`
    case 'quiz_start':
      return `started ${event.quiz} quiz`
    case 'quiz_complete':
      return `completed ${event.quiz} quiz - Result: ${event.result}`
    case 'add_to_cart':
      return `added ${event.product} to cart`
    default:
      return event.type.replace('_', ' ')
  }
}

export default function EventTimeline({ events, showMetaData = false }: EventTimelineProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Real-time Event Stream</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-gray-100 rounded-lg">
              {getEventIcon(event.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900">{event.user}</span>
                <span className="text-sm text-gray-500">{getEventDescription(event)}</span>
              </div>
              <p className="text-xs text-gray-400">{event.timestamp}</p>
              {showMetaData && event.metaEvent && (
                <div className="mt-2 p-2 bg-gray-50 rounded text-xs font-mono">
                  <div className="text-gray-600">
                    <span className="font-semibold">Event:</span> {event.metaEvent.eventName}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-semibold">Value:</span> ${event.metaEvent.customData?.value || 'N/A'}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-semibold">Device:</span> {event.metaEvent.device?.type} ({event.metaEvent.device?.os})
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">15,234 events today</span>
          <button className="text-[#006FEE] hover:text-[#005fd4] font-medium">
            View All Events
          </button>
        </div>
      </div>
    </div>
  )
}