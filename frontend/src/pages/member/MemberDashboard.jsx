import { motion } from 'framer-motion';
import { useState } from 'react';
import Spline from '@splinetool/react-spline';

const MemberDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState('All type');
  const [splineError, setSplineError] = useState(false);
  
  // Replace this with your actual Spline scene URL
  // Get it from: https://spline.design - Create a scene and export it
  const SPLINE_SCENE_URL = null; // Set your Spline scene URL here when ready
  
  // Today's Goals data
  const [todayGoals, setTodayGoals] = useState([
    {
      id: 1,
      title: 'Complete Morning Workout',
      description: 'Cardio + Strength Training (45 mins)',
      completed: false,
      progress: 60,
      iconType: 'workout',
      iconBg: 'bg-primary-blue/10',
    },
    {
      id: 2,
      title: 'Follow Diet Plan',
      description: 'Breakfast, Lunch, Dinner tracked',
      completed: false,
      progress: 40,
      iconType: 'diet',
      iconBg: 'bg-success/10',
    },
    {
      id: 3,
      title: 'Drink 8 Glasses of Water',
      description: 'Stay hydrated throughout the day',
      completed: false,
      progress: 75,
      iconType: 'water',
      iconBg: 'bg-primary-blue/10',
    },
    {
      id: 4,
      title: 'Track Body Measurements',
      description: 'Update weight and body fat %',
      completed: true,
      progress: 100,
      iconType: 'stats',
      iconBg: 'bg-primary-purple/10',
    },
    {
      id: 5,
      title: 'Attend Evening Yoga Session',
      description: '7:00 PM - Relaxation & Flexibility',
      completed: false,
      progress: 0,
      iconType: 'yoga',
      iconBg: 'bg-pink-50',
    },
  ]);

  const toggleGoal = (id) => {
    setTodayGoals(goals =>
      goals.map(goal =>
        goal.id === id
          ? { ...goal, completed: !goal.completed, progress: goal.completed ? goal.progress : 100 }
          : goal
      )
    );
  };

  const updateProgress = (id, newProgress) => {
    setTodayGoals(goals =>
      goals.map(goal =>
        goal.id === id
          ? { ...goal, progress: Math.max(0, Math.min(100, newProgress)), completed: newProgress === 100 }
          : goal
      )
    );
  };

  const getGoalIcon = (iconType) => {
    switch (iconType) {
      case 'workout':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'diet':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        );
      case 'water':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'stats':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'yoga':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Get current date
  const getCurrentDate = () => {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  // Activity cards data (based on document - Today Weight, Body Fat, Attendance %)
  const activityCards = [
    {
      id: 1,
      title: 'Today Weight',
      value: '72.5',
      unit: 'kg',
      gradient: 'from-primary-blue to-primary-purple',
      icon: '⚖️',
    },
    {
      id: 2,
      title: 'Body Fat',
      value: '18.2',
      unit: '%',
      gradient: 'from-success to-success/80',
      icon: '💪',
    },
    {
      id: 3,
      title: 'Attendance',
      value: '85',
      unit: '%',
      gradient: 'from-primary-purple to-primary-blue',
      icon: '📊',
    },
  ];

  // Workout filters
  const workoutFilters = ['All type', 'Yoga', 'Cycling', 'Swim', 'CrossFit'];

  // Workout cards data
  const workoutCards = [
    {
      id: 1,
      title: 'Stretching',
      instructor: 'Rajesh Kumar',
      date: 'Friday, 20 Oct.',
      duration: '60 mins',
      type: 'Popular',
      typeColor: 'text-pink-500',
      typeBg: 'bg-pink-50',
      days: '3 Days',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&q=80',
    },
    {
      id: 2,
      title: 'CrossFit',
      instructor: 'Priya Sharma',
      date: 'Friday, 20 Oct.',
      duration: '45 mins',
      type: 'Circular',
      typeColor: 'text-primary-blue',
      typeBg: 'bg-primary-blue/10',
      days: '5 Days',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&q=80',
    },
    {
      id: 3,
      title: 'Yoga',
      instructor: 'Anjali Singh',
      date: 'Saturday, 21 Oct.',
      duration: '30 mins',
      type: 'Popular',
      typeColor: 'text-pink-500',
      typeBg: 'bg-pink-50',
      days: '7 Days',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-background-main pb-24">
      {/* Top Header Section */}
      <div className="bg-white px-4 pt-4 pb-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 relative z-10">
          {/* Date */}
          <div>
            <p className="text-sm text-text-light font-body">{getCurrentDate()}</p>
            <h2 className="text-xl font-heading font-bold text-text-dark mt-1">
              Have a nice day!
            </h2>
          </div>

          {/* Profile Picture */}
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center overflow-hidden ring-2 ring-primary-blue/20">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Animated Character Doing Exercise - Fallback Animation */}
        <div className="absolute bottom-0 right-0 h-32 sm:h-40 w-32 sm:w-40 opacity-20 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full flex items-center justify-center"
          >
            {/* Animated Character with Dumbbells */}
            <motion.div
              className="relative"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Character Body */}
              <div className="relative">
                {/* Head */}
                <motion.div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-primary mx-auto mb-1"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Body */}
                <div className="w-6 h-12 sm:w-8 sm:h-16 bg-gradient-primary rounded-lg mx-auto relative">
                  {/* Left Arm with Dumbbell */}
                  <motion.div
                    className="absolute -left-4 sm:-left-6 top-2 sm:top-3 origin-top"
                    animate={{
                      rotate: [0, -45, 0, 45, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-3 h-8 sm:w-4 sm:h-10 bg-gradient-primary rounded-full">
                      {/* Dumbbell */}
                      <motion.div
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-primary rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </motion.div>
                  
                  {/* Right Arm with Dumbbell */}
                  <motion.div
                    className="absolute -right-4 sm:-right-6 top-2 sm:top-3 origin-top"
                    animate={{
                      rotate: [0, 45, 0, -45, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <div className="w-3 h-8 sm:w-4 sm:h-10 bg-gradient-primary rounded-full">
                      {/* Dumbbell */}
                      <motion.div
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-primary rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
                
                {/* Legs */}
                <div className="flex gap-2 sm:gap-3 mt-1 sm:mt-2 justify-center">
                  <motion.div
                    className="w-2 h-6 sm:w-3 sm:h-8 bg-gradient-primary rounded-full"
                    animate={{
                      y: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="w-2 h-6 sm:w-3 sm:h-8 bg-gradient-primary rounded-full"
                    animate={{
                      y: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Dumbbell */}
        <div className="absolute bottom-0 left-0 h-16 flex items-center justify-center opacity-10 pointer-events-none">
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

      {/* Activity Section */}
      <div className="px-4 mt-6">
        <h3 className="text-xl font-heading font-bold text-text-dark mb-4">Activity</h3>
        
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {activityCards.map((card, index) => (
            <motion.div
              key={card.id}
              className="flex-shrink-0 w-36 bg-white rounded-2xl p-5 shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <p className="text-xs text-text-light font-body mb-4 font-medium">{card.title}</p>
              <div 
                className="w-20 h-20 rounded-full flex flex-col items-center justify-center mb-3 mx-auto shadow-lg"
                style={{
                  background: card.id === 1 
                    ? 'linear-gradient(135deg, #305EFF, #8A4CFF)'
                    : card.id === 2
                    ? 'linear-gradient(135deg, #22C55E, #16A34A)'
                    : 'linear-gradient(135deg, #8A4CFF, #305EFF)'
                }}
              >
                <span className="font-mono font-bold text-2xl leading-none" style={{ color: '#FFFFFF' }}>
                  {card.value}
                </span>
                <span className="font-mono text-xs mt-0.5" style={{ color: '#FFFFFF', opacity: 0.95 }}>
                  {card.unit}
                </span>
              </div>
            </motion.div>
          ))}
          
          {/* Dots indicator */}
          <div className="flex items-center gap-1.5 ml-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>

      {/* Trainer Card Section */}
      <div className="px-4 mt-6">
        <motion.div
          className="w-full bg-white rounded-2xl p-5 shadow-md border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.01, shadow: 'lg' }}
        >
          <h3 className="text-lg font-heading font-bold text-text-dark mb-4">Your Trainer</h3>
          
          <div className="flex items-center gap-4">
            {/* Trainer Image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-primary flex items-center justify-center overflow-hidden ring-2 ring-primary-blue/20 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&q=80"
                alt="Trainer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x200?text=Trainer';
                }}
              />
            </div>

            {/* Trainer Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xl font-heading font-bold text-text-dark mb-1">
                Rajesh Kumar
              </h4>
              <p className="text-sm text-text-light font-body mb-2">
                Certified Fitness Trainer
              </p>
              <div className="flex items-center gap-4 text-xs text-text-light">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">5+ Years Exp</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="font-medium">200+ Members</span>
                </div>
              </div>
            </div>

            {/* Chat/Contact Button */}
            <button className="p-2 sm:p-3 bg-gradient-primary rounded-full text-white flex-shrink-0 hover:shadow-lg transition-all">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Workouts Section */}
      <div className="px-4 mt-8">
        <h3 className="text-xl font-heading font-bold text-text-dark mb-4">Workouts</h3>
        
        {/* Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-4">
          {workoutFilters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? 'bg-text-dark text-black'
                  : 'bg-gray-100 text-text-light hover:bg-gray-200'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Workout Cards */}
        <div className="space-y-4">
          {workoutCards.map((workout, index) => (
            <motion.div
              key={workout.id}
              className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 flex gap-4 overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, shadow: 'lg' }}
            >
              {/* Left Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-text-dark bg-gray-100 px-2 py-1 rounded-md">
                    {workout.days}
                  </span>
                  {workout.type === 'Popular' && (
                    <span className={`${workout.typeBg} ${workout.typeColor} px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1`}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {workout.type}
                    </span>
                  )}
                  {workout.type === 'Circular' && (
                    <span className={`${workout.typeBg} ${workout.typeColor} px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1`}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {workout.type}
                    </span>
                  )}
                </div>
                
                <h4 className="text-xl font-heading font-bold text-text-dark mb-2">
                  {workout.title}
                </h4>
                
                <p className="text-sm text-text-light font-body mb-4">
                  {workout.instructor}
                </p>
                
                <div className="flex flex-col gap-2 text-xs text-text-light">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{workout.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">{workout.duration}</span>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                <img
                  src={workout.image}
                  alt={workout.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x200?text=Workout';
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Today's Goals Section */}
      <div className="px-4 mt-6 mb-6">
        <h3 className="text-xl font-heading font-bold text-text-dark mb-4">Today's Goals</h3>
        
        <div className="space-y-3">
          {todayGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center gap-3">
                {/* Checkbox */}
                <motion.button
                  onClick={() => toggleGoal(goal.id)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    goal.completed
                      ? 'bg-gradient-primary border-primary-blue'
                      : 'border-gray-300 bg-white'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  {goal.completed && (
                    <motion.svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </motion.button>

                {/* Goal Content */}
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-heading font-semibold leading-tight ${
                    goal.completed ? 'text-text-light line-through' : 'text-text-dark'
                  }`}>
                    {goal.title}
                  </h4>
                  <p className="text-xs text-text-light mt-0.5 leading-tight">{goal.description}</p>
                </div>

                {/* Progress/Status */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Interactive Progress Bar */}
                  {goal.progress !== undefined && (
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer relative"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const percentage = Math.round((x / rect.width) * 100);
                          updateProgress(goal.id, percentage);
                        }}
                        title="Click to update progress"
                      >
                        <motion.div
                          className={`h-full rounded-full ${
                            goal.progress === 100
                              ? 'bg-success'
                              : goal.progress >= 75
                              ? 'bg-primary-blue'
                              : goal.progress >= 50
                              ? 'bg-warning'
                              : goal.progress >= 25
                              ? 'bg-orange-500'
                              : 'bg-danger'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <span className="text-xs font-medium text-text-light w-8 text-right">
                        {goal.progress}%
                      </span>
                    </div>
                  )}
                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    goal.completed ? 'bg-success/20 text-success' : goal.iconBg + ' text-primary-blue'
                  }`}>
                    {getGoalIcon(goal.iconType)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;

