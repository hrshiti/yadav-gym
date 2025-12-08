import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

/**
 * Premium Search Bar Component
 * Features: Debounced search, clear button, focus animations
 */
const SearchBar = ({
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  debounceMs = 300,
  className = '',
  ...props
}) => {
  const [searchValue, setSearchValue] = useState(value || '');
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (onChange) {
        onChange(searchValue);
      }
      if (onSearch) {
        onSearch(searchValue);
      }
    }, debounceMs);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchValue, debounceMs, onChange, onSearch]);

  const handleClear = () => {
    setSearchValue('');
  };

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Search Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light z-10">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input */}
      <motion.input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full
          pl-12 pr-12
          py-3
          rounded-xl
          border-2 border-gray-200
          bg-background-card
          text-text-dark
          font-body
          transition-all duration-300
          focus:outline-none focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/30
          placeholder:text-text-light
        `}
        whileFocus={{ scale: 1.02 }}
        {...props}
      />

      {/* Clear Button */}
      {searchValue && (
        <motion.button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-text-light hover:text-text-dark transition-colors"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      )}

      {/* Focus Glow */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-primary-blue/10 blur-md -z-10 opacity-0"
        animate={{
          opacity: searchValue ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default SearchBar;
