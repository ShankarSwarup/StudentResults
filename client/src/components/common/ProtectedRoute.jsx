import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../layout/Sidebar';

// Dashboard Layout component
const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout fade-in">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div className="spinner"></div>
      </div>
  );
  
  if (!user) return <Navigate to="/login" replace />;

  const isTeacher = user.tid !== undefined;
  
  if (requiredRole === 'teacher' && !isTeacher) {
      return <Navigate to="/student-dashboard" replace />;
  }
  
  if (requiredRole === 'student' && isTeacher) {
      return <Navigate to="/teacher-dashboard" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProtectedRoute;
