import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Premium Drawer Component
 * Features: Slide animations, backdrop, multiple positions
 */
const Drawer = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  title,
  width = '400px',
  closeOnBackdrop = true,
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const positionClasses = {
    left: 'left-0 top-0 bottom-0',
    right: 'right-0 top-0 bottom-0',
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
  };

  const slideVariants = {
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
    },
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
    },
    top: {
      initial: { y: '-100%' },
      animate: { y: 0 },
      exit: { y: '-100%' },
    },
    bottom: {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' },
    },
  };

  const widthStyle =
    position === 'left' || position === 'right'
      ? { width }
      : { height: width };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnBackdrop ? onClose : undefined}
          />

          {/* Drawer */}
          <motion.div
            className={`
              fixed
              ${positionClasses[position]}
              bg-background-card
              shadow-2xl
              z-50
              ${className}
            `}
            style={widthStyle}
            variants={slideVariants[position]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            {title && (
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold text-text-dark">
                  {title}
                </h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-5 h-5 text-text-light"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>
            )}

            {/* Content */}
            <div className="h-full overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
