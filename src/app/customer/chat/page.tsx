'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, Plus, Search, Menu, X, Trash2, Train, Sparkles, Upload, Paperclip, Image as ImageIcon, Cog, Factory, Wrench, Shield, PoundSterling, Award, TrendingUp, Clock } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  attachments?: { name: string; type: string }[]
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export default function SWSEChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredConv, setHoveredConv] = useState<string | null>(null)
  const [hoveredQuickAction, setHoveredQuickAction] = useState<number | null>(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load conversations from local storage
    loadConversations()
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages update
    scrollToBottom()
  }, [currentConversation?.messages])

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [inputMessage])

  useEffect(() => {
    setShowWelcome(!currentConversation || currentConversation.messages.length === 0)
  }, [currentConversation])

  const loadConversations = async () => {
    try {
      const saved = localStorage.getItem('swseConversations')
      if (saved) {
        const parsed = JSON.parse(saved)
        setConversations(parsed)
        if (parsed.length > 0 && !currentConversation) {
          setCurrentConversation(parsed[0])
        }
      }
    } catch (error) {
      console.error('Error loading conversations:', error)
    }
  }

  const saveConversations = (convs: Conversation[]) => {
    localStorage.setItem('swseConversations', JSON.stringify(convs))
    setConversations(convs)
  }

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const updated = [newConversation, ...conversations]
    saveConversations(updated)
    setCurrentConversation(newConversation)
  }

  const sendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage
    if (!messageToSend.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend.trim(),
      timestamp: new Date()
    }

    // Update current conversation
    const updatedConversation = currentConversation || {
      id: Date.now().toString(),
      title: messageToSend.substring(0, 30) + '...',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    updatedConversation.messages.push(userMessage)
    updatedConversation.updatedAt = new Date()

    // Update title if it's the first message
    if (updatedConversation.messages.length === 1) {
      updatedConversation.title = messageToSend.substring(0, 30) + (messageToSend.length > 30 ? '...' : '')
    }

    // Update state
    setCurrentConversation({ ...updatedConversation })
    setInputMessage('')
    setIsLoading(true)

    try {
      // Simulate API call with SWSE engineering responses
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate contextual response based on keywords
      let responseContent = ''
      const lowerInput = messageToSend.toLowerCase()
      
      if (lowerInput.includes('steam') || lowerInput.includes('locomotive') || lowerInput.includes('boiler')) {
        responseContent = `I'd be happy to help with your steam locomotive project! 🚂

**Steam Locomotive Restoration Services**:

**Boiler Restoration** ⭐ Our Specialty
- **Complete boiler inspection** to 180 PSI standards
- **Fire tube replacement** - up to 24 tubes per locomotive
- **Smokebox refurbishment** with heritage certification
- **Lead time**: 3-6 months
- **Pricing**: From £15,000
- **Certification**: Heritage Railway approved

**Mechanical Overhaul** 💪 Comprehensive Service
- **Cylinder rebuilds** with precision boring
- **Valve gear restoration** to original specifications
- **Wheel set maintenance** including re-profiling
- **Lead time**: 2-4 months
- **Pricing**: From £8,500

**Key SWSE Benefits**:
- ⚡ **20+ Years Experience** - Cornwall's trusted specialists
- 🛡️ **Full Insurance Coverage** - £2M public liability
- 🌡️ **Heritage Certification** - Network Rail approved
- 📱 **Project Tracking** - Real-time updates

Would you like me to arrange a site visit for your locomotive?`
      } else if (lowerInput.includes('cad') || lowerInput.includes('design') || lowerInput.includes('drawing')) {
        responseContent = `I'll help you with professional CAD design services! 📐

**3D CAD Design Capabilities**:

**SolidWorks 3D Modeling** ⭐ Industry Standard
- **Full assemblies** - complete locomotive components
- **Technical drawings** to BS 8888 standards
- **FEA stress analysis** for critical components
- **Lead time**: 1-3 weeks
- **Pricing**: From £75/hour
- **Formats**: STEP, IGES, DWG, PDF

**AutoCAD Technical Drawings** 💪 Precision Documentation
- **Manufacturing drawings** with full tolerancing
- **As-built documentation** for heritage projects
- **Installation drawings** with assembly sequences
- **Lead time**: 1-2 weeks
- **Pricing**: From £65/hour

**Recent Projects**:
- **Ffestiniog Railway** - Complete boiler assembly drawings
- **Bodmin Railway** - Rolling stock CAD models
- **West Somerset Railway** - Signal box mechanism design

**SWSE CAD Services Include**:
- ⚡ **Rapid Prototyping** - 3D printed test parts
- 🛡️ **IP Protection** - Secure file handling
- 🌡️ **Legacy Support** - Converting old drawings
- 📱 **Cloud Access** - Secure file sharing

Need drawings for a specific component? I can connect you with our design team!`
      } else if (lowerInput.includes('repair') || lowerInput.includes('maintenance') || lowerInput.includes('emergency')) {
        responseContent = `SWSE Emergency Repair Services - Available 24/7! 🔧

**Plant & Machinery Repair**:

**Emergency Callout** ⚡ 24/7 Available
- **Response time**: Within 2 hours Cornwall-wide
- **Mobile workshop** - fully equipped van
- **On-site welding** and fabrication capabilities
- **Pricing**: £95/hour + parts
- **Coverage**: Industrial & heritage equipment

**Planned Maintenance** 💪 Preventive Care
- **Pump overhauls** - centrifugal & positive displacement
- **Gearbox rebuilds** - all makes and models
- **Hydraulic repairs** - systems & components
- **Lead time**: 1-2 weeks
- **Pricing**: Quote on inspection

**Recent Emergency Projects**:
- **Cornwall Clay Industries** - Main conveyor gearbox
- **Mining Operations Ltd** - Hydraulic pump failure
- **Heritage Railway** - Steam crane breakdown

**SWSE Repair Advantages**:
- ⚡ **Certified Engineers** - Time-served professionals
- 🛡️ **Parts Sourcing** - Obsolete & modern components
- 🌡️ **Warranty Coverage** - 12 months all repairs
- 📱 **Progress Updates** - Real-time job tracking

Experiencing a breakdown? I can dispatch our emergency team immediately!`
      } else if (lowerInput.includes('quote') || lowerInput.includes('price') || lowerInput.includes('cost')) {
        responseContent = `I'll help you get an accurate SWSE engineering quote! 💷

**Pricing Guide**:

**Steam Locomotive Services**
- **Boiler inspection**: £2,500 - £5,000
- **Complete restoration**: £15,000 - £85,000
- **Mechanical overhaul**: £8,500 - £25,000
- **Certification**: £1,500 - £3,000

**CAD Design Services**
- **SolidWorks modeling**: £75/hour
- **Technical drawings**: £65/hour
- **FEA analysis**: £85/hour
- **Rush jobs**: +50% premium

**Plant Repair Services**
- **Emergency callout**: £95/hour + parts
- **Planned maintenance**: £75/hour + parts
- **Material markup**: 15% on cost
- **Travel**: £1.50/mile beyond 25 miles

**Bespoke Fabrication**
- **Design consultation**: £85/hour
- **Material**: At cost + 15%
- **Machining**: £65-95/hour depending on complexity
- **Assembly**: £75/hour

**Quick Quote Process**:
1. **Brief description** of your project
2. **Site visit** (free within 50 miles)
3. **Detailed quotation** within 48 hours
4. **Fixed price** guarantee for 30 days

**Payment Terms**:
- **New clients**: 50% deposit, 50% on completion
- **Established clients**: Net 30 days
- **Large projects**: Staged payments available

Ready to get started? I can arrange a consultation with our engineering team!`
      } else if (lowerInput.includes('help') || lowerInput.includes('support') || lowerInput.includes('contact')) {
        responseContent = `Welcome to South West Steam Engineering Support! 🏗️

**How can I help you today?**

**🚂 Steam Engineering Services**
- Locomotive restoration quotes
- Boiler inspection scheduling
- Heritage certification guidance
- Project timeline planning

**📐 CAD Design Support**
- SolidWorks modeling requests
- Technical drawing standards
- File format conversions
- Design consultation booking

**🔧 Repair & Maintenance**
- Emergency breakdown support
- Planned maintenance quotes
- Parts sourcing assistance
- Warranty claim processing

**💼 Business Services**
- Account setup for contractors
- Volume pricing discussions
- Payment terms negotiation
- Project management

**📞 Contact Information**
- **Phone**: 01726 123 456
- **Emergency**: 07700 900 123
- **Email**: enquiries@swsteam.co.uk
- **Address**: Bodmin Industrial Estate, Cornwall

**🕒 Operating Hours**
- **Workshop**: Mon-Fri 7:30-17:30
- **Emergency**: 24/7 Cornwall-wide
- **Office**: Mon-Fri 8:00-17:00
- **Quote Service**: Same day response

Just let me know what specific engineering support you need!`
      } else {
        responseContent = `Thank you for contacting South West Steam Engineering! 🏗️

I'm here to assist with all your engineering needs:

**🚂 Steam Locomotive Services**
- Heritage railway restoration
- Boiler inspections & certification
- Mechanical overhauls

**📐 Professional CAD Design**
- SolidWorks 3D modeling
- Technical drawings to BS standards
- Stress analysis & validation

**🔧 Plant & Machinery Repair**
- 24/7 emergency callout
- Planned maintenance programs
- Parts sourcing & fabrication

**⚙️ Bespoke Engineering**
- Custom component design
- Precision machining
- Project management

Could you tell me more about your specific engineering requirements? I'd be happy to connect you with the right specialist or provide detailed information about our services.`
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      }

      // Update conversation with assistant response
      updatedConversation.messages.push(assistantMessage)
      updatedConversation.updatedAt = new Date()

      setCurrentConversation({ ...updatedConversation })

      // Save to localStorage
      const updatedConversations = conversations.map(conv => 
        conv.id === updatedConversation.id ? updatedConversation : conv
      )
      
      if (!conversations.find(conv => conv.id === updatedConversation.id)) {
        updatedConversations.unshift(updatedConversation)
      }
      
      saveConversations(updatedConversations)

    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const deleteConversation = (convId: string) => {
    const updated = conversations.filter(conv => conv.id !== convId)
    saveConversations(updated)
    
    if (currentConversation?.id === convId) {
      setCurrentConversation(updated.length > 0 ? updated[0] : null)
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const quickActions = [
    {
      icon: Train,
      title: 'Steam Locomotive Restoration',
      description: 'Get quotes for heritage railway locomotive restoration services',
      message: 'I need information about steam locomotive restoration services. Can you help me with pricing and timelines?'
    },
    {
      icon: Cog,
      title: 'CAD Design Services',
      description: 'Professional 3D modeling and technical drawing services',
      message: 'I need CAD design services for an engineering project. What are your capabilities and pricing?'
    },
    {
      icon: Factory,
      title: 'Emergency Plant Repair',
      description: '24/7 industrial machinery breakdown support',
      message: 'I have an emergency plant breakdown and need immediate repair support. What is your response time?'
    },
    {
      icon: Wrench,
      title: 'Bespoke Engineering',
      description: 'Custom fabrication and precision engineering solutions',
      message: 'I need custom engineering solutions for a unique project. Can you help with design and fabrication?'
    }
  ]

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* Sidebar */}
      <div style={{
        width: isSidebarOpen ? '320px' : '0',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        borderRight: '1px solid #E2E8F0',
        backgroundColor: 'white'
      }}>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Train size={20} color="white" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1E293B', margin: 0 }}>
                SWSE Engineering
              </h3>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
                Expert Support
              </p>
            </div>
          </div>

          <button
            onClick={createNewConversation}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #1E3A8A',
              backgroundColor: '#1E3A8A',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1E40AF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1E3A8A'
            }}
          >
            <Plus size={16} />
            New Engineering Chat
          </button>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                border: '1px solid #D1D5DB',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#F9FAFB'
              }}
            />
          </div>

          {/* Conversations List */}
          <div style={{ height: 'calc(100vh - 280px)', overflowY: 'auto' }}>
            {filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={() => setCurrentConversation(conversation)}
                onMouseEnter={() => setHoveredConv(conversation.id)}
                onMouseLeave={() => setHoveredConv(null)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  backgroundColor: currentConversation?.id === conversation.id ? '#EFF6FF' : 
                                   hoveredConv === conversation.id ? '#F8FAFC' : 'transparent',
                  border: currentConversation?.id === conversation.id ? '1px solid #BFDBFE' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1E293B',
                      margin: '0 0 4px 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {conversation.title}
                    </h4>
                    <p style={{
                      fontSize: '12px',
                      color: '#64748B',
                      margin: 0
                    }}>
                      {conversation.updatedAt.toLocaleDateString()}
                    </p>
                  </div>
                  {hoveredConv === conversation.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteConversation(conversation.id)
                      }}
                      style={{
                        padding: '4px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#FEF2F2',
                        color: '#EF4444',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #E2E8F0',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <Menu size={16} color="#64748B" />
          </button>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B', margin: 0 }}>
              {currentConversation?.title || 'South West Steam Engineering Support'}
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>
              Expert engineering assistance - Available 24/7
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
          backgroundColor: '#F8FAFC'
        }}>
          {showWelcome && (
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              textAlign: 'center',
              padding: '40px 20px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <Train size={40} color="white" />
              </div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#1E293B',
                marginBottom: '16px'
              }}>
                Welcome to SWSE Engineering Support
              </h1>
              <p style={{
                fontSize: '18px',
                color: '#64748B',
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                Get expert assistance with steam locomotive restoration, CAD design, plant repair, 
                and bespoke engineering solutions. Our Cornwall-based specialists are here to help.
              </p>

              {/* Quick Actions */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginTop: '40px'
              }}>
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    onClick={() => sendMessage(action.message)}
                    onMouseEnter={() => setHoveredQuickAction(index)}
                    onMouseLeave={() => setHoveredQuickAction(null)}
                    style={{
                      padding: '24px',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      transform: hoveredQuickAction === index ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: hoveredQuickAction === index 
                        ? '0 8px 20px rgba(30, 58, 138, 0.15)' 
                        : '0 2px 4px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      <action.icon size={24} color="#1E3A8A" />
                    </div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1E293B',
                      marginBottom: '8px'
                    }}>
                      {action.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#64748B',
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {action.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {currentConversation?.messages.map(message => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                marginBottom: '24px',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '70%',
                padding: '16px 20px',
                borderRadius: '16px',
                backgroundColor: message.role === 'user' ? '#1E3A8A' : 'white',
                color: message.role === 'user' ? 'white' : '#1E293B',
                border: message.role === 'assistant' ? '1px solid #E2E8F0' : 'none',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
                <div style={{
                  fontSize: '12px',
                  opacity: 0.7,
                  marginTop: '8px'
                }}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 20px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Train size={20} color="white" />
              </div>
              <div style={{
                padding: '16px 20px',
                borderRadius: '16px',
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                color: '#64748B',
                fontSize: '14px'
              }}>
                SWSE Engineering specialist is typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '24px',
          borderTop: '1px solid #E2E8F0',
          backgroundColor: 'white'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Ask about steam locomotives, CAD design, plant repair, or any engineering service..."
              style={{
                width: '100%',
                minHeight: '56px',
                maxHeight: '200px',
                padding: '16px 60px 16px 20px',
                borderRadius: '12px',
                border: '1px solid #D1D5DB',
                fontSize: '14px',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <div style={{
              position: 'absolute',
              right: '12px',
              bottom: '12px',
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                style={{ display: 'none' }}
                accept="image/*,.pdf,.doc,.docx"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Paperclip size={16} color="#64748B" />
              </button>
              <button
                onClick={() => sendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: inputMessage.trim() && !isLoading ? '#1E3A8A' : '#E2E8F0',
                  color: inputMessage.trim() && !isLoading ? 'white' : '#9CA3AF',
                  cursor: inputMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}