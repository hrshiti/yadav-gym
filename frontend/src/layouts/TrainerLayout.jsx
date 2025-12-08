import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const TrainerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/trainer/dashboard', icon: 'home', label: 'Home' },
    { path: '/trainer/members', icon: 'users', label: 'Members' },
    { path: '/trainer/progress', icon: 'add', label: 'Add', isAdd: true },
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

  return (
    <div className="min-h-screen bg-background-main pb-20">
      {/* Main Content */}
      <Outlet />

      {/* Bottom Navigation Bar */}
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
    </div>
  );
};

export default TrainerLayout;
