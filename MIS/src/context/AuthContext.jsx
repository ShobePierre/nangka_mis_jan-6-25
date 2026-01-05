import { useState, createContext, useContext } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.getUser());
  const [userType, setUserType] = useState(authService.getUserType());
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginAdmin = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.loginAdmin(username, password);
      setUser(response.user);
      setUserType('admin');
      setIsAuthenticated(true);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginPWDUser = async (pwdId, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.loginPWDUser(pwdId, password);
      setUser(response.user);
      setUserType('pwd');
      setIsAuthenticated(true);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        isAuthenticated,
        loading,
        error,
        loginAdmin,
        loginPWDUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
