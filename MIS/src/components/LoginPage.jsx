import { useState } from 'react';
import './LoginPage.css';
import { AdminLogin } from './AdminLogin';
import { PWDLogin } from './PWDLogin';

export function LoginPage() {
  const [activeTab, setActiveTab] = useState('admin');

  return (
    <div className="login-page">
      <div className="login-header">
        <h1>Nangka MIS</h1>
        <p>Management Information System</p>
      </div>

      <div className="login-tabs">
        <button
          className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
          onClick={() => setActiveTab('admin')}
        >
          Admin Login
        </button>
        <button
          className={`tab-btn ${activeTab === 'pwd' ? 'active' : ''}`}
          onClick={() => setActiveTab('pwd')}
        >
          PWD Login
        </button>
      </div>

      <div className="login-content">
        {activeTab === 'admin' ? <AdminLogin /> : <PWDLogin />}
      </div>
    </div>
  );
}
