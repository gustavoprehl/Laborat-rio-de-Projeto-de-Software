import React, { createContext, useState, useContext } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  toasts: Toast[];
  showToast: (message: string, type: ToastType) => void;
  hideToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType>({
  toasts: [],
  showToast: () => {},
  hideToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = Date.now().toString();
    
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      hideToast(id);
    }, 5000);
  };

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};