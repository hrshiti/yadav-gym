import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const AdminTrainerAssignment = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'in-progress', 'completed'

  // Mock trainers data
  const trainers = [
    { id: '1', name: 'Rajesh Kumar', trainerId: 'TR001', email: 'rajesh@yadavfitness.com', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80', specialization: 'Strength Training' },
    { id: '2', name: 'Priya Sharma', trainerId: 'TR002', email: 'priya@yadavfitness.com', image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&q=80', specialization: 'Yoga & Flexibility' },
    { id: '3', name: 'Amit Singh', trainerId: 'TR003', email: 'amit@yadavfitness.com', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', specialization: 'Cardio & Weight Loss' },
    { id: '4', name: 'Sneha Patel', trainerId: 'TR004', email: 'sneha@yadavfitness.com', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', specialization: 'Pilates' },
  ];

  // Mock members data
  const members = [
    { id: '1', name: 'Rahul Sharma', memberId: 'M001', email: 'rahul@example.com', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { id: '2', name: 'Priya Patel', memberId: 'M002', email: 'priya@example.com', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { id: '3', name: 'Amit Kumar', memberId: 'M003', email: 'amit@example.com', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
    { id: '4', name: 'Sneha Singh', memberId: 'M004', email: 'sneha@example.com', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { id: '5', name: 'Vikram Mehta', memberId: 'M005', email: 'vikram@example.com', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
  ];

  // Mock assignments data
  const [assignments, setAssignments] = useState([
    {
      id: 'TA001',
      trainerId: '1',
      memberId: '1',
      taskTitle: 'Strength Training Program',
      taskDescription: 'Design and implement a 4-week strength training program for member',
      priority: 'high',
      dueDate: '2024-01-25',
      status: 'in-progress',
      createdAt: '2024-01-10',
      notes: 'Focus on upper body strength',
    },
    {
      id: 'TA002',
      trainerId: '2',
      memberId: '2',
      taskTitle: 'Yoga Session Planning',
      taskDescription: 'Create weekly yoga sessions for flexibility improvement',
      priority: 'medium',
      dueDate: '2024-01-20',
      status: 'pending',
      createdAt: '2024-01-12',
      notes: 'Include breathing exercises',
    },
    {
      id: 'TA003',
      trainerId: '3',
      memberId: '3',
      taskTitle: 'Cardio Workout Plan',
      taskDescription: 'Develop cardio workout routine for weight loss',
      priority: 'high',
      dueDate: '2024-01-18',
      status: 'completed',
      createdAt: '2024-01-08',
      notes: 'Completed successfully',
    },
    {
      id: 'TA004',
      trainerId: '1',
      memberId: '4',
      taskTitle: 'Body Composition Analysis',
      taskDescription: 'Conduct body composition analysis and provide recommendations',
      priority: 'medium',
      dueDate: '2024-01-22',
      status: 'in-progress',
      createdAt: '2024-01-11',
      notes: 'Schedule follow-up session',
    },
  ]);

  // Form data
  const [formData, setFormData] = useState({
    taskTitle: '',
    taskDescription: '',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  // Get filtered assignments
  const getFilteredAssignments = () => {
    let filtered = assignments;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(a => a.status === filterStatus);
    }

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(a => a.createdAt <= selectedDate);
    }

    return filtered;
  };

  const filteredAssignments = getFilteredAssignments();

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
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Handle add
  const handleAdd = () => {
    setViewMode('add');
    setEditingAssignment(null);
    setFormData({
      taskTitle: '',
      taskDescription: '',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setSelectedTrainer('');
    setSelectedMember('');
  };

  // Handle edit
  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setViewMode('edit');
    setFormData({
      taskTitle: assignment.taskTitle,
      taskDescription: assignment.taskDescription,
      priority: assignment.priority,
      dueDate: assignment.dueDate,
      notes: assignment.notes,
    });
    setSelectedTrainer(assignment.trainerId);
    setSelectedMember(assignment.memberId);
  };

  // Handle delete
  const handleDelete = (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(a => a.id !== assignmentId));
    }
  };

  // Handle status update
  const handleStatusUpdate = (assignmentId, newStatus) => {
    setAssignments(assignments.map(a =>
      a.id === assignmentId ? { ...a, status: newStatus } : a
    ));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTrainer || !selectedMember) {
      alert('Please select both trainer and member');
      return;
    }

    if (viewMode === 'add') {
      const newAssignment = {
        id: `TA${String(assignments.length + 1).padStart(3, '0')}`,
        trainerId: selectedTrainer,
        memberId: selectedMember,
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setAssignments([...assignments, newAssignment]);
    } else if (viewMode === 'edit') {
      setAssignments(assignments.map(a =>
        a.id === editingAssignment.id
          ? { ...a, ...formData, trainerId: selectedTrainer, memberId: selectedMember }
          : a
      ));
    }

    handleCancel();
  };

  // Handle cancel
  const handleCancel = () => {
    setViewMode('list');
    setEditingAssignment(null);
    setFormData({
      taskTitle: '',
      taskDescription: '',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setSelectedTrainer('');
    setSelectedMember('');
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'in-progress':
        return 'bg-primary-blue/10 text-primary-blue';
      case 'pending':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-gray-100 text-text-light';
    }
  };

  // Get priority badge color
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-danger/10 text-danger';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-success/10 text-success';
      default:
        return 'bg-gray-100 text-text-light';
    }
  };

  // Get statistics
  const getStats = () => {
    const total = assignments.length;
    const pending = assignments.filter(a => a.status === 'pending').length;
    const inProgress = assignments.filter(a => a.status === 'in-progress').length;
    const completed = assignments.filter(a => a.status === 'completed').length;
    return { total, pending, inProgress, completed };
  };

  const stats = getStats();

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-lg sm:text-xl font-heading font-bold text-text-dark">
          Trainer Assignment Management
        </h2>
        <div className="flex items-center gap-2">
          {viewMode === 'list' && (
            <>
              {/* Date Filter */}
              <div className="relative" ref={datePickerRef}>
                <motion.button
                  type="button"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="px-3 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg text-xs text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all flex items-center gap-2 whitespace-nowrap"
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
                          onClick={() => {
                            setSelectedDate('');
                            setShowDatePicker(false);
                          }}
                          className="flex-1 px-3 py-2 bg-gray-100 text-text-dark rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                          whileTap={{ scale: 0.95 }}
                        >
                          All Dates
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

              {/* Add Assignment Button */}
              <motion.button
                onClick={handleAdd}
                className="px-3 py-2 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Assign Task
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Statistics */}
      {viewMode === 'list' && (
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
            <p className="text-xs sm:text-sm text-text-light mb-1">Pending</p>
            <p className="text-lg sm:text-xl font-bold text-warning">{stats.pending}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
          >
            <p className="text-xs sm:text-sm text-text-light mb-1">In Progress</p>
            <p className="text-lg sm:text-xl font-bold text-primary-blue">{stats.inProgress}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
          >
            <p className="text-xs sm:text-sm text-text-light mb-1">Completed</p>
            <p className="text-lg sm:text-xl font-bold text-success">{stats.completed}</p>
          </motion.div>
        </div>
      )}

      {/* Status Filter */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl sm:rounded-2xl p-1 shadow-sm border border-gray-100">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide relative">
            {[
              { id: 'all', label: 'All' },
              { id: 'pending', label: 'Pending' },
              { id: 'in-progress', label: 'In Progress' },
              { id: 'completed', label: 'Completed' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`flex-1 min-w-[100px] py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all relative whitespace-nowrap ${
                  filterStatus === tab.id
                    ? 'text-white'
                    : 'text-text-light hover:bg-gray-50'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {filterStatus === tab.id && (
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
        </div>
      )}

      {/* Form View */}
      <AnimatePresence mode="wait">
        {(viewMode === 'add' || viewMode === 'edit') && (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-base sm:text-lg font-heading font-bold text-text-dark mb-4">
              {viewMode === 'add' ? 'Assign New Task' : 'Edit Task Assignment'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Trainer Selection */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Select Trainer *</label>
                <select
                  required
                  value={selectedTrainer}
                  onChange={(e) => setSelectedTrainer(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                >
                  <option value="">Select Trainer</option>
                  {trainers.map(trainer => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name} ({trainer.trainerId}) - {trainer.specialization}
                    </option>
                  ))}
                </select>
              </div>

              {/* Member Selection */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Select Member *</label>
                <select
                  required
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                >
                  <option value="">Select Member</option>
                  {members.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.memberId})
                    </option>
                  ))}
                </select>
              </div>

              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Task Title *</label>
                <input
                  type="text"
                  required
                  value={formData.taskTitle}
                  onChange={(e) => setFormData({ ...formData, taskTitle: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                  placeholder="e.g., Strength Training Program"
                />
              </div>

              {/* Task Description */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Task Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.taskDescription}
                  onChange={(e) => setFormData({ ...formData, taskDescription: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                  placeholder="Describe the task in detail..."
                />
              </div>

              {/* Priority and Due Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Priority *</label>
                  <select
                    required
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Additional Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                  placeholder="Any additional notes or instructions..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <motion.button
                  type="submit"
                  className="flex-1 px-4 py-2.5 sm:py-3 text-white rounded-lg font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {viewMode === 'add' ? 'Assign Task' : 'Update Assignment'}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-gray-100 text-text-dark rounded-lg font-medium text-sm sm:text-base hover:bg-gray-200 transition-all"
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List View */}
      {viewMode === 'list' && (
        <AnimatePresence mode="wait">
          <motion.div
            key={filterStatus}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-heading font-bold text-text-dark">
                Task Assignments
              </h3>
              {selectedDate && (
                <p className="text-xs sm:text-sm text-text-light">
                  Showing assignments up to: {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>

            {filteredAssignments.length === 0 ? (
              <p className="text-text-light text-center py-8">No assignments found</p>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filteredAssignments.map((assignment, index) => {
                  const trainer = trainers.find(t => t.id === assignment.trainerId);
                  const member = members.find(m => m.id === assignment.memberId);
                  
                  return (
                    <motion.div
                      key={assignment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                        <div className="flex-1">
                          {/* Trainer and Member Info */}
                          <div className="flex items-center gap-3 mb-3">
                            {trainer && (
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-primary-blue/20 flex-shrink-0">
                                  <img
                                    src={trainer.image}
                                    alt={trainer.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = 'https://via.placeholder.com/200x200?text=Trainer';
                                    }}
                                  />
                                </div>
                                <div>
                                  <p className="text-xs text-text-light">Trainer</p>
                                  <p className="text-sm font-semibold text-text-dark">{trainer.name}</p>
                                </div>
                              </div>
                            )}
                            <div className="text-text-light">→</div>
                            {member && (
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-primary-blue/20 flex-shrink-0">
                                  <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = 'https://via.placeholder.com/200x200?text=Member';
                                    }}
                                  />
                                </div>
                                <div>
                                  <p className="text-xs text-text-light">Member</p>
                                  <p className="text-sm font-semibold text-text-dark">{member.name}</p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Task Details */}
                          <h5 className="text-base sm:text-lg font-heading font-bold text-text-dark mb-2">
                            {assignment.taskTitle}
                          </h5>
                          <p className="text-xs sm:text-sm text-text-light mb-3">
                            {assignment.taskDescription}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(assignment.priority)}`}>
                              {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)} Priority
                            </span>
                            <span className="text-text-light">
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </span>
                            <span className="text-text-light">
                              Created: {new Date(assignment.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {/* Status Dropdown */}
                          <select
                            value={assignment.status}
                            onChange={(e) => handleStatusUpdate(assignment.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all ${getStatusBadge(assignment.status)} border-transparent focus:outline-none focus:ring-2 focus:ring-primary-blue/30`}
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                          <div className="flex gap-2">
                            <motion.button
                              onClick={() => handleEdit(assignment)}
                              className="px-3 py-1.5 bg-primary-blue/10 text-primary-blue rounded-lg text-xs font-medium hover:bg-primary-blue/20 transition-colors"
                              whileTap={{ scale: 0.95 }}
                            >
                              Edit
                            </motion.button>
                            <motion.button
                              onClick={() => handleDelete(assignment.id)}
                              className="px-3 py-1.5 bg-danger/10 text-danger rounded-lg text-xs font-medium hover:bg-danger/20 transition-colors"
                              whileTap={{ scale: 0.95 }}
                            >
                              Delete
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {assignment.notes && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs sm:text-sm text-text-dark">
                            <span className="font-medium">Notes:</span> {assignment.notes}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default AdminTrainerAssignment;

