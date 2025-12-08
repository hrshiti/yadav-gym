import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Premium Toast Component
 * Features: Auto-dismiss, multiple positions, confetti on success
 */
const Toast = ({
  isOpen,
  onClose,
  message,
  type = 'info',
  duration = 3000,
  position = 'top-right',
  showIcon = true,
}) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  const typeClasses = {
    success: {
      bg: 'bg-success',
      border: 'border-success',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    error: {
      bg: 'bg-danger',
      border: 'border-danger',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    warning: {
      bg: 'bg-warning',
      border: 'border-warning',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    info: {
      bg: 'bg-primary-blue',
      border: 'border-primary-blue',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const typeConfig = typeClasses[type] || typeClasses.info;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`
            fixed
            ${positionClasses[position]}
            z-50
            min-w-[300px]
            max-w-md
          `}
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div
            className={`
              bg-background-card
              border-2 ${typeConfig.border}
              rounded-xl
              shadow-2xl
              p-4
              flex items-center gap-3
            `}
          >
            {/* Icon */}
            {showIcon && (
              <motion.div
                className={`
                  ${typeConfig.bg}
                  text-white
                  p-2
                  rounded-lg
                  flex-shrink-0
                `}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring' }}
              >
                {typeConfig.icon}
              </motion.div>
            )}

            {/* Message */}
            <p className="flex-1 text-text-dark font-medium">{message}</p>

            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-4 h-4 text-text-light"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          </div>

          {/* Progress Bar */}
          {duration > 0 && (
            <motion.div
              className={`h-1 ${typeConfig.bg} rounded-b-xl`}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

