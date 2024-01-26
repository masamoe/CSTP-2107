import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/login';

  return (
    <AuthProvider>
      {!isLoginPage && <Header />}
      <Outlet />
    </AuthProvider>
  );
}
