import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

/**
 * Premium File Upload Component
 * Features: Drag & drop, image preview, progress indicator
 */
const FileUpload = ({
  label,
  accept = 'image/*',
  multiple = false,
  maxSize = 5, // MB
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }

    onChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-text-dark mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {/* Upload Area */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative
          border-2 border-dashed
          rounded-xl
          p-8
          text-center
          cursor-pointer
          transition-all duration-300
          ${error ? 'border-danger bg-danger/5' : 'border-gray-300 hover:border-primary-blue'}
          ${isDragging ? 'border-primary-blue bg-primary-blue/10 scale-105' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={disabled}
          className="hidden"
          {...props}
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative"
            >
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg shadow-lg"
              />
              <motion.button
                type="button"
                onClick={removeFile}
                className="absolute top-2 right-2 p-2 bg-danger text-white rounded-full shadow-lg hover:bg-danger/80"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center"
                animate={{ rotate: isDragging ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </motion.div>
              <p className="text-text-dark font-medium mb-1">
                {isDragging ? 'Drop file here' : 'Click or drag to upload'}
              </p>
              <p className="text-sm text-text-light">
                {accept.includes('image') ? 'Image' : 'File'} up to {maxSize}MB
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-danger flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;
