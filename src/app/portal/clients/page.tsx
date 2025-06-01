'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Plus,
  Search,
  Filter,
  Users,
  MapPin,
  Phone,
  Mail,
  Calendar,
  PoundSterling,
  FileText,
  TrendingUp,
  Building,
  User,
  ChevronRight,
  Star,
  Clock,
  Train,
  Factory,
  Edit,
  Eye
} from 'lucide-react'

// Mock clients data
const mockClients = [
  {
    id: 'CLIENT-001',
    name: 'Bodmin & Wenford Railway',
    type: 'heritage_railway',
    contact: 'James Mitchell',
    email: 'j.mitchell@bodminrailway.co.uk',
    phone: '+44 1208 73666',
    location: 'Bodmin, Cornwall',
    establishedYear: 1984,
    status: 'active',
    rating: 5,
    totalProjects: 8,
    activeProjects: 2,
    totalValue: 125000,
    lastProject: '2024-05-15',
    services: ['steam', 'cad', 'repair'],
    notes: 'Premier heritage railway. Long-standing client with excellent payment history.',
    avatar: null
  },
  {
    id: 'CLIENT-002',
    name: 'Cornwall Mining Heritage',
    type: 'heritage_organization',
    contact: 'Sarah Thompson',
    email: 's.thompson@cornwallmining.org.uk',
    phone: '+44 1872 552400',
    location: 'Redruth, Cornwall',
    establishedYear: 1995,
    status: 'active',
    rating: 4,
    totalProjects: 5,
    activeProjects: 1,
    totalValue: 45000,
    lastProject: '2024-04-20',
    services: ['repair', 'fabrication'],
    notes: 'Specializes in mining equipment restoration. Very knowledgeable about heritage machinery.',
    avatar: null
  },
  {
    id: 'CLIENT-003',
    name: 'Private Collector - Mr. Davies',
    type: 'private_collector',
    contact: 'Richard Davies',
    email: 'r.davies@gmail.com',
    phone: '+44 7889 123456',
    location: 'Plymouth, Devon',
    establishedYear: null,
    status: 'active',
    rating: 5,
    totalProjects: 12,
    activeProjects: 1,
    totalValue: 85000,
    lastProject: '2024-05-21',
    services: ['cad', 'steam', 'fabrication'],
    notes: 'Passionate steam enthusiast. Collects 7¼" gauge locomotives. Quick decision maker.',
    avatar: null
  },
  {
    id: 'CLIENT-004',
    name: 'Heritage Railway Trust',
    type: 'heritage_railway',
    contact: 'Michael Brown',
    email: 'm.brown@heritagerailway.org',
    phone: '+44 1326 453789',
    location: 'Falmouth, Cornwall',
    establishedYear: 1970,
    status: 'active',
    rating: 4,
    totalProjects: 6,
    activeProjects: 1,
    totalValue: 78000,
    lastProject: '2024-03-10',
    services: ['cad', 'repair'],
    notes: 'Trust-run railway. Focused on preserving Cornish railway heritage.',
    avatar: null
  },
  {
    id: 'CLIENT-005',
    name: 'Railway Workshop Ltd',
    type: 'commercial',
    contact: 'Emma Wilson',
    email: 'e.wilson@railwayworkshop.co.uk',
    phone: '+44 1752 987654',
    location: 'Plymouth, Devon',
    establishedYear: 2010,
    status: 'active',
    rating: 4,
    totalProjects: 15,
    activeProjects: 1,
    totalValue: 156000,
    lastValue: 9200,
    lastProject: '2024-05-18',
    services: ['fabrication', 'repair', 'cad'],
    notes: 'Commercial workshop. Regular contracts for precision engineering work.',
    avatar: null
  },
  {
    id: 'CLIENT-006',
    name: 'Cornish Steam Society',
    type: 'society',
    contact: 'David Jenkins',
    email: 'd.jenkins@cornishsteam.org',
    phone: '+44 1872 334455',
    location: 'Truro, Cornwall',
    establishedYear: 1988,
    status: 'active',
    rating: 5,
    totalProjects: 9,
    activeProjects: 1,
    totalValue: 98000,
    lastProject: '2024-05-17',
    services: ['steam', 'repair'],
    notes: 'Enthusiast society. Organizes steam events throughout Cornwall.',
    avatar: null
  }
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const getClientTypeIcon = (type: string) => {
    switch (type) {
      case 'heritage_railway': return Train
      case 'heritage_organization': return Building
      case 'private_collector': return User
      case 'commercial': return Factory
      case 'society': return Users
      default: return Building
    }
  }

  const getClientTypeColor = (type: string) => {
    switch (type) {
      case 'heritage_railway': return '#0066CC'
      case 'heritage_organization': return '#10B981'
      case 'private_collector': return '#8B5CF6'
      case 'commercial': return '#F59E0B'
      case 'society': return '#EF4444'
      default: return '#6B7280'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50'
      case 'inactive': return 'text-gray-600 bg-gray-50'
      case 'prospect': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const filteredClients = mockClients
    .filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === 'all' || client.type === selectedType
      const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus
      return matchesSearch && matchesType && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'value':
          return b.totalValue - a.totalValue
        case 'projects':
          return b.totalProjects - a.totalProjects
        case 'recent':
          return new Date(b.lastProject).getTime() - new Date(a.lastProject).getTime()
        default:
          return a.name.localeCompare(b.name)
      }
    })

  // Summary statistics
  const totalClients = mockClients.length
  const activeClients = mockClients.filter(c => c.status === 'active').length
  const totalValue = mockClients.reduce((sum, c) => sum + c.totalValue, 0)
  const avgRating = mockClients.reduce((sum, c) => sum + c.rating, 0) / mockClients.length

  const clientTypes = [
    { id: 'all', label: 'All Clients' },
    { id: 'heritage_railway', label: 'Heritage Railways' },
    { id: 'heritage_organization', label: 'Heritage Organizations' },
    { id: 'private_collector', label: 'Private Collectors' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'society', label: 'Societies' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">Manage customer relationships and project history</p>
        </div>
        <Link
          href="/portal/clients/new"
          className="px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Clients</p>
              <p className="text-2xl font-bold text-gray-900">{activeClients}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <PoundSterling className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}/5</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
          >
            {clientTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="prospect">Prospect</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006FEE] focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="value">Sort by Value</option>
            <option value="projects">Sort by Projects</option>
            <option value="recent">Sort by Recent</option>
          </select>
        </div>
      </div>

      {/* Clients List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Clients ({filteredClients.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredClients.map((client) => {
            const TypeIcon = getClientTypeIcon(client.type)
            const typeColor = getClientTypeColor(client.type)

            return (
              <div key={client.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${typeColor}15` }}
                    >
                      <TypeIcon className="w-6 h-6" style={{ color: typeColor }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg hover:text-[#006FEE] transition-colors">
                            <Link href={`/portal/clients/${client.id}`}>
                              {client.name}
                            </Link>
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-600">{client.contact}</span>
                            <span 
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}
                            >
                              {client.status}
                            </span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < client.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">{formatCurrency(client.totalValue)}</p>
                          <p className="text-sm text-gray-600">{client.totalProjects} projects</p>
                        </div>
                      </div>

                      {/* Client Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${client.email}`} className="hover:text-[#006FEE] transition-colors">
                            {client.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${client.phone}`} className="hover:text-[#006FEE] transition-colors">
                            {client.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {client.location}
                        </div>
                      </div>

                      {/* Services and Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FileText className="w-4 h-4" />
                            {client.activeProjects} active
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            Last: {formatDate(client.lastProject)}
                          </div>
                          <div className="flex gap-1">
                            {client.services.map(service => (
                              <span 
                                key={service}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/portal/clients/${client.id}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-[#006FEE] hover:bg-blue-50 rounded-md transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Link>
                          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                        </div>
                      </div>

                      {/* Notes */}
                      {client.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{client.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {filteredClients.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          <Link
            href="/portal/clients/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#006FEE] text-white rounded-lg hover:bg-[#0050B3] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Client
          </Link>
        </div>
      )}
    </div>
  )
}