import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Clock, Bot, User, Loader2, Phone, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useWhatsAppTracking } from '@/hooks/useWhatsAppTracking';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isAI: boolean;
  isStaffReply?: boolean;
}

// Business hours: Monday-Friday 9:00-18:00 Beijing Time (UTC+8)
const isBusinessHours = (): boolean => {
  const now = new Date();
  // Convert to Beijing time (UTC+8)
  const beijingOffset = 8 * 60; // minutes
  const localOffset = now.getTimezoneOffset();
  const beijingTime = new Date(now.getTime() + (beijingOffset + localOffset) * 60 * 1000);
  
  const day = beijingTime.getDay();
  const hours = beijingTime.getHours();
  
  // Monday = 1, Friday = 5
  const isWeekday = day >= 1 && day <= 5;
  const isDuringHours = hours >= 9 && hours < 18;
  
  return isWeekday && isDuringHours;
};

const getSessionId = (): string => {
  const stored = sessionStorage.getItem('chat_session_id');
  if (stored) return stored;
  
  const newId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('chat_session_id', newId);
  return newId;
};

// Parse user agent to get device info
const parseUserAgent = () => {
  const ua = navigator.userAgent;
  
  // Detect device type
  let device = 'Desktop';
  if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    if (/iPad|Tablet/i.test(ua)) {
      device = 'Tablet';
    } else {
      device = 'Mobile';
    }
  }
  
  // Detect browser
  let browser = 'Unknown';
  if (ua.includes('Firefox/')) browser = 'Firefox';
  else if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('Chrome/')) browser = 'Chrome';
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Opera') || ua.includes('OPR/')) browser = 'Opera';
  
  // Detect OS
  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  
  return { device, browser, os };
};

// Save/update session metadata
const saveSessionMetadata = async (sessionId: string, language: string) => {
  try {
    const { device, browser, os } = parseUserAgent();
    
    const metadata = {
      session_id: sessionId,
      customer_device: device,
      customer_browser: browser,
      customer_os: os,
      customer_language: language,
      customer_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      page_url: window.location.href,
      referrer: document.referrer || null,
      status: 'new'
    };
    
    // Try to upsert the session data
    const { error } = await supabase
      .from('chat_sessions')
      .upsert(metadata, { onConflict: 'session_id' });
    
    if (error) {
      console.error('Error saving session metadata:', error);
    }
  } catch (err) {
    console.error('Error saving session metadata:', err);
  }
};

export const LiveChat = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHumanMode, setIsHumanMode] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(getSessionId());
  const { openWhatsApp: openWhatsAppTracking } = useWhatsAppTracking();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Subscribe to realtime messages for staff replies
  useEffect(() => {
    const channel = supabase
      .channel(`chat-${sessionId.current}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId.current}`
        },
        (payload) => {
          const newMsg = payload.new as {
            id: string;
            role: string;
            content: string;
            is_ai_response: boolean;
            is_staff_reply: boolean;
            created_at: string;
          };
          
          // Only add if it's a staff reply (to avoid duplicates)
          if (newMsg.is_staff_reply) {
            const staffMessage: Message = {
              id: newMsg.id,
              role: 'assistant',
              content: newMsg.content,
              timestamp: new Date(newMsg.created_at),
              isAI: false,
              isStaffReply: true
            };
            
            setMessages(prev => {
              // Check if message already exists
              if (prev.some(m => m.id === newMsg.id)) return prev;
              return [...prev, staffMessage];
            });
            
            // Show notification if chat is closed
            if (!isOpen) {
              setHasNewMessage(true);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const businessHours = isBusinessHours();
      setIsHumanMode(businessHours);
      setHasNewMessage(false);
      
      // Save session metadata when chat opens
      saveSessionMetadata(sessionId.current, i18n.language);
      
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: businessHours 
          ? t('liveChat.welcomeHuman', 'Hello! Welcome to NinescapeLand. Our customer service team is online. How can we help you today?')
          : t('liveChat.welcomeAI', 'Hello! Welcome to NinescapeLand. I\'m your AI assistant. Our team is currently offline, but I\'m here to help you 24/7. How can I assist you?'),
        timestamp: new Date(),
        isAI: !businessHours
      };
      
      setMessages([welcomeMessage]);
    }
    
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen, t, i18n.language, messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      isAI: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Save user message to database
      await supabase.from('chat_messages').insert({
        session_id: sessionId.current,
        role: 'user',
        content: userMessage.content,
        is_ai_response: false
      });

      if (!isHumanMode) {
        // AI mode - get AI response
        const conversationHistory = messages
          .filter(m => m.role !== 'system')
          .map(m => ({ role: m.role, content: m.content }));
        
        conversationHistory.push({ role: 'user', content: userMessage.content });

        const { data, error } = await supabase.functions.invoke('ai-chat', {
          body: { 
            messages: conversationHistory,
            language: i18n.language,
            session_id: sessionId.current
          }
        });

        if (error) throw error;

        const aiMessage: Message = {
          id: `ai_${Date.now()}`,
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
          isAI: true
        };

        setMessages(prev => [...prev, aiMessage]);

        // Save AI response to database
        await supabase.from('chat_messages').insert({
          session_id: sessionId.current,
          role: 'assistant',
          content: aiMessage.content,
          is_ai_response: true
        });
      } else {
        // Human mode - show waiting message
        const waitingMessage: Message = {
          id: `system_${Date.now()}`,
          role: 'assistant',
          content: t('liveChat.humanWaiting', 'Your message has been received. Our team will respond shortly. You can also reach us via WhatsApp for faster response.'),
          timestamp: new Date(),
          isAI: false
        };
        
        setMessages(prev => [...prev, waitingMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: t('liveChat.error', 'Sorry, something went wrong. Please try again or contact us via WhatsApp.'),
        timestamp: new Date(),
        isAI: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openWhatsApp = () => {
    openWhatsAppTracking("live_chat");
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-4 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
            aria-label={t('liveChat.open', 'Open chat')}
          >
            <MessageCircle className="w-6 h-6" />
            {/* Online indicator */}
            <span className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
              hasNewMessage ? 'bg-destructive animate-pulse' : isBusinessHours() ? 'bg-online' : 'bg-warning'
            }`} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {isHumanMode ? (
                    <User className="w-8 h-8" />
                  ) : (
                    <Bot className="w-8 h-8" />
                  )}
                  <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-primary ${isHumanMode ? 'bg-online' : 'bg-warning'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    {isHumanMode 
                      ? t('liveChat.humanSupport', 'Customer Support')
                      : t('liveChat.aiAssistant', 'AI Assistant')
                    }
                  </h3>
                  <p className="text-xs opacity-90">
                    {isHumanMode 
                      ? t('liveChat.online', 'Online')
                      : t('liveChat.available247', 'Available 24/7')
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label={t('liveChat.close', 'Close chat')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Business Hours Notice */}
            <div className="px-4 py-2 bg-muted/50 border-b text-xs flex items-center gap-2">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t('liveChat.businessHours', 'Business Hours: Mon-Fri 9:00-18:00 (Beijing Time)')}
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : message.isStaffReply
                        ? 'bg-success text-success-foreground rounded-bl-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className={`flex items-center gap-1 mt-1 text-[10px] ${
                      message.role === 'user' 
                        ? 'text-primary-foreground/70' 
                        : message.isStaffReply 
                        ? 'text-success-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {message.isAI && <Bot className="w-3 h-3" />}
                      {message.isStaffReply && <CheckCircle className="w-3 h-3" />}
                      <span>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* WhatsApp Quick Action */}
            <div className="px-4 py-2 border-t bg-muted/30">
              <button
                onClick={openWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs text-success hover:text-success/80 hover:bg-success/10 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                {t('liveChat.whatsappCTA', 'Chat on WhatsApp for faster response')}
              </button>
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('liveChat.placeholder', 'Type your message...')}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
