/** Define el contexto y tipos compartidos de notificaciones. */

import { createContext } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

export interface NotifyOptions {
  duration?: number;
}

export interface NotifyAPI {
  success: (message: string, options?: NotifyOptions) => void;
  error: (message: string, options?: NotifyOptions) => void;
  info: (message: string, options?: NotifyOptions) => void;
  warning: (message: string, options?: NotifyOptions) => void;
  dismiss: (id: string) => void;
}

interface NotificationContextValue {
  notifications: Notification[];
  notify: NotifyAPI;
}

export const NotificationContext = createContext<NotificationContextValue | null>(null);
