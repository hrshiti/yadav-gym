import { motion } from 'framer-motion';
import { useState } from 'react';

const TrainerDashboard = () => {
  // Get current date
  const getCurrentDate = () => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  // Dashboard cards data (based on document - Assigned Members, Present Today, Pending Workout Plans, Pending Diet Plans)
  const dashboardCards = [
    {
      id: 1,
      title: 'Assigned Members',
      value: '24',
      unit: 'Members',
      gradient: 'from-primary-blue to-primary-purple',
      icon: '👥',
    },
    {
      id: 2,
      title: 'Present Today',
      value: '18',
      unit: 'Members',
      gradient: 'from-success to-success/80',
      icon: '✅',
    },
    {
      id: 3,
      title: 'Pending Workout Plans',
      value: '5',
      unit: 'Plans',
      gradient: 'from-warning to-warning/80',
      icon: '💪',
    },
    {
      id: 4,
      title: 'Pending Diet Plans',
      value: '3',
      unit: 'Plans',
      gradient: 'from-primary-purple to-primary-blue',
      icon: '🥗',
    },
  ];

  // Today's Members Table Data
  const todaysMembers = [
    {
      id: 1,
      name: 'Rahul Sharma',
      status: 'Present',
      workoutStatus: 'Completed',
      time: '9:00 AM',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    },
    {
      id: 2,
      name: 'Priya Patel',
      status: 'Present',
      workoutStatus: 'In Progress',
      time: '10:30 AM',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    },
    {
      id: 3,
      name: 'Amit Kumar',
      status: 'Present',
      workoutStatus: 'Completed',
      time: '11:00 AM',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    },
    {
      id: 4,
      name: 'Sneha Singh',
      status: 'Absent',
      workoutStatus: 'Not Started',
      time: '12:00 PM',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    },
    {
      id: 5,
      name: 'Vikram Mehta',
      status: 'Present',
      workoutStatus: 'Completed',
      time: '2:00 PM',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    },
  ];

  // Weekly Progress Data (Mock data for graph)
  const weeklyProgress = [
    { day: 'Mon', value: 75 },
    { day: 'Tue', value: 82 },
    { day: 'Wed', value: 68 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 85 },
    { day: 'Sat', value: 78 },
    { day: 'Sun', value: 88 },
  ];

  const maxValue = Math.max(...weeklyProgress.map(item => item.value));

  return (
    <div className="min-h-screen bg-background-main pb-24">
      {/* Top Header Section */}
      <div className="bg-white px-4 pt-4 pb-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 relative z-10">
          {/* Date */}
          <div>
            <p className="text-sm text-text-light font-body">{getCurrentDate()}</p>
            <h2 className="text-xl font-heading font-bold text-text-dark mt-1">
              Welcome back!
            </h2>
          </div>

          {/* Profile Picture */}
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center overflow-hidden ring-2 ring-primary-blue/20">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&q=80"
              alt="Trainer Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Animated Dumbbell */}
        <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center opacity-10">
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Left Weight */}
            <motion.div
              className="w-10 h-3 bg-gradient-primary rounded-full"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Bar */}
            <motion.div
              className="w-14 h-2 bg-gradient-primary rounded-full relative"
              animate={{
                x: [0, -3, 0, 3, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Center Grip */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-2 border-primary-blue/40"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            
            {/* Right Weight */}
            <motion.div
              className="w-10 h-3 bg-gradient-primary rounded-full"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Dashboard Cards Section */}
      <div className="px-4 mt-6">
        <h3 className="text-xl font-heading font-bold text-text-dark mb-4">Overview</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.id}
              className="bg-white rounded-2xl p-5 shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <p className="text-xs text-text-light font-body mb-3 font-medium">{card.title}</p>
              <div 
                className="w-16 h-16 rounded-full flex flex-col items-center justify-center mb-2 mx-auto shadow-lg"
                style={{
                  background: card.id === 1 
                    ? 'linear-gradient(135deg, #305EFF, #8A4CFF)'
                    : card.id === 2
                    ? 'linear-gradient(135deg, #22C55E, #16A34A)'
                    : card.id === 3
                    ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                    : 'linear-gradient(135deg, #8A4CFF, #305EFF)'
                }}
              >
                <span className="font-mono font-bold text-xl leading-none" style={{ color: '#FFFFFF' }}>
                  {card.value}
                </span>
                <span className="font-mono text-[10px] mt-0.5" style={{ color: '#FFFFFF', opacity: 0.95 }}>
                  {card.unit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weekly Member Progress Graph Section */}
      <div className="px-4 mt-6">
        <h3 className="text-xl font-heading font-bold text-text-dark mb-4">Weekly Member Progress</h3>
        
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-md border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyProgress.map((item, index) => (
              <motion.div
                key={item.day}
                className="flex-1 flex flex-col items-center gap-2"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <div className="w-full flex flex-col items-center justify-end h-full">
                  <motion.div
                    className="w-full rounded-t-lg"
                    style={{
                      background: 'linear-gradient(180deg, #305EFF, #8A4CFF)',
                      height: `${(item.value / maxValue) * 100}%`,
                      minHeight: '8px',
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.value / maxValue) * 100}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  />
                </div>
                <span className="text-xs font-medium text-text-light">{item.day}</span>
                <span className="text-xs font-bold text-text-dark">{item.value}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Today's Members Table Section */}
      <div className="px-4 mt-6 mb-6">
        <h3 className="text-xl font-heading font-bold text-text-dark mb-4">Today's Members</h3>
        
        <motion.div
          className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-dark uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-dark uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-dark uppercase tracking-wider">
                    Workout
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-dark uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {todaysMembers.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-blue/20 flex-shrink-0">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x100?text=Member';
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-text-dark">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.status === 'Present'
                            ? 'bg-success/10 text-success'
                            : 'bg-gray-100 text-text-light'
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.workoutStatus === 'Completed'
                            ? 'bg-primary-blue/10 text-primary-blue'
                            : member.workoutStatus === 'In Progress'
                            ? 'bg-warning/10 text-warning'
                            : 'bg-gray-100 text-text-light'
                        }`}
                      >
                        {member.workoutStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-text-light">{member.time}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
