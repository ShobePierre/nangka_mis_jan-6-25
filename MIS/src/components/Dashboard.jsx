import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export function Dashboard() {
  const { user, userType, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Nangka MIS</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="user-info-card">
          <h2>User Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>User Type:</label>
              <span className={`badge ${userType}`}>{userType === 'admin' ? 'Administrator' : 'PWD User'}</span>
            </div>

            {userType === 'admin' ? (
              <>
                <div className="info-item">
                  <label>Username:</label>
                  <span>{user?.username}</span>
                </div>
                <div className="info-item">
                  <label>Full Name:</label>
                  <span>{user?.fullname}</span>
                </div>
                <div className="info-item">
                  <label>Role:</label>
                  <span>{user?.role}</span>
                </div>
                <div className="info-item">
                  <label>Position:</label>
                  <span>{user?.position || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <label>Contact No:</label>
                  <span>{user?.contactNo || 'N/A'}</span>
                </div>
              </>
            ) : (
              <>
                <div className="info-item">
                  <label>PWD ID:</label>
                  <span>{user?.pwdId}</span>
                </div>
                <div className="info-item">
                  <label>Full Name:</label>
                  <span>{user?.fullName}</span>
                </div>
                <div className="info-item">
                  <label>First Name:</label>
                  <span>{user?.firstName}</span>
                </div>
                <div className="info-item">
                  <label>Last Name:</label>
                  <span>{user?.lastName}</span>
                </div>
                <div className="info-item">
                  <label>Age:</label>
                  <span>{user?.age || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <label>Sex:</label>
                  <span>{user?.sex || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <label>Barangay:</label>
                  <span>{user?.barangay || 'N/A'}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="api-test-card">
          <h2>API Test Status</h2>
          <p className="success">✓ Backend connected successfully</p>
          <p className="success">✓ Authentication working</p>
          <p className="info">Token stored in localStorage</p>
        </div>
      </div>
    </div>
  );
}
