'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, Plus, Search, Moon, Sun, Menu, X, Trash2, RotateCw, ChevronDown, Command } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { lithiIntegration } from '@/services/integrations/lithi-integration'
import MessageToolbar from './MessageToolbar'
import ExpandableSection from './ExpandableSection'
import ThinkingMode from './ThinkingMode'
import CommandPalette from './CommandPalette'
import { processContent, parseCommands } from './textProcessing'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
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
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null)
  const [showThinking, setShowThinking] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette shortcut (Cmd/Ctrl + K)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommandPalette(!showCommandPalette)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showCommandPalette])

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
      // Send to Lithi
      const response = await lithiIntegration.sendChatMessage(inputMessage, 'user')
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content || 'I apologize, but I couldn\'t generate a response.',
        timestamp: new Date()
      }

      updatedConversation.messages.push(assistantMessage)
      
      // Update conversations list
      const updatedConversations = conversations.filter(c => c.id !== updatedConversation.id)
      saveConversations([updatedConversation, ...updatedConversations])
      setCurrentConversation({ ...updatedConversation })
    } catch (error) {
      console.error('Error sending message:', error)
      // Handle error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
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

  const handleCopyMessage = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedMessageId(messageId)
    setTimeout(() => setCopiedMessageId(null), 2000)
  }

  const handleToggleExpand = (messageId: string) => {
    setExpandedMessageId(expandedMessageId === messageId ? null : messageId)
  }

  const handleShowThinking = () => {
    setShowThinking(!showThinking)
  }

  const handleApplyCommand = (command: any) => {
    const selection = window.getSelection()?.toString() || ''
    const formattedText = command.format.replace('{selection}', selection)
    
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart
      const end = textareaRef.current.selectionEnd
      const text = textareaRef.current.value
      const newText = text.substring(0, start) + formattedText + text.substring(end)
      setInputMessage(newText)
      
      // Reset cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
          textareaRef.current.setSelectionRange(start + formattedText.length, start + formattedText.length)
        }
      }, 0)
    }
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: isDarkMode ? '#111111' : '#ffffff',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onApplyCommand={handleApplyCommand}
        isDarkMode={isDarkMode}
      />
      {/* Sidebar */}
      <div style={{
        width: isSidebarOpen ? '260px' : '0px',
        backgroundColor: isDarkMode ? '#1e1e1e' : '#f6f6f6',
        borderRight: `1px solid ${isDarkMode ? '#2d2d2d' : '#e5e5e5'}`,
        transition: 'width 0.2s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '16px',
          borderBottom: `1px solid ${isDarkMode ? '#2d2d2d' : '#e5e5e5'}`
        }}>
          <button
            onClick={createNewConversation}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: 'transparent',
              border: `1px solid ${isDarkMode ? '#3d3d3d' : '#d0d0d0'}`,
              borderRadius: '6px',
              color: isDarkMode ? '#ffffff' : '#000000',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.1s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#2d2d2d' : '#f0f0f0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: isDarkMode ? '#999999' : '#666666'
            }} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 8px 8px 32px',
                backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#3d3d3d' : '#e0e0e0'}`,
                borderRadius: '6px',
                fontSize: '13px',
                color: isDarkMode ? '#ffffff' : '#000000',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Conversations List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 8px'
        }}>
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              onClick={() => setCurrentConversation(conv)}
              style={{
                padding: '10px 12px',
                marginBottom: '2px',
                backgroundColor: currentConversation?.id === conv.id 
                  ? (isDarkMode ? '#2d2d2d' : '#e8e8e8')
                  : 'transparent',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.1s',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseOver={(e) => {
                if (currentConversation?.id !== conv.id) {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#252525' : '#f0f0f0'
                }
              }}
              onMouseOut={(e) => {
                if (currentConversation?.id !== conv.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: isDarkMode ? '#ffffff' : '#000000',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {conv.title}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: isDarkMode ? '#999999' : '#666666',
                  marginTop: '2px'
                }}>
                  {new Date(conv.updatedAt).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteConversation(conv.id)
                }}
                className="delete-button"
                style={{
                  padding: '4px',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: isDarkMode ? '#999999' : '#666666',
                  opacity: 0,
                  transition: 'opacity 0.1s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = isDarkMode ? '#ffffff' : '#000000'}
                onMouseOut={(e) => e.currentTarget.style.color = isDarkMode ? '#999999' : '#666666'}
              >
                <Trash2 size={14} />
              </button>
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
        <div style={{
          height: '60px',
          borderBottom: `1px solid ${isDarkMode ? '#2d2d2d' : '#e5e5e5'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                padding: '8px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: isDarkMode ? '#ffffff' : '#000000',
                borderRadius: '6px',
                transition: 'all 0.1s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#2d2d2d' : '#f0f0f0'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: isDarkMode ? '#ffffff' : '#000000',
              margin: 0
            }}>
              {currentConversation?.title || 'Lithi AI Assistant'}
            </h1>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              padding: '8px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: isDarkMode ? '#ffffff' : '#000000',
              borderRadius: '6px',
              transition: 'all 0.1s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#2d2d2d' : '#f0f0f0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Messages Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 0 40px 0'
        }}>
          {currentConversation?.messages.map((message, index) => (
            <div
              key={message.id}
              className="message-container"
              style={{
                marginBottom: '24px',
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                padding: '0 24px',
                opacity: 0,
                transform: 'translateY(10px)',
                animation: 'messageAppear 0.3s ease-out forwards',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div style={{
                maxWidth: '600px',
                width: '100%'
              }}>
                {message.role === 'assistant' && (
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: isDarkMode ? '#ffffff' : '#000000',
                    marginBottom: '8px'
                  }}>
                    Lithi
                  </div>
                )}
                <div style={{
                  backgroundColor: message.role === 'user' 
                    ? (isDarkMode ? '#2d2d2d' : '#f4f4f4')
                    : 'transparent',
                  color: isDarkMode ? '#ffffff' : '#000000',
                  borderRadius: '8px',
                  padding: message.role === 'user' ? '12px 16px' : '0',
                  fontSize: '15px',
                  lineHeight: '1.5',
                  wordBreak: 'break-word'
                }}>
                  {message.role === 'assistant' ? (
                    <ReactMarkdown
                      components={{
                        p: ({ children, ...props }) => {
                          // First paragraph styling
                          const isFirstParagraph = props.node?.position?.start.line === 1
                          return (
                            <p style={{ 
                              margin: '0 0 16px 0', 
                              lineHeight: '1.6',
                              fontSize: isFirstParagraph ? '17px' : '16px',
                              color: isDarkMode ? '#ffffff' : '#1a1a1a'
                            }}>
                              {children}
                            </p>
                          )
                        },
                        ul: ({ children }) => (
                          <ul style={{ 
                            margin: '0 0 16px 0', 
                            paddingLeft: '20px',
                            lineHeight: '1.6'
                          }}>
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol style={{ 
                            margin: '0 0 16px 0', 
                            paddingLeft: '20px',
                            lineHeight: '1.6'
                          }}>
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => {
                          // Parse list items to identify category headers
                          const content = children?.toString() || ''
                          const colonIndex = content.indexOf(':')
                          
                          if (colonIndex > 0 && colonIndex < 50) {
                            const header = content.substring(0, colonIndex)
                            const body = content.substring(colonIndex + 1)
                            
                            return (
                              <li style={{ 
                                marginBottom: '16px', 
                                lineHeight: '1.6',
                                listStyle: 'none'
                              }}>
                                <div style={{
                                  fontWeight: '600',
                                  color: isDarkMode ? '#ffffff' : '#1a1a1a',
                                  marginBottom: '8px',
                                  fontSize: '16px'
                                }}>
                                  {header}:
                                </div>
                                <div style={{
                                  marginLeft: '16px',
                                  paddingLeft: '12px',
                                  borderLeft: `2px solid ${isDarkMode ? '#3d3d3d' : '#f0f0f0'}`,
                                  color: isDarkMode ? '#e0e0e0' : '#4a4a4a'
                                }}>
                                  {body}
                                </div>
                              </li>
                            )
                          }
                          
                          // Feature-style list item with bullet
                          if (content.includes(' - ') || content.startsWith('- ')) {
                            const cleanContent = content.replace(/^-\s*/, '')
                            return (
                              <li style={{ 
                                marginBottom: '12px', 
                                lineHeight: '1.6',
                                listStyle: 'none',
                                display: 'flex',
                                alignItems: 'flex-start'
                              }}>
                                <div style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  backgroundColor: '#0b6e99',
                                  marginTop: '8px',
                                  marginRight: '12px',
                                  flexShrink: 0
                                }} />
                                <div style={{ flex: 1 }}>
                                  {cleanContent}
                                </div>
                              </li>
                            )
                          }
                          
                          return (
                            <li style={{ 
                              marginBottom: '8px', 
                              lineHeight: '1.6'
                            }}>
                              {children}
                            </li>
                          )
                        },
                        strong: ({ children }) => (
                          <strong style={{ 
                            fontWeight: '600',
                            color: isDarkMode ? '#ffffff' : '#0b6e99'
                          }}>
                            {children}
                          </strong>
                        ),
                        code: ({ children, ...props }) => 
                          props.className ? (
                            <pre style={{
                              backgroundColor: isDarkMode ? '#2d2d2d' : '#f5f5f5',
                              padding: '16px',
                              borderRadius: '8px',
                              fontSize: '14px',
                              overflowX: 'auto',
                              margin: '0 0 16px 0',
                              border: `1px solid ${isDarkMode ? '#3d3d3d' : '#e0e0e0'}`
                            }}>
                              <code style={{ fontFamily: 'Menlo, Monaco, Consolas, monospace' }}>
                                {children}
                              </code>
                            </pre>
                          ) : (
                            <code style={{
                              backgroundColor: isDarkMode ? '#2d2d2d' : '#f0f0f0',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '14px',
                              fontFamily: 'Menlo, Monaco, Consolas, monospace'
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
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '12px'
                }}>
                  <div className="message-timestamp" style={{
                    fontSize: '12px',
                    color: isDarkMode ? '#767676' : '#767676'
                  }}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {message.role === 'assistant' && (
                    <MessageToolbar
                      onCopy={() => handleCopyMessage(message.id, message.content)}
                      onExpand={() => handleToggleExpand(message.id)}
                      onCollapse={() => handleToggleExpand(message.id)}
                      isExpanded={expandedMessageId === message.id}
                      isDarkMode={isDarkMode}
                      isCopied={copiedMessageId === message.id}
                    />
                  )}
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
                  fontSize: '14px',
                  fontWeight: '600',
                  color: isDarkMode ? '#ffffff' : '#000000',
                  marginBottom: '8px'
                }}>
                  Lithi
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '4px'
                  }}>
                    <div className="loading-dot" style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: isDarkMode ? '#666666' : '#999999',
                      borderRadius: '50%',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }} />
                    <div className="loading-dot" style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: isDarkMode ? '#666666' : '#999999',
                      borderRadius: '50%',
                      animation: 'pulse 1.5s ease-in-out 0.15s infinite'
                    }} />
                    <div className="loading-dot" style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: isDarkMode ? '#666666' : '#999999',
                      borderRadius: '50%',
                      animation: 'pulse 1.5s ease-in-out 0.3s infinite'
                    }} />
                  </div>
                  <span style={{
                    fontSize: '14px',
                    color: isDarkMode ? '#999999' : '#666666',
                    opacity: 0.7
                  }}>
                    Thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          borderTop: `1px solid ${isDarkMode ? '#2d2d2d' : '#e5e5e5'}`,
          padding: '16px 24px',
          backgroundColor: isDarkMode ? '#111111' : '#ffffff'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <button
                onClick={() => setShowCommandPalette(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 8px',
                  backgroundColor: 'transparent',
                  border: `1px solid ${isDarkMode ? '#3d3d3d' : '#e0e0e0'}`,
                  borderRadius: '6px',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.1s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#2d2d2d' : '#f5f5f5'
                  e.currentTarget.style.borderColor = isDarkMode ? '#4d4d4d' : '#d0d0d0'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = isDarkMode ? '#3d3d3d' : '#e0e0e0'
                }}
              >
                <Command size={12} />
                <span>Format commands</span>
                <span style={{
                  backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                  padding: '1px 4px',
                  borderRadius: '3px',
                  fontSize: '10px'
                }}>⌘K</span>
              </button>
            </div>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-end'
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
                placeholder="Send a message..."
                className="message-input"
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  backgroundColor: isDarkMode ? '#1e1e1e' : '#f6f6f6',
                  border: `1px solid ${isDarkMode ? '#3d3d3d' : '#e0e0e0'}`,
                  borderRadius: '22px',
                  fontSize: '15px',
                  color: isDarkMode ? '#ffffff' : '#000000',
                  outline: 'none',
                  resize: 'none',
                  minHeight: '44px',
                  maxHeight: '120px',
                  lineHeight: '1.5',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0b6e99'
                  e.target.style.backgroundColor = isDarkMode ? '#2d2d2d' : '#ffffff'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = isDarkMode ? '#3d3d3d' : '#e0e0e0'
                  e.target.style.backgroundColor = isDarkMode ? '#1e1e1e' : '#f6f6f6'
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                style={{
                  padding: '10px',
                  backgroundColor: isDarkMode ? '#2d2d2d' : '#000000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: !inputMessage.trim() || isLoading ? 'not-allowed' : 'pointer',
                  opacity: !inputMessage.trim() || isLoading ? 0.5 : 1,
                  transition: 'opacity 0.1s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }
        
        @keyframes messageAppear {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes typewriter {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
        
        /* Hide scrollbar for cleaner look */
        *::-webkit-scrollbar {
          width: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        
        *::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#3d3d3d' : '#cccccc'};
          border-radius: 4px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#4d4d4d' : '#999999'};
        }
        
        .typing-indicator {
          display: inline-block;
          width: 8px;
          height: 16px;
          background: ${isDarkMode ? '#ffffff' : '#000000'};
          margin-left: 2px;
          animation: typewriter 1s infinite;
        }
      `}</style>
      <style jsx global>{`
        .delete-button {
          opacity: 0;
          transition: opacity 0.1s;
        }
        
        div:hover .delete-button {
          opacity: 1 !important;
        }
        
        .message-container:hover .message-toolbar {
          opacity: 1 !important;
        }
        
        .message-container .message-timestamp {
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        
        .message-container:hover .message-timestamp {
          opacity: 1;
        }
        
        /* Rich text content highlights */
        .highlight-value,
        .spec-value {
          color: #0b6e99;
          font-weight: 600;
          background-color: rgba(11, 110, 153, 0.08);
          padding: 0 4px;
          border-radius: 3px;
        }
        
        .highlight-duration {
          color: #059669;
          font-weight: 600;
          background-color: rgba(5, 150, 105, 0.08);
          padding: 0 4px;
          border-radius: 3px;
        }
        
        .highlight-product,
        .product-name {
          font-weight: 600;
          color: #1a1a1a;
        }
        
        .highlight-spec {
          color: #7c3aed;
          font-weight: 600;
          background-color: rgba(124, 58, 237, 0.08);
          padding: 0 4px;
          border-radius: 3px;
        }
        
        .highlight-comparison {
          color: #ea580c;
          font-weight: 500;
          font-style: italic;
        }
        
        .highlight-benefit {
          color: #16a34a;
          font-weight: 500;
        }
        
        /* Command formatting */
        .cmd-bold {
          font-weight: 600;
        }
        
        .cmd-highlight {
          background-color: #fef3c7;
          color: #92400e;
          padding: 2px 4px;
          border-radius: 3px;
        }
        
        .cmd-spec {
          color: #7c3aed;
          font-weight: 600;
          background-color: rgba(124, 58, 237, 0.08);
          padding: 2px 4px;
          border-radius: 3px;
        }
        
        .cmd-code {
          font-family: 'Menlo', 'Monaco', 'Consolas', monospace;
          background-color: #f3f4f6;
          padding: 2px 4px;
          border-radius: 3px;
          font-size: 0.9em;
        }
        
        .cmd-category {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 16px 0 8px 0;
        }
        
        .cmd-bullet-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        
        .cmd-bullet {
          width: 6px;
          height: 6px;
          background-color: #0b6e99;
          border-radius: 50%;
          margin-right: 12px;
          margin-top: 8px;
          flex-shrink: 0;
        }
        
        .cmd-value {
          color: #dc2626;
          font-weight: 600;
          background-color: rgba(220, 38, 38, 0.08);
          padding: 0 4px;
          border-radius: 3px;
        }
        
        .cmd-product {
          font-weight: 600;
          color: #1a1a1a;
          text-transform: uppercase;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}