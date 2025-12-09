import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('weight-progress'); // 'weight-progress', 'registrations', 'attendance', 'trainer-performance'
  const [counts, setCounts] = useState({
    totalMembers: 0,
    activeMembers: 0,
    totalTrainers: 0,
    todayAttendance: 0,
  });

  // Dashboard stats (based on document)
  const stats = {
    totalMembers: 245,
    activeMembers: 198,
    totalTrainers: 12,
    todayAttendance: 156,
  };

  // Count-up animation
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timers = Object.keys(stats).map((key) => {
      const target = stats[key];
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCounts((prev) => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setCounts((prev) => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, interval);

      return timer;
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, []);

  // Top Cards
  const topCards = [
    {
      id: 1,
      title: 'Total Members',
      value: counts.totalMembers,
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      gradient: 'from-primary-blue to-primary-purple',
      bgColor: 'bg-primary-blue/10',
    },
    {
      id: 2,
      title: 'Active Members',
      value: counts.activeMembers,
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-success to-success/80',
      bgColor: 'bg-success/10',
    },
    {
      id: 3,
      title: 'Total Trainers',
      value: counts.totalTrainers,
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      gradient: 'from-primary-purple to-primary-blue',
      bgColor: 'bg-primary-purple/10',
    },
    {
      id: 4,
      title: "Today's Attendance",
      value: counts.todayAttendance,
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      gradient: 'from-warning to-warning/80',
      bgColor: 'bg-warning/10',
    },
  ];

  // New Registrations (sample data)
  const newRegistrations = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', date: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', date: '2024-01-14', status: 'Active' },
    { id: 3, name: 'Amit Singh', email: 'amit@example.com', date: '2024-01-13', status: 'Pending' },
    { id: 4, name: 'Sneha Patel', email: 'sneha@example.com', date: '2024-01-12', status: 'Active' },
  ];

  // Low Attendance Alerts
  const lowAttendanceAlerts = [
    { id: 1, name: 'Vikram Mehta', days: 3, lastVisit: '2024-01-12' },
    { id: 2, name: 'Anjali Desai', days: 5, lastVisit: '2024-01-10' },
    { id: 3, name: 'Rohit Gupta', days: 7, lastVisit: '2024-01-08' },
  ];

  // Trainer Performance
  const trainerPerformance = [
    { id: 1, name: 'Priya Sharma', score: 95, members: 45, rating: 4.8 },
    { id: 2, name: 'Rajesh Kumar', score: 92, members: 38, rating: 4.7 },
    { id: 3, name: 'Anjali Singh', score: 88, members: 32, rating: 4.6 },
    { id: 4, name: 'Vikram Mehta', score: 85, members: 28, rating: 4.5 },
  ];

  return (
    <div className="space-y-3 sm:space-y-4 overflow-x-hidden">
      {/* Tabs Section */}
      <motion.div
        className="bg-white rounded-xl sm:rounded-2xl p-1 shadow-sm border border-gray-100 mb-3 sm:mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex gap-1 overflow-x-auto scrollbar-hide relative">
          {[
            { id: 'weight-progress', label: 'Weight Progress Graph' },
            { id: 'registrations', label: 'New Registrations List' },
            { id: 'attendance', label: 'Low Attendance Alerts' },
            { id: 'trainer-performance', label: 'Trainer Performance Score' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[150px] py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-text-light hover:bg-gray-50'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 rounded-lg"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
                    zIndex: 0,
                  }}
                />
              )}
              <span className="relative z-10">
                {tab.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Top Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {topCards.map((card, index) => (
          <motion.div
            key={card.id}
            className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: [null, 1.02], y: [null, -2] }}
          >
            <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl ${card.bgColor} flex items-center justify-center text-primary-blue flex-shrink-0`}>
                {card.icon}
              </div>
            </div>
            <h3 className="text-[10px] sm:text-xs md:text-sm text-text-light font-body mb-1 sm:mb-2 leading-tight">{card.title}</h3>
            <div
              className="text-lg sm:text-2xl md:text-3xl font-heading font-bold text-text-dark leading-none"
              style={{
                background: `linear-gradient(135deg, ${card.gradient.includes('primary-blue') ? '#305EFF' : card.gradient.includes('success') ? '#22C55E' : card.gradient.includes('warning') ? '#F59E0B' : '#8A4CFF'}, ${card.gradient.includes('primary-blue') ? '#8A4CFF' : card.gradient.includes('success') ? '#16A34A' : card.gradient.includes('warning') ? '#D97706' : '#305EFF'})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {card.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'weight-progress' && (
          <motion.div
            key="weight-progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-base sm:text-lg font-heading font-bold text-text-dark mb-3 sm:mb-4">Weight Progress Graph</h3>
            <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm text-text-light text-center px-2">Weight Progress Chart will be implemented with Recharts</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'registrations' && (
          <motion.div
            key="registrations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 overflow-x-auto"
          >
            <h3 className="text-base sm:text-lg font-heading font-bold text-text-dark mb-3 sm:mb-4">New Registrations List</h3>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-text-dark">Name</th>
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-text-dark">Email</th>
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-text-dark">Date</th>
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-text-dark">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newRegistrations.map((member, index) => (
                      <motion.tr
                        key={member.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-text-dark">{member.name}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-text-light">{member.email}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-text-light">{member.date}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.status === 'Active' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                          }`}>
                            {member.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'attendance' && (
          <motion.div
            key="attendance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-base sm:text-lg font-heading font-bold text-text-dark mb-3 sm:mb-4">Low Attendance Alerts</h3>
            <div className="space-y-2 sm:space-y-3">
              {lowAttendanceAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  className="flex items-center justify-between p-3 sm:p-4 bg-danger/10 rounded-lg border border-danger/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-text-dark truncate">{alert.name}</h4>
                    <p className="text-xs text-text-light">Last visit: {alert.lastVisit}</p>
                  </div>
                  <span className="px-2 sm:px-3 py-1 bg-danger/20 text-danger rounded-full text-xs font-medium ml-2 flex-shrink-0">
                    {alert.days} days
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'trainer-performance' && (
          <motion.div
            key="trainer-performance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-base sm:text-lg font-heading font-bold text-text-dark mb-3 sm:mb-4">Trainer Performance Score</h3>
            <div className="space-y-3 sm:space-y-4">
              {trainerPerformance.map((trainer, index) => (
                <motion.div
                  key={trainer.id}
                  className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm sm:text-base font-semibold text-text-dark">{trainer.name}</h4>
                    <span className="text-lg sm:text-xl font-bold text-primary-blue">{trainer.score}%</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-text-light">
                    <span>Members: {trainer.members}</span>
                    <span>Rating: {trainer.rating} ⭐</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${trainer.score}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      style={{
                        background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;

