import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './PWDLogin.css';

export function PWDLogin() {
  const [pwdId, setPwdId] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { loginPWDUser, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!pwdId || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      console.log('Attempting PWD login...');
      await loginPWDUser(pwdId, password);
      console.log('Login successful, redirecting...');
    } catch (error) {
      console.error('PWD login error:', error);
      setLocalError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box pwd-login">
        <div className="login-icon">♿</div>
        <h1>PWD Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pwdId">PWD ID</label>
            <input
              type="number"
              id="pwdId"
              value={pwdId}
              onChange={(e) => setPwdId(e.target.value)}
              placeholder="e.g., 1"
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password (Your Surname)</label>
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
          <code>PWD ID: 1<br/>Password: Dela Cruz</code>
        </div>
      </div>
    </div>
  );
}
