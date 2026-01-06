import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/common/Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/student/StudentDashboard';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import EnrolledCoursesPage from './pages/student/EnrolledCoursesPage';
import CourseDetailsPage from './pages/student/CourseDetailsPage';
import './index.css';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courses" element={<ProtectedRoute><Layout><StudentDashboard /></Layout></ProtectedRoute>} />
        <Route path="/my-courses" element={<ProtectedRoute><Layout><EnrolledCoursesPage /></Layout></ProtectedRoute>} />
        <Route path="/instructor-dashboard" element={<ProtectedRoute><Layout><InstructorDashboard /></Layout></ProtectedRoute>} />
        <Route path="/course/:id" element={<ProtectedRoute><Layout><CourseDetailsPage /></Layout></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
