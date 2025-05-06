import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentMarketplace from './pages/student/StudentMarketplace';
import StudentTransactions from './pages/student/StudentTransactions';
import ProfessorDashboard from './pages/professor/ProfessorDashboard';
import ProfessorTransactions from './pages/professor/ProfessorTransactions';
import CompanyDashboard from './pages/company/CompanyDashboard';
import CompanyBenefits from './pages/company/CompanyBenefits';
import Layout from './components/layout/Layout';
import Toast from './components/common/Toast';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Toast />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route element={<Layout />}>
              {/* Student Routes */}
              <Route path="/student" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/student/marketplace" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentMarketplace />
                </ProtectedRoute>
              } />
              <Route path="/student/transactions" element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentTransactions />
                </ProtectedRoute>
              } />
              
              {/* Professor Routes */}
              <Route path="/professor" element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/professor/transactions" element={
                <ProtectedRoute allowedRoles={['professor']}>
                  <ProfessorTransactions />
                </ProtectedRoute>
              } />
              
              {/* Company Routes */}
              <Route path="/company" element={
                <ProtectedRoute allowedRoles={['company']}>
                  <CompanyDashboard />
                </ProtectedRoute>
              } />
              <Route path="/company/benefits" element={
                <ProtectedRoute allowedRoles={['company']}>
                  <CompanyBenefits />
                </ProtectedRoute>
              } />
            </Route>
            
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;