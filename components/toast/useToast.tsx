import React, { useState } from 'react';
import Toast from './Toast';

interface ToastOptions {
  type: 'success' | 'danger' | 'warning';
  message: string;
  position?: 'tl' | 'tr' | 'br' | 'bl';
  duration?: number;
}

const useToast = () => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const triggerToast = (options: ToastOptions) => {
    const toastOptions = {
      duration: 5000, // Default duration if not provided
      ...options,
    };

    setToasts((prevToasts) => [...prevToasts, toastOptions]);

    if (toastOptions.duration) {
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((_, i) => i !== 0));
      }, toastOptions.duration);
    }
  };

  return {
    trigger: triggerToast,
    ToastPortal: () => (
      <div className="fixed z-[1001] inset-0 top-0 left-0 w-full h-full pointer-events-none">
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            type={toast.type}
            position={toast.position}
            message={toast.message}
            duration={toast.duration}
            onClose={() => {
              setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
            }}
          />
        ))}
      </div>
    ),
  };
};

export default useToast;
