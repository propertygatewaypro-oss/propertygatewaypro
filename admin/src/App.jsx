import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout
import AdminLayout from './components/layout/AdminLayout';

// Pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ManageProperties = lazy(() => import('./pages/ManageProperties'));
const AddEditPropertyPage = lazy(() => import('./pages/AddEditPropertyPage'));
const ManageLeads = lazy(() => import('./pages/ManageLeads'));
const ManageTestimonials = lazy(() => import('./pages/ManageTestimonials'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-canvas)] flex items-center justify-center" aria-label="Authenticating session">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#A88548] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-500 font-mono">Authenticating...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AdminRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-canvas)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#A88548] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="min-h-screen" aria-label="Loading admin page" />}><Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} 
      />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="properties" element={<ManageProperties />} />
        <Route path="properties/add" element={<AddEditPropertyPage />} />
        <Route path="properties/new" element={<AddEditPropertyPage />} />
        <Route path="properties/edit/:id" element={<AddEditPropertyPage />} />
        <Route path="leads" element={<ManageLeads />} />
        <Route path="testimonials" element={<ManageTestimonials />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></Suspense>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AdminRoutes />
      </AuthProvider>
    </Router>
  );
}
