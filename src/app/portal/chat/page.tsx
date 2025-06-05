'use client'

// Disable static generation for this page
export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Send, 
  Bot, 
  User,
  Zap,
  RefreshCw,
  FileText,
  Wrench,
  DollarSign
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface QuickAction {
  icon: any;
  label: string;
  prompt: string;
}

export default function ChatPage() {
  // const { user, loading } = useAuth();
  const user = null; // Temporary for build
  const loading = false; // Temporary for build
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const quickActions: QuickAction[] = [
    {
      icon: Wrench,
      label: 'Engineering Services',
      prompt: 'What engineering services do you offer for heritage railways?'
    },
    {
      icon: DollarSign,
      label: 'Get Pricing',
      prompt: 'What are the current prices for steam locomotive restoration?'
    },
    {
      icon: FileText,
      label: 'Track Order',
      prompt: 'Can you help me track my recent order?'
    },
    {
      icon: RefreshCw,
      label: 'Warranty Info',
      prompt: 'What warranty options are available for engineering projects?'
    }
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push('/portal/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Initialize with welcome message
    if (user && messages.length === 0) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: `Hello ${user.name || user.email}! I'm your SWSE AI engineering assistant. How can I help you today with your engineering project needs?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate API call to SWSE AI
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return "Based on current market rates, our steam locomotive restoration services start at £15,000 for basic boiler inspection and repair. We also offer comprehensive restoration packages and financing options for large projects. Would you like me to show you our complete service catalog?";
    }
    
    if (lowerInput.includes('track') || lowerInput.includes('order')) {
      return "I can help you track your order! Please provide your order number (format: ORD-XXXX-XXX) and I'll get you the latest status update. You can also view all your orders in the Orders section of your portal.";
    }
    
    if (lowerInput.includes('recommend') || lowerInput.includes('which service')) {
      return "To recommend the best engineering service for your needs, I'd need to know more about your project. Are you working on heritage railway restoration, industrial equipment repair, or do you need CAD design services? What's the scale and timeline of your project?";
    }
    
    if (lowerInput.includes('warranty')) {
      return "We offer comprehensive warranty coverage on all our engineering services:\n\n• Standard: 12 months on all repairs and installations\n• Extended: 24 months with maintenance contract\n• Premium: 36 months for complete restoration projects\n\nAll warranties include protection against workmanship defects and materials failure. Would you like more details about a specific warranty plan?";
    }
    
    return "I'm here to help with all your engineering needs! I can assist with service recommendations, project quotes, order tracking, technical specifications, and warranty details. What would you like to know?";
  };

  const handleQuickAction = (action: QuickAction) => {
    setInputMessage(action.prompt);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="energy-spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 rounded-t-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-energy-blue to-charged-teal rounded-full flex items-center justify-center">
            <Zap size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">SWSE AI Assistant</h2>
            <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Online - Ready to help
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-r from-energy-blue to-charged-teal rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              
              <div
                className={`max-w-md px-4 py-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-energy-blue to-charged-teal text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-gray-700 dark:text-gray-300" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-r from-energy-blue to-charged-teal rounded-full flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick Actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <action.icon size={16} />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white dark:bg-gray-800 rounded-b-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-energy-blue"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="px-4 py-2 bg-gradient-to-r from-energy-blue to-charged-teal text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}