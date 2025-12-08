import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TrainerProgress = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [selectedMember, setSelectedMember] = useState('');
  const [workoutDone, setWorkoutDone] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Member's Today's Tasks/Goals (will be fetched based on selected member)
  const [memberTasks, setMemberTasks] = useState([
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

  // Mock members data
  const members = [
    { id: '1', name: 'Rahul Sharma', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { id: '2', name: 'Priya Patel', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { id: '3', name: 'Amit Kumar', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
    { id: '4', name: 'Sneha Singh', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { id: '5', name: 'Vikram Mehta', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
  ];

  const selectedMemberData = members.find(m => m.id === selectedMember);

  const toggleTask = (id) => {
    setMemberTasks(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed, progress: task.completed ? task.progress : 100 }
          : task
      )
    );
  };

  const updateTaskProgress = (id, newProgress) => {
    setMemberTasks(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, progress: Math.max(0, Math.min(100, newProgress)), completed: newProgress === 100 }
          : task
      )
    );
  };

  const getTaskIcon = (iconType) => {
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

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setUploadedPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember) {
      alert('Please select a member');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Progress saved successfully!');
      // Reset form
      setSelectedMember('');
      setWorkoutDone(false);
      setUploadedPhoto(null);
      setNotes('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1500);
  };

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

          {/* Title */}
          <h2 className="text-lg font-heading font-bold text-text-dark">
            Add Daily Progress
          </h2>

          {/* Placeholder for alignment */}
          <div className="w-10" />
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="px-4 mt-6">
        <div className="space-y-6">
          {/* Member Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-text-dark mb-2">
              Select Member
            </label>
            <div className="relative">
              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all appearance-none"
                required
              >
                <option value="">Choose a member...</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* Selected Member Preview */}
            <AnimatePresence>
              {selectedMemberData && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 flex items-center gap-3 p-3 bg-primary-blue/5 rounded-xl"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary-blue/20 flex-shrink-0">
                    <img
                      src={selectedMemberData.image}
                      alt={selectedMemberData.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100?text=Member';
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-dark">{selectedMemberData.name}</p>
                    <p className="text-xs text-text-light">Member ID: {selectedMemberData.id}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Workout Done Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-heading font-semibold text-text-dark mb-1">
                  Workout Done?
                </h3>
                <p className="text-xs text-text-light">
                  Mark if the member completed today's workout
                </p>
              </div>
              
              {/* Toggle Switch */}
              <motion.button
                type="button"
                onClick={() => setWorkoutDone(!workoutDone)}
                className={`relative w-14 h-8 rounded-full flex items-center transition-colors ${
                  workoutDone ? 'bg-gradient-primary' : 'bg-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full shadow-lg"
                  animate={{
                    x: workoutDone ? 28 : 4,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              </motion.button>
            </div>
            
            {/* Workout Status Indicator */}
            <AnimatePresence>
              {workoutDone && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 flex items-center gap-2 p-3 bg-success/10 rounded-lg"
                >
                  <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-success">Workout completed successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Photo Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <label className="block text-sm font-medium text-text-dark mb-3">
              Upload Photo
            </label>
            
            {!uploadedPhoto ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary-blue hover:bg-primary-blue/5 transition-all"
              >
                <svg className="w-12 h-12 mx-auto text-text-light mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium text-text-dark mb-1">Tap to upload photo</p>
                <p className="text-xs text-text-light">PNG, JPG up to 5MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={uploadedPhoto}
                    alt="Uploaded"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-text-light mt-2 text-center">Photo uploaded successfully</p>
              </motion.div>
            )}
          </motion.div>

          {/* Member's Today's Tasks Section - Only show when member is selected */}
          <AnimatePresence>
            {selectedMember && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <h3 className="text-base font-heading font-semibold text-text-dark mb-4">
                  Today's Tasks
                </h3>
                
                <div className="space-y-3">
                  {memberTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      className="bg-gray-50 rounded-xl p-3 border border-gray-100"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ scale: 1.01, y: -2 }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Checkbox */}
                        <motion.button
                          type="button"
                          onClick={() => toggleTask(task.id)}
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            task.completed
                              ? 'bg-gradient-primary border-primary-blue'
                              : 'border-gray-300 bg-white'
                          }`}
                          whileTap={{ scale: 0.9 }}
                        >
                          {task.completed && (
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

                        {/* Task Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-heading font-semibold leading-tight ${
                            task.completed ? 'text-text-light line-through' : 'text-text-dark'
                          }`}>
                            {task.title}
                          </h4>
                          <p className="text-xs text-text-light mt-0.5 leading-tight">{task.description}</p>
                        </div>

                        {/* Progress/Status */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {/* Interactive Progress Bar */}
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer relative"
                              onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const percentage = Math.round((x / rect.width) * 100);
                                updateTaskProgress(task.id, percentage);
                              }}
                              title="Click to update progress"
                            >
                              <motion.div
                                className={`h-full rounded-full ${
                                  task.progress === 100
                                    ? 'bg-success'
                                    : task.progress >= 75
                                    ? 'bg-primary-blue'
                                    : task.progress >= 50
                                    ? 'bg-warning'
                                    : task.progress >= 25
                                    ? 'bg-orange-500'
                                    : 'bg-danger'
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${task.progress}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                            <span className="text-xs font-medium text-text-light w-8 text-right">
                              {task.progress}%
                            </span>
                          </div>
                          {/* Icon */}
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            task.completed ? 'bg-success/20 text-success' : task.iconBg + ' text-primary-blue'
                          }`}>
                            {getTaskIcon(task.iconType)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notes Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-text-dark mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about today's progress, observations, or feedback..."
              rows={5}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all resize-none"
            />
            <p className="text-xs text-text-light mt-2">
              {notes.length}/500 characters
            </p>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!selectedMember || isSubmitting}
            className={`w-full py-4 rounded-xl font-heading font-semibold text-white transition-all ${
              selectedMember && !isSubmitting
                ? 'bg-gradient-primary shadow-lg hover:shadow-xl hover:shadow-primary-blue/50'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileTap={selectedMember && !isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Saving...</span>
              </div>
            ) : (
              'Save Progress'
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default TrainerProgress;
