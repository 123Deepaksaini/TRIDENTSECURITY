import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin as apiAdminLogin } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('trident_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('trident_admin_token'));
  const [loading, setLoading] = useState(false);

  const login = async (usernameOrEmail, password) => {
    setLoading(true);
    try {
      const data = await apiAdminLogin(usernameOrEmail, password);
      if (data.success && data.token) {
        setToken(data.token);
        setAdmin(data.admin);
        localStorage.setItem('trident_admin_token', data.token);
        localStorage.setItem('trident_admin_user', JSON.stringify(data.admin));
        return { success: true };
      }
      return { success: false, message: data.message || 'Login failed.' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Authentication error. Check server status.'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('trident_admin_token');
    localStorage.removeItem('trident_admin_user');
  };

  const isAuthenticated = Boolean(token && admin);

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
