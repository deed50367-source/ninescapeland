import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, Send, Clock, User, Bot, 
  Loader2, RefreshCw, Search, CheckCircle, XCircle,
  Circle, CheckCheck, AlertCircle, Zap, Plus, Trash2, Edit2, Save, X,
  Monitor, Smartphone, Tablet, Globe, MapPin, Link, ExternalLink, Languages
} from 'lucide-react';
import AdminStatsPanel from '@/components/AdminStatsPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Language display names for the UI
const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
  'en': '英语',
  'en-US': '英语 (美国)',
  'en-GB': '英语 (英国)',
  'zh': '中文',
  'zh-CN': '中文 (简体)',
  'zh-TW': '中文 (繁体)',
  'ar': '阿拉伯语',
  'ar-SA': '阿拉伯语',
  'de': '德语',
  'de-DE': '德语',
  'es': '西班牙语',
  'es-ES': '西班牙语',
  'pt': '葡萄牙语',
  'pt-BR': '葡萄牙语 (巴西)',
  'pt-PT': '葡萄牙语',
  'fr': '法语',
  'fr-FR': '法语',
  'ja': '日语',
  'ko': '韩语',
  'ru': '俄语',
  'it': '意大利语',
  'nl': '荷兰语',
  'tr': '土耳其语',
  'vi': '越南语',
  'th': '泰语',
  'id': '印尼语',
  'ms': '马来语',
  'hi': '印地语',
};

function getLanguageDisplayName(langCode: string | null): string {
  if (!langCode) return '未知';
  if (LANGUAGE_DISPLAY_NAMES[langCode]) return LANGUAGE_DISPLAY_NAMES[langCode];
  const baseCode = langCode.split('-')[0];
  if (LANGUAGE_DISPLAY_NAMES[baseCode]) return LANGUAGE_DISPLAY_NAMES[baseCode];
  return langCode;
}

interface QuickReplyTemplate {
  id: string;
  title: string;
  content: string;
  category: string | null;
  sort_order: number;
}

interface ChatSession {
  session_id: string;
  last_message: string;
  last_message_time: string;
  message_count: number;
  has_unread: boolean;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  notes?: string;
}

interface CustomerMetadata {
  customer_ip?: string;
  customer_country?: string;
  customer_city?: string;
  customer_device?: string;
  customer_browser?: string;
  customer_os?: string;
  customer_language?: string;
  customer_timezone?: string;
  page_url?: string;
  referrer?: string;
  created_at?: string;
}

interface ChatMessage {
  id: string;
  session_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  is_ai_response: boolean;
  is_staff_reply: boolean;
  created_at: string;
}

interface SessionStatus {
  session_id: string;
  status: string;
  notes: string | null;
}

const STATUS_CONFIG = {
  new: { label: '新消息', color: 'bg-destructive', icon: Circle },
  in_progress: { label: '处理中', color: 'bg-warning', icon: AlertCircle },
  resolved: { label: '已解决', color: 'bg-success', icon: CheckCircle },
  closed: { label: '已关闭', color: 'bg-muted-foreground', icon: CheckCheck },
};

const AdminCustomerServiceTab = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sessionStatuses, setSessionStatuses] = useState<Map<string, SessionStatus>>(new Map());
  const [sessionNotes, setSessionNotes] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [templates, setTemplates] = useState<QuickReplyTemplate[]>([]);
  const [showTemplateManager, setShowTemplateManager] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<QuickReplyTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState({ title: '', content: '', category: '' });
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [customerMetadata, setCustomerMetadata] = useState<CustomerMetadata | null>(null);
  const [showCustomerInfo, setShowCustomerInfo] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(true);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const fetchSessionStatuses = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('session_id, status, notes');

      if (error) throw error;

      const statusMap = new Map<string, SessionStatus>();
      data?.forEach((item) => {
        statusMap.set(item.session_id, item as SessionStatus);
      });
      setSessionStatuses(statusMap);
    } catch (error) {
      console.error('Error fetching session statuses:', error);
    }
  }, []);

  const fetchSessions = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('session_id, content, created_at, is_staff_reply')
        .order('created_at', { ascending: false });

      if (error) throw error;

      await fetchSessionStatuses();

      const sessionMap = new Map<string, ChatSession>();
      
      data?.forEach((msg) => {
        if (!sessionMap.has(msg.session_id)) {
          const statusInfo = sessionStatuses.get(msg.session_id);
          sessionMap.set(msg.session_id, {
            session_id: msg.session_id,
            last_message: msg.content,
            last_message_time: msg.created_at,
            message_count: 1,
            has_unread: !msg.is_staff_reply,
            status: (statusInfo?.status as ChatSession['status']) || 'new',
            notes: statusInfo?.notes || undefined
          });
        } else {
          const session = sessionMap.get(msg.session_id)!;
          session.message_count += 1;
          if (!msg.is_staff_reply && session.has_unread === false) {
            session.has_unread = true;
          }
        }
      });

      sessionMap.forEach((session, sessionId) => {
        const statusInfo = sessionStatuses.get(sessionId);
        if (statusInfo) {
          session.status = statusInfo.status as ChatSession['status'];
          session.notes = statusInfo.notes || undefined;
        }
      });

      setSessions(Array.from(sessionMap.values()));
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast.error('Failed to load chat sessions');
    } finally {
      setIsLoading(false);
    }
  }, [fetchSessionStatuses, sessionStatuses]);

  const fetchTemplates = useCallback(async () => {
    setIsLoadingTemplates(true);
    try {
      const { data, error } = await supabase
        .from('quick_reply_templates')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setTemplates((data || []) as QuickReplyTemplate[]);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setIsLoadingTemplates(false);
    }
  }, []);

  const addTemplate = async () => {
    if (!newTemplate.title.trim() || !newTemplate.content.trim()) {
      toast.error('请填写模板标题和内容');
      return;
    }

    try {
      const { error } = await supabase
        .from('quick_reply_templates')
        .insert({
          title: newTemplate.title.trim(),
          content: newTemplate.content.trim(),
          category: newTemplate.category.trim() || null,
          sort_order: templates.length
        });

      if (error) throw error;
      
      setNewTemplate({ title: '', content: '', category: '' });
      fetchTemplates();
      toast.success('模板已添加');
    } catch (error) {
      console.error('Error adding template:', error);
      toast.error('添加模板失败');
    }
  };

  const updateTemplate = async (template: QuickReplyTemplate) => {
    try {
      const { error } = await supabase
        .from('quick_reply_templates')
        .update({
          title: template.title,
          content: template.content,
          category: template.category
        })
        .eq('id', template.id);

      if (error) throw error;
      
      setEditingTemplate(null);
      fetchTemplates();
      toast.success('模板已更新');
    } catch (error) {
      console.error('Error updating template:', error);
      toast.error('更新模板失败');
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('quick_reply_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchTemplates();
      toast.success('模板已删除');
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('删除模板失败');
    }
  };

  const useTemplate = (content: string) => {
    setReplyText(content);
  };

  useEffect(() => {
    fetchSessionStatuses().then(() => fetchSessions());
    fetchTemplates();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('chat-messages-admin')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages'
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          fetchSessions();
          if (newMessage.session_id === selectedSession) {
            setMessages(prev => [...prev, newMessage]);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_sessions'
        },
        () => {
          fetchSessionStatuses();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedSession, fetchSessions, fetchSessionStatuses]);

  const fetchMessages = useCallback(async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []) as ChatMessage[]);
      
      const statusInfo = sessionStatuses.get(sessionId);
      setSessionNotes(statusInfo?.notes || '');
      
      const { data: sessionData, error: sessionError } = await supabase
        .from('chat_sessions')
        .select('customer_ip, customer_country, customer_city, customer_device, customer_browser, customer_os, customer_language, customer_timezone, page_url, referrer, created_at')
        .eq('session_id', sessionId)
        .single();
      
      if (!sessionError && sessionData) {
        setCustomerMetadata(sessionData as CustomerMetadata);
      } else {
        setCustomerMetadata(null);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    }
  }, [sessionStatuses]);

  useEffect(() => {
    if (selectedSession) {
      fetchMessages(selectedSession);
    }
  }, [selectedSession, fetchMessages]);

  const updateSessionStatus = async (sessionId: string, newStatus: string) => {
    setIsUpdatingStatus(true);
    try {
      const existingStatus = sessionStatuses.get(sessionId);
      
      if (existingStatus) {
        const { error } = await supabase
          .from('chat_sessions')
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq('session_id', sessionId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('chat_sessions')
          .insert({ session_id: sessionId, status: newStatus });

        if (error) throw error;
      }

      setSessionStatuses(prev => {
        const newMap = new Map(prev);
        newMap.set(sessionId, { 
          session_id: sessionId, 
          status: newStatus, 
          notes: existingStatus?.notes || null 
        });
        return newMap;
      });

      setSessions(prev => prev.map(s => 
        s.session_id === sessionId 
          ? { ...s, status: newStatus as ChatSession['status'] }
          : s
      ));

      toast.success('状态已更新');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('更新状态失败');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const saveSessionNotes = async () => {
    if (!selectedSession) return;
    
    setIsUpdatingStatus(true);
    try {
      const existingStatus = sessionStatuses.get(selectedSession);
      
      if (existingStatus) {
        const { error } = await supabase
          .from('chat_sessions')
          .update({ notes: sessionNotes, updated_at: new Date().toISOString() })
          .eq('session_id', selectedSession);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('chat_sessions')
          .insert({ session_id: selectedSession, status: 'new', notes: sessionNotes });

        if (error) throw error;
      }

      setSessionStatuses(prev => {
        const newMap = new Map(prev);
        const existing = prev.get(selectedSession);
        newMap.set(selectedSession, { 
          session_id: selectedSession, 
          status: existing?.status || 'new', 
          notes: sessionNotes 
        });
        return newMap;
      });

      toast.success('备注已保存');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('保存备注失败');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Translate text using AI
  const translateText = async (text: string, targetLanguage: string): Promise<string> => {
    try {
      const response = await supabase.functions.invoke('translate-reply', {
        body: { text, targetLanguage, sourceLanguage: 'zh' }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Translation failed');
      }

      return response.data?.translatedText || text;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  };

  const sendReply = async () => {
    if (!replyText.trim() || !selectedSession || isSending) return;

    setIsSending(true);
    setIsTranslating(false);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      let finalContent = replyText.trim();
      const customerLang = customerMetadata?.customer_language;
      
      // Check if we need to translate (customer language is not Chinese)
      const shouldTranslate = autoTranslate && 
        customerLang && 
        !customerLang.startsWith('zh');
      
      if (shouldTranslate) {
        setIsTranslating(true);
        try {
          finalContent = await translateText(finalContent, customerLang);
          toast.success(`已翻译为${getLanguageDisplayName(customerLang)}`);
        } catch (translateError) {
          // If translation fails, ask user if they want to send original
          toast.warning('翻译失败，将发送原文');
          console.error('Translation failed:', translateError);
        }
        setIsTranslating(false);
      }
      
      const { error } = await supabase.from('chat_messages').insert({
        session_id: selectedSession,
        role: 'assistant',
        content: finalContent,
        is_ai_response: false,
        is_staff_reply: true,
        replied_by: user?.id
      });

      if (error) throw error;

      const currentStatus = sessionStatuses.get(selectedSession);
      if (!currentStatus || currentStatus.status === 'new') {
        await updateSessionStatus(selectedSession, 'in_progress');
      }

      setReplyText('');
      toast.success('回复已发送');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('发送失败');
    } finally {
      setIsSending(false);
      setIsTranslating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendReply();
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (hours < 48) {
      return '昨天';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getSessionStatus = (sessionId: string): ChatSession['status'] => {
    const statusInfo = sessionStatuses.get(sessionId);
    return (statusInfo?.status as ChatSession['status']) || 'new';
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.session_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.last_message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const sessionStatus = getSessionStatus(session.session_id);
    const matchesStatus = statusFilter === 'all' || sessionStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const sortedSessions = [...filteredSessions].sort((a, b) => {
    const statusA = getSessionStatus(a.session_id);
    const statusB = getSessionStatus(b.session_id);
    
    const statusPriority = { new: 0, in_progress: 1, resolved: 2, closed: 3 };
    const priorityDiff = statusPriority[statusA] - statusPriority[statusB];
    
    if (priorityDiff !== 0) return priorityDiff;
    
    return new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime();
  });

  const statusCounts = {
    all: sessions.length,
    new: sessions.filter(s => getSessionStatus(s.session_id) === 'new').length,
    in_progress: sessions.filter(s => getSessionStatus(s.session_id) === 'in_progress').length,
    resolved: sessions.filter(s => getSessionStatus(s.session_id) === 'resolved').length,
    closed: sessions.filter(s => getSessionStatus(s.session_id) === 'closed').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Panel */}
      <AdminStatsPanel />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {statusCounts.new} 新消息 · {statusCounts.in_progress} 处理中
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => { fetchSessionStatuses(); fetchSessions(); }}>
          <RefreshCw className="w-4 h-4 mr-2" />
          刷新
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-380px)]">
        {/* Sessions List */}
        <div className="lg:col-span-1 border rounded-lg bg-card overflow-hidden flex flex-col">
          <div className="p-4 border-b space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索会话..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex flex-wrap gap-1">
              {Object.entries({ all: '全部', ...Object.fromEntries(Object.entries(STATUS_CONFIG).map(([k, v]) => [k, v.label])) }).map(([key, label]) => (
                <Button
                  key={key}
                  variant={statusFilter === key ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => setStatusFilter(key)}
                >
                  {label}
                  <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">
                    {statusCounts[key as keyof typeof statusCounts]}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : sortedSessions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>暂无会话</p>
              </div>
            ) : (
              <div className="divide-y">
                {sortedSessions.map((session) => {
                  const status = getSessionStatus(session.session_id);
                  const StatusIcon = STATUS_CONFIG[status]?.icon || Circle;
                  
                  return (
                    <button
                      key={session.session_id}
                      onClick={() => setSelectedSession(session.session_id)}
                      className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                        selectedSession === session.session_id ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`w-3 h-3 ${
                              status === 'new' ? 'text-red-500' :
                              status === 'in_progress' ? 'text-yellow-500' :
                              status === 'resolved' ? 'text-green-500' :
                              'text-gray-500'
                            }`} />
                            <span className="font-medium text-sm truncate">
                              {session.session_id.slice(0, 16)}...
                            </span>
                            {status === 'new' && (
                              <Badge variant="destructive" className="h-5 text-xs">
                                新
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {session.last_message}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTime(session.last_message_time)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${STATUS_CONFIG[status]?.color} text-white border-0`}
                        >
                          {STATUS_CONFIG[status]?.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {session.message_count} 消息
                        </Badge>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 border rounded-lg bg-card overflow-hidden flex flex-col">
          {selectedSession ? (
            <>
              <div className="p-4 border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">
                        会话: {selectedSession.slice(0, 24)}...
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {messages.length} 条消息
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={showCustomerInfo ? "default" : "outline"}
                      size="sm"
                      className="h-9 gap-1"
                      onClick={() => setShowCustomerInfo(!showCustomerInfo)}
                    >
                      <User className="w-3 h-3" />
                      客户信息
                    </Button>
                    
                    <Select
                      value={getSessionStatus(selectedSession)}
                      onValueChange={(value) => updateSessionStatus(selectedSession, value)}
                      disabled={isUpdatingStatus}
                    >
                      <SelectTrigger className="w-[130px] h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              <config.icon className={`w-3 h-3 ${
                                key === 'new' ? 'text-red-500' :
                                key === 'in_progress' ? 'text-yellow-500' :
                                key === 'resolved' ? 'text-green-500' :
                                'text-gray-500'
                              }`} />
                              {config.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedSession(null)}
                      className="lg:hidden"
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3 flex gap-2">
                  <Input
                    placeholder="添加备注..."
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    className="flex-1 h-8 text-sm"
                  />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={saveSessionNotes}
                    disabled={isUpdatingStatus}
                    className="h-8"
                  >
                    保存备注
                  </Button>
                </div>
              </div>

              {showCustomerInfo && customerMetadata && (
                <div className="border-b bg-gradient-to-r from-muted/50 to-muted/30 p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-start gap-2">
                      {customerMetadata.customer_device === 'Mobile' ? (
                        <Smartphone className="w-4 h-4 text-muted-foreground mt-0.5" />
                      ) : customerMetadata.customer_device === 'Tablet' ? (
                        <Tablet className="w-4 h-4 text-muted-foreground mt-0.5" />
                      ) : (
                        <Monitor className="w-4 h-4 text-muted-foreground mt-0.5" />
                      )}
                      <div>
                        <p className="text-xs text-muted-foreground">设备</p>
                        <p className="text-sm font-medium">{customerMetadata.customer_device || '未知'}</p>
                        <p className="text-xs text-muted-foreground">
                          {customerMetadata.customer_os} · {customerMetadata.customer_browser}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">语言/时区</p>
                        <p className="text-sm font-medium">{customerMetadata.customer_language || '未知'}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[150px]" title={customerMetadata.customer_timezone}>
                          {customerMetadata.customer_timezone || '未知'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Link className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground">来源页面</p>
                        {customerMetadata.page_url ? (
                          <a 
                            href={customerMetadata.page_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                          >
                            <span className="truncate max-w-[120px]">
                              {new URL(customerMetadata.page_url).pathname}
                            </span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        ) : (
                          <p className="text-sm font-medium">未知</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">会话时间</p>
                        <p className="text-sm font-medium">
                          {customerMetadata.created_at 
                            ? new Date(customerMetadata.created_at).toLocaleString('zh-CN', { 
                                month: 'short', 
                                day: 'numeric',
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })
                            : '未知'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.role === 'user'
                            ? 'bg-muted text-foreground rounded-bl-md'
                            : message.is_staff_reply
                            ? 'bg-green-500 text-white rounded-br-md'
                            : 'bg-primary text-primary-foreground rounded-br-md'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <div className={`flex items-center gap-1 mt-1 text-[10px] ${
                          message.role === 'user' 
                            ? 'text-muted-foreground' 
                            : 'text-white/70'
                        }`}>
                          {message.is_ai_response && <Bot className="w-3 h-3" />}
                          {message.is_staff_reply && <CheckCircle className="w-3 h-3" />}
                          <span>
                            {new Date(message.created_at).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="p-4 border-t bg-background space-y-3">
                {/* Customer language indicator and translate toggle */}
                {customerMetadata?.customer_language && !customerMetadata.customer_language.startsWith('zh') && (
                  <div className="flex items-center justify-between px-3 py-2 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Languages className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">客户语言：</span>
                      <Badge variant="secondary" className="font-medium">
                        {getLanguageDisplayName(customerMetadata.customer_language)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">自动翻译</span>
                      <Switch
                        checked={autoTranslate}
                        onCheckedChange={setAutoTranslate}
                        className="scale-90"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Zap className="w-3 h-3" />
                        快捷回复
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="start">
                      <div className="p-3 border-b">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">快捷回复模板</h4>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={() => setShowTemplateManager(true)}
                          >
                            <Edit2 className="w-3 h-3 mr-1" />
                            管理
                          </Button>
                        </div>
                      </div>
                      <ScrollArea className="h-[250px]">
                        {isLoadingTemplates ? (
                          <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                          </div>
                        ) : templates.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground text-sm">
                            暂无模板
                          </div>
                        ) : (
                          <div className="divide-y">
                            {Object.entries(
                              templates.reduce((acc, t) => {
                                const cat = t.category || '未分类';
                                if (!acc[cat]) acc[cat] = [];
                                acc[cat].push(t);
                                return acc;
                              }, {} as Record<string, QuickReplyTemplate[]>)
                            ).map(([category, categoryTemplates]) => (
                              <div key={category}>
                                <div className="px-3 py-1.5 bg-muted/50 text-xs font-medium text-muted-foreground">
                                  {category}
                                </div>
                                {categoryTemplates.map((template) => (
                                  <button
                                    key={template.id}
                                    onClick={() => useTemplate(template.content)}
                                    className="w-full p-3 text-left hover:bg-muted/50 transition-colors"
                                  >
                                    <div className="font-medium text-sm">{template.title}</div>
                                    <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                                      {template.content}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </ScrollArea>
                    </PopoverContent>
                  </Popover>
                  
                  <div className="flex-1 overflow-x-auto">
                    <div className="flex gap-1">
                      {templates.slice(0, 4).map((template) => (
                        <Button
                          key={template.id}
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs whitespace-nowrap shrink-0"
                          onClick={() => useTemplate(template.content)}
                        >
                          {template.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      autoTranslate && customerMetadata?.customer_language && !customerMetadata.customer_language.startsWith('zh')
                        ? `输入中文，发送时自动翻译为${getLanguageDisplayName(customerMetadata.customer_language)}`
                        : "输入回复内容... (Enter发送)"
                    }
                    disabled={isSending || isTranslating}
                    className="flex-1 min-h-[44px] max-h-32 resize-none"
                    rows={1}
                  />
                  <Button
                    onClick={sendReply}
                    disabled={!replyText.trim() || isSending || isTranslating}
                    className="shrink-0"
                  >
                    {isTranslating ? (
                      <div className="flex items-center gap-1">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-xs">翻译中</span>
                      </div>
                    ) : isSending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Dialog open={showTemplateManager} onOpenChange={setShowTemplateManager}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle>管理快捷回复模板</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 overflow-hidden flex flex-col flex-1">
                    <div className="p-4 border rounded-lg bg-muted/30 space-y-3">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        添加新模板
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="模板标题"
                          value={newTemplate.title}
                          onChange={(e) => setNewTemplate(prev => ({ ...prev, title: e.target.value }))}
                        />
                        <Input
                          placeholder="分类 (可选)"
                          value={newTemplate.category}
                          onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                        />
                      </div>
                      <Textarea
                        placeholder="模板内容"
                        value={newTemplate.content}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                        rows={2}
                      />
                      <Button size="sm" onClick={addTemplate}>
                        <Plus className="w-4 h-4 mr-1" />
                        添加模板
                      </Button>
                    </div>
                    
                    <ScrollArea className="flex-1 border rounded-lg">
                      <div className="divide-y">
                        {templates.map((template) => (
                          <div key={template.id} className="p-3">
                            {editingTemplate?.id === template.id ? (
                              <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                  <Input
                                    value={editingTemplate.title}
                                    onChange={(e) => setEditingTemplate(prev => prev ? { ...prev, title: e.target.value } : null)}
                                    placeholder="标题"
                                  />
                                  <Input
                                    value={editingTemplate.category || ''}
                                    onChange={(e) => setEditingTemplate(prev => prev ? { ...prev, category: e.target.value } : null)}
                                    placeholder="分类"
                                  />
                                </div>
                                <Textarea
                                  value={editingTemplate.content}
                                  onChange={(e) => setEditingTemplate(prev => prev ? { ...prev, content: e.target.value } : null)}
                                  rows={2}
                                />
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={() => updateTemplate(editingTemplate)}>
                                    <Save className="w-3 h-3 mr-1" />
                                    保存
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => setEditingTemplate(null)}>
                                    <X className="w-3 h-3 mr-1" />
                                    取消
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{template.title}</span>
                                    {template.category && (
                                      <Badge variant="outline" className="text-xs">
                                        {template.category}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {template.content}
                                  </p>
                                </div>
                                <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => setEditingTemplate(template)}
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                    onClick={() => deleteTemplate(template.id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        {templates.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            暂无模板，请添加新模板
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">选择一个会话</p>
                <p className="text-sm">点击左侧会话查看消息</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerServiceTab;
