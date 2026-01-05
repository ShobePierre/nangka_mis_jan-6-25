const API_BASE_URL = 'http://localhost:5000/api';

export const authService = {
  async loginAdmin(username, password) {
    try {
      console.log('🔐 Attempting admin login:', username);
      const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Login failed:', data.error);
        throw new Error(data.error || 'Login failed');
      }

      console.log('✅ Admin login successful:', data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userType', 'admin');
      return data;
    } catch (error) {
      console.error('Admin login error:', error.message);
      throw error;
    }
  },

  async loginPWDUser(pwdId, password) {
    try {
      console.log('🔐 Attempting PWD login with ID:', pwdId);
      const response = await fetch(`${API_BASE_URL}/auth/pwd/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pwdId: parseInt(pwdId), password })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ PWD login failed:', data.error);
        throw new Error(data.error || 'Login failed');
      }

      console.log('✅ PWD login successful:', data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userType', 'pwd');
      return data;
    } catch (error) {
      console.error('PWD login error:', error.message);
      throw error;
    }
  },

  logout() {
    console.log('🚪 Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getUserType() {
    return localStorage.getItem('userType');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};
