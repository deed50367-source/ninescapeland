import { Component, type ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCcw, TriangleAlert } from "lucide-react";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    // Keep this lightweight: enough to diagnose via hosting console logs.
    // eslint-disable-next-line no-console
    console.error("App crashed:", error);
  }

  private handleReload = () => {
    try {
      // If a stale Service Worker / cache is involved, a normal reload often fixes it.
      // We keep this simple and avoid destructive cache clear automatically.
      window.location.reload();
    } catch {
      // ignore
    }
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          <Alert>
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>页面加载失败</AlertTitle>
            <AlertDescription className="mt-2 space-y-3">
              <p>
                可能是浏览器缓存/更新导致的资源版本不一致。请点击“重新加载”。
              </p>
              <div>
                <Button onClick={this.handleReload}>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  重新加载
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }
}
