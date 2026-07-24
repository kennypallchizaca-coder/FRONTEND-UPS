/** Gestiona el estado global de notificaciones toast. */

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { NotificationContext } from './notification-context';
import type { Notification, NotificationType, NotifyAPI, NotifyOptions } from './notification-context';

const DEFAULT_DURATION: Record<NotificationType, number> = {
  success: 4000,
  error: 6000,
  info: 4000,
  warning: 5000,
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>> | null>(null);
  if (timersRef.current === null) {
    timersRef.current = new Map();
  }

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers?.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    const timer = timersRef.current?.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current?.delete(id);
    }
  }, []);

  const addNotification = useCallback(
    (type: NotificationType, message: string, options?: NotifyOptions) => {
      const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const duration = options?.duration ?? DEFAULT_DURATION[type];

      const notification: Notification = { id, type, message };
      setNotifications((prev) => [...prev, notification]);

      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timersRef.current?.set(id, timer);
      }
    },
    [dismiss]
  );

  const notify: NotifyAPI = useMemo(
    () => ({
      success: (msg, opts) => addNotification('success', msg, opts),
      error: (msg, opts) => addNotification('error', msg, opts),
      info: (msg, opts) => addNotification('info', msg, opts),
      warning: (msg, opts) => addNotification('warning', msg, opts),
      dismiss,
    }),
    [addNotification, dismiss]
  );

  const contextValue = useMemo(
    () => ({ notifications, notify }),
    [notifications, notify]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
