import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrainerBodyStats = () => {
  const navigate = useNavigate();
  
  const [selectedMember, setSelectedMember] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [chest, setChest] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock members data
  const members = [
    { id: '1', name: 'Rahul Sharma', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { id: '2', name: 'Priya Patel', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { id: '3', name: 'Amit Kumar', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
    { id: '4', name: 'Sneha Singh', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { id: '5', name: 'Vikram Mehta', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
  ];

  const selectedMemberData = members.find(m => m.id === selectedMember);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember) {
      alert('Please select a member');
      return;
    }

    if (!weight || !waist || !chest || !bodyFat) {
      alert('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Body stats updated successfully!');
      // Reset form
      setSelectedMember('');
      setWeight('');
      setWaist('');
      setChest('');
      setBodyFat('');
      setRemarks('');
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
            Update Body Stats
          </h2>

          {/* Placeholder for alignment */}
          <div className="w-10" />
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="px-4 mt-6">
        <div className="space-y-6">
          {/* Select Member */}
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
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all appearance-none cursor-pointer"
              >
                <option value="">Choose a member...</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </motion.div>

          {/* Weight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-text-dark mb-2">
              Weight <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight in kg"
                step="0.1"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light text-sm">kg</span>
            </div>
          </motion.div>

          {/* Waist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-text-dark mb-2">
              Waist <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                placeholder="Enter waist measurement in cm"
                step="0.1"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light text-sm">cm</span>
            </div>
          </motion.div>

          {/* Chest */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-text-dark mb-2">
              Chest <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={chest}
                onChange={(e) => setChest(e.target.value)}
                placeholder="Enter chest measurement in cm"
                step="0.1"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light text-sm">cm</span>
            </div>
          </motion.div>

          {/* Body Fat % */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-text-dark mb-2">
              Body Fat % <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                placeholder="Enter body fat percentage"
                step="0.1"
                min="0"
                max="100"
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light text-sm">%</span>
            </div>
          </motion.div>

          {/* Remarks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-medium text-text-dark mb-2">
              Remarks
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add any remarks or notes..."
              rows={4}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all resize-none"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={!selectedMember || !weight || !waist || !chest || !bodyFat || isSubmitting}
            className={`w-full py-4 rounded-xl font-heading font-semibold transition-all ${
              selectedMember && weight && waist && chest && bodyFat && !isSubmitting
                ? 'bg-gradient-to-r from-primary-blue to-primary-purple shadow-lg hover:shadow-xl hover:shadow-primary-blue/50 text-white'
                : 'bg-gray-300 cursor-not-allowed text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileTap={selectedMember && weight && waist && chest && bodyFat && !isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  className={`w-5 h-5 border-2 border-t-transparent rounded-full ${
                    selectedMember && weight && waist && chest && bodyFat && !isSubmitting ? 'border-white' : 'border-gray-600'
                  }`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Saving...</span>
              </div>
            ) : (
              'SAVE'
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default TrainerBodyStats;

