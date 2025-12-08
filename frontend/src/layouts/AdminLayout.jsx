import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { path: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/admin/members', icon: 'members', label: 'Members' },
    { path: '/admin/members/add', icon: 'add-member', label: 'Add Member' },
    { path: '/admin/trainers', icon: 'trainers', label: 'Trainers' },
    { path: '/admin/workout-diet', icon: 'workout', label: 'Workout & Diet' },
    { path: '/admin/attendance', icon: 'attendance', label: 'Attendance' },
    { path: '/admin/reports', icon: 'reports', label: 'Reports' },
    { path: '/admin/settings', icon: 'settings', label: 'Settings' },
  ];

  const isActive = (path) => location.pathname === path;

  const getIcon = (iconName) => {
    const iconClass = "w-5 h-5";
    switch (iconName) {
      case 'dashboard':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'members':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'add-member':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        );
      case 'trainers':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'workout':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'attendance':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case 'reports':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'settings':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleNavClick = (path) => {
    navigate(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-main flex overflow-x-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Left Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: isMobile ? -280 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isMobile ? -280 : 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-white border-r border-gray-200 ${
              isMobile ? 'fixed' : 'fixed'
            } left-0 top-0 bottom-0 z-40 overflow-hidden w-[280px]`}
          >
            <div className="h-full flex flex-col">
              {/* Logo/Header */}
              <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-text-dark">Admin Panel</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto p-2 sm:p-4">
                <ul className="space-y-1 sm:space-y-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <motion.button
                        onClick={() => handleNavClick(item.path)}
                        className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all ${
                          isActive(item.path)
                            ? 'bg-gradient-primary text-white shadow-md'
                            : 'text-text-dark hover:bg-gray-100'
                        }`}
                        whileHover={!isMobile ? { x: 4 } : {}}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className={isActive(item.path) ? 'text-white' : 'text-primary-blue'}>
                          {getIcon(item.icon)}
                        </span>
                        <span className="font-medium text-xs sm:text-sm">{item.label}</span>
                        {isActive(item.path) && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        )}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 w-full ${!isMobile && sidebarOpen ? 'ml-[280px]' : 'ml-0'}`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-base sm:text-lg font-heading font-bold text-text-dark">Dashboard</h1>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-primary flex items-center justify-center overflow-hidden ring-2 ring-primary-blue/20">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-3 sm:p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

