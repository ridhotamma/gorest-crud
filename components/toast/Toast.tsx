import React, { useEffect, useState } from 'react';
import './Toast.css'

export interface ToastProps {
  type: 'success' | 'danger' | 'warning';
  message: string;
  onClose: () => void;
  position?: 'tl' | 'tr' | 'br' | 'bl';
  duration?: number;
}

type ColorType = {
  textColor: string;
  bgColor: string;
  darkTextColor: string;
  darkBgColor: string;
};

const Toast: React.FC<ToastProps> = ({ type, message, onClose, position = 'br', duration = 5000 }) => {
  const [active, setActive] = useState(false);

  const toastClass = `flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 toast ${
    active ? 'active' : ''
  }`;
  const iconClass = `inline-flex items-center justify-center flex-shrink-0 w-8 h-8`;

  const colorMap: Record<string, ColorType> = {
    success: {
      textColor: 'text-green-500',
      bgColor: 'bg-green-100',
      darkTextColor: 'dark:text-green-200',
      darkBgColor: 'dark:bg-green-800',
    },
    danger: {
      textColor: 'text-red-500',
      bgColor: 'bg-red-100',
      darkTextColor: 'dark:text-red-200',
      darkBgColor: 'dark:bg-red-800',
    },
    default: {
      textColor: 'text-orange-500',
      bgColor: 'bg-orange-100',
      darkTextColor: 'dark:text-orange-200',
      darkBgColor: 'dark:bg-orange-700',
    },
  };
  
  const colorType = colorMap[type] || colorMap.default;
  const iconColor = `${colorType.textColor} ${colorType.bgColor} ${colorType.darkBgColor} ${colorType.darkTextColor}`;

  const positionClass = 'fixed z-[1001]';
  const positionMapping: Record<string, string> = {
    tl: 'top-5 left-5',
    tr: 'top-5 right-5',
    br: 'right-5 bottom-5',
    bl: 'bottom-5 left-5',
  };

  useEffect(() => {
    setActive(true);

    const timer = setTimeout(() => {
      setActive(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${toastClass} ${positionClass} ${positionMapping[position]}`} role="alert">
      <div className={`${iconClass} ${iconColor} rounded-lg`}>
        {/* Icon SVG code */}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={onClose}
      >
        {/* Close button SVG code */}
      </button>
      <button
        type="button"
        className="ml-2 -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        onClick={onClose}
      >
        {/* Close icon SVG code */}
      </button>
    </div>
  );
};

export default Toast;
