import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import LoginForm from '../../components/LoginForm/LoginForm';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.css';

export default function Login() {
  const { isLoggedIn } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const toggleSignup = () => {
    setIsSignup(!isSignup);
  };
  if (isLoggedIn) {
    return (
      <div className={styles.goBack}>
        <p>You are already logged in.</p>
        <button onClick={goBack}>Go Back</button>
      </div>
    );
  }
  return (
    <div className={styles.login}>
      <header>
        <Link to='/'>
          <Logo width='150px' height='150px' />
        </Link>
      </header>
      <main className={styles.main}>
        <LoginForm isSignup={isSignup} />
        <SocialLogin />
        <button onClick={toggleSignup}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
        </button>
      </main>
    </div>
  );
}
