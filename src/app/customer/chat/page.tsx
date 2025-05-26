'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, Plus, Search, Menu, X, Trash2, Battery, Sparkles, Upload, Paperclip, Image as ImageIcon, Package } from 'lucide-react'
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

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    // Update current conversation
    const updatedConversation = currentConversation || {
      id: Date.now().toString(),
      title: inputMessage.substring(0, 30) + '...',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    updatedConversation.messages.push(userMessage)
    updatedConversation.updatedAt = new Date()

    // Update title if it's the first message
    if (updatedConversation.messages.length === 1) {
      updatedConversation.title = inputMessage.substring(0, 30) + (inputMessage.length > 30 ? '...' : '')
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
      const lowerInput = inputMessage.toLowerCase()
      
      if (lowerInput.includes('battery') || lowerInput.includes('batteries')) {
        responseContent = `I'd be happy to help you find the perfect battery solution! 🔋

Based on your needs, here are our **top recommendations**:

**LithiPro 150Ah Battery**
- **Capacity**: 150Ah at 12V
- **Best for**: Professional contractors and high-demand applications
- **Runtime**: Up to 12 hours of continuous heavy-duty use
- **Price**: $599 (Save $100 off regular price)
- **Warranty**: 5-year comprehensive coverage

**PowerMax 100Ah Battery**
- **Capacity**: 100Ah at 12V  
- **Best for**: Standard construction tools and equipment
- **Runtime**: 8-10 hours typical usage
- **Price**: $399 (Best value option)
- **Warranty**: 3-year protection

**Key Benefits**:
- 🚀 **Fast charging** - 80% charge in just 45 minutes
- 🛡️ **Built tough** - IP67 weatherproof rating
- 📱 **Smart BMS** - Monitor battery health via mobile app
- ♻️ **Eco-friendly** - 95% recyclable components

Would you like me to help you calculate the exact battery capacity needed for your specific tools?`
      } else if (lowerInput.includes('help') || lowerInput.includes('support')) {
        responseContent = `Welcome to Battery Department Support! I'm here to assist you 24/7. 

**How can I help you today?**

**🛒 Orders & Shipping**
- Track your order status
- Modify or cancel orders
- Check delivery times
- Return or exchange products

**🔋 Product Support**
- Find the right battery for your needs
- Technical specifications
- Compatibility checking
- Warranty information

**💡 Technical Assistance**
- Installation guides
- Troubleshooting tips
- Safety guidelines
- Maintenance advice

**💰 Billing & Account**
- Payment questions
- Account management
- Bulk order discounts
- Invoice requests

Just let me know what you need help with, and I'll provide detailed assistance right away!`
      } else if (lowerInput.includes('order') || lowerInput.includes('track')) {
        responseContent = `I'll help you track your order! 📦

**Your Recent Orders:**

**Order #ORD-2024-005** - Delivered ✅
- 2x LithiPro 150Ah Battery
- 2x Smart BMS Module
- Delivered on May 24, 2025
- **Tracking**: 1Z999AA10123456784

**Order #ORD-2024-004** - In Transit 🚚
- 3x PowerMax 100Ah Battery
- Expected delivery: May 27, 2025
- **Tracking**: 1Z999AA10123456783

To track a specific order, you can:
1. Visit the **Order History** page
2. Enter your tracking number at our carrier's website
3. Call our support line at 1-800-BATTERY

**Need to make changes?** Orders can be modified within 2 hours of placement. Let me know if you need to update anything!`
      } else {
        responseContent = `Thanks for reaching out! I'm your Battery Department AI assistant, ready to help you power up your projects. ⚡

**Here's what I can help you with:**

• **Find the perfect battery** - Tell me about your tools and usage
• **Calculate runtime** - Get accurate estimates for your equipment  
• **Compare products** - Side-by-side battery comparisons
• **Track orders** - Real-time shipping updates
• **Technical support** - Installation and troubleshooting help
• **Bulk pricing** - Special rates for contractors

What would you like to know more about? Feel free to ask me anything about our battery products or services!`
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

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#F8FAFC',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Sidebar */}
      <div style={{
        width: isSidebarOpen ? '280px' : '0px',
        backgroundColor: 'white',
        borderRight: '2px solid #E6F4FF',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '20px',
          borderBottom: '2px solid #E6F4FF',
          background: 'linear-gradient(to bottom, #FFFFFF, #F8FAFC)'
        }}>
          <button
            onClick={createNewConversation}
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: '#006FEE',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0, 111, 238, 0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#0050B3'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 111, 238, 0.3)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#006FEE'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 111, 238, 0.2)'
            }}
          >
            <Plus size={18} />
            New Conversation
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#5B6B7D'
            }} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                backgroundColor: '#F8FAFC',
                border: '2px solid #E6F4FF',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#111827',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#006FEE'
                e.target.style.backgroundColor = 'white'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E6F4FF'
                e.target.style.backgroundColor = '#F8FAFC'
              }}
            />
          </div>
        </div>

        {/* Conversations List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px'
        }}>
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => setCurrentConversation(conv)}
              style={{
                padding: '12px 16px',
                marginBottom: '4px',
                backgroundColor: currentConversation?.id === conv.id ? '#E6F4FF' : 'transparent',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: '2px solid transparent',
                transform: hoveredConv === conv.id ? 'translateX(4px)' : 'translateX(0)'
              }}
              onMouseEnter={() => setHoveredConv(conv.id)}
              onMouseLeave={() => setHoveredConv(null)}
              onMouseOver={(e) => {
                if (currentConversation?.id !== conv.id) {
                  e.currentTarget.style.backgroundColor = '#F8FAFC'
                  e.currentTarget.style.borderColor = '#E6F4FF'
                }
              }}
              onMouseOut={(e) => {
                if (currentConversation?.id !== conv.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
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
                    color: '#5B6B7D'
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
                      padding: '4px',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      color: '#DC2626',
                      opacity: 0.7,
                      transition: 'opacity 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.7'}
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
        flexDirection: 'column'
      }}>
        {/* Header */}
        <header style={{
          background: 'linear-gradient(to right, #006FEE, #0050B3)',
          padding: '20px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0, 111, 238, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                padding: '8px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                cursor: 'pointer',
                color: 'white',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={24} style={{ color: 'white' }} />
              </div>
              <div>
                <h1 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: 'white',
                  margin: 0
                }}>
                  Lithi AI Assistant
                </h1>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.8)',
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
            <span style={{ color: 'white', fontSize: '14px' }}>Mike Johnson</span>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '16px'
            }}>
              MJ
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px 0',
          backgroundColor: '#F8FAFC'
        }}>
          {showWelcome && (
            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
              padding: '0 24px',
              textAlign: 'center',
              marginTop: '60px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #006FEE, #0050B3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 8px 24px rgba(0, 111, 238, 0.25)'
              }}>
                <Battery size={40} style={{ color: 'white' }} />
              </div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px'
              }}>
                Welcome to Lithi AI
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#5B6B7D',
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                I'm your intelligent battery assistant. I can help you find the perfect battery, 
                calculate runtime for your tools, track orders, and provide expert technical support.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginTop: '40px'
              }}>
                {[
                  { icon: Battery, text: 'Find batteries', color: '#006FEE' },
                  { icon: Sparkles, text: 'Get recommendations', color: '#8B5CF6' },
                  { icon: Package, text: 'Track orders', color: '#10B981' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '20px',
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      border: '2px solid #E6F4FF',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 111, 238, 0.15)'
                      e.currentTarget.style.borderColor = item.color
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = '#E6F4FF'
                    }}
                    onClick={() => setInputMessage(item.text)}
                  >
                    <item.icon size={24} style={{ color: item.color, marginBottom: '8px' }} />
                    <p style={{
                      fontSize: '14px',
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

          {currentConversation?.messages.map((message, index) => (
            <div
              key={message.id}
              style={{
                marginBottom: '24px',
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                padding: '0 24px',
                opacity: 0,
                transform: 'translateY(10px)',
                animation: 'messageAppear 0.4s ease-out forwards',
                animationDelay: `${index * 0.05}s`
              }}
            >
              <div style={{
                maxWidth: '600px',
                width: '100%'
              }}>
                {message.role === 'assistant' && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #006FEE, #0050B3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0, 111, 238, 0.2)'
                    }}>
                      <Sparkles size={20} style={{ color: 'white' }} />
                    </div>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      Lithi AI
                    </span>
                  </div>
                )}
                <div style={{
                  backgroundColor: message.role === 'user' ? '#006FEE' : 'white',
                  color: message.role === 'user' ? 'white' : '#111827',
                  borderRadius: '12px',
                  padding: message.role === 'user' ? '16px 20px' : '20px',
                  fontSize: '15px',
                  lineHeight: '1.6',
                  boxShadow: message.role === 'user' 
                    ? '0 4px 12px rgba(0, 111, 238, 0.2)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.05)',
                  border: message.role === 'assistant' ? '2px solid #E6F4FF' : 'none'
                }}>
                  {message.role === 'assistant' ? (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p style={{ 
                            margin: '0 0 16px 0', 
                            lineHeight: '1.7',
                            color: '#111827'
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
                            marginBottom: '8px',
                            paddingLeft: '24px',
                            position: 'relative'
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
                            backgroundColor: '#F8FAFC',
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
                  ) : (
                    message.content
                  )}
                </div>
                {message.attachments && message.attachments.length > 0 && (
                  <div style={{
                    marginTop: '8px',
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}>
                    {message.attachments.map((file, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#E6F4FF',
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
              display: 'flex',
              justifyContent: 'flex-start',
              marginBottom: '24px',
              padding: '0 24px'
            }}>
              <div style={{
                maxWidth: '600px',
                width: '100%'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #006FEE, #0050B3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0, 111, 238, 0.2)'
                  }}>
                    <Sparkles size={20} style={{ color: 'white' }} />
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
                  borderRadius: '12px',
                  padding: '20px',
                  border: '2px solid #E6F4FF',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
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
                      color: '#5B6B7D',
                      fontStyle: 'italic'
                    }}>
                      Thinking...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          borderTop: '2px solid #E6F4FF',
          padding: '24px',
          backgroundColor: 'white'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
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
                    padding: '14px 48px 14px 20px',
                    backgroundColor: '#F8FAFC',
                    border: '2px solid #E6F4FF',
                    borderRadius: '12px',
                    fontSize: '15px',
                    color: '#111827',
                    outline: 'none',
                    resize: 'none',
                    minHeight: '56px',
                    maxHeight: '120px',
                    lineHeight: '1.5',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#006FEE'
                    e.target.style.backgroundColor = 'white'
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 111, 238, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E6F4FF'
                    e.target.style.backgroundColor = '#F8FAFC'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <button
                  onClick={handleFileUpload}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    bottom: '12px',
                    padding: '8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#5B6B7D',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#F8FAFC'
                    e.currentTarget.style.color = '#006FEE'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#5B6B7D'
                  }}
                  title="Attach files"
                >
                  <Paperclip size={20} />
                </button>
              </div>
              <button
                onClick={sendMessage}
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
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 111, 238, 0.4)'
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
                <Send size={20} />
              </button>
            </div>
            <div style={{
              marginTop: '12px',
              fontSize: '13px',
              color: '#5B6B7D',
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
        
        /* Custom scrollbar */
        *::-webkit-scrollbar {
          width: 10px;
        }
        
        *::-webkit-scrollbar-track {
          background: #F8FAFC;
          border-radius: 10px;
        }
        
        *::-webkit-scrollbar-thumb {
          background: #E6F4FF;
          border-radius: 10px;
          border: 2px solid #F8FAFC;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background: #C3E7FF;
        }
        
        /* Markdown content styling */
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3 {
          color: #111827;
          font-weight: 700;
          margin: 20px 0 12px 0;
        }
        
        .markdown-content h1 {
          font-size: 24px;
        }
        
        .markdown-content h2 {
          font-size: 20px;
        }
        
        .markdown-content h3 {
          font-size: 18px;
        }
        
        .markdown-content ul,
        .markdown-content ol {
          margin: 16px 0;
          padding-left: 24px;
        }
        
        .markdown-content li {
          margin-bottom: 8px;
          line-height: 1.6;
        }
        
        .markdown-content code {
          background-color: #F8FAFC;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Menlo', 'Monaco', 'Consolas', monospace;
          font-size: 0.9em;
        }
        
        .markdown-content pre {
          background-color: #F8FAFC;
          border: 2px solid #E6F4FF;
          border-radius: 8px;
          padding: 16px;
          overflow-x: auto;
          margin: 16px 0;
        }
        
        .markdown-content pre code {
          background: none;
          padding: 0;
        }
        
        .markdown-content blockquote {
          border-left: 4px solid #006FEE;
          padding-left: 16px;
          margin: 16px 0;
          color: #5B6B7D;
          font-style: italic;
        }
        
        .markdown-content a {
          color: #006FEE;
          text-decoration: none;
          font-weight: 500;
        }
        
        .markdown-content a:hover {
          text-decoration: underline;
        }
        
        .markdown-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 16px 0;
        }
        
        .markdown-content th,
        .markdown-content td {
          border: 1px solid #E6F4FF;
          padding: 12px;
          text-align: left;
        }
        
        .markdown-content th {
          background-color: #F8FAFC;
          font-weight: 600;
          color: #111827;
        }
        
        .markdown-content tr:nth-child(even) {
          background-color: #F8FAFC;
        }
      `}</style>
    </div>
  )
}