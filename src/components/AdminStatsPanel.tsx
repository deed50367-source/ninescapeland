import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle, Users, Clock, TrendingUp, TrendingDown,
  BarChart3, PieChart, Calendar, ChevronDown, ChevronUp,
  Smile, Meh, Frown, Target, Zap, Download, Phone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { exportToExcel, whatsappClicksExportColumns } from '@/utils/excelExport';

interface StatsData {
  totalSessions: number;
  todaySessions: number;
  avgResponseTime: number;
  resolvedRate: number;
  statusBreakdown: {
    new: number;
    in_progress: number;
    resolved: number;
    closed: number;
  };
  dailyTrend: {
    date: string;
    count: number;
  }[];
  hourlyDistribution: number[];
  avgMessagesPerSession: number;
  peakHour: number;
}

interface WhatsAppStats {
  totalClicks: number;
  todayClicks: number;
  bySource: Record<string, number>;
  byLanguage: Record<string, number>;
}

interface WhatsAppClick {
  id: string;
  created_at: string;
  source: string;
  page_url: string | null;
  referrer: string | null;
  user_agent: string | null;
  language: string | null;
  country: string | null;
  session_id: string | null;
}

const AdminStatsPanel = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [whatsappStats, setWhatsappStats] = useState<WhatsAppStats | null>(null);
  const [whatsappClicks, setWhatsappClicks] = useState<WhatsAppClick[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [dateRange, setDateRange] = useState('7');
  const [isExporting, setIsExporting] = useState(false);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const now = new Date();
      const daysAgo = new Date(now.getTime() - parseInt(dateRange) * 24 * 60 * 60 * 1000);
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // Fetch all sessions
      const { data: sessions, error: sessionsError } = await supabase
        .from('chat_sessions')
        .select('session_id, status, created_at, last_message_at')
        .gte('created_at', daysAgo.toISOString());

      if (sessionsError) throw sessionsError;

      // Fetch all messages for response time calculation
      const { data: messages, error: messagesError } = await supabase
        .from('chat_messages')
        .select('session_id, created_at, is_staff_reply, role')
        .gte('created_at', daysAgo.toISOString())
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      // Calculate stats
      const totalSessions = sessions?.length || 0;
      const todaySessions = sessions?.filter(s => 
        new Date(s.created_at) >= todayStart
      ).length || 0;

      // Status breakdown
      const statusBreakdown = {
        new: sessions?.filter(s => s.status === 'new').length || 0,
        in_progress: sessions?.filter(s => s.status === 'in_progress').length || 0,
        resolved: sessions?.filter(s => s.status === 'resolved').length || 0,
        closed: sessions?.filter(s => s.status === 'closed').length || 0,
      };

      // Resolved rate
      const resolvedRate = totalSessions > 0 
        ? ((statusBreakdown.resolved + statusBreakdown.closed) / totalSessions) * 100 
        : 0;

      // Calculate average response time (time between user message and staff reply)
      let totalResponseTime = 0;
      let responseCount = 0;
      const sessionMessages = new Map<string, any[]>();

      messages?.forEach(msg => {
        if (!sessionMessages.has(msg.session_id)) {
          sessionMessages.set(msg.session_id, []);
        }
        sessionMessages.get(msg.session_id)?.push(msg);
      });

      sessionMessages.forEach((msgs) => {
        for (let i = 1; i < msgs.length; i++) {
          if (msgs[i].is_staff_reply && msgs[i - 1].role === 'user') {
            const responseTime = new Date(msgs[i].created_at).getTime() - 
                               new Date(msgs[i - 1].created_at).getTime();
            totalResponseTime += responseTime;
            responseCount++;
          }
        }
      });

      const avgResponseTime = responseCount > 0 
        ? totalResponseTime / responseCount / 1000 / 60 // in minutes
        : 0;

      // Average messages per session
      const avgMessagesPerSession = totalSessions > 0 
        ? (messages?.length || 0) / totalSessions 
        : 0;

      // Daily trend
      const dailyMap = new Map<string, number>();
      for (let i = parseInt(dateRange) - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        dailyMap.set(dateStr, 0);
      }

      sessions?.forEach(session => {
        const dateStr = new Date(session.created_at).toISOString().split('T')[0];
        if (dailyMap.has(dateStr)) {
          dailyMap.set(dateStr, (dailyMap.get(dateStr) || 0) + 1);
        }
      });

      const dailyTrend = Array.from(dailyMap.entries()).map(([date, count]) => ({
        date,
        count
      }));

      // Hourly distribution
      const hourlyDistribution = new Array(24).fill(0);
      sessions?.forEach(session => {
        const hour = new Date(session.created_at).getHours();
        hourlyDistribution[hour]++;
      });

      const peakHour = hourlyDistribution.indexOf(Math.max(...hourlyDistribution));

      // Fetch WhatsApp clicks
      const { data: waClicks, error: waError } = await supabase
        .from('whatsapp_clicks')
        .select('*')
        .gte('created_at', daysAgo.toISOString())
        .order('created_at', { ascending: false });

      if (!waError && waClicks) {
        setWhatsappClicks(waClicks);
        
        const todayWAClicks = waClicks.filter(c => 
          new Date(c.created_at) >= todayStart
        ).length;

        const bySource: Record<string, number> = {};
        const byLanguage: Record<string, number> = {};
        
        waClicks.forEach(click => {
          bySource[click.source] = (bySource[click.source] || 0) + 1;
          if (click.language) {
            byLanguage[click.language] = (byLanguage[click.language] || 0) + 1;
          }
        });

        setWhatsappStats({
          totalClicks: waClicks.length,
          todayClicks: todayWAClicks,
          bySource,
          byLanguage,
        });
      }

      setStats({
        totalSessions,
        todaySessions,
        avgResponseTime,
        resolvedRate,
        statusBreakdown,
        dailyTrend,
        hourlyDistribution,
        avgMessagesPerSession,
        peakHour,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [dateRange]);

  const formatResponseTime = (minutes: number): string => {
    if (minutes < 1) return '< 1 min';
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  const getResponseTimeColor = (minutes: number): string => {
    if (minutes < 5) return 'text-success';
    if (minutes < 15) return 'text-warning';
    if (minutes < 30) return 'text-accent';
    return 'text-destructive';
  };

  const getResponseTimeIcon = (minutes: number) => {
    if (minutes < 5) return Smile;
    if (minutes < 15) return Meh;
    return Frown;
  };

  const getTrendIndicator = () => {
    if (!stats || stats.dailyTrend.length < 2) return null;
    const recent = stats.dailyTrend.slice(-3).reduce((sum, d) => sum + d.count, 0) / 3;
    const older = stats.dailyTrend.slice(0, 3).reduce((sum, d) => sum + d.count, 0) / 3;
    
    if (recent > older * 1.1) {
      return { icon: TrendingUp, color: 'text-success', text: 'Up' };
    } else if (recent < older * 0.9) {
      return { icon: TrendingDown, color: 'text-destructive', text: 'Down' };
    }
    return null;
  };

  const handleExportWhatsAppClicks = async () => {
    if (whatsappClicks.length === 0) {
      toast.error("No WhatsApp click data to export");
      return;
    }
    setIsExporting(true);
    try {
      exportToExcel(whatsappClicks, whatsappClicksExportColumns, {
        filename: 'whatsapp_clicks',
        sheetName: 'WhatsApp Clicks'
      });
      toast.success(`Exported ${whatsappClicks.length} WhatsApp click records`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error("Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  const trend = getTrendIndicator();

  if (!isExpanded) {
    return (
      <Card className="mb-6">
        <CardHeader className="py-3 cursor-pointer" onClick={() => setIsExpanded(true)}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Statistics
            </CardTitle>
            <div className="flex items-center gap-4">
              {stats && (
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Today: {stats.todaySessions} sessions</span>
                  <span>Resolution rate: {stats.resolvedRate.toFixed(0)}%</span>
                </div>
              )}
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Statistics
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="14">Last 14 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(false)}>
                <ChevronUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {isLoading ? (
            <div className="h-32 flex items-center justify-center text-muted-foreground">
              Loading...
            </div>
          ) : stats ? (
            <div className="space-y-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Today's Sessions */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">Today's Sessions</span>
                  </div>
                  <div className="text-2xl font-bold">{stats.todaySessions}</div>
                  {trend && (
                    <div className={`flex items-center gap-1 text-xs mt-1 ${trend.color}`}>
                      <trend.icon className="w-3 h-3" />
                      <span>{trend.text} trend</span>
                    </div>
                  )}
                </div>

                {/* Total Sessions */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">Total Sessions</span>
                  </div>
                  <div className="text-2xl font-bold">{stats.totalSessions}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Last {dateRange} days
                  </div>
                </div>

                {/* Average Response Time */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Avg Response</span>
                  </div>
                  <div className={`text-2xl font-bold ${getResponseTimeColor(stats.avgResponseTime)}`}>
                    {stats.avgResponseTime > 0 ? formatResponseTime(stats.avgResponseTime) : '-'}
                  </div>
                  {stats.avgResponseTime > 0 && (
                    <div className="flex items-center gap-1 text-xs mt-1 text-muted-foreground">
                      {(() => {
                        const Icon = getResponseTimeIcon(stats.avgResponseTime);
                        return <Icon className="w-3 h-3" />;
                      })()}
                      <span>{stats.avgResponseTime < 5 ? 'Excellent' : stats.avgResponseTime < 15 ? 'Good' : 'Needs improvement'}</span>
                    </div>
                  )}
                </div>

                {/* Resolution Rate */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Target className="w-4 h-4" />
                    <span className="text-xs">Resolution Rate</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {stats.resolvedRate.toFixed(0)}%
                  </div>
                  <Progress value={stats.resolvedRate} className="h-1.5 mt-2" />
                </div>
              </div>

              {/* Status Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <PieChart className="w-4 h-4" />
                    <span className="text-sm font-medium">Status Distribution</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-destructive" />
                        <span className="text-sm">New</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{stats.statusBreakdown.new}</span>
                        <span className="text-xs text-muted-foreground">
                          ({stats.totalSessions > 0 ? ((stats.statusBreakdown.new / stats.totalSessions) * 100).toFixed(0) : 0}%)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-warning" />
                        <span className="text-sm">In Progress</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{stats.statusBreakdown.in_progress}</span>
                        <span className="text-xs text-muted-foreground">
                          ({stats.totalSessions > 0 ? ((stats.statusBreakdown.in_progress / stats.totalSessions) * 100).toFixed(0) : 0}%)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-success" />
                        <span className="text-sm">Resolved</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{stats.statusBreakdown.resolved}</span>
                        <span className="text-xs text-muted-foreground">
                          ({stats.totalSessions > 0 ? ((stats.statusBreakdown.resolved / stats.totalSessions) * 100).toFixed(0) : 0}%)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                        <span className="text-sm">Closed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{stats.statusBreakdown.closed}</span>
                        <span className="text-xs text-muted-foreground">
                          ({stats.totalSessions > 0 ? ((stats.statusBreakdown.closed / stats.totalSessions) * 100).toFixed(0) : 0}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Stats */}
                {whatsappStats && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm font-medium">WhatsApp Conversions</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExportWhatsAppClicks}
                        disabled={isExporting || whatsappClicks.length === 0}
                        className="h-7 text-xs"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Export
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-success">{whatsappStats.totalClicks}</div>
                        <div className="text-xs text-muted-foreground">Total Clicks</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{whatsappStats.todayClicks}</div>
                        <div className="text-xs text-muted-foreground">Today</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-xs text-muted-foreground mb-1">Top Sources</div>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(whatsappStats.bySource)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 4)
                            .map(([source, count]) => (
                              <Badge key={source} variant="secondary" className="text-xs">
                                {source.replace(/_/g, ' ')}: {count}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Stats */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">More Metrics</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg Messages/Session</span>
                      <span className="font-medium">{stats.avgMessagesPerSession.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Peak Hours</span>
                      <Badge variant="secondary">
                        {stats.peakHour}:00 - {stats.peakHour + 1}:00
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg Daily Sessions</span>
                      <span className="font-medium">
                        {(stats.totalSessions / parseInt(dateRange)).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Trend Chart */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm font-medium">Daily Trend</span>
                </div>
                <div className="flex items-end gap-1 h-24">
                  {stats.dailyTrend.map((day, index) => {
                    const maxCount = Math.max(...stats.dailyTrend.map(d => d.count), 1);
                    const height = (day.count / maxCount) * 100;
                    return (
                      <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: index * 0.05 }}
                          className="w-full bg-primary/80 rounded-t min-h-[4px]"
                          title={`${day.date}: ${day.count} sessions`}
                        />
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(day.date).getDate()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center text-muted-foreground">
              No data available
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminStatsPanel;