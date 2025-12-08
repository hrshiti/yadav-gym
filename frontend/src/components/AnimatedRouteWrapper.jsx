import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

/**
 * Premium Animated Route Wrapper Component
 * Features: GSAP page transitions, "Gym Pulse" effect
 */
const AnimatedRouteWrapper = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP Page Transition Animation
    if (containerRef.current) {
      const tl = gsap.timeline();

      // Fade in background
      tl.from(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Slide content from bottom
      tl.from(containerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // "Gym Pulse" effect - subtle scale animation
      tl.to(containerRef.current, {
        scale: 1.01,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });

      tl.to(containerRef.current, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.inOut',
      });
    }
  }, [location.pathname]);

  return (
    <motion.div
      ref={containerRef}
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedRouteWrapper;

