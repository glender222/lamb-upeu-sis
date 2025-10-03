import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ProtectedRoute } from './components/common/ProtectedRoute.tsx';
import { Layout } from './components/layout/Layout.tsx';

// Auth Pages
import { Login } from './pages/auth/Login.tsx';
import { Register } from './pages/auth/Register.tsx';

// Dashboard
import { Dashboard } from './pages/Dashboard.tsx';

// Category Pages
import { CategoryList } from './pages/categories/CategoryList.tsx';
import { CategoryCreate } from './pages/categories/CategoryCreate.tsx';
import { CategoryEdit } from './pages/categories/CategoryEdit.tsx';
import { CategoryView } from './pages/categories/CategoryView.tsx';

// User Pages
import { UserList } from './pages/users/UserList.tsx';
import { UserCreate } from './pages/users/UserCreate.tsx';
import { UserEdit } from './pages/users/UserEdit.tsx';
import { UserView } from './pages/users/UserView.tsx';
import { UserStats } from './pages/users/UserStats.tsx';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Category Routes */}
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Layout>
                  <CategoryList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <CategoryCreate />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <CategoryView />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/:id/edit"
            element={
              <ProtectedRoute>
                <Layout>
                  <CategoryEdit />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/new"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserCreate />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/stats"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserStats />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserView />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id/edit"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserEdit />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
