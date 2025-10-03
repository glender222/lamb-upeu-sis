import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CategoryService } from '../../services/categoryService.ts';
import type { CategoryResponse } from '../../types/index.ts';
import './Categories.css';

export const CategoryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<CategoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const data = await CategoryService.getById(Number(id));
        setCategory(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load category');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCategory();
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Loading category...</div>;
  }

  if (error || !category) {
    return <div className="error-message">{error || 'Category not found'}</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Category Details</h1>
        <div>
          <button onClick={() => navigate(`/categories/${id}/edit`)} className="btn btn-warning">
            Edit
          </button>
          <button onClick={() => navigate('/categories')} className="btn btn-secondary">
            Back to List
          </button>
        </div>
      </div>

      <div className="detail-container">
        <div className="detail-row">
          <div className="detail-label">ID:</div>
          <div className="detail-value">{category.id}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Name:</div>
          <div className="detail-value">{category.name}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Description:</div>
          <div className="detail-value">{category.description || '-'}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Status:</div>
          <div className="detail-value">
            <span className={`badge ${category.active ? 'badge-success' : 'badge-danger'}`}>
              {category.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Created At:</div>
          <div className="detail-value">
            {new Date(category.createdAt).toLocaleString()}
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Updated At:</div>
          <div className="detail-value">
            {new Date(category.updatedAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
