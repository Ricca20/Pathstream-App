import { useState } from 'react'
import LoginPage from './pages/login-page'
import RegisterPage from './pages/register-page'
import DashboardPage from './pages/dashboard-page'
import EnrolledCoursesPage from './pages/enrolled-courses-page'
import './index.css'

export default function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);

  const toggleView = () => {
    setCurrentView(currentView === 'login' ? 'register' : 'login');
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  const handleViewMyCourses = () => {
    setCurrentView('my-courses');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  return (
    <>
      {currentView === 'login' && (
        <LoginPage
          onRegisterClick={toggleView}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {currentView === 'register' && (
        <RegisterPage onLoginClick={toggleView} />
      )}
      {currentView === 'dashboard' && (
        <DashboardPage
          user={user}
          onLogout={handleLogout}
          onViewMyCourses={handleViewMyCourses}
        />
      )}
      {currentView === 'my-courses' && (
        <EnrolledCoursesPage
          user={user}
          onLogout={handleLogout}
          onBackToDashboard={handleBackToDashboard}
        />
      )}
    </>
  )
}


