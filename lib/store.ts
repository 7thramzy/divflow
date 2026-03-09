import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './types';

interface AuthState {
  user: User | null;
  token: string | null;
  isSidebarOpen: boolean;
  setAuth: (user: User, token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isSidebarOpen: false,
      setAuth: (user, token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('divflow_token', token);
          localStorage.setItem('divflow_user', JSON.stringify(user));
        }
        set({ user, token });
      },
      setUser: (user) => set({ user }),
      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('divflow_token');
          localStorage.removeItem('divflow_user');
        }
        set({ user: null, token: null });
      },
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    }),
    {
      name: 'divflow-auth',
      onRehydrateStorage: () => (state) => {
        if (state && state.token && typeof window !== 'undefined') {
          localStorage.setItem('divflow_token', state.token);
          if (state.user) {
            localStorage.setItem('divflow_user', JSON.stringify(state.user));
          }
        }
      },
    }
  )
);
