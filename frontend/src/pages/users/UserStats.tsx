import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/userService.ts';
import type { UserStats as UserStatsType } from '../../types/index.ts';
import './Users.css';

export const UserStats: React.FC = () => {
  const [stats, setStats] = useState<UserStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await UserService.getStats();
        setStats(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <div className="loading">Loading statistics...</div>;
  }

  if (error || !stats) {
    return <div className="error-message">{error || 'Failed to load statistics'}</div>;
  }

  const totalUsers =
    stats.byRole.ADMIN + stats.byRole.MANAGER + stats.byRole.USER;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>User Statistics</h1>
        <button onClick={() => navigate('/users')} className="btn btn-secondary">
          Back to Users
        </button>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <h2>Total Users</h2>
          <div className="stats-value">{totalUsers}</div>
        </div>

        <div className="stats-card">
          <h2>By Role</h2>
          <div className="stats-list">
            <div className="stats-item">
              <span className="badge badge-role-admin">Admin</span>
              <span className="stats-count">{stats.byRole.ADMIN}</span>
            </div>
            <div className="stats-item">
              <span className="badge badge-role-manager">Manager</span>
              <span className="stats-count">{stats.byRole.MANAGER}</span>
            </div>
            <div className="stats-item">
              <span className="badge badge-role-user">User</span>
              <span className="stats-count">{stats.byRole.USER}</span>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <h2>By Status</h2>
          <div className="stats-list">
            <div className="stats-item">
              <span className="badge badge-status-active">Active</span>
              <span className="stats-count">{stats.byStatus.ACTIVE}</span>
            </div>
            <div className="stats-item">
              <span className="badge badge-status-inactive">Inactive</span>
              <span className="stats-count">{stats.byStatus.INACTIVE}</span>
            </div>
            <div className="stats-item">
              <span className="badge badge-status-suspended">Suspended</span>
              <span className="stats-count">{stats.byStatus.SUSPENDED}</span>
            </div>
            <div className="stats-item">
              <span className="badge badge-status-pending_verification">Pending</span>
              <span className="stats-count">{stats.byStatus.PENDING_VERIFICATION}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
