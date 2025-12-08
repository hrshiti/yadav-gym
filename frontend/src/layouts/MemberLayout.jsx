import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MemberLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/member/dashboard', icon: 'home', label: 'Home' },
    { path: '/member/stats', icon: 'profile', label: 'Profile' },
    { path: '/member/daily-tracking', icon: 'add', label: 'Add', isAdd: true },
    { path: '/member/daily-tracking', icon: 'chart', label: 'Progress' },
    { path: '/member/chat', icon: 'bell', label: 'Chat' },
  ];

  const isActive = (path) => {
    // For daily-tracking, check if it matches exactly (not for + button)
    if (path === '/member/daily-tracking') {
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
      case 'calendar':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'chart':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'bell':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
      case 'profile':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

  const isChatPage = location.pathname === '/member/chat';

  return (
    <div className={`min-h-screen bg-background-main ${!isChatPage ? 'pb-20' : ''}`}>
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

export default MemberLayout;

