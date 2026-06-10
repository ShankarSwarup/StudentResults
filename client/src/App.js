import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NotificationProvider } from './context/NotificationContext';
import NotificationContainer from './components/common/NotificationContainer';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';
import './styles/theme.css';

// Lazy load all pages for Code Splitting (Performance Optimization)
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Syllabus = lazy(() => import('./pages/Syllabus'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AddStudent = lazy(() => import('./pages/AddStudent'));
const AddResults = lazy(() => import('./pages/AddResults'));
const ViewResults = lazy(() => import('./pages/ViewResults'));
const AcademicCalendar = lazy(() => import('./pages/Calendar'));
const ManageSubjects = lazy(() => import('./pages/ManageSubjects'));
const ResultsUpload = lazy(() => import('./pages/ResultsUpload'));
const AddSubject = lazy(() => import('./pages/AddSubject'));
const SubjectList = lazy(() => import('./pages/SubjectList'));
const ViewStudents = lazy(() => import('./pages/ViewStudents'));
const Profile = lazy(() => import('./pages/Profile'));
const AddEvent = lazy(() => import('./pages/AddEvent'));
const StudentUpload = lazy(() => import('./pages/StudentUpload'));
const SemesterResults = lazy(() => import('./pages/SemesterResults'));

const PageLoader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        <div className="spinner"></div>
    </div>
);

export default function App() {
  return (
    <NotificationProvider>
      <NotificationContainer />
      <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/syllabus" element={<Syllabus />} />

            {/* Dashboard / Protected Routes */}
            <Route path="/teacher-dashboard" element={
              <ProtectedRoute requiredRole="teacher">
                <Dashboard />
              </ProtectedRoute>
            } />

        <Route path="/upload-excel" element={
          <ProtectedRoute requiredRole="teacher">
            <ResultsUpload />
          </ProtectedRoute>
        } />

        <Route path="/add-student" element={
          <ProtectedRoute requiredRole="teacher">
            <AddStudent />
          </ProtectedRoute>
        } />

        <Route path="/add-results" element={
          <ProtectedRoute requiredRole="teacher">
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
          <ProtectedRoute requiredRole="teacher">
            <ViewStudents />
          </ProtectedRoute>
        } />

        <Route path="/add-subject" element={
          <ProtectedRoute requiredRole="teacher">
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
          <ProtectedRoute requiredRole="teacher">
            <AddEvent />
          </ProtectedRoute>
        } />

        <Route path="/student-dashboard" element={
          <ProtectedRoute requiredRole="student">
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
    </NotificationProvider>
  );
}