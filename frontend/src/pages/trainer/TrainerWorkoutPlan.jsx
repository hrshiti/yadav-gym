import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrainerWorkoutPlan = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('workout'); // 'workout' or 'diet'
  const [selectedMember, setSelectedMember] = useState('');
  const [planName, setPlanName] = useState('');
  const [planDescription, setPlanDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock members data
  const members = [
    { id: '1', name: 'Rahul Sharma', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { id: '2', name: 'Priya Patel', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { id: '3', name: 'Amit Kumar', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
    { id: '4', name: 'Sneha Singh', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { id: '5', name: 'Vikram Mehta', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
  ];

  // Workout exercises
  const [workoutExercises, setWorkoutExercises] = useState([
    {
      id: 1,
      name: 'Push-ups',
      sets: 3,
      reps: 15,
      rest: '30s',
      notes: 'Focus on form',
    },
  ]);

  // Diet meals
  const [dietMeals, setDietMeals] = useState([
    {
      id: 1,
      meal: 'Breakfast',
      food: 'Oatmeal with fruits',
      calories: 350,
      time: '8:00 AM',
    },
  ]);

  const selectedMemberData = members.find(m => m.id === selectedMember);

  // Add new exercise
  const addWorkoutExercise = () => {
    const newExercise = {
      id: workoutExercises.length + 1,
      name: '',
      sets: 3,
      reps: 10,
      rest: '30s',
      notes: '',
    };
    setWorkoutExercises([...workoutExercises, newExercise]);
  };

  // Add new meal
  const addDietMeal = () => {
    const newMeal = {
      id: dietMeals.length + 1,
      meal: 'Meal',
      food: '',
      calories: 0,
      time: '12:00 PM',
    };
    setDietMeals([...dietMeals, newMeal]);
  };

  // Remove exercise/meal
  const removeItem = (id, type) => {
    if (type === 'workout') {
      setWorkoutExercises(workoutExercises.filter(ex => ex.id !== id));
    } else {
      setDietMeals(dietMeals.filter(meal => meal.id !== id));
    }
  };

  // Update exercise
  const updateExercise = (id, field, value) => {
    setWorkoutExercises(workoutExercises.map(ex =>
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  // Update meal
  const updateMeal = (id, field, value) => {
    setDietMeals(dietMeals.map(meal =>
      meal.id === id ? { ...meal, [field]: value } : meal
    ));
  };

  // Move exercise up/down
  const moveExercise = (index, direction) => {
    const newExercises = [...workoutExercises];
    if (direction === 'up' && index > 0) {
      [newExercises[index - 1], newExercises[index]] = [newExercises[index], newExercises[index - 1]];
      setWorkoutExercises(newExercises);
    } else if (direction === 'down' && index < newExercises.length - 1) {
      [newExercises[index], newExercises[index + 1]] = [newExercises[index + 1], newExercises[index]];
      setWorkoutExercises(newExercises);
    }
  };

  // Move meal up/down
  const moveMeal = (index, direction) => {
    const newMeals = [...dietMeals];
    if (direction === 'up' && index > 0) {
      [newMeals[index - 1], newMeals[index]] = [newMeals[index], newMeals[index - 1]];
      setDietMeals(newMeals);
    } else if (direction === 'down' && index < newMeals.length - 1) {
      [newMeals[index], newMeals[index + 1]] = [newMeals[index + 1], newMeals[index]];
      setDietMeals(newMeals);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember) {
      alert('Please select a member');
      return;
    }
    if (activeTab === 'workout' && workoutExercises.length === 0) {
      alert('Please add at least one exercise');
      return;
    }
    if (activeTab === 'diet' && dietMeals.length === 0) {
      alert('Please add at least one meal');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`${activeTab === 'workout' ? 'Workout' : 'Diet'} plan saved successfully!`);
      // Reset form
      setPlanName('');
      setPlanDescription('');
      if (activeTab === 'workout') {
        setWorkoutExercises([{
          id: 1,
          name: '',
          sets: 3,
          reps: 10,
          rest: '30s',
          notes: '',
        }]);
      } else {
        setDietMeals([{
          id: 1,
          meal: 'Meal',
          food: '',
          calories: 0,
          time: '12:00 PM',
        }]);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background-main pb-24">
      {/* Header Section */}
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
            Create Plan
          </h2>

          <div className="w-10" />
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
          <motion.button
            type="button"
            onClick={() => setActiveTab('workout')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'workout'
                ? 'bg-white text-primary-blue shadow-sm'
                : 'text-text-light'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            Workout Plan
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setActiveTab('diet')}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'diet'
                ? 'bg-white text-primary-blue shadow-sm'
                : 'text-text-light'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            Diet Plan
          </motion.button>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="px-4 mt-6">
        <div className="space-y-6">
          {/* Member Selection */}
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
          </motion.div>

          {/* Plan Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-text-dark mb-2">
              Plan Name
            </label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder={`Enter ${activeTab === 'workout' ? 'workout' : 'diet'} plan name...`}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
              required
            />
          </motion.div>

          {/* Plan Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-text-dark mb-2">
              Description
            </label>
            <textarea
              value={planDescription}
              onChange={(e) => setPlanDescription(e.target.value)}
              placeholder="Add plan description..."
              rows={3}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all resize-none"
            />
          </motion.div>

          {/* Workout Plan Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'workout' ? (
              <motion.div
                key="workout"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-heading font-semibold text-text-dark">
                    Exercises
                  </h3>
                  <motion.button
                    type="button"
                    onClick={addWorkoutExercise}
                    className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
                      color: '#FFFFFF'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFFFFF' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span style={{ color: '#FFFFFF' }}>Add Exercise</span>
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {workoutExercises.map((exercise, index) => (
                    <motion.div
                      key={exercise.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-start gap-3">
                        {/* Drag Handle / Reorder Buttons */}
                        <div className="flex flex-col gap-1 pt-1">
                          <motion.button
                            type="button"
                            onClick={() => moveExercise(index, 'up')}
                            disabled={index === 0}
                            className={`p-1 rounded ${index === 0 ? 'opacity-30' : 'hover:bg-gray-100'}`}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-4 h-4 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </motion.button>
                          <motion.button
                            type="button"
                            onClick={() => moveExercise(index, 'down')}
                            disabled={index === workoutExercises.length - 1}
                            className={`p-1 rounded ${index === workoutExercises.length - 1 ? 'opacity-30' : 'hover:bg-gray-100'}`}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-4 h-4 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.button>
                        </div>

                        {/* Exercise Form */}
                        <div className="flex-1 space-y-3">
                          <input
                            type="text"
                            value={exercise.name}
                            onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                            placeholder="Exercise name (e.g., Push-ups)"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue text-sm"
                            required
                          />
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="text-xs text-text-light mb-1 block">Sets</label>
                              <input
                                type="number"
                                value={exercise.sets}
                                onChange={(e) => updateExercise(exercise.id, 'sets', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 text-sm"
                                min="1"
                                required
                              />
                            </div>
                            <div>
                              <label className="text-xs text-text-light mb-1 block">Reps</label>
                              <input
                                type="number"
                                value={exercise.reps}
                                onChange={(e) => updateExercise(exercise.id, 'reps', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 text-sm"
                                min="1"
                                required
                              />
                            </div>
                            <div>
                              <label className="text-xs text-text-light mb-1 block">Rest</label>
                              <input
                                type="text"
                                value={exercise.rest}
                                onChange={(e) => updateExercise(exercise.id, 'rest', e.target.value)}
                                placeholder="30s"
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 text-sm"
                                required
                              />
                            </div>
                          </div>
                          <input
                            type="text"
                            value={exercise.notes}
                            onChange={(e) => updateExercise(exercise.id, 'notes', e.target.value)}
                            placeholder="Notes (optional)"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 text-sm"
                          />
                        </div>

                        {/* Remove Button */}
                        {workoutExercises.length > 1 && (
                          <motion.button
                            type="button"
                            onClick={() => removeItem(exercise.id, 'workout')}
                            className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors"
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="diet"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-heading font-semibold text-text-dark">
                    Meals
                  </h3>
                  <motion.button
                    type="button"
                    onClick={addDietMeal}
                    className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
                      color: '#FFFFFF'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFFFFF' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span style={{ color: '#FFFFFF' }}>Add Meal</span>
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {dietMeals.map((meal, index) => (
                    <motion.div
                      key={meal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                      <div className="flex items-start gap-3">
                        {/* Drag Handle / Reorder Buttons */}
                        <div className="flex flex-col gap-1 pt-1">
                          <motion.button
                            type="button"
                            onClick={() => moveMeal(index, 'up')}
                            disabled={index === 0}
                            className={`p-1 rounded ${index === 0 ? 'opacity-30' : 'hover:bg-gray-100'}`}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-4 h-4 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </motion.button>
                          <motion.button
                            type="button"
                            onClick={() => moveMeal(index, 'down')}
                            disabled={index === dietMeals.length - 1}
                            className={`p-1 rounded ${index === dietMeals.length - 1 ? 'opacity-30' : 'hover:bg-gray-100'}`}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-4 h-4 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.button>
                        </div>

                        {/* Meal Form */}
                        <div className="flex-1 space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs text-text-light mb-1 block">Meal Type</label>
                              <input
                                type="text"
                                value={meal.meal}
                                onChange={(e) => updateMeal(meal.id, 'meal', e.target.value)}
                                placeholder="Breakfast"
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label className="text-xs text-text-light mb-1 block">Time</label>
                              <input
                                type="text"
                                value={meal.time}
                                onChange={(e) => updateMeal(meal.id, 'time', e.target.value)}
                                placeholder="8:00 AM"
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 text-sm"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-text-light mb-1 block">Food Items</label>
                            <input
                              type="text"
                              value={meal.food}
                              onChange={(e) => updateMeal(meal.id, 'food', e.target.value)}
                              placeholder="Oatmeal with fruits and nuts"
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 text-sm"
                              required
                            />
                          </div>
                          <div>
                            <label className="text-xs text-text-light mb-1 block">Calories</label>
                            <input
                              type="number"
                              value={meal.calories}
                              onChange={(e) => updateMeal(meal.id, 'calories', parseInt(e.target.value) || 0)}
                              placeholder="350"
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 text-sm"
                              min="0"
                              required
                            />
                          </div>
                        </div>

                        {/* Remove Button */}
                        {dietMeals.length > 1 && (
                          <motion.button
                            type="button"
                            onClick={() => removeItem(meal.id, 'diet')}
                            className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors"
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!selectedMember || isSubmitting}
            className={`w-full py-4 rounded-xl font-heading font-semibold transition-all mb-6 ${
              selectedMember && !isSubmitting
                ? 'bg-gradient-primary shadow-lg hover:shadow-xl hover:shadow-primary-blue/50 text-white'
                : 'bg-gray-300 cursor-not-allowed text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileTap={selectedMember && !isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  className={`w-5 h-5 border-2 border-t-transparent rounded-full ${
                    selectedMember && !isSubmitting ? 'border-white' : 'border-gray-600'
                  }`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Saving...</span>
              </div>
            ) : (
              `Save ${activeTab === 'workout' ? 'Workout' : 'Diet'} Plan`
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default TrainerWorkoutPlan;
