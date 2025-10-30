import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UsersList from './features/users/UsersList';
import UserEdit from './features/users/UserEdit';
import ProfilesList from './features/profiles/ProfilesList';
import ProfileEdit from './features/profiles/ProfileEdit';
import SessionsList from './features/sessions/SessionsList';
import SessionEdit from './features/sessions/SessionEdit';
import UserRolesList from './features/user-roles/UserRolesList';
import UserRoleEdit from './features/user-roles/UserRoleEdit';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UsersList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <ProtectedRoute>
            <UserEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profiles"
        element={
          <ProtectedRoute>
            <ProfilesList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profiles/:id"
        element={
          <ProtectedRoute>
            <ProfileEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sessions"
        element={
          <ProtectedRoute>
            <SessionsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sessions/:id"
        element={
          <ProtectedRoute>
            <SessionEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-roles"
        element={
          <ProtectedRoute>
            <UserRolesList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-roles/:id"
        element={
          <ProtectedRoute>
            <UserRoleEdit />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
