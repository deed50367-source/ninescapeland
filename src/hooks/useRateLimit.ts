import { useState, useCallback, useRef } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  cooldownMs: number;
}

interface RateLimitState {
  isLimited: boolean;
  remainingAttempts: number;
  cooldownEndTime: number | null;
  timeUntilReset: number;
}

export const useRateLimit = (config: RateLimitConfig = {
  maxAttempts: 3,
  windowMs: 60000, // 1 minute window
  cooldownMs: 300000, // 5 minute cooldown after limit reached
}) => {
  const [state, setState] = useState<RateLimitState>({
    isLimited: false,
    remainingAttempts: config.maxAttempts,
    cooldownEndTime: null,
    timeUntilReset: 0,
  });
  
  const attemptsRef = useRef<number[]>([]);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cleanOldAttempts = useCallback(() => {
    const now = Date.now();
    attemptsRef.current = attemptsRef.current.filter(
      (timestamp) => now - timestamp < config.windowMs
    );
  }, [config.windowMs]);

  const checkLimit = useCallback((): boolean => {
    const now = Date.now();
    
    // Check if in cooldown period
    if (state.cooldownEndTime && now < state.cooldownEndTime) {
      return false;
    }
    
    // If cooldown has ended, reset
    if (state.cooldownEndTime && now >= state.cooldownEndTime) {
      setState(prev => ({
        ...prev,
        isLimited: false,
        cooldownEndTime: null,
      }));
      attemptsRef.current = [];
    }
    
    cleanOldAttempts();
    return attemptsRef.current.length < config.maxAttempts;
  }, [state.cooldownEndTime, cleanOldAttempts, config.maxAttempts]);

  const recordAttempt = useCallback((): boolean => {
    const now = Date.now();
    
    // Check if in cooldown
    if (state.cooldownEndTime && now < state.cooldownEndTime) {
      return false;
    }
    
    cleanOldAttempts();
    
    if (attemptsRef.current.length >= config.maxAttempts) {
      // Trigger cooldown
      const cooldownEnd = now + config.cooldownMs;
      setState({
        isLimited: true,
        remainingAttempts: 0,
        cooldownEndTime: cooldownEnd,
        timeUntilReset: config.cooldownMs,
      });
      
      // Clear any existing timer
      if (cooldownTimerRef.current) {
        clearInterval(cooldownTimerRef.current);
      }
      
      // Start countdown timer
      cooldownTimerRef.current = setInterval(() => {
        const remaining = cooldownEnd - Date.now();
        if (remaining <= 0) {
          setState({
            isLimited: false,
            remainingAttempts: config.maxAttempts,
            cooldownEndTime: null,
            timeUntilReset: 0,
          });
          attemptsRef.current = [];
          if (cooldownTimerRef.current) {
            clearInterval(cooldownTimerRef.current);
          }
        } else {
          setState(prev => ({
            ...prev,
            timeUntilReset: remaining,
          }));
        }
      }, 1000);
      
      return false;
    }
    
    // Record the attempt
    attemptsRef.current.push(now);
    
    setState(prev => ({
      ...prev,
      remainingAttempts: config.maxAttempts - attemptsRef.current.length,
    }));
    
    return true;
  }, [state.cooldownEndTime, cleanOldAttempts, config.maxAttempts, config.cooldownMs]);

  const reset = useCallback(() => {
    attemptsRef.current = [];
    if (cooldownTimerRef.current) {
      clearInterval(cooldownTimerRef.current);
    }
    setState({
      isLimited: false,
      remainingAttempts: config.maxAttempts,
      cooldownEndTime: null,
      timeUntilReset: 0,
    });
  }, [config.maxAttempts]);

  const formatTimeRemaining = useCallback((ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }, []);

  return {
    ...state,
    checkLimit,
    recordAttempt,
    reset,
    formatTimeRemaining,
  };
};
