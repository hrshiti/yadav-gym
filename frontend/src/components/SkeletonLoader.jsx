import { motion } from 'framer-motion';

/**
 * Premium Skeleton Loader Component
 * Features: Pulse animation, multiple variants
 */
const SkeletonLoader = ({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
  rounded = true,
}) => {
  const baseClasses = `
    bg-gray-200
    ${rounded ? 'rounded-lg' : ''}
    overflow-hidden
    ${className}
  `;

  const variants = {
    text: 'h-4',
    title: 'h-6',
    heading: 'h-8',
    avatar: 'rounded-full',
    card: 'h-48',
    button: 'h-10',
    image: 'aspect-video',
    custom: '',
  };

  const skeletonVariants = {
    pulse: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    wave: {
      background: [
        'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
      ],
      backgroundSize: ['200% 100%', '200% 100%'],
      backgroundPosition: ['0% 0%', '100% 0%'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  const style = {
    width: width || '100%',
    height: height || variants[variant] || 'auto',
  };

  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            className={`${baseClasses} ${variants[variant]}`}
            style={style}
            animate="wave"
            variants={skeletonVariants}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${variants[variant]}`}
      style={style}
      animate="wave"
      variants={skeletonVariants}
    />
  );
};

// Pre-built skeleton components
export const SkeletonCard = () => (
  <div className="bg-background-card rounded-2xl p-6 shadow-md space-y-4">
    <SkeletonLoader variant="avatar" width="60px" height="60px" />
    <SkeletonLoader variant="title" width="60%" />
    <SkeletonLoader variant="text" count={3} />
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 4 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex gap-4">
        {Array.from({ length: cols }).map((_, colIndex) => (
          <SkeletonLoader
            key={colIndex}
            variant="text"
            width={colIndex === 0 ? '20%' : '100%'}
          />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonProfile = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <SkeletonLoader variant="avatar" width="80px" height="80px" />
      <div className="flex-1 space-y-2">
        <SkeletonLoader variant="heading" width="40%" />
        <SkeletonLoader variant="text" width="60%" />
      </div>
    </div>
    <SkeletonLoader variant="text" count={4} />
  </div>
);

export default SkeletonLoader;

