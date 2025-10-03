import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserService } from '../../services/userService.ts';
import { UserRole, UserStatus } from '../../types/index.ts';
import type { UserResponse } from '../../types/index.ts';
import './Users.css';

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | ''>('');
  const [filterStatus, setFilterStatus] = useState<UserStatus | ''>('');

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await UserService.getAll(
        filterStatus || undefined,
        filterRole || undefined
      );
      setUsers(data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [filterRole, filterStatus]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await UserService.delete(id);
      await loadUsers();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Users</h1>
        <div className="header-actions">
          <Link to="/users/stats" className="btn btn-info">
            View Statistics
          </Link>
          <Link to="/users/new" className="btn btn-primary">
            Add New User
          </Link>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="filterRole">Filter by Role:</label>
          <select
            id="filterRole"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as UserRole | '')}
          >
            <option value="">All Roles</option>
            <option value={UserRole.ADMIN}>Admin</option>
            <option value={UserRole.MANAGER}>Manager</option>
            <option value={UserRole.USER}>User</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="filterStatus">Filter by Status:</label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as UserStatus | '')}
          >
            <option value="">All Statuses</option>
            <option value={UserStatus.ACTIVE}>Active</option>
            <option value={UserStatus.INACTIVE}>Inactive</option>
            <option value={UserStatus.SUSPENDED}>Suspended</option>
            <option value={UserStatus.PENDING_VERIFICATION}>Pending Verification</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={8} className="no-data">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge badge-role-${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-status-${user.status.toLowerCase()}`}>
                      {user.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleDateString()
                      : 'Never'}
                  </td>
                  <td>
                    <div className="actions">
                      <Link to={`/users/${user.id}`} className="btn btn-sm btn-info">
                        View
                      </Link>
                      <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-warning">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
