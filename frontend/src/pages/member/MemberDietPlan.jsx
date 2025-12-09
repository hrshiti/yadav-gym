import { motion } from 'framer-motion';
import { useState } from 'react';

const MemberDietPlan = () => {
  // Mock diet plan data - This would come from admin/trainer assigned plans
  const [dietPlans] = useState([
    {
      id: 'DP001',
      planName: 'Weight Loss Diet Plan',
      duration: '4 weeks',
      assignedBy: 'Rajesh Kumar',
      assignedByType: 'Trainer',
      createdAt: '2024-01-10',
      status: 'active',
      meals: [
        {
          id: 1,
          mealType: 'Breakfast',
          food: 'Oatmeal with fruits and nuts',
          calories: 350,
          time: '8:00 AM',
          notes: 'High fiber, include berries',
        },
        {
          id: 2,
          mealType: 'Lunch',
          food: 'Grilled chicken with vegetables and brown rice',
          calories: 450,
          time: '1:00 PM',
          notes: 'Lean protein, steamed vegetables',
        },
        {
          id: 3,
          mealType: 'Snack',
          food: 'Greek yogurt with almonds',
          calories: 200,
          time: '4:00 PM',
          notes: 'Protein-rich snack',
        },
        {
          id: 4,
          mealType: 'Dinner',
          food: 'Salad with grilled fish',
          calories: 400,
          time: '7:00 PM',
          notes: 'Light meal, avoid heavy carbs',
        },
      ],
      totalCalories: 1400,
    },
    {
      id: 'DP002',
      planName: 'Muscle Gain Diet Plan',
      duration: '6 weeks',
      assignedBy: 'Priya Sharma',
      assignedByType: 'Admin',
      createdAt: '2024-01-12',
      status: 'active',
      meals: [
        {
          id: 1,
          mealType: 'Breakfast',
          food: 'Protein shake with banana and peanut butter',
          calories: 500,
          time: '7:00 AM',
          notes: 'Post workout meal',
        },
        {
          id: 2,
          mealType: 'Lunch',
          food: 'Brown rice with chicken and mixed vegetables',
          calories: 600,
          time: '12:30 PM',
          notes: 'High protein, complex carbs',
        },
        {
          id: 3,
          mealType: 'Snack',
          food: 'Protein bar and fruits',
          calories: 250,
          time: '3:30 PM',
          notes: 'Pre-workout snack',
        },
        {
          id: 4,
          mealType: 'Dinner',
          food: 'Salmon with sweet potato and broccoli',
          calories: 550,
          time: '7:30 PM',
          notes: 'Omega-3 rich meal',
        },
        {
          id: 5,
          mealType: 'Post-Workout',
          food: 'Whey protein with milk',
          calories: 300,
          time: '9:00 PM',
          notes: 'Within 30 mins of workout',
        },
      ],
      totalCalories: 2200,
    },
  ]);

  const [selectedPlan, setSelectedPlan] = useState(dietPlans[0]?.id || null);

  const currentPlan = dietPlans.find(plan => plan.id === selectedPlan) || dietPlans[0];

  const getMealIcon = (mealType) => {
    switch (mealType.toLowerCase()) {
      case 'breakfast':
        return '🌅';
      case 'lunch':
        return '🍽️';
      case 'dinner':
        return '🌙';
      case 'snack':
        return '🍎';
      case 'pre-workout':
        return '⚡';
      case 'post-workout':
        return '💪';
      default:
        return '🍴';
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}`;
  };

  return (
    <div className="min-h-screen bg-background-main pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-6">
        <div className="mb-4">
          <p className="text-sm text-text-light font-body">{getCurrentDate()}</p>
          <h2 className="text-xl font-heading font-bold text-text-dark mt-1">
            My Diet Plans
          </h2>
        </div>
      </div>

      {/* Plan Selection */}
      {dietPlans.length > 1 && (
        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <label className="block text-sm font-medium text-text-dark mb-2">
              Select Diet Plan
            </label>
            <select
              value={selectedPlan || ''}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
            >
              {dietPlans.map(plan => (
                <option key={plan.id} value={plan.id}>
                  {plan.planName} ({plan.duration})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Current Plan Details */}
      {currentPlan && (
        <div className="px-4 space-y-4">
          {/* Plan Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-md border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-heading font-bold text-text-dark mb-2">
                  {currentPlan.planName}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-text-light">
                  <span>Duration: {currentPlan.duration}</span>
                  <span>•</span>
                  <span>Assigned by: {currentPlan.assignedBy}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    currentPlan.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-100 text-text-light'
                  }`}>
                    {currentPlan.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-primary-blue/10 to-primary-purple/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-light mb-1">Total Daily Calories</p>
                  <p className="text-2xl font-bold text-text-dark">{currentPlan.totalCalories}</p>
                </div>
                <div className="text-4xl">🔥</div>
              </div>
            </div>
          </motion.div>

          {/* Meals Section */}
          <div>
            <h4 className="text-lg font-heading font-bold text-text-dark mb-4">
              Daily Meal Plan
            </h4>
            <div className="space-y-3">
              {currentPlan.meals.map((meal, index) => (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    {/* Meal Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-blue/20 to-primary-purple/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{getMealIcon(meal.mealType)}</span>
                    </div>

                    {/* Meal Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-base font-heading font-bold text-text-dark">
                          {meal.mealType}
                        </h5>
                        <span className="text-xs font-semibold text-primary-blue bg-primary-blue/10 px-2 py-1 rounded-full">
                          {meal.time}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-text-dark mb-2">
                        {meal.food}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-text-light">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {meal.calories} kcal
                        </span>
                      </div>
                      {meal.notes && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <p className="text-xs text-text-light">
                            <span className="font-medium">Note:</span> {meal.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Nutrition Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h4 className="text-lg font-heading font-bold text-text-dark mb-4">
              Daily Nutrition Summary
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-text-light mb-1">Total Calories</p>
                <p className="text-xl font-bold text-text-dark">{currentPlan.totalCalories} kcal</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-text-light mb-1">Meals</p>
                <p className="text-xl font-bold text-text-dark">{currentPlan.meals.length} meals</p>
              </div>
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-primary-blue/10 to-primary-purple/10 rounded-2xl p-5 border border-primary-blue/20"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <h5 className="text-sm font-heading font-bold text-text-dark mb-2">
                  Diet Tips
                </h5>
                <ul className="text-xs text-text-light space-y-1">
                  <li>• Follow meal timings strictly for best results</li>
                  <li>• Stay hydrated - drink 8-10 glasses of water daily</li>
                  <li>• Track your meals to monitor progress</li>
                  <li>• Consult with your trainer if you need adjustments</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* No Plans Message */}
      {dietPlans.length === 0 && (
        <div className="px-4 mt-8">
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="text-lg font-heading font-bold text-text-dark mb-2">
              No Diet Plan Assigned
            </h3>
            <p className="text-sm text-text-light">
              Your trainer or admin will assign a diet plan for you soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDietPlan;

