import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>Welcome to LAMB UPEU SIS</h1>
        <p>Hello, {user?.firstName} {user?.lastName}!</p>
        <p className="user-role">Role: {user?.role}</p>
      </div>

      <div className="cards-grid">
        <Link to="/categories" className="dashboard-card">
          <div className="card-icon">📁</div>
          <h2>Categories</h2>
          <p>Manage product categories</p>
        </Link>

        <Link to="/users" className="dashboard-card">
          <div className="card-icon">👥</div>
          <h2>Users</h2>
          <p>Manage system users</p>
        </Link>

        <Link to="/users/stats" className="dashboard-card">
          <div className="card-icon">📊</div>
          <h2>Statistics</h2>
          <p>View user statistics</p>
        </Link>
      </div>

      <div className="info-section">
        <h2>System Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <strong>Backend API:</strong>
            <span>http://localhost:8080/api/v1</span>
          </div>
          <div className="info-item">
            <strong>Authentication:</strong>
            <span>JWT Bearer Token</span>
          </div>
          <div className="info-item">
            <strong>Last Login:</strong>
            <span>{user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
