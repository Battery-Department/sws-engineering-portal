'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  AlertCircle,
  CheckCircle,
  Train,
  Wrench,
  Settings,
  Users,
  ChevronLeft,
  Loader2,
  Building2,
  Globe,
  Facebook,
  Linkedin,
  Twitter
} from 'lucide-react'

interface ContactForm {
  name: string
  email: string
  phone: string
  company: string
  projectType: string
  message: string
}

export default function CustomerContactPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<ContactForm>>({})

  const projectTypes = [
    'Steam Locomotive Restoration',
    'CAD Design Services',
    'Plant & Machinery Repair',
    'Railway Engineering',
    'Bespoke Fabrication',
    'General Enquiry'
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    if (!formData.projectType) newErrors.projectType = 'Please select a project type'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          message: ''
        })
        setSubmitStatus('idle')
      }, 3000)
    }, 2000)
  }

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #006FEE 0%, #0084FF 100%)',
        color: 'white',
        padding: '48px 24px',
        borderRadius: '0 0 24px 24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button
            onClick={() => router.push('/customer')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '24px',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
            }}
          >
            <ChevronLeft size={16} />
            Back to Home
          </button>
          
          <h1 style={{
            fontSize: '40px',
            fontWeight: '700',
            marginBottom: '16px'
          }}>
            Contact SWSE Engineering
          </h1>
          <p style={{
            fontSize: '20px',
            opacity: 0.9,
            maxWidth: '600px'
          }}>
            Get in touch with Cornwall's premier heritage railway and industrial engineering specialists
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px'
      }}>
        {/* Contact Information */}
        <div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '32px'
          }}>
            Get in Touch
          </h2>

          {/* Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '2px solid #E6F4FF',
              boxShadow: '0 4px 12px rgba(0, 111, 238, 0.04)'
            }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#EFF6FF',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Phone size={24} color="#006FEE" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                    Phone
                  </h3>
                  <p style={{ fontSize: '16px', color: '#006FEE', fontWeight: '600', marginBottom: '4px' }}>
                    01726 123 456
                  </p>
                  <p style={{ fontSize: '14px', color: '#6B7280' }}>
                    Emergency: 07700 900 123
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '2px solid #E6F4FF',
              boxShadow: '0 4px 12px rgba(0, 111, 238, 0.04)'
            }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#EFF6FF',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Mail size={24} color="#006FEE" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                    Email
                  </h3>
                  <p style={{ fontSize: '16px', color: '#006FEE', fontWeight: '600', marginBottom: '4px' }}>
                    enquiries@swsteam.co.uk
                  </p>
                  <p style={{ fontSize: '14px', color: '#6B7280' }}>
                    projects@swsteam.co.uk
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '2px solid #E6F4FF',
              boxShadow: '0 4px 12px rgba(0, 111, 238, 0.04)'
            }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#EFF6FF',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={24} color="#006FEE" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                    Address
                  </h3>
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>
                    South West Steam Engineering<br />
                    Unit 7, Bodmin Industrial Estate<br />
                    Walker Lines, Bodmin<br />
                    Cornwall PL31 1EU
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              border: '2px solid #E6F4FF',
              boxShadow: '0 4px 12px rgba(0, 111, 238, 0.04)'
            }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#EFF6FF',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Clock size={24} color="#006FEE" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                    Opening Hours
                  </h3>
                  <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
                    <p style={{ margin: '0 0 4px 0' }}>
                      <strong>Workshop:</strong> Mon-Fri 7:30am - 5:30pm
                    </p>
                    <p style={{ margin: '0 0 4px 0' }}>
                      <strong>Office:</strong> Mon-Fri 8:00am - 5:00pm
                    </p>
                    <p style={{ margin: '0 0 4px 0' }}>
                      <strong>Emergency:</strong> 24/7 Cornwall-wide
                    </p>
                    <p style={{ margin: 0, color: '#6B7280', fontStyle: 'italic' }}>
                      Closed weekends & bank holidays
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
              Follow Us
            </h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: '#1877F2',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Facebook size={20} color="white" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: '#0A66C2',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Linkedin size={20} color="white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: '#1DA1F2',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Twitter size={20} color="white" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            border: '2px solid #E6F4FF',
            boxShadow: '0 8px 24px rgba(0, 111, 238, 0.08)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '24px'
            }}>
              Send Us a Message
            </h2>

            {submitStatus === 'success' ? (
              <div style={{
                padding: '24px',
                backgroundColor: '#D1FAE5',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <CheckCircle size={48} color="#10B981" style={{ margin: '0 auto 16px auto' }} />
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#065F46', marginBottom: '8px' }}>
                  Message Sent Successfully!
                </h3>
                <p style={{ fontSize: '16px', color: '#047857' }}>
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `2px solid ${errors.name ? '#EF4444' : '#E5E7EB'}`,
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        backgroundColor: '#F9FAFB'
                      }}
                      onFocus={(e) => {
                        if (!errors.name) e.currentTarget.style.borderColor = '#006FEE'
                      }}
                      onBlur={(e) => {
                        if (!errors.name) e.currentTarget.style.borderColor = '#E5E7EB'
                      }}
                    />
                    {errors.name && (
                      <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: `2px solid ${errors.email ? '#EF4444' : '#E5E7EB'}`,
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        backgroundColor: '#F9FAFB'
                      }}
                      onFocus={(e) => {
                        if (!errors.email) e.currentTarget.style.borderColor = '#006FEE'
                      }}
                      onBlur={(e) => {
                        if (!errors.email) e.currentTarget.style.borderColor = '#E5E7EB'
                      }}
                    />
                    {errors.email && (
                      <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '2px solid #E5E7EB',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        backgroundColor: '#F9FAFB'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#006FEE'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E5E7EB'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '2px solid #E5E7EB',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        backgroundColor: '#F9FAFB'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#006FEE'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E5E7EB'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Project Type *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => handleInputChange('projectType', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: `2px solid ${errors.projectType ? '#EF4444' : '#E5E7EB'}`,
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                      backgroundColor: '#F9FAFB'
                    }}
                    onFocus={(e) => {
                      if (!errors.projectType) e.currentTarget.style.borderColor = '#006FEE'
                    }}
                    onBlur={(e) => {
                      if (!errors.projectType) e.currentTarget.style.borderColor = '#E5E7EB'
                    }}
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>{errors.projectType}</p>
                  )}
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Your Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: `2px solid ${errors.message ? '#EF4444' : '#E5E7EB'}`,
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s',
                      backgroundColor: '#F9FAFB',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => {
                      if (!errors.message) e.currentTarget.style.borderColor = '#006FEE'
                    }}
                    onBlur={(e) => {
                      if (!errors.message) e.currentTarget.style.borderColor = '#E5E7EB'
                    }}
                    placeholder="Tell us about your project requirements..."
                  />
                  {errors.message && (
                    <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    backgroundColor: '#006FEE',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) e.currentTarget.style.backgroundColor = '#0056CC'
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) e.currentTarget.style.backgroundColor = '#006FEE'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '48px 24px',
        borderTop: '2px solid #E5E7EB'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Find Us
          </h2>
          <div style={{
            backgroundColor: '#F3F4F6',
            borderRadius: '12px',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #E5E7EB'
          }}>
            <div style={{ textAlign: 'center' }}>
              <MapPin size={48} color="#9CA3AF" style={{ margin: '0 auto 16px auto' }} />
              <p style={{ color: '#6B7280', fontSize: '16px' }}>
                Interactive map would be displayed here
              </p>
              <p style={{ color: '#9CA3AF', fontSize: '14px', marginTop: '8px' }}>
                Unit 7, Bodmin Industrial Estate, Cornwall PL31 1EU
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}