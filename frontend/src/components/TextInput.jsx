import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

/**
 * Premium Text Input Component
 * Features: Floating labels, focus animations, error states
 */
const TextInput = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  icon,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);
  const inputRef = useRef(null);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const isFloating = isFocused || hasValue;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light z-10">
            {icon}
          </div>
        )}

        {/* Input */}
        <motion.input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => {
            onChange(e);
            setHasValue(!!e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          required={required}
          className={`
            w-full
            ${icon ? 'pl-12 pr-4' : 'px-4'}
            py-4
            rounded-xl
            border-2
            bg-background-card
            text-text-dark
            font-body
            transition-all duration-300
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              error
                ? 'border-danger focus:border-danger'
                : isFocused
                ? 'border-primary-blue focus:border-primary-blue'
                : 'border-gray-200 focus:border-primary-blue'
            }
          `}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />

        {/* Floating Label */}
        {label && (
          <motion.label
            className={`
              absolute left-4
              font-body
              pointer-events-none
              transition-all duration-300
              ${
                isFloating
                  ? 'top-2 text-xs text-primary-blue'
                  : 'top-1/2 -translate-y-1/2 text-base text-text-light'
              }
              ${icon ? 'left-12' : ''}
            `}
            animate={{
              y: isFloating ? 0 : 0,
              fontSize: isFloating ? '0.75rem' : '1rem',
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </motion.label>
        )}

        {/* Placeholder (only when not floating) */}
        {!label && placeholder && !hasValue && !isFocused && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-danger flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Focus Glow Effect */}
      {isFocused && !error && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-primary-blue/10 blur-md -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </div>
  );
};

export default TextInput;
