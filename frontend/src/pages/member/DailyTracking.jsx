import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DailyTracking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get current date string
  const getCurrentDateString = () => {
    const date = selectedDate;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `${days[date.getDay()]}, ${date.getDate()}`;
  };

  // Generate calendar days (7 days starting from a week ago)
  const getCalendarDays = () => {
    const days = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6); // 7 days ago

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push({
        day: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()],
        date: date.getDate(),
        fullDate: date,
        isSelected: date.toDateString() === selectedDate.toDateString(),
      });
    }
    return days;
  };

  // Daily activities based on document (Workout checklist, exercises)
  const dailyActivities = [
    {
      id: 1,
      type: 'Walking',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      iconColor: 'text-orange-500',
      iconBg: 'bg-orange-50',
      value: '9857',
      unit: 'Steps',
      time: 'Today 11:45 AM',
      timeBg: 'bg-orange-50',
      timeColor: 'text-orange-600',
    },
    {
      id: 2,
      type: 'Workout',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      iconColor: 'text-pink-500',
      iconBg: 'bg-pink-50',
      value: '45',
      unit: 'minutes',
      time: 'Today 8:00 PM',
      timeBg: 'bg-pink-50',
      timeColor: 'text-pink-600',
    },
    {
      id: 3,
      type: 'Cycling',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <circle cx="5.5" cy="17.5" r="3.5" />
          <circle cx="18.5" cy="17.5" r="3.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 6.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.5h7.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 6.5h-2.5" />
        </svg>
      ),
      iconColor: 'text-primary-blue',
      iconBg: 'bg-primary-blue/10',
      value: '17',
      unit: 'km',
      time: 'Today 9:00 AM',
      timeBg: 'bg-primary-blue/10',
      timeColor: 'text-primary-blue',
    },
    {
      id: 4,
      type: 'Push-ups',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
        </svg>
      ),
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10',
      value: '230',
      unit: '',
      time: 'Today 8:00 AM',
      timeBg: 'bg-warning/10',
      timeColor: 'text-warning',
    },
  ];

  const calendarDays = getCalendarDays();

  return (
    <div className="min-h-screen bg-background-main pb-24">
      {/* Header Section */}
      <div className="bg-white px-4 pt-4 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Back Arrow */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2"
          >
            <svg className="w-6 h-6 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Date with Dropdown */}
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-heading font-bold text-text-dark">
              {getCurrentDateString()}
            </h2>
            <svg className="w-4 h-4 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Profile Picture */}
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-blue/20">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Calendar/Date Selector */}
      <div className="bg-white px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          {calendarDays.map((day, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedDate(day.fullDate)}
              className={`flex flex-col items-center justify-center w-12 h-16 rounded-2xl transition-all relative ${
                day.isSelected
                  ? 'bg-gradient-primary shadow-lg'
                  : 'bg-transparent hover:bg-gray-50'
              }`}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className={`text-xs font-medium z-10 ${day.isSelected ? 'text-black' : 'text-text-light'}`}>
                {day.day}
              </span>
              <span className={`text-base font-bold mt-1 z-10 ${day.isSelected ? 'text-black' : 'text-text-dark'}`}>
                {day.date}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Activity Log Cards */}
      <div className="px-4 mt-6 space-y-4">
        {/* Walking Card - Icon left, text below icon, value on right */}
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start gap-4">
            {/* Left Side - Icon and Text */}
            <div className="flex flex-col items-start">
              <div className={`w-16 h-16 ${dailyActivities[0].iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 ${dailyActivities[0].iconColor} mb-2`}>
                {dailyActivities[0].icon}
              </div>
              <h3 className="text-base font-heading font-semibold text-text-dark">
                {dailyActivities[0].type}
              </h3>
            </div>

            {/* Right Side - Value and Time */}
            <div className="flex-1 flex flex-col items-end text-right ml-auto">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-heading font-bold text-text-dark">
                  {dailyActivities[0].value}
                </span>
                {dailyActivities[0].unit && (
                  <span className="text-sm text-text-light font-body">
                    {dailyActivities[0].unit}
                  </span>
                )}
              </div>

              {/* Time Badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full ${dailyActivities[0].timeBg}`}>
                <span className={`text-xs font-medium ${dailyActivities[0].timeColor}`}>
                  {dailyActivities[0].time}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Workout and Cycling Cards - Two in One Row, Images on Right */}
        <div className="grid grid-cols-2 gap-4">
          {dailyActivities.slice(1, 3).map((activity, index) => (
            <motion.div
              key={activity.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + 1) * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col h-full">
                {/* Content on Left */}
                <div className="flex-1 mb-3">
                  <h3 className="text-base font-heading font-semibold text-text-dark mb-3">
                    {activity.type}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-heading font-bold text-text-dark">
                      {activity.value}
                    </span>
                    {activity.unit && (
                      <span className="text-sm text-text-light font-body">
                        {activity.unit}
                      </span>
                    )}
                  </div>

                  {/* Time Badge */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full ${activity.timeBg}`}>
                    <span className={`text-xs font-medium ${activity.timeColor}`}>
                      {activity.time}
                    </span>
                  </div>
                </div>

                {/* Icon on Right End */}
                <div className={`w-16 h-16 ${activity.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 ${activity.iconColor} ml-auto`}>
                  {activity.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Push-ups Card - Same as Walking */}
        <motion.div
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start gap-4">
            {/* Left Side - Icon and Text */}
            <div className="flex flex-col items-start">
              <div className={`w-16 h-16 ${dailyActivities[3].iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 ${dailyActivities[3].iconColor} mb-2`}>
                {dailyActivities[3].icon}
              </div>
              <h3 className="text-base font-heading font-semibold text-text-dark">
                {dailyActivities[3].type}
              </h3>
            </div>

            {/* Right Side - Value and Time */}
            <div className="flex-1 flex flex-col items-end text-right ml-auto">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-heading font-bold text-text-dark">
                  {dailyActivities[3].value}
                </span>
                {dailyActivities[3].unit && (
                  <span className="text-sm text-text-light font-body">
                    {dailyActivities[3].unit}
                  </span>
                )}
              </div>

              {/* Time Badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full ${dailyActivities[3].timeBg}`}>
                <span className={`text-xs font-medium ${dailyActivities[3].timeColor}`}>
                  {dailyActivities[3].time}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DailyTracking;

