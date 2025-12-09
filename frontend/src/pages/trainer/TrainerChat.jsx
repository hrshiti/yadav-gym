import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TrainerChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const memberId = location.state?.memberId || '1';
  
  // Mock members data
  const members = [
    {
      id: '1',
      name: 'Rahul Sharma',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    },
    {
      id: '2',
      name: 'Priya Patel',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    },
    {
      id: '3',
      name: 'Amit Kumar',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    },
    {
      id: '4',
      name: 'Sneha Singh',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    },
    {
      id: '5',
      name: 'Vikram Mehta',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    },
  ];

  const selectedMember = members.find(m => m.id === memberId) || members[0];

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I have a question about my workout plan.',
      sender: 'member',
      time: '10:30 AM',
    },
    {
      id: 2,
      text: 'Hi! Sure, I\'m here to help. What would you like to know?',
      sender: 'trainer',
      time: '10:32 AM',
    },
    {
      id: 3,
      text: 'Can you explain the proper form for deadlifts?',
      sender: 'member',
      time: '10:33 AM',
    },
    {
      id: 4,
      text: 'Absolutely! For deadlifts, keep your back straight, core engaged, and lift with your legs. I can show you in person during your next session.',
      sender: 'trainer',
      time: '10:35 AM',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'trainer',
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate member typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const memberReply = {
        id: messages.length + 2,
        text: 'Thank you! That helps a lot.',
        sender: 'member',
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      };
      setMessages((prev) => [...prev, memberReply]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background-main flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white px-3 sm:px-4 py-3 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1.5 sm:p-2 sm:-ml-2"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Member Profile */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-primary flex items-center justify-center overflow-hidden ring-2 ring-primary-blue/20 flex-shrink-0">
            <img
              src={selectedMember.image}
              alt={selectedMember.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/100x100?text=Member';
              }}
            />
          </div>

          {/* Member Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-heading font-bold text-text-dark truncate">
              {selectedMember.name}
            </h3>
            <p className="text-xs text-text-light">Member</p>
          </div>

          {/* More Options */}
          <button className="p-1.5 sm:p-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-2 sm:space-y-3 pb-20 scrollbar-hide"
      >
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className={`flex ${message.sender === 'trainer' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 ${
                message.sender === 'trainer'
                  ? 'rounded-br-sm shadow-md'
                  : 'bg-white text-black rounded-bl-sm shadow-sm border border-gray-100'
              }`}
              style={message.sender === 'trainer' ? {
                background: 'linear-gradient(135deg, #305EFF, #8A4CFF)',
                color: '#FFFFFF'
              } : {}}
            >
              <p 
                className={`text-sm sm:text-base font-body leading-relaxed break-words ${
                  message.sender === 'trainer' ? '' : 'text-black'
                }`}
                style={message.sender === 'trainer' ? { color: '#FFFFFF' } : {}}
              >
                {message.text}
              </p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'trainer' ? '' : 'text-text-light'
                }`}
                style={message.sender === 'trainer' ? { color: 'rgba(255, 255, 255, 0.8)' } : {}}
              >
                {message.time}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white text-text-dark rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 px-4 py-3">
                <div className="flex items-center gap-1">
                  <motion.div
                    className="w-2 h-2 bg-text-light rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-text-light rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-text-light rounded-full"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 fixed bottom-0 left-0 right-0 z-50 safe-area-inset-bottom">
        <form onSubmit={handleSendMessage} className="flex items-center gap-1.5 sm:gap-2">
          {/* Attachment Button */}
          <button
            type="button"
            className="p-1.5 sm:p-2 text-text-light hover:text-primary-blue transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          {/* Input Field */}
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 rounded-full text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:bg-white transition-all text-sm sm:text-base"
          />

          {/* Send Button */}
          <motion.button
            type="submit"
            disabled={!inputMessage.trim()}
            className={`p-2 sm:p-2.5 rounded-full flex-shrink-0 ${
              inputMessage.trim()
                ? 'bg-gradient-to-r from-primary-blue to-primary-purple text-white'
                : 'bg-gray-200 text-gray-400'
            } transition-all`}
            whileTap={{ scale: 0.9 }}
            whileHover={inputMessage.trim() ? { scale: 1.05 } : {}}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default TrainerChat;

