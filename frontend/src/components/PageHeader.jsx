import { motion } from 'framer-motion';

/**
 * Premium Page Header Component
 * Features: Animated title, breadcrumbs support, action buttons
 */
const PageHeader = ({
  title,
  subtitle,
  icon,
  actions,
  breadcrumbs,
  className = '',
}) => {
  return (
    <motion.div
      className={`mb-8 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Breadcrumbs */}
      {breadcrumbs && (
        <nav className="mb-4 flex items-center gap-2 text-sm text-text-light">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              <span
                className={
                  index === breadcrumbs.length - 1
                    ? 'text-text-dark font-medium'
                    : 'hover:text-primary-blue cursor-pointer'
                }
              >
                {crumb}
              </span>
            </div>
          ))}
        </nav>
      )}

      <div className="flex items-start justify-between gap-4 flex-wrap">
        {/* Title Section */}
        <div className="flex items-center gap-4">
          {icon && (
            <motion.div
              className="p-3 rounded-xl bg-gradient-primary text-white shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              {icon}
            </motion.div>
          )}

          <div>
            <motion.h1
              className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                className="text-text-light text-base md:text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {actions && (
          <motion.div
            className="flex items-center gap-3 flex-wrap"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {actions}
          </motion.div>
        )}
      </div>

      {/* Decorative Line */}
      <motion.div
        className="mt-6 h-1 bg-gradient-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
    </motion.div>
  );
};

export default PageHeader;
