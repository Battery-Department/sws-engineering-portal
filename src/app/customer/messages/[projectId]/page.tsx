'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Send,
  Paperclip,
  Clock,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Phone,
  Video,
  MoreVertical,
  User,
  Settings,
  Bell
} from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderRole: 'client' | 'engineer' | 'manager' | 'system';
  message: string;
  timestamp: string;
  type: 'message' | 'update' | 'alert' | 'file';
  attachments?: Attachment[];
  status?: 'sent' | 'delivered' | 'read';
}

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
}

export default function CustomerMessagesPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate API call to fetch messages
    setTimeout(() => {
      const mockMessages: Message[] = [
        {
          id: '1',
          sender: 'Project System',
          senderRole: 'system',
          message: 'Project started: 7¼" Gauge Steam Locomotive Restoration',
          timestamp: '2024-01-15T09:00:00Z',
          type: 'update',
          status: 'read'
        },
        {
          id: '2',
          sender: 'Mike Thompson',
          senderRole: 'manager',
          message: 'Welcome to your project! I\'ll be your lead engineer for this restoration. We\'ve completed the initial assessment and I\'m pleased to report the locomotive is in better condition than expected.',
          timestamp: '2024-01-15T10:30:00Z',
          type: 'message',
          status: 'read'
        },
        {
          id: '3',
          sender: 'You',
          senderRole: 'client',
          message: 'That\'s excellent news! I\'m really excited to see this project come together. When do you expect to start the actual restoration work?',
          timestamp: '2024-01-15T14:15:00Z',
          type: 'message',
          status: 'read'
        },
        {
          id: '4',
          sender: 'Sarah Williams',
          senderRole: 'engineer',
          message: 'We\'ll begin dismantling next week. I\'ve attached the detailed assessment report for your review.',
          timestamp: '2024-01-16T11:20:00Z',
          type: 'file',
          attachments: [
            { id: 'a1', name: 'Initial_Assessment_Report.pdf', size: 2560000, type: 'pdf' }
          ],
          status: 'read'
        },
        {
          id: '5',
          sender: 'Project System',
          senderRole: 'system',
          message: 'Milestone completed: Initial Assessment Complete',
          timestamp: '2024-01-25T16:45:00Z',
          type: 'update',
          status: 'read'
        },
        {
          id: '6',
          sender: 'Mike Thompson',
          senderRole: 'manager',
          message: 'Fire tube installation is progressing excellently. All pressure tests have passed with zero leakage detected. The heritage-grade steel tubes are performing exactly as specified.',
          timestamp: '2024-05-16T10:30:00Z',
          type: 'message',
          status: 'read'
        },
        {
          id: '7',
          sender: 'Sarah Williams',
          senderRole: 'engineer',
          message: 'Small update - we discovered minor pitting on the smokebox plate during inspection. This will require additional cleaning and minor repair welding. Expected delay: 2 days.',
          timestamp: '2024-05-18T14:15:00Z',
          type: 'alert',
          status: 'read'
        },
        {
          id: '8',
          sender: 'You',
          senderRole: 'client',
          message: 'Thanks for the update. Safety and quality are our top priorities, so please take the time needed. Will this affect the overall completion date?',
          timestamp: '2024-05-18T16:30:00Z',
          type: 'message',
          status: 'delivered'
        },
        {
          id: '9',
          sender: 'Mike Thompson',
          senderRole: 'manager',
          message: 'The repair work is minimal and we\'ve built buffer time into the schedule. We\'re still on track for completion by May 30th. I\'ll send photos of the smokebox work tomorrow.',
          timestamp: '2024-05-19T09:15:00Z',
          type: 'message',
          status: 'sent'
        }
      ];
      setMessages(mockMessages);
      setLoading(false);
    }, 1000);
  }, [projectId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'You',
        senderRole: 'client',
        message: newMessage,
        timestamp: new Date().toISOString(),
        type: 'message',
        status: 'sent'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSenderColor = (role: string) => {
    switch (role) {
      case 'manager': return '#006FEE';
      case 'engineer': return '#10B981';
      case 'system': return '#6B7280';
      case 'client': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'update': return <CheckCircle size={16} />;
      case 'alert': return <AlertTriangle size={16} />;
      case 'file': return <Paperclip size={16} />;
      default: return <MessageSquare size={16} />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-GB', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#F8FAFC'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #E5E7EB',
            borderTop: '4px solid #006FEE',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }}></div>
          <p style={{ color: '#6B7280' }}>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #E5E7EB',
          padding: '20px 32px',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link 
                href={`/customer/projects/${projectId}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#006FEE',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <ArrowLeft size={16} />
                Back to Project
              </Link>
              <div>
                <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
                  Project Messages
                </h1>
                <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                  7¼" Gauge Steam Locomotive Restoration
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#374151'
              }}>
                <Phone size={16} />
                Call
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#374151'
              }}>
                <Video size={16} />
                Video Call
              </button>
              <button style={{
                padding: '8px',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                <MoreVertical size={16} color="#6B7280" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          padding: '24px 32px',
          minHeight: 'calc(100vh - 180px)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ flex: 1, marginBottom: '24px' }}>
            {messages.map((message, index) => (
              <div key={message.id} style={{
                marginBottom: '16px',
                display: 'flex',
                flexDirection: message.senderRole === 'client' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                {/* Avatar */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: getSenderColor(message.senderRole),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  flexShrink: 0
                }}>
                  {message.senderRole === 'system' ? (
                    <Settings size={16} />
                  ) : (
                    message.sender.split(' ').map(n => n[0]).join('').slice(0, 2)
                  )}
                </div>

                {/* Message */}
                <div style={{
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.senderRole === 'client' ? 'flex-end' : 'flex-start'
                }}>
                  <div style={{
                    backgroundColor: message.senderRole === 'client' ? '#006FEE' : 
                                   message.type === 'alert' ? '#FEF3C7' :
                                   message.type === 'update' ? '#E0F2FE' : 'white',
                    color: message.senderRole === 'client' ? 'white' : 
                           message.type === 'alert' ? '#92400E' :
                           message.type === 'update' ? '#0C4A6E' : '#111827',
                    padding: '12px 16px',
                    borderRadius: message.senderRole === 'client' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    border: message.senderRole === 'client' ? 'none' : '1px solid #E5E7EB',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}>
                    {/* Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: message.type === 'message' ? '0' : '8px',
                      fontSize: '12px',
                      opacity: 0.8
                    }}>
                      {message.type !== 'message' && getMessageIcon(message.type)}
                      {message.senderRole !== 'client' && (
                        <span style={{ fontWeight: '600' }}>{message.sender}</span>
                      )}
                    </div>

                    {/* Message content */}
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                      {message.message}
                    </p>

                    {/* Attachments */}
                    {message.attachments && (
                      <div style={{ marginTop: '12px' }}>
                        {message.attachments.map(attachment => (
                          <div key={attachment.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 12px',
                            backgroundColor: message.senderRole === 'client' ? 'rgba(255,255,255,0.1)' : '#F8FAFC',
                            borderRadius: '6px',
                            fontSize: '13px'
                          }}>
                            <Paperclip size={14} />
                            <span>{attachment.name}</span>
                            <span style={{ opacity: 0.7 }}>
                              ({(attachment.size / 1024 / 1024).toFixed(1)} MB)
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Timestamp and status */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '4px',
                    fontSize: '12px',
                    color: '#6B7280'
                  }}>
                    <span>{formatTime(message.timestamp)}</span>
                    {message.senderRole === 'client' && message.status && (
                      <span style={{
                        color: message.status === 'read' ? '#10B981' : 
                               message.status === 'delivered' ? '#006FEE' : '#6B7280'
                      }}>
                        {message.status === 'read' ? '✓✓' : 
                         message.status === 'delivered' ? '✓' : '○'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '16px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
              <button style={{
                padding: '10px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                <Paperclip size={16} color="#6B7280" />
              </button>
              
              <div style={{ flex: 1 }}>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    maxHeight: '120px',
                    padding: '12px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'none',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px',
                  backgroundColor: newMessage.trim() ? '#006FEE' : '#E5E7EB',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s'
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}