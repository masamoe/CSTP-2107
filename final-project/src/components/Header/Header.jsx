import React from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../Logo/Logo';
import { logout } from '../../apis/firebase';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, loading, fetchData } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    await fetchData();

    navigate('/');
  };

  return (
    !loading && (
      <header className={styles.header}>
        <Link to='/' className={styles.link}>
          <Logo width='40px' height='40px' />
          <h1 className={styles.title}>Mall</h1>
        </Link>
        <nav className={styles.nav}>
          {!user && <Link to='login'>Login</Link>}
          {user && (
            <>
              {user?.isAdmin && <Link to='management'>Management</Link>}

              <Link className={styles.profile} to='/profile'>
                <span className={styles.greeting}>Hi!</span>
                <span>{user?.username.split(' ')[0]}</span>
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </header>
    )
  );
}
