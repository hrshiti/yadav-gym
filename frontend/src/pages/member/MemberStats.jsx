import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '../../components';

const MemberStats = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Mock user data - will be replaced with API data
  const userData = {
    name: 'John Doe',
    memberId: 'M001',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    joinDate: '2024-01-15',
    trainer: 'Sarah Johnson',
    currentStats: {
      weight: 72.5,
      height: 175,
      bodyFat: 18.2,
      muscleMass: 55.3,
      waist: 82,
      chest: 98,
      arms: 32,
      thighs: 58,
    },
    beforeAfterPhotos: [
      {
        id: 1,
        type: 'before',
        date: '2024-01-15',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
      },
      {
        id: 2,
        type: 'after',
        date: '2024-06-15',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
      },
      {
        id: 3,
        type: 'progress',
        date: '2024-03-15',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
      },
    ],
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === userData.beforeAfterPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? userData.beforeAfterPhotos.length - 1 : prev - 1
    );
  };

  const goToPhoto = (index) => {
    setCurrentPhotoIndex(index);
  };

  return (
    <div className="min-h-screen bg-background-main pb-24 pt-2 sm:pt-4 px-3 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-3 sm:space-y-4 md:space-y-6"
      >
        {/* Page Header - Hidden on Mobile */}
        <div className="hidden sm:block mb-3 sm:mb-4 md:mb-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-dark mb-1 sm:mb-2">
            My Body Stats
          </h1>
          <p className="text-sm sm:text-base text-text-light">Track your fitness journey and progress</p>
        </div>

        {/* Profile Card */}
        <Card padding="md" className="p-4 sm:p-6 md:p-8 mb-3 sm:mb-4 md:mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6"
          >
            {/* Profile Image */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-[#305EFF] to-[#8A4CFF] p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-primary-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-success rounded-full p-1.5 sm:p-2 shadow-lg">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-text-dark mb-1 sm:mb-2">
                {userData.name}
              </h2>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-text-light">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                  <span>Member ID: {userData.memberId}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Trainer: {userData.trainer}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Joined: {new Date(userData.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </Card>

        {/* Before/After Photos Slider */}
        <Card padding="md sm:lg" className="mb-3 sm:mb-4 md:mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg sm:text-xl font-heading font-bold text-text-dark mb-3 sm:mb-4">
              Progress Photos
            </h3>
            
            {/* Photo Slider */}
            <div className="relative">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-gray-100">
                <motion.img
                  key={currentPhotoIndex}
                  src={userData.beforeAfterPhotos[currentPhotoIndex].url}
                  alt={`${userData.beforeAfterPhotos[currentPhotoIndex].type} photo`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Photo Type Badge */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                  <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold ${
                    userData.beforeAfterPhotos[currentPhotoIndex].type === 'before'
                      ? 'bg-danger text-white'
                      : userData.beforeAfterPhotos[currentPhotoIndex].type === 'after'
                      ? 'bg-success text-white'
                      : 'bg-primary-blue text-white'
                  }`}>
                    {userData.beforeAfterPhotos[currentPhotoIndex].type.toUpperCase()}
                  </span>
                </div>

                {/* Date Badge */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/50 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-white text-xs sm:text-sm">
                  {new Date(userData.beforeAfterPhotos[currentPhotoIndex].date).toLocaleDateString()}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-text-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-text-dark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Photo Indicators */}
              <div className="flex justify-center gap-2 mt-3 sm:mt-4">
                {userData.beforeAfterPhotos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => goToPhoto(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentPhotoIndex
                        ? 'w-8 bg-primary-blue'
                        : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </Card>

        {/* Body Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
          {Object.entries(userData.currentStats).map(([key, value], index) => {
            const labels = {
              weight: { label: 'Weight', unit: 'kg', icon: '⚖️' },
              height: { label: 'Height', unit: 'cm', icon: '📏' },
              bodyFat: { label: 'Body Fat', unit: '%', icon: '💪' },
              muscleMass: { label: 'Muscle', unit: 'kg', icon: '🔥' },
              waist: { label: 'Waist', unit: 'cm', icon: '📐' },
              chest: { label: 'Chest', unit: 'cm', icon: '💪' },
              arms: { label: 'Arms', unit: 'cm', icon: '💪' },
              thighs: { label: 'Thighs', unit: 'cm', icon: '🦵' },
            };

            const statInfo = labels[key] || { label: key, unit: '', icon: '📊' };

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              >
                <Card padding="sm" className="p-3 sm:p-4 md:p-6 text-center" hover>
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{statInfo.icon}</div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-text-dark mb-0.5 sm:mb-1 font-mono">
                    {value}
                    <span className="text-xs sm:text-sm text-text-light ml-1">{statInfo.unit}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-text-light font-medium">
                    {statInfo.label}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info Card */}
        <Card padding="md" className="p-4 sm:p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg sm:text-xl font-heading font-bold text-text-dark mb-3 sm:mb-4">
              Contact Information
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-blue/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm text-text-light">Email</div>
                  <div className="text-sm sm:text-base text-text-dark font-medium truncate">{userData.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-purple/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary-purple"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm text-text-light">Phone</div>
                  <div className="text-sm sm:text-base text-text-dark font-medium">{userData.phone}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default MemberStats;
