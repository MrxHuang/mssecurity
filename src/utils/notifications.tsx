import React, { createContext, useContext, useState, useCallback } from 'react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

type Notification = {
  id: string;
  message: string;
  type: NotificationType;
};

type NotificationContextValue = {
  showNotification: (message: string, type?: NotificationType) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }, [removeNotification]);

  const showSuccess = useCallback((message: string) => showNotification(message, 'success'), [showNotification]);
  const showError = useCallback((message: string) => showNotification(message, 'error'), [showNotification]);
  const showInfo = useCallback((message: string) => showNotification(message, 'info'), [showNotification]);
  const showWarning = useCallback((message: string) => showNotification(message, 'warning'), [showNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification, showSuccess, showError, showInfo, showWarning }}>
      {children}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '400px',
        }}
      >
        {notifications.map((notification) => {
          const colors = {
            success: { bg: '#e6f7e6', border: '#4caf50', text: '#2e7d32', icon: '✓' },
            error: { bg: '#ffebee', border: '#f44336', text: '#c62828', icon: '✕' },
            info: { bg: '#e3f2fd', border: '#2196f3', text: '#1565c0', icon: 'ℹ' },
            warning: { bg: '#fff3e0', border: '#ff9800', text: '#e65100', icon: '⚠' },
          };
          const color = colors[notification.type];

          return (
            <div
              key={notification.id}
              onClick={() => removeNotification(notification.id)}
              style={{
                backgroundColor: color.bg,
                border: `2px solid ${color.border}`,
                color: color.text,
                padding: '12px 16px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: 500,
                animation: 'slideIn 0.3s ease-out',
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{color.icon}</span>
              <span style={{ flex: 1 }}>{notification.message}</span>
              <style>{`
                @keyframes slideIn {
                  from {
                    transform: translateX(100%);
                    opacity: 0;
                  }
                  to {
                    transform: translateX(0);
                    opacity: 1;
                  }
                }
              `}</style>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    // Fallback para cuando no hay provider (devuelve alerts)
    return {
      showNotification: (msg: string) => alert(msg),
      showSuccess: (msg: string) => alert(msg),
      showError: (msg: string) => alert(msg),
      showInfo: (msg: string) => alert(msg),
      showWarning: (msg: string) => alert(msg),
    };
  }
  return ctx;
}
