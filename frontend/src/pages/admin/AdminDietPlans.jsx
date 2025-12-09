import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const AdminDietPlans = () => {
  const [activeTab, setActiveTab] = useState('members'); // 'members', 'trainers'
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [editingPlan, setEditingPlan] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock members data
  const members = [
    { id: '1', name: 'Rahul Sharma', memberId: 'M001', email: 'rahul@example.com', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { id: '2', name: 'Priya Patel', memberId: 'M002', email: 'priya@example.com', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { id: '3', name: 'Amit Kumar', memberId: 'M003', email: 'amit@example.com', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
  ];

  // Mock trainers data
  const trainers = [
    { id: '1', name: 'Rajesh Kumar', trainerId: 'TR001', email: 'rajesh@yadavfitness.com', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80' },
    { id: '2', name: 'Priya Sharma', trainerId: 'TR002', email: 'priya@yadavfitness.com', image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&q=80' },
  ];

  // Mock diet plans - Members
  const [memberPlans, setMemberPlans] = useState([
    {
      id: 'DP001',
      memberId: '1',
      planName: 'Weight Loss Diet Plan',
      duration: '4 weeks',
      meals: [
        { id: 1, mealType: 'Breakfast', food: 'Oatmeal with fruits', calories: 350, time: '8:00 AM', notes: 'High fiber' },
        { id: 2, mealType: 'Lunch', food: 'Grilled chicken with vegetables', calories: 450, time: '1:00 PM', notes: 'Lean protein' },
        { id: 3, mealType: 'Dinner', food: 'Salad with fish', calories: 400, time: '7:00 PM', notes: 'Light meal' },
      ],
      createdAt: '2024-01-10',
      status: 'active',
    },
    {
      id: 'DP002',
      memberId: '2',
      planName: 'Muscle Gain Diet Plan',
      duration: '6 weeks',
      meals: [
        { id: 1, mealType: 'Breakfast', food: 'Protein shake with banana', calories: 500, time: '7:00 AM', notes: 'Post workout' },
        { id: 2, mealType: 'Lunch', food: 'Brown rice with chicken', calories: 600, time: '12:30 PM', notes: 'High protein' },
      ],
      createdAt: '2024-01-12',
      status: 'active',
    },
  ]);

  // Mock diet plans - Trainers
  const [trainerPlans, setTrainerPlans] = useState([
    {
      id: 'DTP001',
      trainerId: '1',
      planName: 'Professional Trainer Diet',
      duration: '8 weeks',
      meals: [
        { id: 1, mealType: 'Breakfast', food: 'Egg whites with whole grain toast', calories: 400, time: '6:00 AM', notes: 'Pre workout' },
        { id: 2, mealType: 'Lunch', food: 'Quinoa salad with salmon', calories: 550, time: '1:00 PM', notes: 'Balanced meal' },
      ],
      createdAt: '2024-01-08',
      status: 'active',
    },
  ]);

  // Form data
  const [formData, setFormData] = useState({
    planName: '',
    duration: '',
    meals: [{ id: 1, mealType: 'Breakfast', food: '', calories: 0, time: '8:00 AM', notes: '' }],
  });

  // Get plans based on active tab and date filter
  const getPlans = () => {
    const allPlans = activeTab === 'members' ? memberPlans : trainerPlans;
    // Filter by date if selected
    if (selectedDate) {
      return allPlans.filter(plan => {
        // Filter plans created on or before selected date
        return plan.createdAt <= selectedDate;
      });
    }
    return allPlans;
  };

  const plans = getPlans();

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
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get person name by ID
  const getPersonName = (personId) => {
    const person = activeTab === 'members'
      ? members.find(m => m.id === personId)
      : trainers.find(t => t.id === personId);
    return person ? person.name : 'Unknown';
  };

  // Handle add
  const handleAdd = () => {
    setViewMode('add');
    setEditingPlan(null);
    setFormData({
      planName: '',
      duration: '',
      meals: [{ id: 1, mealType: 'Breakfast', food: '', calories: 0, time: '8:00 AM', notes: '' }],
    });
    setSelectedPerson('');
  };

  // Handle edit
  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setViewMode('edit');
    setFormData({
      planName: plan.planName,
      duration: plan.duration,
      meals: plan.meals,
    });
    setSelectedPerson(plan.memberId || plan.trainerId);
  };

  // Handle delete
  const handleDelete = (planId) => {
    if (window.confirm('Are you sure you want to delete this diet plan?')) {
      if (activeTab === 'members') {
        setMemberPlans(memberPlans.filter(p => p.id !== planId));
      } else {
        setTrainerPlans(trainerPlans.filter(p => p.id !== planId));
      }
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPerson) {
      alert('Please select a person');
      return;
    }

    if (viewMode === 'add') {
      const newPlan = {
        id: activeTab === 'members' 
          ? `DP${String(memberPlans.length + 1).padStart(3, '0')}`
          : `DTP${String(trainerPlans.length + 1).padStart(3, '0')}`,
        [activeTab === 'members' ? 'memberId' : 'trainerId']: selectedPerson,
        planName: formData.planName,
        duration: formData.duration,
        meals: formData.meals.filter(meal => meal.food.trim() !== ''),
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active',
      };

      if (activeTab === 'members') {
        setMemberPlans([...memberPlans, newPlan]);
      } else {
        setTrainerPlans([...trainerPlans, newPlan]);
      }
    } else if (viewMode === 'edit') {
      const updatedPlan = {
        ...editingPlan,
        planName: formData.planName,
        duration: formData.duration,
        meals: formData.meals.filter(meal => meal.food.trim() !== ''),
      };

      if (activeTab === 'members') {
        setMemberPlans(memberPlans.map(p => p.id === editingPlan.id ? updatedPlan : p));
      } else {
        setTrainerPlans(trainerPlans.map(p => p.id === editingPlan.id ? updatedPlan : p));
      }
    }

    handleCancel();
  };

  // Handle cancel
  const handleCancel = () => {
    setViewMode('list');
    setEditingPlan(null);
    setFormData({
      planName: '',
      duration: '',
      meals: [{ id: 1, mealType: 'Breakfast', food: '', calories: 0, time: '8:00 AM', notes: '' }],
    });
    setSelectedPerson('');
  };

  // Add meal
  const addMeal = () => {
    const newId = Math.max(...formData.meals.map(m => m.id), 0) + 1;
    setFormData({
      ...formData,
      meals: [...formData.meals, { id: newId, mealType: 'Breakfast', food: '', calories: 0, time: '8:00 AM', notes: '' }],
    });
  };

  // Remove meal
  const removeMeal = (mealId) => {
    if (formData.meals.length > 1) {
      setFormData({
        ...formData,
        meals: formData.meals.filter(m => m.id !== mealId),
      });
    }
  };

  // Update meal
  const updateMeal = (mealId, field, value) => {
    setFormData({
      ...formData,
      meals: formData.meals.map(m =>
        m.id === mealId ? { ...m, [field]: value } : m
      ),
    });
  };

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Pre-Workout', 'Post-Workout'];

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-lg sm:text-xl font-heading font-bold text-text-dark">
          Diet Plans Management
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

              {/* Add Plan Button */}
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
                Add Plan
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      {viewMode === 'list' && (
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
              {viewMode === 'add' ? 'Add New Diet Plan' : 'Edit Diet Plan'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Person Selection */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                  Select {activeTab === 'members' ? 'Member' : 'Trainer'} *
                </label>
                <select
                  required
                  value={selectedPerson}
                  onChange={(e) => setSelectedPerson(e.target.value)}
                  disabled={viewMode === 'edit'}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                >
                  <option value="">Select {activeTab === 'members' ? 'Member' : 'Trainer'}</option>
                  {(activeTab === 'members' ? members : trainers).map(person => (
                    <option key={person.id} value={person.id}>
                      {person.name} ({activeTab === 'members' ? person.memberId : person.trainerId})
                    </option>
                  ))}
                </select>
              </div>

              {/* Plan Name */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Plan Name *</label>
                <input
                  type="text"
                  required
                  value={formData.planName}
                  onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                  placeholder="e.g., Weight Loss Diet Plan"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Duration *</label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                  placeholder="e.g., 4 weeks"
                />
              </div>

              {/* Meals */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-text-dark">Meals *</label>
                  <motion.button
                    type="button"
                    onClick={addMeal}
                    className="px-3 py-1.5 bg-primary-blue/10 text-primary-blue rounded-lg text-xs font-medium hover:bg-primary-blue/20 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    + Add Meal
                  </motion.button>
                </div>
                <div className="space-y-3">
                  {formData.meals.map((meal, index) => (
                    <div key={meal.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-text-dark">Meal {index + 1}</span>
                        {formData.meals.length > 1 && (
                          <motion.button
                            type="button"
                            onClick={() => removeMeal(meal.id)}
                            className="text-danger text-xs hover:text-danger/80"
                            whileTap={{ scale: 0.95 }}
                          >
                            Remove
                          </motion.button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-text-dark mb-1">Meal Type *</label>
                          <select
                            required
                            value={meal.mealType}
                            onChange={(e) => updateMeal(meal.id, 'mealType', e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30"
                          >
                            {mealTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-text-dark mb-1">Food Items *</label>
                          <input
                            type="text"
                            required
                            value={meal.food}
                            onChange={(e) => updateMeal(meal.id, 'food', e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30"
                            placeholder="e.g., Oatmeal with fruits"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-text-dark mb-1">Calories *</label>
                          <input
                            type="number"
                            required
                            min="0"
                            value={meal.calories}
                            onChange={(e) => updateMeal(meal.id, 'calories', parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30"
                            placeholder="e.g., 350"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-text-dark mb-1">Time *</label>
                          <input
                            type="time"
                            required
                            value={meal.time}
                            onChange={(e) => updateMeal(meal.id, 'time', e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-text-dark mb-1">Notes</label>
                          <input
                            type="text"
                            value={meal.notes}
                            onChange={(e) => updateMeal(meal.id, 'notes', e.target.value)}
                            className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30"
                            placeholder="Additional notes..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                  {viewMode === 'add' ? 'Add Plan' : 'Update Plan'}
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
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-heading font-bold text-text-dark">
                {activeTab === 'members' ? 'Members' : 'Trainers'} Diet Plans
              </h3>
              {selectedDate && (
                <p className="text-xs sm:text-sm text-text-light">
                  Showing plans up to: {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              )}
            </div>

            {plans.length === 0 ? (
              <p className="text-text-light text-center py-8">No diet plans found</p>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {plans.map((plan, index) => {
                  const person = activeTab === 'members'
                    ? members.find(m => m.id === plan.memberId)
                    : trainers.find(t => t.id === plan.trainerId);
                  
                  const totalCalories = plan.meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
                  
                  return (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {person && (
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
                            )}
                            <div>
                              <h4 className="text-sm sm:text-base font-heading font-bold text-text-dark">
                                {person?.name || 'Unknown'}
                              </h4>
                              <p className="text-xs text-text-light">
                                {activeTab === 'members' ? person?.memberId : person?.trainerId}
                              </p>
                            </div>
                          </div>
                          <h5 className="text-base sm:text-lg font-heading font-bold text-text-dark mb-1">
                            {plan.planName}
                          </h5>
                          <div className="flex items-center gap-4 text-xs sm:text-sm text-text-light">
                            <span>Duration: {plan.duration}</span>
                            <span>Created: {new Date(plan.createdAt).toLocaleDateString()}</span>
                            <span>Total Calories: {totalCalories} kcal</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              plan.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-100 text-text-light'
                            }`}>
                              {plan.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => handleEdit(plan)}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-blue/10 text-primary-blue rounded-lg text-xs sm:text-sm font-medium hover:bg-primary-blue/20 transition-colors"
                            whileTap={{ scale: 0.95 }}
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(plan.id)}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-danger/10 text-danger rounded-lg text-xs sm:text-sm font-medium hover:bg-danger/20 transition-colors"
                            whileTap={{ scale: 0.95 }}
                          >
                            Delete
                          </motion.button>
                        </div>
                      </div>

                      {/* Meals List */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <h6 className="text-xs sm:text-sm font-semibold text-text-dark mb-2">Meals:</h6>
                        <div className="space-y-2">
                          {plan.meals.map((meal, mealIndex) => (
                            <div key={mealIndex} className="flex items-center justify-between text-xs sm:text-sm bg-white p-2 rounded border border-gray-100">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-text-dark">{meal.mealType}</span>
                                  <span className="text-text-dark">- {meal.food}</span>
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-text-light">
                                  <span>{meal.calories} kcal</span>
                                  <span>•</span>
                                  <span>{meal.time}</span>
                                  {meal.notes && (
                                    <>
                                      <span>•</span>
                                      <span>{meal.notes}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
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

export default AdminDietPlans;

