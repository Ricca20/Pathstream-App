import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import HomePage from './pages/home-page';
import DashboardPage from './pages/dashboard-page';
import InstructorDashboard from './pages/instructor-dashboard';
import EnrolledCoursesPage from './pages/enrolled-courses-page';
import CourseDetailsPage from './pages/course-details-page';
import './index.css';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<ProtectedRoute><Layout><HomePage /></Layout></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Layout><DashboardPage /></Layout></ProtectedRoute>} />
        <Route path="/my-courses" element={<ProtectedRoute><Layout><EnrolledCoursesPage /></Layout></ProtectedRoute>} />
        <Route path="/instructor-dashboard" element={<ProtectedRoute><Layout><InstructorDashboard /></Layout></ProtectedRoute>} />
        <Route path="/course/:id" element={<ProtectedRoute><Layout><CourseDetailsPage /></Layout></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
