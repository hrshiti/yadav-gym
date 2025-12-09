import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const AdminAttendance = () => {
  const [activeTab, setActiveTab] = useState('members'); // 'members', 'trainers'
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock members data
  const members = [
    { id: '1', name: 'Rahul Sharma', memberId: 'M001', email: 'rahul@example.com', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { id: '2', name: 'Priya Patel', memberId: 'M002', email: 'priya@example.com', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { id: '3', name: 'Amit Kumar', memberId: 'M003', email: 'amit@example.com', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
    { id: '4', name: 'Sneha Singh', memberId: 'M004', email: 'sneha@example.com', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { id: '5', name: 'Vikram Mehta', memberId: 'M005', email: 'vikram@example.com', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
  ];

  // Mock trainers data
  const trainers = [
    { id: '1', name: 'Rajesh Kumar', trainerId: 'TR001', email: 'rajesh@yadavfitness.com', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80' },
    { id: '2', name: 'Priya Sharma', trainerId: 'TR002', email: 'priya@yadavfitness.com', image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&q=80' },
    { id: '3', name: 'Amit Singh', trainerId: 'TR003', email: 'amit@yadavfitness.com', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
    { id: '4', name: 'Sneha Patel', trainerId: 'TR004', email: 'sneha@yadavfitness.com', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  ];

  // Mock attendance data - Members
  const [memberAttendance, setMemberAttendance] = useState([
    { id: 'A001', memberId: '1', date: '2024-01-15', status: 'present', checkIn: '06:30', checkOut: '08:00' },
    { id: 'A002', memberId: '2', date: '2024-01-15', status: 'present', checkIn: '07:00', checkOut: '08:30' },
    { id: 'A003', memberId: '3', date: '2024-01-15', status: 'absent', checkIn: null, checkOut: null },
    { id: 'A004', memberId: '4', date: '2024-01-15', status: 'present', checkIn: '06:45', checkOut: '08:15' },
    { id: 'A005', memberId: '5', date: '2024-01-15', status: 'late', checkIn: '08:00', checkOut: '09:30' },
  ]);

  // Mock attendance data - Trainers
  const [trainerAttendance, setTrainerAttendance] = useState([
    { id: 'T001', trainerId: '1', date: '2024-01-15', status: 'present', checkIn: '05:30', checkOut: '10:00' },
    { id: 'T002', trainerId: '2', date: '2024-01-15', status: 'present', checkIn: '06:00', checkOut: '10:30' },
    { id: 'T003', trainerId: '3', date: '2024-01-15', status: 'present', checkIn: '05:45', checkOut: '10:15' },
    { id: 'T004', trainerId: '4', date: '2024-01-15', status: 'absent', checkIn: null, checkOut: null },
  ]);

  // Get attendance for selected date
  const getAttendanceForDate = () => {
    if (activeTab === 'members') {
      return members.map(member => {
        const attendance = memberAttendance.find(a => a.memberId === member.id && a.date === selectedDate);
        return {
          ...member,
          attendance: attendance || { status: 'absent', checkIn: null, checkOut: null },
          attendanceId: attendance?.id,
        };
      });
    } else {
      return trainers.map(trainer => {
        const attendance = trainerAttendance.find(a => a.trainerId === trainer.id && a.date === selectedDate);
        return {
          ...trainer,
          attendance: attendance || { status: 'absent', checkIn: null, checkOut: null },
          attendanceId: attendance?.id,
        };
      });
    }
  };

  const attendanceList = getAttendanceForDate();

  // Handle status update
  const handleStatusUpdate = (personId, newStatus, checkIn = null, checkOut = null) => {
    if (activeTab === 'members') {
      const existing = memberAttendance.find(a => a.memberId === personId && a.date === selectedDate);
      if (existing) {
        setMemberAttendance(memberAttendance.map(a =>
          a.id === existing.id
            ? { ...a, status: newStatus, checkIn, checkOut }
            : a
        ));
      } else {
        const newAttendance = {
          id: `A${String(memberAttendance.length + 1).padStart(3, '0')}`,
          memberId: personId,
          date: selectedDate,
          status: newStatus,
          checkIn,
          checkOut,
        };
        setMemberAttendance([...memberAttendance, newAttendance]);
      }
    } else {
      const existing = trainerAttendance.find(a => a.trainerId === personId && a.date === selectedDate);
      if (existing) {
        setTrainerAttendance(trainerAttendance.map(a =>
          a.id === existing.id
            ? { ...a, status: newStatus, checkIn, checkOut }
            : a
        ));
      } else {
        const newAttendance = {
          id: `T${String(trainerAttendance.length + 1).padStart(3, '0')}`,
          trainerId: personId,
          date: selectedDate,
          status: newStatus,
          checkIn,
          checkOut,
        };
        setTrainerAttendance([...trainerAttendance, newAttendance]);
      }
    }
    setEditingAttendance(null);
  };

  // Handle edit
  const handleEdit = (person) => {
    setEditingAttendance(person);
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return 'bg-success/10 text-success';
      case 'absent':
        return 'bg-danger/10 text-danger';
      case 'late':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-gray-100 text-text-light';
    }
  };

  // Get statistics
  const getStats = () => {
    const total = attendanceList.length;
    const present = attendanceList.filter(p => p.attendance.status === 'present').length;
    const absent = attendanceList.filter(p => p.attendance.status === 'absent').length;
    const late = attendanceList.filter(p => p.attendance.status === 'late').length;
    return { total, present, absent, late };
  };

  const stats = getStats();

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    if (showDatePicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(formatDate(date));
      setShowDatePicker(false);
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = getDaysInMonth(currentMonth);
  const selectedDateObj = new Date(selectedDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-lg sm:text-xl font-heading font-bold text-text-dark">
          Attendance Report
        </h2>
        <div className="flex items-center gap-2 relative" ref={datePickerRef}>
          <label className="text-xs sm:text-sm font-medium text-text-dark">Date:</label>
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all flex items-center gap-2"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </motion.button>

            {/* Custom Date Picker */}
            <AnimatePresence>
              {showDatePicker && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute left-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50 min-w-[280px]"
                >
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>
                    <h3 className="text-sm font-semibold text-text-dark">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <motion.button
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                      <div key={day} className="text-xs font-medium text-text-light text-center py-1">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((date, index) => {
                      if (!date) {
                        return <div key={`empty-${index}`} className="aspect-square" />;
                      }
                      const dateStr = formatDate(date);
                      const isSelected = dateStr === selectedDate;
                      const isToday = formatDate(today) === dateStr;

                      return (
                        <motion.button
                          key={dateStr}
                          onClick={() => handleDateSelect(date)}
                          className={`aspect-square rounded-lg text-xs sm:text-sm font-medium transition-all ${
                            isSelected
                              ? 'text-white'
                              : isToday
                              ? 'text-primary-blue font-bold border-2 border-primary-blue'
                              : 'text-text-dark hover:bg-gray-100'
                          }`}
                          style={isSelected ? {
                            background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
                          } : {}}
                          whileTap={{ scale: 0.9 }}
                        >
                          {date.getDate()}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                    <motion.button
                      onClick={() => {
                        const today = new Date();
                        handleDateSelect(today);
                      }}
                      className="flex-1 px-3 py-2 bg-primary-blue/10 text-primary-blue rounded-lg text-xs font-medium hover:bg-primary-blue/20 transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      Today
                    </motion.button>
                    <motion.button
                      onClick={() => setShowDatePicker(false)}
                      className="flex-1 px-3 py-2 bg-gray-100 text-text-dark rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <motion.div
        className="bg-white rounded-xl sm:rounded-2xl p-1 shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex gap-1 overflow-x-auto scrollbar-hide relative">
          {[
            { id: 'members', label: 'Members' },
            { id: 'trainers', label: 'Trainers' },
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

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
        >
          <p className="text-xs sm:text-sm text-text-light mb-1">Total</p>
          <p className="text-lg sm:text-xl font-bold text-text-dark">{stats.total}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
        >
          <p className="text-xs sm:text-sm text-text-light mb-1">Present</p>
          <p className="text-lg sm:text-xl font-bold text-success">{stats.present}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
        >
          <p className="text-xs sm:text-sm text-text-light mb-1">Absent</p>
          <p className="text-lg sm:text-xl font-bold text-danger">{stats.absent}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
        >
          <p className="text-xs sm:text-sm text-text-light mb-1">Late</p>
          <p className="text-lg sm:text-xl font-bold text-warning">{stats.late}</p>
        </motion.div>
      </div>

      {/* Attendance List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100"
        >
          <h3 className="text-base sm:text-lg font-heading font-bold text-text-dark mb-3 sm:mb-4">
            {activeTab === 'members' ? 'Members Attendance' : 'Trainers Attendance'} - {new Date(selectedDate).toLocaleDateString()}
          </h3>

          {attendanceList.length === 0 ? (
            <p className="text-text-light text-center py-8">No {activeTab} found</p>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {attendanceList.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    {/* Person Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-primary-blue/20 flex-shrink-0">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200x200?text=User';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-heading font-bold text-text-dark truncate">
                          {person.name}
                        </h4>
                        <p className="text-xs text-text-light">
                          {activeTab === 'members' ? person.memberId : person.trainerId}
                        </p>
                      </div>
                    </div>

                    {/* Attendance Status */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(person.attendance.status)}`}>
                          {person.attendance.status.charAt(0).toUpperCase() + person.attendance.status.slice(1)}
                        </span>
                      </div>
                      {person.attendance.checkIn && (
                        <div className="text-xs sm:text-sm text-text-dark">
                          <span className="font-medium">In:</span> {person.attendance.checkIn}
                        </div>
                      )}
                      {person.attendance.checkOut && (
                        <div className="text-xs sm:text-sm text-text-dark">
                          <span className="font-medium">Out:</span> {person.attendance.checkOut}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      onClick={() => handleEdit(person)}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-blue/10 text-primary-blue rounded-lg text-xs sm:text-sm font-medium hover:bg-primary-blue/20 transition-colors whitespace-nowrap"
                      whileTap={{ scale: 0.95 }}
                    >
                      Update
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingAttendance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setEditingAttendance(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setEditingAttendance(null)}
                className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-lg sm:text-xl font-heading font-bold text-text-dark mb-4">
                Update Attendance
              </h3>

              <div className="mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary-blue/20">
                    <img
                      src={editingAttendance.image}
                      alt={editingAttendance.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark">{editingAttendance.name}</h4>
                    <p className="text-xs text-text-light">
                      {activeTab === 'members' ? editingAttendance.memberId : editingAttendance.trainerId}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Status *</label>
                  <select
                    value={editingAttendance.attendance.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      const personId = activeTab === 'members' ? editingAttendance.id : editingAttendance.id;
                      handleStatusUpdate(personId, newStatus, editingAttendance.attendance.checkIn, editingAttendance.attendance.checkOut);
                    }}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                </div>

                {/* Check In */}
                {editingAttendance.attendance.status !== 'absent' && (
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-2">Check In Time</label>
                    <input
                      type="time"
                      value={editingAttendance.attendance.checkIn || ''}
                      onChange={(e) => {
                        const personId = activeTab === 'members' ? editingAttendance.id : editingAttendance.id;
                        handleStatusUpdate(
                          personId,
                          editingAttendance.attendance.status,
                          e.target.value,
                          editingAttendance.attendance.checkOut
                        );
                      }}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                    />
                  </div>
                )}

                {/* Check Out */}
                {editingAttendance.attendance.status !== 'absent' && (
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-2">Check Out Time</label>
                    <input
                      type="time"
                      value={editingAttendance.attendance.checkOut || ''}
                      onChange={(e) => {
                        const personId = activeTab === 'members' ? editingAttendance.id : editingAttendance.id;
                        handleStatusUpdate(
                          personId,
                          editingAttendance.attendance.status,
                          editingAttendance.attendance.checkIn,
                          e.target.value
                        );
                      }}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                    />
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <motion.button
                  onClick={() => setEditingAttendance(null)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-text-dark rounded-lg font-medium text-sm hover:bg-gray-200 transition-all"
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminAttendance;

