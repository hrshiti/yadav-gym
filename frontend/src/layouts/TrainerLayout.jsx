import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Drawer from '../components/Drawer';

const TrainerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: '/trainer/dashboard', icon: 'home', label: 'Home' },
    { path: '/trainer/members', icon: 'users', label: 'Members' },
    { path: '/trainer/body-stats', icon: 'add', label: 'Add', isAdd: true },
    { path: '/trainer/progress', icon: 'chart', label: 'Progress' },
    { path: '/trainer/workout-plan', icon: 'dumbbell', label: 'Plans' },
  ];

  const isActive = (path) => {
    if (path === '/trainer/progress') {
      return location.pathname === path;
    }
    return location.pathname === path;
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'home':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'users':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'chart':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'dumbbell':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'add':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        );
      default:
        return null;
    }
  };

  const menuSections = [
    {
      title: 'HOME',
      items: [
        { path: '/trainer/dashboard', icon: 'home', label: 'Dashboard' },
        { path: '/trainer/members', icon: 'users', label: 'My Members' },
        { path: '/trainer/progress', icon: 'add-progress', label: 'Add Daily Progress' },
        { path: '/trainer/body-stats', icon: 'body-stats', label: 'Update Body Stats' },
        { path: '/trainer/chat', icon: 'chat', label: 'Chat with Member' },
      ],
    },
    {
      title: 'WORKOUT & DIET',
      items: [
        { path: '/trainer/workout-plan', icon: 'workout-plan', label: 'Create Workout Plan' },
        { path: '/trainer/diet-plan', icon: 'diet-plan', label: 'Create Diet Plan' },
        { path: '/trainer/attendance', icon: 'attendance', label: 'Attendance Mark' },
      ],
    },
    {
      title: 'OTHERS',
      items: [
        { path: '/trainer/profile', icon: 'profile', label: 'Trainer Profile' },
        { path: '/logout', icon: 'logout', label: 'Logout', isLogout: true },
      ],
    },
  ];

  const getMenuIcon = (iconName) => {
    switch (iconName) {
      case 'home':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'users':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'add-progress':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        );
      case 'body-stats':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'chat':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'workout-plan':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'diet-plan':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'attendance':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        );
      case 'profile':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'logout':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleMenuClick = (item) => {
    if (item.isLogout) {
      // Handle logout
      console.log('Logout clicked');
      // Add your logout logic here
    } else {
      navigate(item.path);
    }
    setMenuOpen(false);
  };

  const isDashboard = location.pathname === '/trainer/dashboard';
  const isChatPage = location.pathname === '/trainer/chat';

  return (
    <div className={`min-h-screen bg-background-main ${!isChatPage ? 'pb-20' : ''}`}>
      {/* Header with Menu Button - Only show on Dashboard */}
      {isDashboard && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40 flex items-center justify-between">
          <motion.button
            onClick={() => setMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <svg className="w-6 h-6 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
          <h1 className="text-lg font-heading font-bold text-text-dark">Trainer</h1>
        </div>
      )}

      {/* Menu Drawer */}
      <Drawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        position="left"
        title="Menu"
        width="300px"
      >
        <div className="p-4">
          <nav className="space-y-6">
            {menuSections.map((section, sectionIndex) => (
              <div key={section.title} className={sectionIndex > 0 ? 'pt-4 border-t border-gray-200' : ''}>
                <h3 className="text-xs font-semibold text-text-light uppercase tracking-wider mb-3 px-2">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <motion.button
                      key={item.path}
                      onClick={() => handleMenuClick(item)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive(item.path)
                          ? 'bg-gradient-primary text-white shadow-md'
                          : 'text-text-dark hover:bg-gray-100'
                      }`}
                      style={isActive(item.path) ? {
                        background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
                        color: '#FFFFFF'
                      } : {}}
                      whileTap={{ scale: 0.98 }}
                      whileHover={!isActive(item.path) ? { x: 4 } : {}}
                    >
                      <span className={isActive(item.path) ? 'text-white' : 'text-primary-blue'}>
                        {getMenuIcon(item.icon)}
                      </span>
                      <span className="font-medium text-sm">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </Drawer>

      {/* Main Content */}
      <Outlet />

      {/* Bottom Navigation Bar - Hidden on Chat Page */}
      {!isChatPage && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around px-2 py-3 max-w-md mx-auto">
          {navItems.map((item) => {
            if (item.isAdd) {
              return (
                <motion.button
                  key={`${item.path}-add`}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Navigating to:', item.path);
                    navigate(item.path, { replace: false });
                  }}
                  className="relative w-14 h-14 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-lg z-10 hover:border-primary-blue transition-colors"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3} style={{ color: '#111827' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </motion.button>
              );
            }
            return (
              <motion.button
                key={`${item.path}-${item.label}`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Navigating to:', item.path);
                  navigate(item.path, { replace: false });
                }}
                className={`relative flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'text-primary-blue'
                    : 'text-gray-500'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {getIcon(item.icon)}
                <span className="text-xs font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
        {/* Home Indicator Line */}
        <div className="w-32 h-1 bg-gray-300 rounded-full mx-auto mb-2" />
      </div>
      )}
    </div>
  );
};

export default TrainerLayout;
