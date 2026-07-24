/** Expone hooks de consumo del contexto de notificaciones. */

import { use } from 'react';
import { NotificationContext } from './notification-context';
import type { Notification, NotifyAPI } from './notification-context';

export function useNotify(): NotifyAPI {
  const ctx = use(NotificationContext);
  if (!ctx) {
    throw new Error('useNotify debe usarse dentro de <NotificationProvider>');
  }
  return ctx.notify;
}

export function useNotifications(): Notification[] {
  const ctx = use(NotificationContext);
  if (!ctx) {
    throw new Error('useNotifications debe usarse dentro de <NotificationProvider>');
  }
  return ctx.notifications;
}
