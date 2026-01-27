import { useEffect, useState } from "react";

/**
 * 防止页面因网络/鉴权请求异常导致 loading 永久不结束。
 * 当 isLoading 持续超过 timeoutMs 后，timedOut 会变为 true。
 */
export const useLoadingWatchdog = (isLoading: boolean, timeoutMs = 12000) => {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setTimedOut(false);
      return;
    }

    setTimedOut(false);
    const id = window.setTimeout(() => setTimedOut(true), timeoutMs);
    return () => window.clearTimeout(id);
  }, [isLoading, timeoutMs]);

  return timedOut;
};
