import React, { useState } from 'react'
import { User, Calendar, MapPin, ShoppingCart, Clock, Star, ChevronRight } from 'lucide-react'

interface UserProfile {
  id: string
  name: string
  email: string
  location: string
  joinDate: string
  lastActive: string
  totalPurchases: number
  lifetimeValue: string
  engagementScore: number
  interests: string[]
  recentActivity: {
    action: string
    timestamp: string
  }[]
}

// Simulated user profiles
const mockProfiles: UserProfile[] = [
  {
    id: 'USR-2847',
    name: 'Michael Thompson',
    email: 'michael.t@construction.com',
    location: 'Chicago, IL',
    joinDate: '2024-11-15',
    lastActive: '2 hours ago',
    totalPurchases: 12,
    lifetimeValue: '$8,450',
    engagementScore: 92,
    interests: ['Power Tools', 'Battery Systems', 'Bulk Orders'],
    recentActivity: [
      { action: 'Viewed FlexVolt 15Ah Battery', timestamp: '2 hours ago' },
      { action: 'Completed Battery Finder Quiz', timestamp: '1 day ago' },
      { action: 'Downloaded Spec Sheet', timestamp: '3 days ago' }
    ]
  },
  {
    id: 'USR-2846',
    name: 'Sarah Johnson',
    email: 'sarah.j@contractorllc.com',
    location: 'Dallas, TX',
    joinDate: '2024-10-22',
    lastActive: '5 hours ago',
    totalPurchases: 8,
    lifetimeValue: '$5,230',
    engagementScore: 85,
    interests: ['Cordless Systems', 'Dealer Programs', 'Warranties'],
    recentActivity: [
      { action: 'Added items to cart', timestamp: '5 hours ago' },
      { action: 'Viewed Dealer Benefits', timestamp: '6 hours ago' },
      { action: 'Compared battery models', timestamp: '1 day ago' }
    ]
  }
]

export default function UserProfileViewer() {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile>(mockProfiles[0])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* User List */}
      <div className="lg:col-span-1 space-y-3">
        {mockProfiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => setSelectedProfile(profile)}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selectedProfile.id === profile.id
                ? 'border-[#006FEE] bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{profile.name}</h4>
                <p className="text-sm text-gray-600">{profile.email}</p>
                <p className="text-xs text-gray-500 mt-1">Last active: {profile.lastActive}</p>
              </div>
              <ChevronRight size={18} className="text-gray-400 mt-1" />
            </div>
          </button>
        ))}
      </div>

      {/* Profile Details */}
      <div className="lg:col-span-2 bg-gray-50 rounded-lg p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#006FEE] rounded-full flex items-center justify-center text-white font-bold text-xl">
                {selectedProfile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedProfile.name}</h3>
                <p className="text-gray-600">{selectedProfile.id}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Engagement Score</div>
              <div className="text-2xl font-bold text-[#006FEE]">{selectedProfile.engagementScore}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <MapPin size={16} />
                <span className="text-sm">Location</span>
              </div>
              <p className="font-medium">{selectedProfile.location}</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Calendar size={16} />
                <span className="text-sm">Member Since</span>
              </div>
              <p className="font-medium">{new Date(selectedProfile.joinDate).toLocaleDateString()}</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <ShoppingCart size={16} />
                <span className="text-sm">Purchases</span>
              </div>
              <p className="font-medium">{selectedProfile.totalPurchases}</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Star size={16} />
                <span className="text-sm">Lifetime Value</span>
              </div>
              <p className="font-medium">{selectedProfile.lifetimeValue}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Interests & Preferences</h4>
            <div className="flex flex-wrap gap-2">
              {selectedProfile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-[#006FEE] rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
            <div className="space-y-3">
              {selectedProfile.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#006FEE] rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}