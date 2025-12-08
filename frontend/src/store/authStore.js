import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Auth store - will be fully implemented in Chunk 5
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      role: null, // 'admin', 'trainer', 'member'
      
      setAuth: (user, token, role) => set({ user, token, role }),
      logout: () => set({ user: null, token: null, role: null }),
      
      isAuthenticated: () => {
        const state = get();
        return !!state.token;
      },
      
      isAdmin: () => {
        const state = get();
        return state.role === 'admin';
      },
      
      isTrainer: () => {
        const state = get();
        return state.role === 'trainer';
      },
      
      isMember: () => {
        const state = get();
        return state.role === 'member';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;

