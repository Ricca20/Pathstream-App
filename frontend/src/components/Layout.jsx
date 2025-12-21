import React from 'react';
import { useAuth } from '../context/AuthContext';
import Chatbot from './Chatbot';

const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <>
      {children}
      {user && <Chatbot token={user.token} />}
    </>
  );
};

export default Layout;
