import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Premium Card Component
 * Features: Hover effects, shadow animations, glassmorphism option
 */
const Card = ({
  children,
  className = '',
  hover = true,
  glow = false,
  padding = 'md',
  shadow = true,
  border = false,
  gradient = false,
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const baseClasses = `
    rounded-2xl
    bg-background-card
    transition-all duration-300
    ${border ? 'border border-gray-200' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${gradient ? 'bg-gradient-primary text-white' : ''}
  `;

  const shadowClasses = shadow
    ? glow
      ? 'shadow-xl shadow-primary-blue/10'
      : 'shadow-md hover:shadow-xl'
    : '';

  return (
    <motion.div
      className={`
        ${baseClasses}
        ${paddingClasses[padding]}
        ${shadowClasses}
        ${className}
      `}
      onHoverStart={() => hover && setIsHovered(true)}
      onHoverEnd={() => hover && setIsHovered(false)}
      whileHover={hover && onClick ? { y: -4, scale: 1.01 } : hover ? { y: -2 } : {}}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {/* Glow effect */}
      {glow && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-20 blur-xl -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default Card;
