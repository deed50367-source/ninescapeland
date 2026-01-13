import { Progress } from "@/components/ui/progress";
import { X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface UploadItem {
  id: string;
  file: File;
  relativePath?: string; // For folder uploads
  status: "pending" | "uploading" | "success" | "error";
  progress: number;
  error?: string;
}

interface UploadProgressProps {
  items: UploadItem[];
  onClose: () => void;
  onCancel?: () => void;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export const UploadProgress = ({
  items,
  onClose,
  onCancel,
  isMinimized,
  onToggleMinimize,
}: UploadProgressProps) => {
  const completedCount = items.filter((i) => i.status === "success").length;
  const errorCount = items.filter((i) => i.status === "error").length;
  const totalCount = items.length;
  const isComplete = completedCount + errorCount === totalCount;
  const overallProgress = Math.round(
    items.reduce((acc, item) => acc + item.progress, 0) / totalCount
  );

  if (items.length === 0) return null;

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-4 right-4 bg-card border shadow-lg rounded-lg p-4 cursor-pointer z-50"
        onClick={onToggleMinimize}
      >
        <div className="flex items-center gap-3">
          {isComplete ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          )}
          <div>
            <p className="text-sm font-medium">
              {isComplete
                ? `上传完成 ${completedCount}/${totalCount}`
                : `上传中 ${completedCount}/${totalCount}`}
            </p>
            {!isComplete && (
              <Progress value={overallProgress} className="w-32 h-1.5 mt-1" />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-card border shadow-xl rounded-lg w-96 max-h-[60vh] flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          {isComplete ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          )}
          <span className="font-medium">
            {isComplete
              ? `上传完成`
              : `上传中 (${completedCount}/${totalCount})`}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {!isComplete && onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              取消
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onToggleMinimize}
          >
            <span className="text-lg">−</span>
          </Button>
          {isComplete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Overall Progress */}
      {!isComplete && (
        <div className="px-4 py-2 border-b bg-muted/30">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>总进度</span>
            <span>{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      )}

      {/* Summary */}
      {isComplete && (
        <div className="px-4 py-3 border-b bg-muted/30">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              成功 {completedCount}
            </span>
            {errorCount > 0 && (
              <span className="flex items-center gap-1 text-destructive">
                <AlertCircle className="w-4 h-4" />
                失败 {errorCount}
              </span>
            )}
          </div>
        </div>
      )}

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-2 rounded hover:bg-muted/50"
          >
            <div className="flex-shrink-0">
              {item.status === "success" && (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              )}
              {item.status === "error" && (
                <AlertCircle className="w-4 h-4 text-destructive" />
              )}
              {item.status === "uploading" && (
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
              )}
              {item.status === "pending" && (
                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate" title={item.relativePath || item.file.name}>
                {item.relativePath || item.file.name}
              </p>
              {item.status === "uploading" && (
                <Progress value={item.progress} className="h-1 mt-1" />
              )}
              {item.status === "error" && item.error && (
                <p className="text-xs text-destructive truncate">{item.error}</p>
              )}
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {formatFileSize(item.file.size)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
