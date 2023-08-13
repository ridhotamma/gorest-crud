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
};

const Toast: React.FC<ToastProps> = ({ type, message, onClose, position = 'br', duration = 5000 }) => {
  const [active, setActive] = useState(false);

  const toastClass = `flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg toast ${
    active ? 'active' : ''
  }`;
  const iconClass = `inline-flex items-center justify-center flex-shrink-0 w-8 h-8`;

  const colorMap: Record<string, ColorType> = {
    success: {
      textColor: 'text-green-500',
      bgColor: 'bg-green-500',
    },
    danger: {
      textColor: 'text-red-500',
      bgColor: 'bg-red-500',
    },
    default: {
      textColor: 'text-orange-500',
      bgColor: 'bg-orange-500',
    },
  };
  
  const colorType = colorMap[type] || colorMap.default;
  const iconColor = `${colorType.textColor} ${colorType.bgColor}`;

  const positionClass = 'fixed';
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
      <div className={`${iconClass} ${iconColor} rounded-lg`}></div>
      <div className="ml-3 text-sm font-semibold">{message}</div>
    </div>
  );
};

export default Toast;
