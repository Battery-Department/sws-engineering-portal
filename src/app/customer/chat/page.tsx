'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, Plus, Search, Menu, X, Trash2, Battery, Sparkles, Upload, Paperclip, Image as ImageIcon, Package, Zap, Clock, Shield, DollarSign, Award, TrendingUp, Wrench } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { lithiIntegration } from '@/services/integrations/lithi-integration'

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

export default function LithiChatPage() {
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
    // Load conversations from local storage or API
    loadConversations()
    
    // Initialize Lithi integration
    lithiIntegration.initialize()
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
      const saved = localStorage.getItem('lithiConversations')
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
    localStorage.setItem('lithiConversations', JSON.stringify(convs))
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
      // Simulate API call with better responses
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate contextual response based on keywords
      let responseContent = ''
      const lowerInput = messageToSend.toLowerCase()
      
      if (lowerInput.includes('find batteries') || lowerInput.includes('battery') || lowerInput.includes('flexvolt')) {
        responseContent = `I'd be happy to help you find the perfect FlexVolt battery solution! 🔋

Based on your needs, here are our **top FlexVolt recommendations**:

**9Ah FlexVolt Battery** ⭐ Most Popular
- **Capacity**: 9Ah at 20V/60V MAX
- **Runtime**: Up to 6.5 hours continuous use
- **Work Output**: 340 screws / 260 ft cuts
- **Charging Time**: 55 minutes with fast charger
- **Price**: $125 (Save $124 off MSRP)
- **Weight**: Only 2.4 lbs

**15Ah FlexVolt Battery** 💪 Maximum Power
- **Capacity**: 15Ah at 20V/60V MAX
- **Runtime**: Up to 10 hours heavy-duty use
- **Work Output**: 560 screws / 430 ft cuts
- **Charging Time**: 90 minutes
- **Price**: $245 (Save $134 off MSRP)
- **Weight**: 3.2 lbs

**6Ah FlexVolt Battery** 🎯 Compact Power
- **Capacity**: 6Ah at 20V/60V MAX
- **Runtime**: Up to 4 hours
- **Work Output**: 225 screws / 175 ft cuts
- **Charging Time**: 45 minutes
- **Price**: $95 (Save $74 off MSRP)
- **Weight**: 1.9 lbs ultra-light

**Key FlexVolt Benefits**:
- ⚡ **Automatic Voltage Switching** - Works with all 20V and 60V MAX tools
- 🛡️ **3-Year Warranty** - Industry-leading protection
- 🌡️ **Temperature Management** - Performs in extreme conditions
- 📱 **Tool Connect** - Optional Bluetooth tracking

Would you like me to help calculate the exact battery configuration for your crew size?`
      } else if (lowerInput.includes('help') || lowerInput.includes('support')) {
        responseContent = `Welcome to Battery Department Support! I'm here to assist you 24/7. 

**How can I help you today?**

**🛒 Orders & Shipping**
- Track your FlexVolt order status
- Modify or cancel orders
- Express shipping options
- Bulk order processing

**🔋 FlexVolt Product Support**
- Battery compatibility guide
- Runtime calculations
- Tool recommendations
- Warranty claims

**💡 Technical Assistance**
- Charging best practices
- Storage guidelines
- Troubleshooting tips
- Safety protocols

**💰 Contractor Benefits**
- Volume discounts (10-20% off)
- Net 30 payment terms
- Dedicated account manager
- Priority support

**📊 Fleet Management**
- Battery tracking solutions
- Usage analytics
- Replacement planning
- Cost optimization

Just let me know what you need help with, and I'll provide expert assistance right away!`
      } else if (lowerInput.includes('runtime') || lowerInput.includes('how long')) {
        responseContent = `Let me calculate FlexVolt runtime for your tools! ⚡

**FlexVolt Runtime Guide:**

**Light-Duty Tools** (Drills, Impact Drivers)
- **6Ah**: 3-4 hours continuous
- **9Ah**: 5-6.5 hours continuous
- **15Ah**: 8-10 hours continuous

**Medium-Duty Tools** (Circular Saws, Grinders)
- **6Ah**: 45-60 minutes active cutting
- **9Ah**: 75-90 minutes active cutting
- **15Ah**: 2-2.5 hours active cutting

**Heavy-Duty Tools** (Table Saws, Miter Saws)
- **6Ah**: 175 cuts per charge
- **9Ah**: 260 cuts per charge
- **15Ah**: 430 cuts per charge

**Pro Tips for Maximum Runtime**:
- 🔄 Rotate batteries to prevent overheating
- ❄️ Store batteries at room temperature
- 🔌 Use DCB118 Fast Charger for quick turnaround
- 📊 Track usage with Tool Connect app

**Need a specific calculation?** Tell me:
1. Which tools you're using
2. Your typical daily usage
3. Crew size

I'll recommend the perfect battery configuration!`
      } else if (lowerInput.includes('order') || lowerInput.includes('track')) {
        responseContent = `I'll help you track your FlexVolt order! 📦

**Your Recent Orders:**

**Order #FV-2024-005** - Delivered ✅
- 2× 9Ah FlexVolt Battery
- 2× 15Ah FlexVolt Battery
- 1× DCB118 Fast Charger
- Total: $745 (Saved $486)
- **Tracking**: 1Z999AA10123456784

**Order #FV-2024-004** - In Transit 🚚
- 5× 6Ah FlexVolt Battery
- 3× 9Ah FlexVolt Battery
- Expected delivery: Tomorrow by 5 PM
- **Tracking**: 1Z999AA10123456783

**Quick Actions:**
- 📱 Get SMS delivery updates
- 🔄 Reorder favorite items
- 📄 Download invoices
- 💬 Contact your account manager

**Contractor Perks Active**:
- 15% volume discount applied
- Free next-day shipping
- Extended 30-day returns
- Priority customer support

Need to modify an order? Orders can be changed within 2 hours of placement. Let me know!`
      } else if (lowerInput.includes('recommend') || lowerInput.includes('crew') || lowerInput.includes('package')) {
        responseContent = `Let me recommend the perfect FlexVolt package for your crew! 👷‍♂️

**Popular Crew Packages:**

**🏆 MID-SIZE CREW PACKAGE** (Most Popular)
*Perfect for 4-6 person crews*
- 10× 6Ah FlexVolt batteries
- 10× 9Ah FlexVolt batteries  
- 5× 15Ah FlexVolt batteries
- **224 total runtime hours**
- **Price**: $4,425 (Save $1,105)
- ✅ Covers all tool types
- ✅ No downtime guarantee

**⚡ STARTER CREW PACKAGE**
*Ideal for 1-3 person teams*
- 2× 6Ah FlexVolt batteries
- 2× 9Ah FlexVolt batteries
- 2× 15Ah FlexVolt batteries
- **64 total runtime hours**
- **Price**: $1,270 (Save $379)
- ✅ Residential contractor favorite

**💪 LARGE CREW PACKAGE**
*Built for 10+ person operations*
- 20× 9Ah FlexVolt batteries
- 10× 15Ah FlexVolt batteries
- 5× DCB118 Fast Chargers
- **380 total runtime hours**
- **Price**: $6,995 (Save $2,430)
- ✅ Commercial project ready
- ✅ Dedicated support included

**Volume Discounts**:
- $1,000+: 10% off
- $2,500+: 15% off
- $5,000+: 20% off

Which crew size should I calculate for?`
      } else {
        responseContent = `Thanks for reaching out! I'm your FlexVolt expert, ready to help you power up your projects. ⚡

**Here's what I can help you with:**

• **Find FlexVolt batteries** - Match batteries to your DeWalt tools
• **Calculate runtime** - Get accurate estimates for your equipment  
• **Compare products** - 6Ah vs 9Ah vs 15Ah detailed comparison
• **Track orders** - Real-time shipping updates
• **Technical support** - Charging, storage, and troubleshooting
• **Bulk pricing** - Contractor discounts up to 20% off

**Quick FlexVolt Facts**:
- 🔋 Works with ALL DeWalt 20V MAX and 60V MAX tools
- ⚡ Automatic voltage switching technology
- 🏆 #1 contractor choice for reliability
- 🛡️ 3-year warranty + free replacement

What would you like to know more about? Feel free to ask me anything about FlexVolt batteries!`
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      }

      updatedConversation.messages.push(assistantMessage)
      
      // Update conversations list
      const updatedConversations = conversations.filter(c => c.id !== updatedConversation.id)
      saveConversations([updatedConversation, ...updatedConversations])
      setCurrentConversation({ ...updatedConversation })
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again in a moment.',
        timestamp: new Date()
      }
      updatedConversation.messages.push(errorMessage)
      setCurrentConversation({ ...updatedConversation })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteConversation = (id: string) => {
    const updated = conversations.filter(c => c.id !== id)
    saveConversations(updated)
    
    if (currentConversation?.id === id) {
      setCurrentConversation(updated[0] || null)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const filteredConversations = conversations.filter(conv => 
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      // Handle file upload
      console.log('Files selected:', files)
    }
  }

  const quickActions = [
    { 
      icon: Battery, 
      text: 'Find batteries', 
      color: '#006FEE',
      bgColor: '#E6F4FF',
      hoverBg: '#C3E7FF'
    },
    { 
      icon: Clock, 
      text: 'Calculate runtime', 
      color: '#7C3AED',
      bgColor: '#EDE9FE',
      hoverBg: '#DDD6FE'
    },
    { 
      icon: Package, 
      text: 'Track orders', 
      color: '#059669',
      bgColor: '#D1FAE5',
      hoverBg: '#A7F3D0'
    },
    { 
      icon: TrendingUp, 
      text: 'Get recommendations', 
      color: '#DC2626',
      bgColor: '#FEE2E2',
      hoverBg: '#FECACA'
    }
  ]

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#F8FAFC',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Sidebar */}
      <div style={{
        width: isSidebarOpen ? '300px' : '0px',
        backgroundColor: 'white',
        borderRight: '1px solid #E5E7EB',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.04)'
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid #E5E7EB'
        }}>
          <button
            onClick={createNewConversation}
            style={{
              width: '100%',
              padding: '14px 20px',
              backgroundColor: '#006FEE',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0, 111, 238, 0.25)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#0050B3'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 111, 238, 0.35)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#006FEE'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 111, 238, 0.25)'
            }}
          >
            <Plus size={20} strokeWidth={2.5} />
            New Conversation
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: '16px 20px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6B7280'
            }} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 44px',
                backgroundColor: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#111827',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#006FEE'
                e.target.style.backgroundColor = 'white'
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 111, 238, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB'
                e.target.style.backgroundColor = '#F9FAFB'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>

        {/* Conversations List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 12px'
        }}>
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => setCurrentConversation(conv)}
              style={{
                padding: '14px 16px',
                marginBottom: '4px',
                backgroundColor: currentConversation?.id === conv.id ? '#EFF6FF' : 'transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: currentConversation?.id === conv.id ? '1px solid #DBEAFE' : '1px solid transparent',
                transform: hoveredConv === conv.id && currentConversation?.id !== conv.id ? 'translateX(4px)' : 'translateX(0)'
              }}
              onMouseEnter={() => setHoveredConv(conv.id)}
              onMouseLeave={() => setHoveredConv(null)}
              onMouseOver={(e) => {
                if (currentConversation?.id !== conv.id) {
                  e.currentTarget.style.backgroundColor = '#F9FAFB'
                }
              }}
              onMouseOut={(e) => {
                if (currentConversation?.id !== conv.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center'
              }}>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: currentConversation?.id === conv.id ? '#006FEE' : '#111827',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '4px'
                  }}>
                    {conv.title}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6B7280'
                  }}>
                    {new Date(conv.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                {hoveredConv === conv.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteConversation(conv.id)
                    }}
                    style={{
                      padding: '6px',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      color: '#EF4444',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      animation: 'fadeIn 0.2s forwards'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(135deg, #006FEE 0%, #0050B3 100%)',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 12px rgba(0, 111, 238, 0.15)',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                padding: '8px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                cursor: 'pointer',
                color: 'white',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
            >
              {isSidebarOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}>
                <Sparkles size={24} style={{ color: 'white' }} strokeWidth={2.5} />
              </div>
              <div>
                <h1 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'white',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}>
                  Lithi AI Assistant
                </h1>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: 0
                }}>
                  Your Battery Expert
                </p>
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px' }}>Mike Johnson</span>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              MJ
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#F8FAFC',
          position: 'relative'
        }}>
          {showWelcome && (
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              padding: '60px 24px 40px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '88px',
                height: '88px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #006FEE, #0050B3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 28px',
                boxShadow: '0 12px 32px rgba(0, 111, 238, 0.25)',
                position: 'relative'
              }}>
                <Battery size={44} style={{ color: 'white' }} strokeWidth={2} />
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                }}>
                  <Sparkles size={14} style={{ color: 'white' }} strokeWidth={3} />
                </div>
              </div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '12px',
                letterSpacing: '-0.03em'
              }}>
                Welcome to Lithi AI
              </h2>
              <p style={{
                fontSize: '17px',
                color: '#6B7280',
                marginBottom: '48px',
                lineHeight: '1.6',
                maxWidth: '600px',
                margin: '0 auto 48px'
              }}>
                I'm your intelligent battery assistant. I can help you find the perfect battery, 
                calculate runtime for your tools, track orders, and provide expert technical support.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                maxWidth: '560px',
                margin: '0 auto'
              }}>
                {quickActions.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '24px',
                      backgroundColor: hoveredQuickAction === idx ? item.hoverBg : item.bgColor,
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: hoveredQuickAction === idx ? 'translateY(-4px)' : 'translateY(0)',
                      boxShadow: hoveredQuickAction === idx 
                        ? `0 12px 24px ${item.color}20`
                        : '0 2px 8px rgba(0, 0, 0, 0.04)',
                      border: `2px solid ${hoveredQuickAction === idx ? item.color : 'transparent'}`
                    }}
                    onMouseEnter={() => setHoveredQuickAction(idx)}
                    onMouseLeave={() => setHoveredQuickAction(null)}
                    onClick={() => sendMessage(item.text)}
                  >
                    <item.icon 
                      size={28} 
                      style={{ 
                        color: item.color, 
                        marginBottom: '12px',
                        strokeWidth: 2
                      }} 
                    />
                    <p style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#111827',
                      margin: 0
                    }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ padding: '24px 0' }}>
            {currentConversation?.messages.map((message, index) => (
              <div
                key={message.id}
                style={{
                  marginBottom: '24px',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  animation: 'messageAppear 0.4s ease-out forwards',
                  animationDelay: `${index * 0.05}s`
                }}
              >
                <div style={{
                  maxWidth: '840px',
                  margin: '0 auto',
                  padding: '0 24px'
                }}>
                  {message.role === 'user' ? (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}>
                      <div style={{
                        maxWidth: '70%',
                        backgroundColor: '#006FEE',
                        color: 'white',
                        borderRadius: '18px 18px 4px 18px',
                        padding: '16px 20px',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        boxShadow: '0 4px 12px rgba(0, 111, 238, 0.2)'
                      }}>
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '12px'
                      }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, #006FEE, #0050B3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(0, 111, 238, 0.2)'
                        }}>
                          <Sparkles size={20} style={{ color: 'white' }} strokeWidth={2.5} />
                        </div>
                        <span style={{
                          fontSize: '15px',
                          fontWeight: '600',
                          color: '#111827'
                        }}>
                          Lithi AI
                        </span>
                      </div>
                      <div style={{
                        backgroundColor: 'white',
                        borderRadius: '18px',
                        padding: '20px 24px',
                        fontSize: '15px',
                        lineHeight: '1.7',
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
                        border: '1px solid #E5E7EB'
                      }}>
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p style={{ 
                                margin: '0 0 16px 0', 
                                lineHeight: '1.7',
                                color: '#374151'
                              }}>
                                {children}
                              </p>
                            ),
                            strong: ({ children }) => (
                              <strong style={{ 
                                fontWeight: '700',
                                color: '#006FEE'
                              }}>
                                {children}
                              </strong>
                            ),
                            ul: ({ children }) => (
                              <ul style={{ 
                                margin: '0 0 16px 0', 
                                paddingLeft: '0',
                                listStyle: 'none'
                              }}>
                                {children}
                              </ul>
                            ),
                            li: ({ children }) => (
                              <li style={{ 
                                marginBottom: '10px',
                                paddingLeft: '28px',
                                position: 'relative',
                                color: '#374151'
                              }}>
                                <span style={{
                                  position: 'absolute',
                                  left: '0',
                                  top: '8px',
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  backgroundColor: '#006FEE'
                                }} />
                                {children}
                              </li>
                            ),
                            code: ({ children }) => (
                              <code style={{
                                backgroundColor: '#F3F4F6',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '14px',
                                fontFamily: 'Menlo, Monaco, Consolas, monospace',
                                color: '#DC2626'
                              }}>
                                {children}
                              </code>
                            )
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                  {message.attachments && message.attachments.length > 0 && (
                    <div style={{
                      marginTop: '8px',
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap',
                      justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
                    }}>
                      {message.attachments.map((file, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '8px 12px',
                            backgroundColor: '#EFF6FF',
                            borderRadius: '8px',
                            fontSize: '13px',
                            color: '#006FEE',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Paperclip size={14} />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{
                    fontSize: '12px',
                    color: '#9CA3AF',
                    marginTop: '8px',
                    textAlign: message.role === 'user' ? 'right' : 'left'
                  }}>
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div style={{
                maxWidth: '840px',
                margin: '0 auto',
                padding: '0 24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #006FEE, #0050B3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0, 111, 238, 0.2)'
                  }}>
                    <Sparkles size={20} style={{ color: 'white' }} strokeWidth={2.5} />
                  </div>
                  <span style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#111827'
                  }}>
                    Lithi AI
                  </span>
                </div>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '18px',
                  padding: '20px 24px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '6px'
                    }}>
                      <div className="loading-dot" style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: '#006FEE',
                        borderRadius: '50%',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }} />
                      <div className="loading-dot" style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: '#006FEE',
                        borderRadius: '50%',
                        animation: 'pulse 1.5s ease-in-out 0.15s infinite'
                      }} />
                      <div className="loading-dot" style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: '#006FEE',
                        borderRadius: '50%',
                        animation: 'pulse 1.5s ease-in-out 0.3s infinite'
                      }} />
                    </div>
                    <span style={{
                      fontSize: '14px',
                      color: '#6B7280',
                      fontStyle: 'italic'
                    }}>
                      Thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div style={{
          borderTop: '1px solid #E5E7EB',
          backgroundColor: 'white',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.04)'
        }}>
          <div style={{
            maxWidth: '840px',
            margin: '0 auto',
            padding: '20px 24px'
          }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-end'
            }}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
              <div style={{ 
                flex: 1,
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
                  placeholder="Ask me anything about batteries..."
                  style={{
                    width: '100%',
                    padding: '16px 52px 16px 20px',
                    backgroundColor: '#F9FAFB',
                    border: '2px solid #E5E7EB',
                    borderRadius: '14px',
                    fontSize: '15px',
                    color: '#111827',
                    outline: 'none',
                    resize: 'none',
                    minHeight: '56px',
                    maxHeight: '140px',
                    lineHeight: '1.5',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#006FEE'
                    e.target.style.backgroundColor = 'white'
                    e.target.style.boxShadow = '0 0 0 4px rgba(0, 111, 238, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB'
                    e.target.style.backgroundColor = '#F9FAFB'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <button
                  onClick={handleFileUpload}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    bottom: '14px',
                    padding: '8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#6B7280',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#F3F4F6'
                    e.currentTarget.style.color = '#006FEE'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#6B7280'
                  }}
                  title="Attach files"
                >
                  <Paperclip size={20} strokeWidth={2} />
                </button>
              </div>
              <button
                onClick={() => sendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                style={{
                  padding: '16px',
                  backgroundColor: inputMessage.trim() && !isLoading ? '#006FEE' : '#E5E7EB',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  width: '56px',
                  height: '56px',
                  cursor: !inputMessage.trim() || isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: inputMessage.trim() && !isLoading 
                    ? '0 4px 12px rgba(0, 111, 238, 0.3)' 
                    : 'none'
                }}
                onMouseOver={(e) => {
                  if (inputMessage.trim() && !isLoading) {
                    e.currentTarget.style.backgroundColor = '#0050B3'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 111, 238, 0.4)'
                  }
                }}
                onMouseOut={(e) => {
                  if (inputMessage.trim() && !isLoading) {
                    e.currentTarget.style.backgroundColor = '#006FEE'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 111, 238, 0.3)'
                  }
                }}
              >
                <Send size={20} strokeWidth={2.5} />
              </button>
            </div>
            <div style={{
              marginTop: '12px',
              fontSize: '13px',
              color: '#6B7280',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ImageIcon size={16} />
              <span>You can attach images, PDFs, and documents</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }
        
        @keyframes messageAppear {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        
        /* Custom scrollbar */
        *::-webkit-scrollbar {
          width: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: #F9FAFB;
          border-radius: 10px;
        }
        
        *::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
        
        /* Input field animations */
        textarea:focus {
          animation: focusGlow 0.3s ease-out;
        }
        
        @keyframes focusGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 111, 238, 0);
          }
          100% {
            box-shadow: 0 0 0 4px rgba(0, 111, 238, 0.1);
          }
        }
        
        /* Button animations */
        button {
          position: relative;
          overflow: hidden;
        }
        
        button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s;
        }
        
        button:active::after {
          width: 300px;
          height: 300px;
        }
      `}</style>
    </div>
  )
}