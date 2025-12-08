import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Premium Gradient Button Component
 * Features: Gradient background, shine effect, smooth animations
 */
const GradientButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = `
    relative overflow-hidden
    font-heading font-semibold
    rounded-xl
    transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-primary-blue/30
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const variantClasses = {
    primary: 'bg-gradient-primary text-white shadow-lg shadow-primary-blue/30',
    outline: 'border-2 border-primary-blue text-primary-blue bg-transparent hover:bg-primary-blue hover:text-white',
    ghost: 'text-primary-blue hover:bg-primary-blue/10',
    danger: 'bg-danger text-white shadow-lg shadow-danger/30',
    success: 'bg-success text-white shadow-lg shadow-success/30',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {/* Shine effect on hover */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {children}
      </span>

      {/* Ripple effect on click */}
      <motion.span
        className="absolute inset-0 bg-white/30 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 2, opacity: [0.5, 0] }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  );
};

export default GradientButton;
