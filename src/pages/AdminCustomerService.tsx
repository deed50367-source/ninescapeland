import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, Send, ArrowLeft, Clock, User, Bot, 
  Loader2, RefreshCw, Search, CheckCircle, XCircle,
  Circle, CheckCheck, AlertCircle, Zap, Plus, Trash2, Edit2, Save, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { toast } from 'sonner';

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
  new: { label: '新消息', color: 'bg-red-500', icon: Circle },
  in_progress: { label: '处理中', color: 'bg-yellow-500', icon: AlertCircle },
  resolved: { label: '已解决', color: 'bg-green-500', icon: CheckCircle },
  closed: { label: '已关闭', color: 'bg-gray-500', icon: CheckCheck },
};

const AdminCustomerService = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sessionStatuses, setSessionStatuses] = useState<Map<string, SessionStatus>>(new Map());
  const [sessionNotes, setSessionNotes] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Quick reply templates state
  const [templates, setTemplates] = useState<QuickReplyTemplate[]>([]);
  const [showTemplateManager, setShowTemplateManager] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<QuickReplyTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState({ title: '', content: '', category: '' });
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [authLoading, isAdmin, navigate]);

  // Fetch session statuses from chat_sessions table
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

  // Fetch chat sessions
  const fetchSessions = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('session_id, content, created_at, is_staff_reply')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Also fetch statuses
      await fetchSessionStatuses();

      // Group by session and get latest message
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

      // Apply status from sessionStatuses
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

  // Fetch quick reply templates
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

  // Add new template
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

  // Update template
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

  // Delete template
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

  // Use template
  const useTemplate = (content: string) => {
    setReplyText(content);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchSessionStatuses().then(() => fetchSessions());
      fetchTemplates();
    }
  }, [isAdmin]);

  // Subscribe to realtime updates
  useEffect(() => {
    if (!isAdmin) return;

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
          
          // Update sessions list
          fetchSessions();
          
          // Update messages if viewing this session
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
  }, [isAdmin, selectedSession, fetchSessions, fetchSessionStatuses]);

  // Fetch messages for selected session
  const fetchMessages = useCallback(async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []) as ChatMessage[]);
      
      // Load session notes
      const statusInfo = sessionStatuses.get(sessionId);
      setSessionNotes(statusInfo?.notes || '');
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

  // Update session status
  const updateSessionStatus = async (sessionId: string, newStatus: string) => {
    setIsUpdatingStatus(true);
    try {
      // Check if session exists in chat_sessions table
      const existingStatus = sessionStatuses.get(sessionId);
      
      if (existingStatus) {
        // Update existing
        const { error } = await supabase
          .from('chat_sessions')
          .update({ 
            status: newStatus, 
            updated_at: new Date().toISOString() 
          })
          .eq('session_id', sessionId);

        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('chat_sessions')
          .insert({ 
            session_id: sessionId, 
            status: newStatus 
          });

        if (error) throw error;
      }

      // Update local state
      setSessionStatuses(prev => {
        const newMap = new Map(prev);
        newMap.set(sessionId, { 
          session_id: sessionId, 
          status: newStatus, 
          notes: existingStatus?.notes || null 
        });
        return newMap;
      });

      // Update sessions list
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

  // Save session notes
  const saveSessionNotes = async () => {
    if (!selectedSession) return;
    
    setIsUpdatingStatus(true);
    try {
      const existingStatus = sessionStatuses.get(selectedSession);
      
      if (existingStatus) {
        const { error } = await supabase
          .from('chat_sessions')
          .update({ 
            notes: sessionNotes, 
            updated_at: new Date().toISOString() 
          })
          .eq('session_id', selectedSession);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('chat_sessions')
          .insert({ 
            session_id: selectedSession, 
            status: 'new',
            notes: sessionNotes 
          });

        if (error) throw error;
      }

      // Update local state
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

  // Send reply
  const sendReply = async () => {
    if (!replyText.trim() || !selectedSession || isSending) return;

    setIsSending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase.from('chat_messages').insert({
        session_id: selectedSession,
        role: 'assistant',
        content: replyText.trim(),
        is_ai_response: false,
        is_staff_reply: true,
        replied_by: user?.id
      });

      if (error) throw error;

      // Auto update status to in_progress if it's new
      const currentStatus = sessionStatuses.get(selectedSession);
      if (!currentStatus || currentStatus.status === 'new') {
        await updateSessionStatus(selectedSession, 'in_progress');
      }

      setReplyText('');
      toast.success('Reply sent');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    } finally {
      setIsSending(false);
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
      return 'Yesterday';
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

  // Sort sessions: new first, then by last message time
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    const statusA = getSessionStatus(a.session_id);
    const statusB = getSessionStatus(b.session_id);
    
    // Priority: new > in_progress > resolved > closed
    const statusPriority = { new: 0, in_progress: 1, resolved: 2, closed: 3 };
    const priorityDiff = statusPriority[statusA] - statusPriority[statusB];
    
    if (priorityDiff !== 0) return priorityDiff;
    
    // Same status, sort by time
    return new Date(b.last_message_time).getTime() - new Date(a.last_message_time).getTime();
  });

  const statusCounts = {
    all: sessions.length,
    new: sessions.filter(s => getSessionStatus(s.session_id) === 'new').length,
    in_progress: sessions.filter(s => getSessionStatus(s.session_id) === 'in_progress').length,
    resolved: sessions.filter(s => getSessionStatus(s.session_id) === 'resolved').length,
    closed: sessions.filter(s => getSessionStatus(s.session_id) === 'closed').length,
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/assets')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Customer Service</h1>
              <p className="text-sm text-muted-foreground">
                {statusCounts.new} 新消息 · {statusCounts.in_progress} 处理中
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => { fetchSessionStatuses(); fetchSessions(); }}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
          {/* Sessions List */}
          <div className="lg:col-span-1 border rounded-lg bg-card overflow-hidden flex flex-col">
            <div className="p-4 border-b space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              {/* Status Filter */}
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
                  <p>No conversations yet</p>
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
                                  New
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
                {/* Chat Header with Status Control */}
                <div className="p-4 border-b bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">
                          Session: {selectedSession.slice(0, 24)}...
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {messages.length} 条消息
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Status Selector */}
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
                  
                  {/* Session Notes */}
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

                {/* Messages */}
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

                {/* Reply Input with Quick Templates */}
                <div className="p-4 border-t bg-background space-y-3">
                  {/* Quick Reply Templates */}
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
                              {/* Group by category */}
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
                    
                    {/* Quick template chips */}
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
                      placeholder="Type your reply... (Enter to send)"
                      disabled={isSending}
                      className="flex-1 min-h-[44px] max-h-32 resize-none"
                      rows={1}
                    />
                    <Button
                      onClick={sendReply}
                      disabled={!replyText.trim() || isSending}
                      className="shrink-0"
                    >
                      {isSending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Template Manager Dialog */}
                <Dialog open={showTemplateManager} onOpenChange={setShowTemplateManager}>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                      <DialogTitle>管理快捷回复模板</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 overflow-hidden flex flex-col flex-1">
                      {/* Add new template form */}
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
                      
                      {/* Template list */}
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
    </div>
  );
};

export default AdminCustomerService;