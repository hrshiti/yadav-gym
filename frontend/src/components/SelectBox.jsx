import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

/**
 * Premium Select Box Component
 * Features: Custom dropdown, search option, smooth animations
 */
const SelectBox = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  error,
  disabled = false,
  required = false,
  searchable = false,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);
  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-text-dark mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {/* Select Button */}
      <motion.button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full
          px-4 py-4
          rounded-xl
          border-2
          bg-background-card
          text-left
          flex items-center justify-between
          transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-primary-blue/30
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            error
              ? 'border-danger'
              : isOpen
              ? 'border-primary-blue'
              : 'border-gray-200 hover:border-primary-blue/50'
          }
        `}
        whileHover={!disabled ? { scale: 1.01 } : {}}
        whileTap={!disabled ? { scale: 0.99 } : {}}
      >
        <span className={selectedOption ? 'text-text-dark' : 'text-text-light'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.svg
          className="w-5 h-5 text-text-light"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="absolute z-50 w-full mt-2 bg-background-card rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Search Input */}
              {searchable && (
                <div className="p-3 border-b border-gray-200">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/30 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              {/* Options List */}
              <div className="max-h-60 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                        setSearchTerm('');
                      }}
                      className={`
                        w-full px-4 py-3 text-left
                        transition-colors duration-200
                        flex items-center justify-between
                        ${
                          value === option.value
                            ? 'bg-primary-blue/10 text-primary-blue font-medium'
                            : 'hover:bg-gray-50 text-text-dark'
                        }
                      `}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span>{option.label}</span>
                      {value === option.value && (
                        <motion.svg
                          className="w-5 h-5 text-primary-blue"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </motion.svg>
                      )}
                    </motion.button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-text-light">
                    No options found
                  </div>
                )}
              </div>
            </motion.div>

            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-danger flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default SelectBox;
