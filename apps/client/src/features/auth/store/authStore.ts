import { create } from "zustand";

import type { AuthUser } from "../services/authApi";
import { loginRequest, meRequest, registerRequest } from "../services/authApi";

const AUTH_TOKEN_KEY = "rpg-platform-auth-token";

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;

  initializeAuth: () => Promise<void>;
  register: (input: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (input: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: localStorage.getItem(AUTH_TOKEN_KEY),
  loading: false,
  error: null,
  initialized: false,

  initializeAuth: async () => {
    const token = get().token;

    if (!token) {
      set({
        initialized: true,
        user: null,
      });
      return;
    }

    try {
      set({
        loading: true,
        error: null,
      });

      const result = await meRequest(token);

      set({
        user: result.user,
        initialized: true,
        loading: false,
      });
    } catch (error) {
      localStorage.removeItem(AUTH_TOKEN_KEY);

      set({
        user: null,
        token: null,
        initialized: true,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Sessão expirada. Entre novamente.",
      });
    }
  },

  register: async (input) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const result = await registerRequest(input);

      localStorage.setItem(AUTH_TOKEN_KEY, result.token);

      set({
        user: result.user,
        token: result.token,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error ? error.message : "Erro ao criar conta.",
      });
    }
  },

  login: async (input) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const result = await loginRequest(input);

      localStorage.setItem(AUTH_TOKEN_KEY, result.token);

      set({
        user: result.user,
        token: result.token,
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Erro ao entrar.",
      });
    }
  },

  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);

    set({
      user: null,
      token: null,
      error: null,
      loading: false,
    });
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));