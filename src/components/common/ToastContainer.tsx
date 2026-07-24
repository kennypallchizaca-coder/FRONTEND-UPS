/** Renderiza y anima las notificaciones toast activas. */

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useNotifications, useNotify } from '@/lib/notifications';
import type { NotificationType } from '@/lib/notifications';


const TOAST_STYLES: Record<NotificationType, {
  bg: string;
  border: string;
  text: string;
  icon: React.ReactNode;
}> = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: <CheckCircle size={18} className="text-green-600 flex-shrink-0" />,
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: <AlertCircle size={18} className="text-red-600 flex-shrink-0" />,
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    icon: <AlertTriangle size={18} className="text-amber-600 flex-shrink-0" />,
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: <Info size={18} className="text-blue-600 flex-shrink-0" />,
  },
};


interface ToastItemProps {
  id: string;
  type: NotificationType;
  message: string;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ id, type, message, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const style = TOAST_STYLES[type];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(id), 200);
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`
        flex items-start gap-3 p-4 rounded-md border shadow-lg max-w-sm w-full
        transition-all duration-200 ease-out
        ${style.bg} ${style.border} ${style.text}
        ${isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-4'}
      `}
    >
      {style.icon}
      <p className="text-sm flex-1 leading-snug font-medium">{message}</p>
      <button
        type="button"
        onClick={handleDismiss}
        className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Cerrar notificación"
      >
        <X size={16} />
      </button>
    </div>
  );
};


const ToastContainer: React.FC = () => {
  const notifications = useNotifications();
  const { dismiss } = useNotify();

  if (notifications.length === 0) return null;

  return (
    <div
      aria-label="Notificaciones"
      className="fixed top-20 sm:top-4 right-2 sm:right-4 left-2 sm:left-auto z-[9999] flex flex-col gap-3 pointer-events-none"
    >
      {notifications.map((n) => (
        <div key={n.id} className="pointer-events-auto">
          <ToastItem
            id={n.id}
            type={n.type}
            message={n.message}
            onDismiss={dismiss}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
