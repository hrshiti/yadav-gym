import { motion } from 'framer-motion';

/**
 * Premium Badge Component
 * Features: Multiple variants, pulse animation, icons
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  pulse = false,
  icon,
  className = '',
  ...props
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-blue/10 text-primary-blue border border-primary-blue/20',
    success: 'bg-success/10 text-success border border-success/20',
    danger: 'bg-danger/10 text-danger border border-danger/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    purple: 'bg-primary-purple/10 text-primary-purple border border-primary-purple/20',
    gradient: 'bg-gradient-primary text-white',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <motion.span
      className={`
        inline-flex items-center gap-1.5
        font-medium
        rounded-full
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      {/* Pulse Animation */}
      {pulse && (
        <motion.span
          className={`absolute inset-0 rounded-full ${variantClasses[variant]}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Icon */}
      {icon && <span className="relative z-10">{icon}</span>}

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.span>
  );
};

export default Badge;
