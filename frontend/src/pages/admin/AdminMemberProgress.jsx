import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const AdminMemberProgress = () => {
  const [selectedMember, setSelectedMember] = useState('');
  const [viewMode, setViewMode] = useState('view'); // 'view', 'add', 'edit'
  const [editingProgress, setEditingProgress] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock members data
  const members = [
    { id: '1', name: 'Rahul Sharma', memberId: 'M001', email: 'rahul@example.com', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { id: '2', name: 'Priya Patel', memberId: 'M002', email: 'priya@example.com', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { id: '3', name: 'Amit Kumar', memberId: 'M003', email: 'amit@example.com', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
    { id: '4', name: 'Sneha Singh', memberId: 'M004', email: 'sneha@example.com', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { id: '5', name: 'Vikram Mehta', memberId: 'M005', email: 'vikram@example.com', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
  ];

  // Mock progress data
  const [progressData, setProgressData] = useState([
    {
      id: 'P001',
      memberId: '1',
      date: '2024-01-15',
      weight: 75.5,
      bodyFat: 18.5,
      muscleMass: 58.2,
      workoutCompleted: true,
      workoutDuration: 45,
      notes: 'Great session today, focused on upper body strength',
      photos: [],
    },
    {
      id: 'P002',
      memberId: '1',
      date: '2024-01-14',
      weight: 76.0,
      bodyFat: 19.0,
      muscleMass: 57.8,
      workoutCompleted: true,
      workoutDuration: 60,
      notes: 'Cardio day completed',
      photos: [],
    },
    {
      id: 'P003',
      memberId: '2',
      date: '2024-01-15',
      weight: 62.3,
      bodyFat: 22.0,
      muscleMass: 45.5,
      workoutCompleted: true,
      workoutDuration: 50,
      notes: 'Yoga session completed',
      photos: [],
    },
    {
      id: 'P004',
      memberId: '3',
      date: '2024-01-15',
      weight: 82.5,
      bodyFat: 15.5,
      muscleMass: 65.0,
      workoutCompleted: false,
      workoutDuration: 0,
      notes: 'Rest day',
      photos: [],
    },
  ]);

  // Form data for add/edit
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    bodyFat: '',
    muscleMass: '',
    workoutCompleted: false,
    workoutDuration: '',
    notes: '',
    photos: [],
  });

  // Filter progress based on selected member and search
  const filteredProgress = progressData.filter(progress => {
    const member = members.find(m => m.id === progress.memberId);
    const matchesMember = !selectedMember || progress.memberId === selectedMember;
    const matchesSearch = !searchQuery || 
      (member && member.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      progress.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMember && matchesSearch;
  });

  // Get member name by ID
  const getMemberName = (memberId) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : 'Unknown';
  };

  // Get member data by ID
  const getMemberData = (memberId) => {
    return members.find(m => m.id === memberId);
  };

  // Handle add progress
  const handleAdd = () => {
    if (!selectedMember) {
      alert('Please select a member first');
      return;
    }
    setViewMode('add');
    setFormData({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      bodyFat: '',
      muscleMass: '',
      workoutCompleted: false,
      workoutDuration: '',
      notes: '',
      photos: [],
    });
  };

  // Handle edit progress
  const handleEdit = (progress) => {
    setEditingProgress(progress);
    setViewMode('edit');
    setFormData({
      date: progress.date,
      weight: progress.weight,
      bodyFat: progress.bodyFat,
      muscleMass: progress.muscleMass,
      workoutCompleted: progress.workoutCompleted,
      workoutDuration: progress.workoutDuration,
      notes: progress.notes,
      photos: progress.photos || [],
    });
  };

  // Handle delete progress
  const handleDelete = (progressId) => {
    if (window.confirm('Are you sure you want to delete this progress entry?')) {
      setProgressData(progressData.filter(p => p.id !== progressId));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (viewMode === 'add') {
      const newProgress = {
        id: `P${String(progressData.length + 1).padStart(3, '0')}`,
        memberId: selectedMember,
        ...formData,
        weight: parseFloat(formData.weight),
        bodyFat: parseFloat(formData.bodyFat),
        muscleMass: parseFloat(formData.muscleMass),
        workoutDuration: parseInt(formData.workoutDuration) || 0,
      };
      setProgressData([newProgress, ...progressData]);
    } else if (viewMode === 'edit') {
      setProgressData(progressData.map(p => 
        p.id === editingProgress.id 
          ? {
              ...p,
              ...formData,
              weight: parseFloat(formData.weight),
              bodyFat: parseFloat(formData.bodyFat),
              muscleMass: parseFloat(formData.muscleMass),
              workoutDuration: parseInt(formData.workoutDuration) || 0,
            }
          : p
      ));
    }
    handleCancel();
  };

  // Handle cancel
  const handleCancel = () => {
    setViewMode('view');
    setEditingProgress(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      bodyFat: '',
      muscleMass: '',
      workoutCompleted: false,
      workoutDuration: '',
      notes: '',
      photos: [],
    });
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-lg sm:text-xl font-heading font-bold text-text-dark">
          Member Progress Management
        </h2>
        {viewMode === 'view' && (
          <motion.button
            onClick={handleAdd}
            className="px-3 sm:px-4 py-2 text-white rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-2 w-full sm:w-auto shadow-md hover:shadow-lg transition-all"
            style={{
              background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Progress
          </motion.button>
        )}
      </div>

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
              {viewMode === 'add' ? 'Add New Progress' : 'Edit Progress'}
            </h3>
            {viewMode === 'add' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-dark mb-2">Select Member *</label>
                <select
                  required
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                >
                  <option value="">Select a member</option>
                  {members.map(member => (
                    <option key={member.id} value={member.id}>{member.name} ({member.memberId})</option>
                  ))}
                </select>
              </div>
            )}
            {viewMode === 'edit' && editingProgress && (
              <div className="mb-4 p-3 bg-primary-blue/10 rounded-lg">
                <p className="text-sm text-text-dark">
                  <span className="font-medium">Member:</span> {getMemberName(editingProgress.memberId)}
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Weight (kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                    placeholder="e.g., 75.5"
                  />
                </div>

                {/* Body Fat */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Body Fat (%) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.bodyFat}
                    onChange={(e) => setFormData({ ...formData, bodyFat: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                    placeholder="e.g., 18.5"
                  />
                </div>

                {/* Muscle Mass */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Muscle Mass (kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.muscleMass}
                    onChange={(e) => setFormData({ ...formData, muscleMass: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                    placeholder="e.g., 58.2"
                  />
                </div>

                {/* Workout Completed */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Workout Completed</label>
                  <div className="flex items-center gap-3 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.workoutCompleted}
                        onChange={(e) => setFormData({ ...formData, workoutCompleted: e.target.checked })}
                        className="w-4 h-4 text-primary-blue rounded focus:ring-2 focus:ring-primary-blue/30"
                      />
                      <span className="text-sm text-text-dark">Yes</span>
                    </label>
                  </div>
                </div>

                {/* Workout Duration */}
                {formData.workoutCompleted && (
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-2">Workout Duration (minutes)</label>
                    <input
                      type="number"
                      value={formData.workoutDuration}
                      onChange={(e) => setFormData({ ...formData, workoutDuration: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                      placeholder="e.g., 45"
                    />
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                  placeholder="Add any notes or observations..."
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
                  {viewMode === 'add' ? 'Add Progress' : 'Update Progress'}
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
      {viewMode === 'view' && (
        <>
          {/* Filters */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Member Filter */}
              <div className="flex-1">
                <label className="block text-xs sm:text-sm font-medium text-text-dark mb-2">Filter by Member</label>
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                >
                  <option value="">All Members</option>
                  {members.map(member => (
                    <option key={member.id} value={member.id}>{member.name} ({member.memberId})</option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div className="flex-1">
                <label className="block text-xs sm:text-sm font-medium text-text-dark mb-2">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by member name or notes..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
                  />
                  <svg
                    className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-text-light"
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
            </div>
          </div>

          {/* Progress List */}
          {filteredProgress.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center shadow-sm border border-gray-100"
            >
              <p className="text-text-light">No progress entries found</p>
            </motion.div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {filteredProgress.map((progress, index) => {
                const member = getMemberData(progress.memberId);
                return (
                  <motion.div
                    key={progress.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      {/* Member Info */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {member && (
                          <>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-primary-blue/20">
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
                              <h3 className="text-sm sm:text-base font-heading font-bold text-text-dark">
                                {member.name}
                              </h3>
                              <p className="text-xs text-text-light">ID: {member.memberId}</p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Progress Details */}
                      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div>
                          <p className="text-text-light mb-1">Date</p>
                          <p className="font-semibold text-text-dark">{new Date(progress.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-text-light mb-1">Weight</p>
                          <p className="font-semibold text-text-dark">{progress.weight} kg</p>
                        </div>
                        <div>
                          <p className="text-text-light mb-1">Body Fat</p>
                          <p className="font-semibold text-text-dark">{progress.bodyFat}%</p>
                        </div>
                        <div>
                          <p className="text-text-light mb-1">Muscle Mass</p>
                          <p className="font-semibold text-text-dark">{progress.muscleMass} kg</p>
                        </div>
                      </div>

                      {/* Workout Status */}
                      <div className="flex items-center gap-2">
                        {progress.workoutCompleted ? (
                          <span className="px-2 sm:px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                            Workout ✓
                          </span>
                        ) : (
                          <span className="px-2 sm:px-3 py-1 bg-gray-100 text-text-light rounded-full text-xs font-medium">
                            No Workout
                          </span>
                        )}
                        {progress.workoutDuration > 0 && (
                          <span className="text-xs text-text-light">{progress.workoutDuration} min</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleEdit(progress)}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-blue/10 text-primary-blue rounded-lg text-xs sm:text-sm font-medium hover:bg-primary-blue/20 transition-colors"
                          whileTap={{ scale: 0.95 }}
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(progress.id)}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-danger/10 text-danger rounded-lg text-xs sm:text-sm font-medium hover:bg-danger/20 transition-colors"
                          whileTap={{ scale: 0.95 }}
                        >
                          Delete
                        </motion.button>
                      </div>
                    </div>

                    {/* Notes */}
                    {progress.notes && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs sm:text-sm text-text-dark">
                          <span className="font-medium">Notes:</span> {progress.notes}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminMemberProgress;

