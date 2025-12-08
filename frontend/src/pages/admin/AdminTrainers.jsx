import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminTrainers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'inactive'

  // Mock trainers data
  const trainers = [
    {
      id: 'TR001',
      name: 'Rajesh Kumar',
      email: 'rajesh@yadavfitness.com',
      phone: '+91 98765 43210',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80',
      assignedMembers: 24,
      experience: '5 Years',
      specialization: 'Strength Training',
      status: 'active',
      joinDate: '2022-01-15',
      performance: 92,
    },
    {
      id: 'TR002',
      name: 'Priya Sharma',
      email: 'priya@yadavfitness.com',
      phone: '+91 98765 43211',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&q=80',
      assignedMembers: 18,
      experience: '3 Years',
      specialization: 'Yoga & Flexibility',
      status: 'active',
      joinDate: '2023-03-20',
      performance: 88,
    },
    {
      id: 'TR003',
      name: 'Amit Singh',
      email: 'amit@yadavfitness.com',
      phone: '+91 98765 43212',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      assignedMembers: 15,
      experience: '7 Years',
      specialization: 'Cardio & Weight Loss',
      status: 'active',
      joinDate: '2021-06-10',
      performance: 95,
    },
    {
      id: 'TR004',
      name: 'Sneha Patel',
      email: 'sneha@yadavfitness.com',
      phone: '+91 98765 43213',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      assignedMembers: 12,
      experience: '2 Years',
      specialization: 'Pilates',
      status: 'inactive',
      joinDate: '2023-08-05',
      performance: 75,
    },
    {
      id: 'TR005',
      name: 'Vikram Mehta',
      email: 'vikram@yadavfitness.com',
      phone: '+91 98765 43214',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      assignedMembers: 20,
      experience: '4 Years',
      specialization: 'CrossFit',
      status: 'active',
      joinDate: '2022-09-12',
      performance: 90,
    },
    {
      id: 'TR006',
      name: 'Anjali Verma',
      email: 'anjali@yadavfitness.com',
      phone: '+91 98765 43215',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
      assignedMembers: 16,
      experience: '6 Years',
      specialization: 'Nutrition & Wellness',
      status: 'active',
      joinDate: '2021-11-18',
      performance: 93,
    },
  ];

  // Filter trainers
  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trainer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trainer.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || trainer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (trainerId) => {
    // Navigate to edit page
    navigate(`/admin/trainers/edit/${trainerId}`);
  };

  const handleDelete = (trainerId, trainerName) => {
    if (window.confirm(`Are you sure you want to delete ${trainerName}?`)) {
      // Handle delete
      console.log('Delete trainer:', trainerId);
      alert('Trainer deleted successfully!');
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header with Search and Filter */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-heading font-bold text-text-dark">
            Manage Trainers
          </h2>
          <motion.button
            onClick={() => navigate('/admin/trainers/add')}
            className="px-3 sm:px-4 py-2 bg-gradient-primary text-white rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Trainer
          </motion.button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trainers..."
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 bg-gray-100 border-2 border-gray-200 rounded-lg text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all text-sm"
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
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => (
              <motion.button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium capitalize transition-all ${
                  filterStatus === status
                    ? 'bg-gradient-primary text-white shadow-sm'
                    : 'bg-gray-100 text-text-light hover:bg-gray-200'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {status}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Trainers Grid */}
      {filteredTrainers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center shadow-sm border border-gray-100"
        >
          <p className="text-text-light">No trainers found</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredTrainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Trainer Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-primary-blue/20 flex-shrink-0">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x200?text=Trainer';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm sm:text-base font-heading font-bold text-text-dark truncate">
                      {trainer.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium flex-shrink-0 ml-2 ${
                        trainer.status === 'active'
                          ? 'bg-success/10 text-success'
                          : 'bg-gray-100 text-text-light'
                      }`}
                    >
                      {trainer.status}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-text-light mb-1">ID: {trainer.id}</p>
                  <p className="text-[10px] sm:text-xs text-text-light truncate">{trainer.email}</p>
                </div>
              </div>

              {/* Trainer Details */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-light">Assigned Members</span>
                  <span className="font-semibold text-text-dark">{trainer.assignedMembers}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-light">Experience</span>
                  <span className="font-semibold text-text-dark">{trainer.experience}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-light">Specialization</span>
                  <span className="font-semibold text-text-dark text-right truncate ml-2">{trainer.specialization}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-light">Performance</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${trainer.performance}%` }}
                        transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                      />
                    </div>
                    <span className="font-semibold text-text-dark text-xs w-8">{trainer.performance}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <motion.button
                  onClick={() => handleEdit(trainer.id)}
                  className="flex-1 py-2 px-3 bg-primary-blue/10 text-primary-blue rounded-lg text-xs font-medium hover:bg-primary-blue/20 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  Edit
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(trainer.id, trainer.name)}
                  className="flex-1 py-2 px-3 bg-danger/10 text-danger rounded-lg text-xs font-medium hover:bg-danger/20 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  Remove
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTrainers;
