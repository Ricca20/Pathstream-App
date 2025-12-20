import { useState, useEffect } from 'react'
import LoginPage from './pages/login-page'
import RegisterPage from './pages/register-page'
import HomePage from './pages/home-page'
import DashboardPage from './pages/dashboard-page'
import InstructorDashboard from './pages/instructor-dashboard'
import EnrolledCoursesPage from './pages/enrolled-courses-page'
import './index.css'

export default function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setCurrentView('home');
    }

    const handlePopState = (event) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    window.history.pushState({ view }, '', `#${view}`);
  };

  const toggleView = () => {
    const newView = currentView === 'login' ? 'register' : 'login';
    navigateTo(newView);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigateTo('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigateTo('login');
  };

  const handleViewMyCourses = () => {
    navigateTo('my-courses');
  };

  const handleBackToHome = () => {
    navigateTo('home');
  };

  const handleViewCourses = () => {
    navigateTo('courses');
  };

  const handleViewInstructorDashboard = () => {
    navigateTo('instructor-dashboard');
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
      {currentView === 'home' && (
        <HomePage
          user={user}
          onLogout={handleLogout}
          onViewCourses={handleViewCourses}
          onViewMyCourses={handleViewMyCourses}
          onViewInstructorDashboard={handleViewInstructorDashboard}
        />
      )}
      {currentView === 'courses' && (
        <DashboardPage
          user={user}
          onLogout={handleLogout}
          onViewHome={handleBackToHome}
          onViewMyCourses={handleViewMyCourses}
          onViewInstructorDashboard={handleViewInstructorDashboard}
        />
      )}
      {currentView === 'my-courses' && (
        <EnrolledCoursesPage
          user={user}
          onLogout={handleLogout}
          onViewHome={handleBackToHome}
          onViewCourses={handleViewCourses}
          onViewInstructorDashboard={handleViewInstructorDashboard}
        />
      )}
      {currentView === 'instructor-dashboard' && (
        <InstructorDashboard
          user={user}
          onLogout={handleLogout}
          onViewHome={handleBackToHome}
          onViewCourses={handleViewCourses}
        />
      )}
    </>
  )
}


