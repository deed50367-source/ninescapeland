import { Globe } from 'lucide-react';

interface ChatSessionIdentityProps {
  sessionId: string;
  ip?: string | null;
  canViewIp: boolean;
}

export function ChatSessionIdentity({ sessionId, ip, canViewIp }: ChatSessionIdentityProps) {
  return (
    <div className="min-w-0 space-y-1 text-xs">
      <p className="break-all font-mono text-foreground select-text" title={sessionId}>
        会话编号：{sessionId}
      </p>
      <p className="flex items-start gap-1 text-muted-foreground">
        <Globe className="mt-0.5 h-3 w-3 shrink-0" />
        <span className="break-all select-text">访客IP：{canViewIp ? (ip?.trim() || '未记录') : '仅管理员可查看'}</span>
      </p>
    </div>
  );
}