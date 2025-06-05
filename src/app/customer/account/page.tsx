'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Package, 
  Settings,
  LogOut,
  Edit2,
  Shield,
  Bell,
  Award
} from 'lucide-react'

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('customerUser')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // Set default guest user
      setUser({
        name: 'Guest User',
        email: 'guest@swse.com',
        tier: 'Guest'
      })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('customerToken')
    localStorage.removeItem('customerUser')
    router.push('/customer/auth/login')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ]

  const stats = [
    { label: 'Total Orders', value: '24' },
    { label: 'Total Spent', value: '$12,456' },
    { label: 'Points Earned', value: '2,456' },
    { label: 'Member Since', value: 'Jan 2024' }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F8FAFC'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0048AC 0%, #006FEE 50%, #0084FF 100%)',
        color: 'white',
        padding: '32px 24px',
        borderRadius: '0 0 24px 24px',
        boxShadow: '0 8px 24px rgba(0, 111, 238, 0.15)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            marginBottom: '8px'
          }}>
            My Account
          </h1>
          <p style={{ fontSize: '16px', opacity: 0.9 }}>
            Manage your profile and settings
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px'
      }}>
        {/* User Overview */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          border: '1px solid #E6F4FF',
          boxShadow: '0 4px 12px rgba(0, 111, 238, 0.04)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #006FEE 0%, #0084FF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                color: 'white',
                fontWeight: '700'
              }}>
                {user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'G'}
              </div>
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#003D88',
                  marginBottom: '4px'
                }}>
                  {user?.name || 'Guest User'}
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#5B9FFF',
                  marginBottom: '8px'
                }}>
                  {user?.email || 'guest@swse.com'}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Award size={16} color="#FFB800" />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#FFB800'
                  }}>
                    {user?.tier || 'Guest'} Member
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'none',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                color: '#6B7280',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#DC2626'
                e.currentTarget.style.color = '#DC2626'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB'
                e.currentTarget.style.color = '#6B7280'
              }}
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #E6F4FF'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <p style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#003D88',
                  marginBottom: '4px'
                }}>
                  {stat.value}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#5B9FFF'
                }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '24px',
          borderBottom: '1px solid #E6F4FF',
          paddingBottom: '4px'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: activeTab === tab.id ? '#F0F9FF' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #006FEE' : '2px solid transparent',
                borderRadius: '8px 8px 0 0',
                color: activeTab === tab.id ? '#006FEE' : '#5B9FFF',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #E6F4FF',
          boxShadow: '0 4px 12px rgba(0, 111, 238, 0.04)'
        }}>
          {activeTab === 'profile' && (
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#003D88',
                marginBottom: '24px'
              }}>
                Profile Information
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    readOnly
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: '#F9FAFB'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: '#F9FAFB'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Add phone number"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: '#F9FAFB'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Add company name"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: '#F9FAFB'
                    }}
                  />
                </div>
              </div>
              
              <button
                style={{
                  marginTop: '24px',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #006FEE 0%, #0084FF 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 111, 238, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Edit2 size={18} />
                Update Profile
              </button>
            </div>
          )}

          {activeTab === 'billing' && (
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#003D88',
                marginBottom: '24px'
              }}>
                Billing & Payment
              </h3>
              
              <div style={{
                background: '#F0F9FF',
                border: '1px solid #E6F4FF',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <CreditCard size={24} color="#006FEE" />
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#003D88'
                  }}>
                    Payment Methods
                  </h4>
                </div>
                
                <p style={{
                  fontSize: '14px',
                  color: '#5B9FFF',
                  marginBottom: '16px'
                }}>
                  No payment methods saved
                </p>
                
                <button
                  onClick={() => router.push('/customer/payment')}
                  style={{
                    padding: '10px 20px',
                    background: 'white',
                    border: '1px solid #006FEE',
                    borderRadius: '8px',
                    color: '#006FEE',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F0F9FF'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  Add Payment Method
                </button>
              </div>
              
              <div style={{
                background: '#F9FAFB',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#003D88',
                  marginBottom: '16px'
                }}>
                  Billing Address
                </h4>
                
                <p style={{
                  fontSize: '14px',
                  color: '#6B7280'
                }}>
                  No billing address on file
                </p>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#003D88',
                marginBottom: '24px'
              }}>
                Security Settings
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                <div style={{
                  padding: '20px',
                  border: '1px solid #E6F4FF',
                  borderRadius: '12px'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#003D88',
                    marginBottom: '8px'
                  }}>
                    Password
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    marginBottom: '16px'
                  }}>
                    Last changed 30 days ago
                  </p>
                  <button
                    style={{
                      padding: '10px 20px',
                      background: '#F0F9FF',
                      border: '1px solid #E6F4FF',
                      borderRadius: '8px',
                      color: '#006FEE',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Change Password
                  </button>
                </div>
                
                <div style={{
                  padding: '20px',
                  border: '1px solid #E6F4FF',
                  borderRadius: '12px'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#003D88',
                    marginBottom: '8px'
                  }}>
                    Two-Factor Authentication
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    marginBottom: '16px'
                  }}>
                    Protect your account with an extra layer of security
                  </p>
                  <button
                    style={{
                      padding: '10px 20px',
                      background: '#F0F9FF',
                      border: '1px solid #E6F4FF',
                      borderRadius: '8px',
                      color: '#006FEE',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
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
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#003D88',
                marginBottom: '24px'
              }}>
                Notification Preferences
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {[
                  { label: 'Order Updates', description: 'Get notified about order status changes' },
                  { label: 'Promotional Emails', description: 'Receive special offers and discounts' },
                  { label: 'Product Updates', description: 'Learn about new products and features' },
                  { label: 'Newsletter', description: 'Monthly company news and updates' }
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px',
                      border: '1px solid #E6F4FF',
                      borderRadius: '8px'
                    }}
                  >
                    <div>
                      <p style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#003D88',
                        marginBottom: '4px'
                      }}>
                        {item.label}
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: '#6B7280'
                      }}>
                        {item.description}
                      </p>
                    </div>
                    <label style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '48px',
                      height: '24px'
                    }}>
                      <input
                        type="checkbox"
                        defaultChecked={index === 0}
                        style={{
                          opacity: 0,
                          width: 0,
                          height: 0
                        }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#E5E7EB',
                        borderRadius: '24px',
                        transition: 'all 0.3s'
                      }}>
                        <span style={{
                          position: 'absolute',
                          height: '18px',
                          width: '18px',
                          left: '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: 'all 0.3s'
                        }} />
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}