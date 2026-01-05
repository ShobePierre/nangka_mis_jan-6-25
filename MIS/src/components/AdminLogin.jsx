import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AdminLogin.css';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { loginAdmin, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!username || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      console.log('Attempting admin login...');
      await loginAdmin(username, password);
      console.log('Login successful, redirecting...');
    } catch (error) {
      console.error('Login error:', error);
      setLocalError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box admin-login">
        <div className="login-icon">👨‍💼</div>
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="testadmin"
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {localError && (
            <div className="error-message">
              <span>⚠️</span> {localError}
            </div>
          )}

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? (
              <>
                <span className="spinner"></span> Logging in...
              </>
            ) : (
              '🔓 Login'
            )}
          </button>
        </form>

        <div className="test-credentials">
          <p className="test-label">Test Credentials:</p>
          <code>testadmin / Admin@123</code>
        </div>
      </div>
    </div>
  );
}
