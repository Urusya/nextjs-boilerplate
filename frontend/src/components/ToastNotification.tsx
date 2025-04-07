'use client';
import { useEffect, useState } from 'react';
import { Toast, ToastToggle } from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';

type ToastType = 'success' | 'error' | 'warning';
type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ToastNotificationProps {
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
  onClose?: () => void;
}

export default function ToastNotification({
  message,
  type = 'success',
  position = 'top-right',
  duration = 3000,
  onClose,
}: ToastNotificationProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!show) return null;

  const positionClass =
    position === 'top-left'
      ? 'top-5 left-5'
      : position === 'top-right'
      ? 'top-5 right-5'
      : position === 'bottom-left'
      ? 'bottom-5 left-5'
      : 'bottom-5 right-5';

  const iconMap = {
    success: {
      icon: <HiCheck className="h-5 w-5" />,
      color: 'text-green-500',
      bg: 'bg-green-100 dark:bg-green-800 dark:text-green-200'
    },
    error: {
      icon: <HiX className="h-5 w-5" />,
      color: 'text-red-500',
      bg: 'bg-red-100 dark:bg-red-800 dark:text-red-200'
    },
    warning: {
      icon: <HiExclamation className="h-5 w-5" />,
      color: 'text-orange-500',
      bg: 'bg-orange-100 dark:bg-orange-700 dark:text-orange-200'
    }
  };

  const { icon, color, bg } = iconMap[type];

  return (
    <div
      className={`fixed z-50 ${positionClass}`}
    >
      <Toast className="max-w-xs">
        <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${color} ${bg}`}>
          {icon}
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <ToastToggle onDismiss={() => setShow(false)} />
      </Toast>
    </div>
  );
}
