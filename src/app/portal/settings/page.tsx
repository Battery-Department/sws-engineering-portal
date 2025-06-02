'use client'

// Disable static generation for this page
export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Package,
  CreditCard,
  TrendingUp,
  Users,
  Home,
  ShoppingCart,
  DollarSign,
  Truck,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Mail,
  Building,
  Phone,
  Globe,
  Shield,
  Key,
  Eye,
  EyeOff,
  Save,
  BarChart,
  CheckCircle
} from 'lucide-react'
// import { useAuth } from '@/contexts/AuthContext'

const navigation = [
  { name: 'Dashboard', href: '/portal/dashboard', icon: Home, current: false },
  { name: 'Orders', href: '/portal/orders', icon: ShoppingCart, current: false },
  { name: 'Billing', href: '/portal/billing', icon: DollarSign, current: false },
  { name: 'Inventory', href: '/portal/inventory', icon: Package, current: false },
  { name: 'Shipping', href: '/portal/shipping', icon: Truck, current: false },
  { name: 'Analytics', href: '/portal/analytics', icon: BarChart, current: false },
  { name: 'Settings', href: '/portal/settings', icon: Settings, current: true },
]

export default function SettingsPage() {
  // const { user, loading } = useAuth()
  const user = null; // Temporary for build
  const loading = false; // Temporary for build
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [showPassword, setShowPassword] = useState(false)
  const [savedMessage, setSavedMessage] = useState('')

  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'Battery Department',
    email: user?.email || 'demo@battery.com',
    phone: '+1 (555) 123-4567',
    website: 'www.battery-department.com',
    address: '123 Battery Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94111'
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    orderUpdates: true,
    marketingEmails: false,
    securityAlerts: true,
    monthlyReports: true
  })

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #e5e7eb',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    )
  }

  if (!user) {
    router.push('/portal/auth/login')
    return null
  }

  const handleSave = () => {
    setSavedMessage('Settings saved successfully!')
    setTimeout(() => setSavedMessage(''), 3000)
  }

  const tabs = [
    { id: 'general', name: 'General', icon: Building },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'integrations', name: 'Integrations', icon: Globe }
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Sidebar - Mobile */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        display: sidebarOpen ? 'flex' : 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }} onClick={() => setSidebarOpen(false)}>
        <div style={{
          position: 'relative',
          flex: '1 1 0%',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '256px',
          width: '100%',
          backgroundColor: '#1f2937'
        }} onClick={(e) => e.stopPropagation()}>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Battery Hub</span>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  padding: '6px',
                  borderRadius: '6px',
                  color: 'white',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <X size={24} />
              </button>
            </div>
          </div>
          <nav style={{ flex: 1, padding: '0 8px' }}>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  router.push(item.href)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  margin: '2px 0',
                  borderRadius: '8px',
                  color: item.current ? 'white' : '#d1d5db',
                  backgroundColor: item.current ? '#111827' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <item.icon size={20} style={{ marginRight: '12px' }} />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div style={{
        display: 'none',
        position: 'fixed',
        top: 0,
        bottom: 0,
        zIndex: 30,
        width: '256px',
        backgroundColor: '#1f2937'
      }} className="md-show">
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
          <div style={{ padding: '20px' }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Battery Hub</span>
          </div>
          <nav style={{ flex: 1, padding: '0 8px' }}>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  router.push(item.href)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  margin: '2px 0',
                  borderRadius: '8px',
                  color: item.current ? 'white' : '#d1d5db',
                  backgroundColor: item.current ? '#111827' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <item.icon size={20} style={{ marginRight: '12px' }} />
                {item.name}
              </a>
            ))}
          </nav>
          <div style={{ padding: '16px', borderTop: '1px solid #374151' }}>
            <a
              href="/portal/auth/login"
              onClick={(e) => {
                e.preventDefault()
                router.push('/portal/auth/login')
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '8px',
                color: '#d1d5db',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
            >
              <LogOut size={20} style={{ marginRight: '12px' }} />
              Sign out
            </a>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div style={{ paddingLeft: 0 }} className="md-content">
        {/* Header */}
        <header style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 20
        }}>
          <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'block'
              }}
              className="md-hide"
            >
              <Menu size={24} />
            </button>
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Settings</h1>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '500'
            }}>
              {user?.name?.[0] || 'U'}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main style={{ padding: '24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            {/* Success Message */}
            {savedMessage && (
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#d1fae5',
                color: '#065f46',
                borderRadius: '8px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle size={20} />
                {savedMessage}
              </div>
            )}

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid #e5e7eb', paddingBottom: '1px' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '12px 24px',
                    borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: activeTab === tab.id ? '#6366f1' : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  <tab.icon size={18} />
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
              {activeTab === 'general' && (
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
                    General Settings
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={generalSettings.companyName}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={generalSettings.email}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={generalSettings.phone}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Website
                      </label>
                      <input
                        type="url"
                        value={generalSettings.website}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, website: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Address
                      </label>
                      <input
                        type="text"
                        value={generalSettings.address}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        City
                      </label>
                      <input
                        type="text"
                        value={generalSettings.city}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, city: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        State
                      </label>
                      <input
                        type="text"
                        value={generalSettings.state}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, state: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={generalSettings.zipCode}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, zipCode: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
                    Security Settings
                  </h2>
                  <div style={{ maxWidth: '500px' }}>
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Current Password
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter current password"
                          style={{
                            width: '100%',
                            padding: '10px 40px 10px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#6b7280'
                          }}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: '32px' }}>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                    <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                        Two-Factor Authentication
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                        Add an extra layer of security to your account
                      </p>
                      <button
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#6366f1',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
                    Notification Preferences
                  </h2>
                  <div style={{ maxWidth: '600px' }}>
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 0',
                        borderBottom: '1px solid #e5e7eb'
                      }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '4px' }}>
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            {key === 'emailAlerts' && 'Receive important system alerts via email'}
                            {key === 'orderUpdates' && 'Get notified when order status changes'}
                            {key === 'marketingEmails' && 'Receive promotional emails and newsletters'}
                            {key === 'securityAlerts' && 'Get notified about security-related events'}
                            {key === 'monthlyReports' && 'Receive monthly performance reports'}
                          </div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                            style={{ opacity: 0, width: 0, height: 0 }}
                          />
                          <span style={{
                            position: 'absolute',
                            cursor: 'pointer',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: value ? '#6366f1' : '#cbd5e1',
                            transition: '0.4s',
                            borderRadius: '24px'
                          }}>
                            <span style={{
                              position: 'absolute',
                              content: '',
                              height: '16px',
                              width: '16px',
                              left: value ? '28px' : '4px',
                              bottom: '4px',
                              backgroundColor: 'white',
                              transition: '0.4s',
                              borderRadius: '50%'
                            }} />
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
                    Integrations
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    {[
                      { name: 'Stripe', description: 'Payment processing', connected: true, icon: '💳' },
                      { name: 'Shippo', description: 'Shipping and logistics', connected: true, icon: '📦' },
                      { name: 'QuickBooks', description: 'Accounting software', connected: false, icon: '📊' },
                      { name: 'Salesforce', description: 'CRM integration', connected: false, icon: '☁️' }
                    ].map((integration) => (
                      <div key={integration.name} style={{
                        padding: '24px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        transition: 'all 0.2s'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{
                              width: '48px',
                              height: '48px',
                              backgroundColor: '#f3f4f6',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '24px'
                            }}>
                              {integration.icon}
                            </div>
                            <div>
                              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                                {integration.name}
                              </h3>
                              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                                {integration.description}
                              </p>
                            </div>
                          </div>
                          <button
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              border: '1px solid',
                              borderColor: integration.connected ? '#10b981' : '#6366f1',
                              backgroundColor: integration.connected ? '#d1fae5' : 'white',
                              color: integration.connected ? '#065f46' : '#6366f1',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            {integration.connected ? 'Connected' : 'Connect'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div style={{ marginTop: '32px', padding: '24px 0', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleSave}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#4f46e5'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#6366f1'
                  }}
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .md-show {
            display: block !important;
          }
          .md-hide {
            display: none !important;
          }
          .md-content {
            padding-left: 256px !important;
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}