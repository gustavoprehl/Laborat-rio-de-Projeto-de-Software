import React from 'react';
import { X } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const Toast: React.FC = () => {
  const { toasts, hideToast } = useToast();

  if (toasts.length === 0) return null;

  const getToastClasses = (type: string) => {
    const baseClasses = 'p-4 rounded-md shadow-md mb-3 flex justify-between items-center';
    
    switch (type) {
      case 'success':
        return `${baseClasses} bg-[#DFF6E3] border-l-4 border-[#4CAF50] text-[#2E7D32]`;
      case 'error':
        return `${baseClasses} bg-[#FDECEA] border-l-4 border-[#F44336] text-[#C62828]`;
      case 'warning':
        return `${baseClasses} bg-[#FFF8E1] border-l-4 border-[#FFC107] text-[#FF8F00]`;
      case 'info':
      default:
        return `${baseClasses} bg-[#E3F2FD] border-l-4 border-[#2196F3] text-[#1565C0]`;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastClasses(toast.type)} transform transition-all duration-300 animate-fade-in`}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => hideToast(toast.id)}
            className="text-[#4B3F72] hover:text-[#2E2E2E]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;