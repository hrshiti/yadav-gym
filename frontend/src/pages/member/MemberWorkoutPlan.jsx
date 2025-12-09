import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MemberWorkoutPlan = () => {
  const navigate = useNavigate();

  // Mock workout plans - This would come from API in real app
  // These are plans assigned by admin or trainer
  const workoutPlans = [
    {
      id: 'MP001',
      planName: 'Beginner Strength Training',
      duration: '4 weeks',
      assignedBy: 'Admin',
      createdAt: '2024-01-10',
      status: 'active',
      exercises: [
        { id: 1, name: 'Push-ups', sets: 3, reps: 15, rest: '30s', notes: 'Focus on form' },
        { id: 2, name: 'Squats', sets: 3, reps: 20, rest: '45s', notes: 'Keep back straight' },
        { id: 3, name: 'Plank', sets: 3, reps: '30s', rest: '60s', notes: 'Hold position' },
        { id: 4, name: 'Lunges', sets: 3, reps: 12, rest: '45s', notes: 'Alternate legs' },
      ],
    },
    {
      id: 'MP002',
      planName: 'Cardio & Weight Loss',
      duration: '6 weeks',
      assignedBy: 'Trainer',
      createdAt: '2024-01-12',
      status: 'active',
      exercises: [
        { id: 1, name: 'Running', sets: 1, reps: '30 min', rest: '0s', notes: 'Moderate pace' },
        { id: 2, name: 'Jumping Jacks', sets: 3, reps: 30, rest: '30s', notes: 'Full range of motion' },
        { id: 3, name: 'Burpees', sets: 3, reps: 10, rest: '60s', notes: 'Complete form' },
      ],
    },
    {
      id: 'MP003',
      planName: 'Advanced Training Program',
      duration: '8 weeks',
      assignedBy: 'Trainer',
      createdAt: '2024-01-08',
      status: 'active',
      exercises: [
        { id: 1, name: 'Deadlifts', sets: 4, reps: 8, rest: '90s', notes: 'Heavy weight' },
        { id: 2, name: 'Bench Press', sets: 4, reps: 10, rest: '90s', notes: 'Full range' },
        { id: 3, name: 'Pull-ups', sets: 3, reps: 8, rest: '60s', notes: 'Full extension' },
        { id: 4, name: 'Shoulder Press', sets: 3, reps: 12, rest: '60s', notes: 'Control the weight' },
      ],
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background-main pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2"
          >
            <svg className="w-6 h-6 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-heading font-bold text-text-dark">Workout Plans</h2>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Workout Plans List */}
      <div className="px-4 mt-6 space-y-4">
        {workoutPlans.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center"
          >
            <p className="text-text-light">No workout plans assigned yet</p>
          </motion.div>
        ) : (
          workoutPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              {/* Plan Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-text-dark mb-1">
                    {plan.planName}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-text-light">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {plan.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Assigned by {plan.assignedBy}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  plan.status === 'active'
                    ? 'bg-success/10 text-success'
                    : 'bg-gray-100 text-text-light'
                }`}>
                  {plan.status}
                </span>
              </div>

              {/* Exercises List */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-text-dark mb-2">Exercises:</h4>
                {plan.exercises.map((exercise, exIndex) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.1) + (exIndex * 0.05) }}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h5 className="text-base font-heading font-semibold text-text-dark mb-2">
                          {exercise.name}
                        </h5>
                        <div className="flex items-center gap-4 text-sm text-text-light">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {exercise.sets} sets
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {exercise.reps} reps
                          </span>
                          {exercise.rest !== '0s' && (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Rest: {exercise.rest}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {exercise.notes && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-text-light italic">
                          <span className="font-medium">Note:</span> {exercise.notes}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Plan Footer */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-text-light">
                  Created on {formatDate(plan.createdAt)}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MemberWorkoutPlan;

