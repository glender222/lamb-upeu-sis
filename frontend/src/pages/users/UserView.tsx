import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserService } from '../../services/userService.ts';
import type { UserResponse } from '../../types/index.ts';
import './Users.css';

export const UserView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await UserService.getById(Number(id));
        setUser(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadUser();
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Loading user...</div>;
  }

  if (error || !user) {
    return <div className="error-message">{error || 'User not found'}</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>User Details</h1>
        <div>
          <button onClick={() => navigate(`/users/${id}/edit`)} className="btn btn-warning">
            Edit
          </button>
          <button onClick={() => navigate('/users')} className="btn btn-secondary">
            Back to List
          </button>
        </div>
      </div>

      <div className="detail-container">
        <div className="detail-row">
          <div className="detail-label">ID:</div>
          <div className="detail-value">{user.id}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Username:</div>
          <div className="detail-value">{user.username}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Full Name:</div>
          <div className="detail-value">
            {user.firstName} {user.lastName}
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Email:</div>
          <div className="detail-value">{user.email}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Phone:</div>
          <div className="detail-value">{user.phone || '-'}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Role:</div>
          <div className="detail-value">
            <span className={`badge badge-role-${user.role.toLowerCase()}`}>
              {user.role}
            </span>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Status:</div>
          <div className="detail-value">
            <span className={`badge badge-status-${user.status.toLowerCase()}`}>
              {user.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Active:</div>
          <div className="detail-value">
            <span className={`badge ${user.active ? 'badge-success' : 'badge-danger'}`}>
              {user.active ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Last Login:</div>
          <div className="detail-value">
            {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Created At:</div>
          <div className="detail-value">
            {new Date(user.createdAt).toLocaleString()}
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Updated At:</div>
          <div className="detail-value">
            {new Date(user.updatedAt).toLocaleString()}
          </div>
        </div>

        {user.createdBy && (
          <div className="detail-row">
            <div className="detail-label">Created By:</div>
            <div className="detail-value">{user.createdBy}</div>
          </div>
        )}

        {user.updatedBy && (
          <div className="detail-row">
            <div className="detail-label">Updated By:</div>
            <div className="detail-value">{user.updatedBy}</div>
          </div>
        )}
      </div>
    </div>
  );
};
