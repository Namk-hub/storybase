import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api/authApi';
import { setAccessToken } from '../api/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    const response = await authAPI.login(credentials);
    const { access_token, user } = response.data;
    setAccessToken(access_token);
    setUser(user);
    // Store user info (non-sensitive) in localStorage for persistent UI, 
    // but NEVER store the token.
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  };

  const register = async (userData) => {
    const response = await authAPI.register(userData);
    const { access_token, user } = response.data;
    setAccessToken(access_token);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAccessToken('');
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  // On mount, try to refresh the token to see if user is already logged in
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Try to get a new access token using the refresh cookie
        const response = await authAPI.refreshToken();
        const { access_token, user } = response.data;
        setAccessToken(access_token);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.log('No active session found.');
        // If refresh fails, we're not logged in, clear any stale user data
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
