import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminTrainers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'inactive'
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    joinDate: new Date().toISOString().split('T')[0],
    experience: '',
    specialization: '',
    status: 'active',
    image: null,
  });

  // Mock trainers data
  const [trainers, setTrainers] = useState([
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
  ]);

  // Check if we're on add/edit route
  useEffect(() => {
    if (location.pathname === '/admin/trainers/add') {
      setViewMode('add');
      setFormData({
        name: '',
        email: '',
        phone: '',
        joinDate: new Date().toISOString().split('T')[0],
        experience: '',
        specialization: '',
        status: 'active',
        image: null,
      });
    } else if (location.pathname.includes('/admin/trainers/edit/')) {
      const trainerId = location.pathname.split('/').pop();
      const trainer = trainers.find(t => t.id === trainerId);
      if (trainer) {
        setViewMode('edit');
        setEditingTrainer(trainer);
        setFormData({
          name: trainer.name,
          email: trainer.email,
          phone: trainer.phone,
          joinDate: trainer.joinDate,
          experience: trainer.experience,
          specialization: trainer.specialization,
          status: trainer.status,
          image: null,
        });
      }
    } else {
      setViewMode('list');
    }
  }, [location.pathname, trainers]);

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
      setTrainers(trainers.filter(t => t.id !== trainerId));
      alert('Trainer deleted successfully!');
    }
  };

  // Generate Trainer ID
  const generateTrainerId = () => {
    const count = trainers.length + 1;
    return `TR${String(count).padStart(3, '0')}`;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (viewMode === 'add') {
      const newTrainer = {
        id: generateTrainerId(),
        ...formData,
        assignedMembers: 0,
        performance: 0,
        image: formData.image || 'https://via.placeholder.com/200x200?text=Trainer',
      };
      setTrainers([...trainers, newTrainer]);
      navigate('/admin/trainers');
    } else if (viewMode === 'edit') {
      setTrainers(trainers.map(t => t.id === editingTrainer.id ? { ...t, ...formData } : t));
      navigate('/admin/trainers');
    }
    handleCancel();
  };

  // Handle cancel
  const handleCancel = () => {
    setViewMode('list');
    setEditingTrainer(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      joinDate: new Date().toISOString().split('T')[0],
      experience: '',
      specialization: '',
      status: 'active',
      image: null,
    });
    navigate('/admin/trainers');
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-lg sm:text-xl font-heading font-bold text-text-dark">
          {viewMode === 'add' ? 'Add New Trainer' : viewMode === 'edit' ? 'Edit Trainer' : 'Manage Trainers'}
        </h2>
        {viewMode === 'list' && (
          <motion.button
            onClick={() => navigate('/admin/trainers/add')}
            className="px-3 sm:px-4 py-2 text-white rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-2 w-full sm:w-auto shadow-md hover:shadow-lg transition-all"
            style={{
              background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Trainer
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
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                    placeholder="Enter email address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* Join Date */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Join Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Experience *</label>
                  <input
                    type="text"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                    placeholder="e.g., 5 Years"
                  />
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Specialization *</label>
                  <input
                    type="text"
                    required
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                    placeholder="e.g., Strength Training"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Status *</label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                    {formData.image ? (
                      <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-8 h-8 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                    />
                    <p className="text-xs text-text-light mt-1">Upload trainer's profile photo</p>
                  </div>
                </div>
              </div>

              {/* Trainer ID Display (for edit mode) */}
              {viewMode === 'edit' && editingTrainer && (
                <div className="bg-primary-blue/10 px-4 py-2 rounded-lg">
                  <p className="text-sm text-text-dark">
                    <span className="font-medium">Trainer ID:</span> {editingTrainer.id}
                  </p>
                </div>
              )}

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
                  {viewMode === 'add' ? 'Add Trainer' : 'Update Trainer'}
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
        <>
          {/* Header with Search and Filter */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100">

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
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium capitalize transition-all relative ${
                  filterStatus === status
                    ? 'text-white shadow-sm'
                    : 'bg-gray-100 text-text-light hover:bg-gray-200'
                }`}
                style={filterStatus === status ? {
                  background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
                } : {}}
                whileTap={{ scale: 0.95 }}
              >
                {status}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Trainers List */}
      {filteredTrainers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center shadow-sm border border-gray-100"
        >
          <p className="text-text-light">No trainers found</p>
        </motion.div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {filteredTrainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Trainer Header - Compact Mobile View */}
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
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
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xs sm:text-sm font-heading font-bold text-text-dark truncate">
                      {trainer.name}
                    </h3>
                    <span
                      className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium flex-shrink-0 ${
                        trainer.status === 'active'
                          ? 'bg-success/10 text-success'
                          : 'bg-gray-100 text-text-light'
                      }`}
                    >
                      {trainer.status}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-text-light">ID: {trainer.id}</p>
                  <p className="text-[10px] sm:text-xs text-text-light truncate">{trainer.email}</p>
                </div>
              </div>

              {/* Trainer Details - Compact */}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-2 sm:mb-3 text-[10px] sm:text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-text-light">Members</span>
                  <span className="font-semibold text-text-dark">{trainer.assignedMembers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-light">Experience</span>
                  <span className="font-semibold text-text-dark">{trainer.experience}</span>
                </div>
                <div className="flex items-center justify-between col-span-2">
                  <span className="text-text-light">Specialization</span>
                  <span className="font-semibold text-text-dark text-right truncate ml-2">{trainer.specialization}</span>
                </div>
                <div className="flex items-center justify-between col-span-2">
                  <span className="text-text-light">Performance</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 sm:w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${trainer.performance}%` }}
                        transition={{ delay: index * 0.03 + 0.2, duration: 0.5 }}
                        style={{
                          background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
                        }}
                      />
                    </div>
                    <span className="font-semibold text-text-dark text-xs w-8">{trainer.performance}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 sm:pt-3 border-t border-gray-100">
                <motion.button
                  onClick={() => handleEdit(trainer.id)}
                  className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-primary-blue/10 text-primary-blue rounded-lg text-[10px] sm:text-xs font-medium hover:bg-primary-blue/20 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  Edit
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(trainer.id, trainer.name)}
                  className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-danger/10 text-danger rounded-lg text-[10px] sm:text-xs font-medium hover:bg-danger/20 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default AdminTrainers;
