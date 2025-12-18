import { useState } from 'react'
import LoginPage from './pages/login-page'
import RegisterPage from './pages/register-page'
import './index.css'

export default function App() {
  const [currentView, setCurrentView] = useState('login');

  const toggleView = () => {
    setCurrentView(currentView === 'login' ? 'register' : 'login');
  };

  return (
    <>
      {currentView === 'login' ? (
        <LoginPage onRegisterClick={toggleView} />
      ) : (
        <RegisterPage onLoginClick={toggleView} />
      )}
    </>
  )
}


