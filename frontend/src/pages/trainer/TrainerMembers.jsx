import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';

const TrainerMembers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock members data with progress
  const members = [
    {
      id: '1',
      name: 'Rahul Sharma',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      attendance: 85,
      weightProgress: '+2.5 kg',
      bodyFat: '18.2%',
      lastWorkout: 'Today, 9:00 AM',
      status: 'active',
      workoutsCompleted: 12,
      totalWorkouts: 15,
    },
    {
      id: '2',
      name: 'Priya Patel',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      attendance: 92,
      weightProgress: '-1.8 kg',
      bodyFat: '22.5%',
      lastWorkout: 'Today, 10:30 AM',
      status: 'active',
      workoutsCompleted: 14,
      totalWorkouts: 15,
    },
    {
      id: '3',
      name: 'Amit Kumar',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      attendance: 78,
      weightProgress: '+1.2 kg',
      bodyFat: '20.1%',
      lastWorkout: 'Yesterday, 6:00 PM',
      status: 'active',
      workoutsCompleted: 11,
      totalWorkouts: 15,
    },
    {
      id: '4',
      name: 'Sneha Singh',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      attendance: 65,
      weightProgress: '-0.5 kg',
      bodyFat: '24.8%',
      lastWorkout: '2 days ago',
      status: 'inactive',
      workoutsCompleted: 8,
      totalWorkouts: 15,
    },
    {
      id: '5',
      name: 'Vikram Mehta',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      attendance: 88,
      weightProgress: '+3.1 kg',
      bodyFat: '16.5%',
      lastWorkout: 'Today, 2:00 PM',
      status: 'active',
      workoutsCompleted: 13,
      totalWorkouts: 15,
    },
    {
      id: '6',
      name: 'Anjali Verma',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
      attendance: 90,
      weightProgress: '-2.3 kg',
      bodyFat: '19.5%',
      lastWorkout: 'Today, 11:00 AM',
      status: 'active',
      workoutsCompleted: 15,
      totalWorkouts: 15,
    },
  ];

  // Filter members based on search query
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatClick = (memberId) => {
    // Navigate to chat with specific member
    navigate(ROUTES.MEMBER_CHAT, { state: { memberId } });
  };

  const handleMemberClick = (memberId) => {
    // Navigate to member details or progress page
    navigate(`/trainer/progress?member=${memberId}`);
  };

  return (
    <div className="min-h-screen bg-background-main pb-24">
      {/* Header Section */}
      <div className="bg-white px-4 pt-4 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-bold text-text-dark">
            My Members
          </h2>
          <div className="text-sm text-text-light">
            {filteredMembers.length} Members
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search members..."
            className="w-full px-4 py-3 pl-11 bg-gray-100 border-2 border-gray-200 rounded-xl text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Members List */}
      <div className="px-4 mt-4">
        {filteredMembers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-text-light">No members found</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => handleMemberClick(member.id)}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  {/* Member Image */}
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary-blue/20 flex-shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100?text=Member';
                      }}
                    />
                  </div>

                  {/* Member Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-heading font-bold text-text-dark">
                        {member.name}
                      </h3>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          member.status === 'active'
                            ? 'bg-success/10 text-success'
                            : 'bg-gray-100 text-text-light'
                        }`}
                      >
                        {member.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    {/* Progress Quick View */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {/* Attendance */}
                      <div className="bg-primary-blue/5 rounded-lg p-2">
                        <p className="text-xs text-text-light mb-1">Attendance</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary-blue rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${member.attendance}%` }}
                              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                            />
                          </div>
                          <span className="text-xs font-bold text-text-dark">
                            {member.attendance}%
                          </span>
                        </div>
                      </div>

                      {/* Weight Progress */}
                      <div className="bg-success/5 rounded-lg p-2">
                        <p className="text-xs text-text-light mb-1">Weight</p>
                        <p className="text-sm font-bold text-text-dark">
                          {member.weightProgress}
                        </p>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="flex items-center gap-4 text-xs text-text-light mb-3">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>Body Fat: {member.bodyFat}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{member.lastWorkout}</span>
                      </div>
                    </div>

                    {/* Workout Progress */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-text-light">Workout Progress</span>
                        <span className="text-xs font-medium text-text-dark">
                          {member.workoutsCompleted}/{member.totalWorkouts}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(member.workoutsCompleted / member.totalWorkouts) * 100}%`,
                          }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChatClick(member.id);
                        }}
                        className="flex-1 py-2.5 px-4 bg-gradient-primary text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Chat
                      </motion.button>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMemberClick(member.id);
                        }}
                        className="flex-1 py-2.5 px-4 bg-gray-100 text-text-dark rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        View Progress
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerMembers;
