import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Syllabus from "./pages/Syllabus";
import AddStudent from "./pages/AddStudent";
import AddResults from "./pages/AddResults";
import ViewResults from "./pages/ViewResults";
import AcademicCalendar from "./pages/Calendar";
import ManageSubjects from "./pages/ManageSubjects";
import ResultsUpload from "./pages/ResultsUpload";
import AddSubject from "./pages/AddSubject";
import SubjectList from "./pages/SubjectList";
import ViewStudents from "./pages/ViewStudents";
import Profile from "./pages/Profile";
import AddEvent from "./pages/AddEvent";
import Dashboard from "./pages/Dashboard";
import StudentUpload from "./pages/StudentUpload";
import SemesterResults from "./pages/SemesterResults";
import Sidebar from "./components/layout/Sidebar";
import './styles/theme.css';

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

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/syllabus" element={<Syllabus />} />

        {/* Dashboard / Protected Routes */}
        <Route path="/teacher-dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/upload-excel" element={
          <ProtectedRoute>
            <ResultsUpload />
          </ProtectedRoute>
        } />

        <Route path="/add-student" element={
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        } />

        <Route path="/add-results" element={
          <ProtectedRoute>
            <AddResults />
          </ProtectedRoute>
        } />

        <Route path="/view-results" element={
          <ProtectedRoute>
            <ViewResults />
          </ProtectedRoute>
        } />
        <Route path="/semester-results" element={
          <ProtectedRoute>
            <SemesterResults />
          </ProtectedRoute>
        } />

        <Route path="/calendar" element={
          <ProtectedRoute>
            <AcademicCalendar />
          </ProtectedRoute>
        } />

        <Route path="/manage-subjects" element={
          <ProtectedRoute>
            <ManageSubjects />
          </ProtectedRoute>
        } />

        <Route path="/view-students" element={
          <ProtectedRoute>
            <ViewStudents />
          </ProtectedRoute>
        } />

        <Route path="/add-subject" element={
          <ProtectedRoute>
            <AddSubject />
          </ProtectedRoute>
        } />

        <Route path="/student-upload" element={
          <ProtectedRoute>
            <StudentUpload />
          </ProtectedRoute>
        } />

        <Route path="/subject-list" element={
          <ProtectedRoute>
            <SubjectList />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/add-event" element={
          <ProtectedRoute>
            <AddEvent />
          </ProtectedRoute>
        } />

        <Route path="/student-dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}