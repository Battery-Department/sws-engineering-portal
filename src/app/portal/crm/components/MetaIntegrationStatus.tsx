import React from 'react'
import { AlertCircle, CheckCircle, Settings, ExternalLink } from 'lucide-react'

interface MetaIntegrationStatusProps {
  showMetaData?: boolean
}

export default function MetaIntegrationStatus({ showMetaData = false }: MetaIntegrationStatusProps) {
  return (
    <div className={`border rounded-lg p-4 transition-all duration-300 ${
      showMetaData 
        ? 'bg-green-50 border-green-200' 
        : 'bg-amber-50 border-amber-200'
    }`}>
      <div className="flex items-start gap-3">
        {showMetaData ? (
          <CheckCircle className="text-green-600 mt-0.5" size={20} />
        ) : (
          <AlertCircle className="text-amber-600 mt-0.5" size={20} />
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold ${
              showMetaData ? 'text-green-900' : 'text-amber-900'
            }`}>
              Meta Pixel Integration - {showMetaData ? 'Simulation Active' : 'Test Mode'}
            </h3>
            <button className="flex items-center gap-1 text-sm text-amber-700 hover:text-amber-800 font-medium">
              <Settings size={16} />
              Configure
            </button>
          </div>
          <p className={`text-sm mt-1 ${
            showMetaData ? 'text-green-700' : 'text-amber-700'
          }`}>
            {showMetaData 
              ? 'Simulator is actively generating realistic Meta Pixel events. View the data preview below to see what would be sent to Meta.'
              : 'Currently running in test mode with simulated data. Real-time Meta Pixel tracking will be activated upon production deployment.'
            }
          </p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm text-gray-700">Pixel ID: TEST_1234567890</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm text-gray-700">Events: PageView, ViewContent, AddToCart, Purchase</span>
            </div>
            <a href="#" className="flex items-center gap-1 text-sm text-[#006FEE] hover:text-[#005fd4]">
              View Integration Guide
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}