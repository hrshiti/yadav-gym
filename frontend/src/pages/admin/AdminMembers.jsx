import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AdminMembers = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [editingMember, setEditingMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null); // For detail view
  const [searchQuery, setSearchQuery] = useState('');
  const [memberViewTab, setMemberViewTab] = useState('add-member'); // 'add-member', 'active-members', 'total-members', 'not-active-members'
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

  // Sample data for tabs
  const newRegistrations = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', date: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', date: '2024-01-14', status: 'Active' },
    { id: 3, name: 'Amit Singh', email: 'amit@example.com', date: '2024-01-13', status: 'Pending' },
    { id: 4, name: 'Sneha Patel', email: 'sneha@example.com', date: '2024-01-12', status: 'Active' },
  ];

  const lowAttendanceAlerts = [
    { id: 1, name: 'Vikram Mehta', days: 3, lastVisit: '2024-01-12' },
    { id: 2, name: 'Anjali Desai', days: 5, lastVisit: '2024-01-10' },
    { id: 3, name: 'Rohit Gupta', days: 7, lastVisit: '2024-01-08' },
  ];

  const trainerPerformance = [
    { id: 1, name: 'Priya Sharma', score: 95, members: 45, rating: 4.8 },
    { id: 2, name: 'Rajesh Kumar', score: 92, members: 38, rating: 4.7 },
    { id: 3, name: 'Anjali Singh', score: 88, members: 32, rating: 4.6 },
    { id: 4, name: 'Vikram Mehta', score: 85, members: 28, rating: 4.5 },
  ];

  // Check if we're on add route
  useEffect(() => {
    if (location.pathname === '/admin/members/add') {
      setViewMode('add');
      setMemberViewTab('add-member');
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

  // Filter members based on active tab
  const getFilteredMembersByTab = () => {
    if (memberViewTab === 'active-members') {
      return members.filter(m => m.status === 'Active');
    } else if (memberViewTab === 'not-active-members') {
      return members.filter(m => m.status !== 'Active');
    } else if (memberViewTab === 'total-members') {
      return members;
    }
    return members;
  };

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

  // Filter members based on search and tab
  const getFilteredMembers = () => {
    let tabFiltered = getFilteredMembersByTab();
    return tabFiltered.filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.memberId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredMembers = getFilteredMembers();

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
              setMemberViewTab('add-member');
            }}
            className="w-full sm:w-auto px-4 py-2 text-white rounded-lg font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
            style={{
              background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            + Add Member
          </motion.button>
        )}
      </div>

      {/* Member View Tabs */}
      <motion.div
        className="bg-white rounded-xl sm:rounded-2xl p-1 shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex gap-1 overflow-x-auto scrollbar-hide relative">
          {[
            { id: 'add-member', label: 'Add Member' },
            { id: 'active-members', label: 'Active Members' },
            { id: 'total-members', label: 'Total Members' },
            { id: 'not-active-members', label: 'Not Active Members' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                setMemberViewTab(tab.id);
                if (tab.id === 'add-member') {
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
              }}
              className={`flex-1 min-w-[120px] py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all relative whitespace-nowrap ${
                memberViewTab === tab.id
                  ? 'text-white'
                  : 'text-text-light hover:bg-gray-50'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {memberViewTab === tab.id && (
                <motion.div
                  layoutId="memberViewTabIndicator"
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
        {((viewMode === 'add' && memberViewTab === 'add-member') || viewMode === 'edit') && (
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
      {viewMode === 'list' && memberViewTab !== 'add-member' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100"
        >
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-heading font-bold text-text-dark">
              {memberViewTab === 'active-members' ? 'Active Members' : 
               memberViewTab === 'not-active-members' ? 'Not Active Members' : 
               'Total Members'} ({filteredMembers.length})
            </h3>
          </div>

          {/* Members List - Compact Mobile View */}
          <div className="space-y-2 sm:space-y-3">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-gray-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Photo */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-gradient-primary flex-shrink-0">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80';
                      }}
                    />
                  </div>

                  {/* Info - Compact */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-heading font-semibold text-text-dark truncate">
                        {member.name}
                      </h4>
                      <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium flex-shrink-0 ${
                        member.status === 'Active' ? 'bg-success/20 text-success' :
                        member.status === 'Pending' ? 'bg-warning/20 text-warning' :
                        'bg-gray-200 text-text-light'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-text-light truncate mt-0.5">{member.email}</p>
                    <p className="text-[10px] sm:text-xs text-text-light">ID: {member.memberId}</p>
                  </div>

                  {/* Detail Button */}
                  <motion.button
                    onClick={() => setSelectedMember(member)}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 bg-gradient-primary text-white rounded-lg text-[10px] sm:text-xs font-medium hover:shadow-md transition-all flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Detail
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

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl z-50 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-text-dark">
                  Member Details
                </h3>
                <motion.button
                  onClick={() => setSelectedMember(null)}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Member Details */}
              <div className="space-y-4 sm:space-y-6">
                {/* Photo and Basic Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gradient-primary flex-shrink-0">
                    <img
                      src={selectedMember.photo}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80';
                      }}
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-lg sm:text-xl font-heading font-bold text-text-dark mb-1">
                      {selectedMember.name}
                    </h4>
                    <p className="text-sm text-text-light mb-2">{selectedMember.email}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      selectedMember.status === 'Active' ? 'bg-success/20 text-success' :
                      selectedMember.status === 'Pending' ? 'bg-warning/20 text-warning' :
                      'bg-gray-200 text-text-light'
                    }`}>
                      {selectedMember.status}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-text-light mb-1">Member ID</p>
                    <p className="text-sm sm:text-base font-semibold text-text-dark">{selectedMember.memberId}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-text-light mb-1">Phone Number</p>
                    <p className="text-sm sm:text-base font-semibold text-text-dark">{selectedMember.phone}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-text-light mb-1">Join Date</p>
                    <p className="text-sm sm:text-base font-semibold text-text-dark">{selectedMember.joinDate}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-text-light mb-1">Assigned Trainer</p>
                    <p className="text-sm sm:text-base font-semibold text-text-dark">{selectedMember.trainer || 'Not Assigned'}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-gray-200">
                  <motion.button
                    onClick={() => {
                      handleEdit(selectedMember);
                      setSelectedMember(null);
                    }}
                    className="flex-1 px-4 py-2.5 bg-primary-blue/10 text-primary-blue rounded-lg text-sm font-medium hover:bg-primary-blue/20 transition-all"
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit Member
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      handleDelete(selectedMember.id);
                      setSelectedMember(null);
                    }}
                    className="flex-1 px-4 py-2.5 bg-danger/10 text-danger rounded-lg text-sm font-medium hover:bg-danger/20 transition-all"
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete Member
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMembers;

