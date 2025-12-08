import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Premium Tabs Component
 * Features: Animated underline, smooth transitions
 */
const Tabs = ({
  tabs = [],
  defaultTab,
  onChange,
  variant = 'default',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const variantClasses = {
    default: 'border-b-2 border-gray-200',
    pills: 'bg-gray-100 rounded-lg p-1',
    gradient: 'bg-gradient-primary rounded-lg p-1',
  };

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className={`relative flex ${variantClasses[variant]} gap-1`}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                relative
                px-6 py-3
                font-medium
                transition-colors duration-300
                flex items-center gap-2
                ${
                  variant === 'default'
                    ? isActive
                      ? 'text-primary-blue'
                      : 'text-text-light hover:text-text-dark'
                    : variant === 'pills'
                    ? isActive
                      ? 'text-primary-blue bg-white shadow-sm'
                      : 'text-text-light'
                    : isActive
                    ? 'text-white'
                    : 'text-white/70'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}

              {/* Animated Underline (for default variant) */}
              {variant === 'default' && isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="mt-6"
      >
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </motion.div>
    </div>
  );
};

export default Tabs;

