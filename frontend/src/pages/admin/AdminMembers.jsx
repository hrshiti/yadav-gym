import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AdminMembers = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [editingMember, setEditingMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState([
    {
      id: 1,
      memberId: 'M001',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 9876543210',
      joinDate: '2024-01-15',
      status: 'Active',
      trainer: 'Priya Sharma',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    },
    {
      id: 2,
      memberId: 'M002',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 9876543211',
      joinDate: '2024-01-14',
      status: 'Active',
      trainer: 'Rajesh Kumar',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    },
    {
      id: 3,
      memberId: 'M003',
      name: 'Amit Singh',
      email: 'amit@example.com',
      phone: '+91 9876543212',
      joinDate: '2024-01-13',
      status: 'Pending',
      trainer: 'Anjali Singh',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    },
    {
      id: 4,
      memberId: 'M004',
      name: 'Sneha Patel',
      email: 'sneha@example.com',
      phone: '+91 9876543213',
      joinDate: '2024-01-12',
      status: 'Active',
      trainer: 'Rajesh Kumar',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'Active',
    trainer: '',
    photo: null,
  });

  const trainers = ['Rajesh Kumar', 'Priya Sharma', 'Anjali Singh', 'Vikram Mehta'];

  // Check if we're on add route
  useEffect(() => {
    if (location.pathname === '/admin/members/add') {
      setViewMode('add');
      setFormData({
        name: '',
        email: '',
        phone: '',
        joinDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        trainer: '',
        photo: null,
      });
    } else {
      setViewMode('list');
    }
  }, [location.pathname]);

  // Generate Member ID
  const generateMemberId = () => {
    const count = members.length + 1;
    return `M${String(count).padStart(3, '0')}`;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (viewMode === 'add') {
      const newMember = {
        id: members.length + 1,
        memberId: generateMemberId(),
        ...formData,
        photo: formData.photo || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      };
      setMembers([...members, newMember]);
    } else if (viewMode === 'edit') {
      setMembers(members.map(m => m.id === editingMember.id ? { ...m, ...formData } : m));
    }
    handleCancel();
  };

  // Handle edit
  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      joinDate: member.joinDate,
      status: member.status,
      trainer: member.trainer,
      photo: null,
    });
    setViewMode('edit');
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setViewMode('list');
    setEditingMember(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      trainer: '',
      photo: null,
    });
  };

  // Filter members
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.memberId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-text-dark">
          {viewMode === 'add' ? 'Add New Member' : viewMode === 'edit' ? 'Edit Member' : 'Members Management'}
        </h2>
        {viewMode === 'list' && (
          <motion.button
            onClick={() => {
              setFormData({
                name: '',
                email: '',
                phone: '',
                joinDate: new Date().toISOString().split('T')[0],
                status: 'Active',
                trainer: '',
                photo: null,
              });
              setViewMode('add');
            }}
            className="w-full sm:w-auto px-4 py-2 bg-gradient-primary text-white rounded-lg font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
            whileTap={{ scale: 0.95 }}
          >
            + Add Member
          </motion.button>
        )}
      </div>

      {/* Search Bar - Only show in list view */}
      {viewMode === 'list' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
        >
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email, or member ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
            />
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

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Status *</label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Trainer */}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Assign Trainer</label>
                  <select
                    value={formData.trainer}
                    onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                  >
                    <option value="">Select Trainer</option>
                    {trainers.map((trainer) => (
                      <option key={trainer} value={trainer}>{trainer}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                    {formData.photo ? (
                      <img src={URL.createObjectURL(formData.photo)} alt="Preview" className="w-full h-full object-cover" />
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
                      onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-50 rounded-lg text-sm sm:text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all"
                    />
                    <p className="text-xs text-text-light mt-1">Upload member's profile photo</p>
                  </div>
                </div>
              </div>

              {/* Member ID Display (for edit mode) */}
              {viewMode === 'edit' && editingMember && (
                <div className="bg-primary-blue/10 px-4 py-2 rounded-lg">
                  <p className="text-sm text-text-dark">
                    <span className="font-medium">Member ID:</span> {editingMember.memberId}
                  </p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <motion.button
                  type="submit"
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-gradient-primary text-white rounded-lg font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
                  whileTap={{ scale: 0.95 }}
                >
                  {viewMode === 'add' ? 'Add Member' : 'Update Member'}
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

      {/* Members List */}
      {viewMode === 'list' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100"
        >
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-heading font-bold text-text-dark">
              All Members ({filteredMembers.length})
            </h3>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Photo */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden bg-gradient-primary flex-shrink-0">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80';
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm sm:text-base font-heading font-semibold text-text-dark truncate">
                      {member.name}
                    </h4>
                    <p className="text-xs text-text-light truncate">{member.email}</p>
                    <p className="text-xs text-text-light mt-1">ID: {member.memberId}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        member.status === 'Active' ? 'bg-success/20 text-success' :
                        member.status === 'Pending' ? 'bg-warning/20 text-warning' :
                        'bg-gray-200 text-text-light'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3 sm:mt-4 pt-3 border-t border-gray-200">
                  <motion.button
                    onClick={() => handleEdit(member)}
                    className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-primary-blue/10 text-primary-blue rounded-lg text-xs sm:text-sm font-medium hover:bg-primary-blue/20 transition-all"
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(member.id)}
                    className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-danger/10 text-danger rounded-lg text-xs sm:text-sm font-medium hover:bg-danger/20 transition-all"
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-text-light">No members found</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AdminMembers;

