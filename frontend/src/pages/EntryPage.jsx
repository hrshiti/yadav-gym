import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { ROUTES } from '../utils/routes';
import logoImage from '../assets/yadav_fitness_logo-removebg-preview.png';

function EntryPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const buttonsRef = useRef(null);

  // Debug: Log logo image path
  useEffect(() => {
    console.log('Logo image path:', logoImage);
  }, []);

  useEffect(() => {
    // GSAP Timeline for page load animation
    const tl = gsap.timeline();

    // Logo fade in from top
    if (logoRef.current) {
      // Ensure logo is visible
      gsap.set(logoRef.current, { opacity: 1, y: -20, display: 'flex' });
      // Animate to position
      tl.to(
        logoRef.current,
        { y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }

    // Buttons stagger animation
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.children;
      if (buttons && buttons.length > 0) {
        // Set initial state - visible but below
        gsap.set(buttons, { opacity: 1, y: 40 });
        // Animate to position
        tl.to(
          buttons,
          {
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.15,
          },
          '-=0.2'
        );
      }
    }
  }, []);

  const handlePortalClick = (route) => {
    navigate(route);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen sm:min-h-screen relative overflow-hidden sm:overflow-y-auto bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >
      {/* Top Section with Fitness Image Background */}
      <div className="fixed inset-0 z-0">
        {/* Fitness Image Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      {/* Main Content Area - Centered Logo and Buttons */}
      <div className="relative z-30 flex flex-col items-center justify-start h-full w-full px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20">
        {/* Logo - Above Buttons */}
        <motion.div
          ref={logoRef}
          className="flex flex-col items-center mb-8 sm:mb-10 md:mb-12"
          style={{ opacity: 1, display: 'flex' }}
        >
          {logoImage ? (
            <img
              src={logoImage}
              alt="Yadav Fitness Club"
              className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] object-contain flex-shrink-0 mb-4"
              style={{ 
                display: 'block', 
                opacity: 1,
                visibility: 'visible',
                maxWidth: '100%',
                height: 'auto',
                position: 'relative',
                zIndex: 1
              }}
              onError={(e) => {
                console.error('Logo image failed to load:', logoImage);
                e.target.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Logo image loaded successfully:', logoImage);
              }}
            />
          ) : (
            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] bg-red-500 flex items-center justify-center text-white text-xs mb-4">
              No Logo
            </div>
          )}
          <div className="flex items-baseline">
            <span className="text-[#22C55E] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading">
              YADAV
            </span>
            <span className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading ml-1 sm:ml-2">
              FITNESS
            </span>
          </div>
        </motion.div>

        {/* Three Vertical Buttons - Centered in Viewport */}
        <motion.div
          ref={buttonsRef}
          className="space-y-3 sm:space-y-4 md:space-y-5 w-full max-w-md flex flex-col items-center"
        >
          {/* Member Portal Button */}
          <motion.button
            onClick={() => handlePortalClick(ROUTES.MEMBER_LOGIN)}
            className="w-full max-w-md bg-gradient-to-r from-[#305EFF] to-[#8A4CFF] text-white font-heading font-semibold text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#305EFF]/50 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Member Portal</span>
            </span>
            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              initial={false}
            />
          </motion.button>

          {/* Trainer Portal Button */}
          <motion.button
            onClick={() => handlePortalClick(ROUTES.TRAINER_LOGIN)}
            className="w-full max-w-md bg-gradient-to-r from-[#305EFF] to-[#8A4CFF] text-white font-heading font-semibold text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#305EFF]/50 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Trainer Portal</span>
            </span>
            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              initial={false}
            />
          </motion.button>

          {/* Admin Portal Button */}
          <motion.button
            onClick={() => handlePortalClick(ROUTES.ADMIN_LOGIN)}
            className="w-full max-w-md bg-gradient-to-r from-[#305EFF] to-[#8A4CFF] text-white font-heading font-semibold text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#305EFF]/50 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Admin Portal</span>
            </span>
            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              initial={false}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default EntryPage;
