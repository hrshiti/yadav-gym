import useAuthStore from '../store/authStore';

// Custom hook for authentication
export const useAuth = () => {
  const { user, token, role, setAuth, logout, isAuthenticated, isAdmin, isTrainer, isMember } = useAuthStore();
  
  return {
    user,
    token,
    role,
    setAuth,
    logout,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    isTrainer: isTrainer(),
    isMember: isMember(),
  };
};

