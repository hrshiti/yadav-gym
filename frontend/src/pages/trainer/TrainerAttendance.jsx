import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TrainerAttendance = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock members data (assigned to this trainer)
  const members = [
    { id: '1', name: 'Rahul Sharma', memberId: 'M001', email: 'rahul@example.com', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { id: '2', name: 'Priya Patel', memberId: 'M002', email: 'priya@example.com', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { id: '3', name: 'Amit Kumar', memberId: 'M003', email: 'amit@example.com', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
    { id: '4', name: 'Sneha Singh', memberId: 'M004', email: 'sneha@example.com', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { id: '5', name: 'Vikram Mehta', memberId: 'M005', email: 'vikram@example.com', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
    { id: '6', name: 'Anjali Verma', memberId: 'M006', email: 'anjali@example.com', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
  ];

  // Mock attendance data - Members
  const [memberAttendance, setMemberAttendance] = useState([
    { id: 'A001', memberId: '1', date: new Date().toISOString().split('T')[0], status: 'present', checkIn: '06:30', checkOut: '08:00' },
    { id: 'A002', memberId: '2', date: new Date().toISOString().split('T')[0], status: 'present', checkIn: '07:00', checkOut: '08:30' },
    { id: 'A003', memberId: '3', date: new Date().toISOString().split('T')[0], status: 'absent', checkIn: null, checkOut: null },
  ]);

  // Get attendance for selected date
  const getAttendanceForDate = () => {
    return members.map(member => {
      const attendance = memberAttendance.find(a => a.memberId === member.id && a.date === selectedDate);
      return {
        ...member,
        attendance: attendance || { status: 'absent', checkIn: null, checkOut: null },
        attendanceId: attendance?.id,
      };
    });
  };

  const attendanceList = getAttendanceForDate();

  // Handle status update
  const handleStatusUpdate = (memberId, newStatus, checkIn = null, checkOut = null) => {
    const existing = memberAttendance.find(a => a.memberId === memberId && a.date === selectedDate);
    if (existing) {
      setMemberAttendance(memberAttendance.map(a =>
        a.id === existing.id
          ? { ...a, status: newStatus, checkIn, checkOut }
          : a
      ));
    } else {
      const newAttendance = {
        id: `A${String(memberAttendance.length + 1).padStart(3, '0')}`,
        memberId: memberId,
        date: selectedDate,
        status: newStatus,
        checkIn,
        checkOut,
      };
      setMemberAttendance([...memberAttendance, newAttendance]);
    }
    setEditingAttendance(null);
  };

  // Handle edit
  const handleEdit = (member) => {
    setEditingAttendance(member);
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
    const present = attendanceList.filter(m => m.attendance.status === 'present').length;
    const absent = attendanceList.filter(m => m.attendance.status === 'absent').length;
    const late = attendanceList.filter(m => m.attendance.status === 'late').length;
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
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
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
    <div className="min-h-screen bg-background-main pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2"
          >
            <svg className="w-6 h-6 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-heading font-bold text-text-dark">
            Attendance Mark
          </h2>
          <div className="w-10" />
        </div>

        {/* Date Picker */}
        <div className="flex items-center gap-2 relative" ref={datePickerRef}>
          <label className="text-xs font-medium text-text-dark">Date:</label>
          <div className="relative flex-1">
            <motion.button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all flex items-center gap-2"
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="flex-1 text-left">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
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
                          className={`aspect-square rounded-lg text-xs font-medium transition-all ${
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

      <div className="px-4 mt-4 space-y-4">
        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100"
          >
            <p className="text-xs sm:text-sm text-text-light mb-1">Total</p>
            <p className="text-lg sm:text-xl font-bold text-text-dark">{stats.total}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100"
          >
            <p className="text-xs sm:text-sm text-text-light mb-1">Present</p>
            <p className="text-lg sm:text-xl font-bold text-success">{stats.present}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100"
          >
            <p className="text-xs sm:text-sm text-text-light mb-1">Absent</p>
            <p className="text-lg sm:text-xl font-bold text-danger">{stats.absent}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100"
          >
            <p className="text-xs sm:text-sm text-text-light mb-1">Late</p>
            <p className="text-lg sm:text-xl font-bold text-warning">{stats.late}</p>
          </motion.div>
        </div>

        {/* Attendance List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <h3 className="text-base font-heading font-bold text-text-dark mb-4">
            Members Attendance - {new Date(selectedDate).toLocaleDateString()}
          </h3>

          {attendanceList.length === 0 ? (
            <p className="text-text-light text-center py-8">No members found</p>
          ) : (
            <div className="space-y-3">
              {attendanceList.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    {/* Member Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary-blue/20 flex-shrink-0">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200x200?text=User';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-heading font-bold text-text-dark truncate">
                          {member.name}
                        </h4>
                        <p className="text-xs text-text-light">
                          {member.memberId}
                        </p>
                      </div>
                    </div>

                    {/* Attendance Status */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(member.attendance.status)}`}>
                          {member.attendance.status.charAt(0).toUpperCase() + member.attendance.status.slice(1)}
                        </span>
                      </div>
                      {member.attendance.checkIn && (
                        <div className="text-sm text-text-dark">
                          <span className="font-medium">In:</span> {member.attendance.checkIn}
                        </div>
                      )}
                      {member.attendance.checkOut && (
                        <div className="text-sm text-text-dark">
                          <span className="font-medium">Out:</span> {member.attendance.checkOut}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      onClick={() => handleEdit(member)}
                      className="px-4 py-2 bg-primary-blue/10 text-primary-blue rounded-lg text-sm font-medium hover:bg-primary-blue/20 transition-colors whitespace-nowrap"
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
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingAttendance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setEditingAttendance(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg relative"
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

              <h3 className="text-xl font-heading font-bold text-text-dark mb-4">
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
                      {editingAttendance.memberId}
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
                      handleStatusUpdate(editingAttendance.id, newStatus, editingAttendance.attendance.checkIn, editingAttendance.attendance.checkOut);
                    }}
                    className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
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
                        handleStatusUpdate(
                          editingAttendance.id,
                          editingAttendance.attendance.status,
                          e.target.value,
                          editingAttendance.attendance.checkOut
                        );
                      }}
                      className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
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
                        handleStatusUpdate(
                          editingAttendance.id,
                          editingAttendance.attendance.status,
                          editingAttendance.attendance.checkIn,
                          e.target.value
                        );
                      }}
                      className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
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

export default TrainerAttendance;

