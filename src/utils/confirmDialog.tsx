import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

type ConfirmContextValue = {
  confirm: (options: ConfirmOptions) => void;
};

const ConfirmContext = createContext<ConfirmContextValue | undefined>(undefined);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<ConfirmOptions | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    setDialog(options);
  }, []);

  const handleConfirm = () => {
    if (dialog) {
      dialog.onConfirm();
      setDialog(null);
    }
  };

  const handleCancel = () => {
    if (dialog) {
      if (dialog.onCancel) {
        dialog.onCancel();
      }
      setDialog(null);
    }
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {dialog && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px',
          }}
          onClick={handleCancel}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600, color: '#1a1a1a' }}>
              {dialog.title || 'Confirmar acción'}
            </h3>
            <p style={{ margin: '0 0 24px 0', fontSize: '15px', color: '#4a4a4a', lineHeight: 1.5 }}>
              {dialog.message}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={handleCancel}
                style={{
                  padding: '10px 20px',
                  border: '2px solid #e5e5e5',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  color: '#4a4a4a',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                  e.currentTarget.style.borderColor = '#d5d5d5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              >
                {dialog.cancelText || 'Cancelar'}
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#dc2626',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#b91c1c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc2626';
                }}
              >
                {dialog.confirmText || 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    // Fallback a confirm nativo
    return {
      confirm: (options: ConfirmOptions) => {
        if (window.confirm(options.message)) {
          options.onConfirm();
        } else if (options.onCancel) {
          options.onCancel();
        }
      },
    };
  }
  return ctx;
}
