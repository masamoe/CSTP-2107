import React, { useEffect, useState } from 'react';
import { login, signup } from '../../apis/firebase';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginForm({ isSignup }) {
  const navigate = useNavigate();
  const { fetchData } = useAuth();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (isSignup && userInfo.password !== userInfo.confirmPassword) {
      alert(`Your passwords don't match`);
      return;
    }
    try {
      await (isSignup
        ? signup(userInfo.email, userInfo.password)
        : login(userInfo.email, userInfo.password));
      await fetchData();

      navigate(-1);
    } catch (e) {
      alert(e.code);
    }
  };

  useEffect(() => {
    setUserInfo({
      email: '',
      password: '',
      confirmPassword: '',
    });
  }, [isSignup]);

  return (
    <form className={styles.form} onSubmit={handleEmailLogin}>
      <input
        type='email'
        name='email'
        placeholder='Enter your email'
        value={userInfo.email}
        onChange={handleInputChange}
        minLength='7'
        required
      />
      <input
        type='password'
        name='password'
        placeholder='Enter your password'
        value={userInfo.password}
        onChange={handleInputChange}
        minLength='7'
        required
      />
      {isSignup && (
        <>
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm your password'
            value={userInfo.confirmPassword}
            onChange={handleInputChange}
            minLength='7'
            required
          />
        </>
      )}
      <button className={styles.button}>
        {isSignup ? 'Sign up' : 'Login'}
      </button>
    </form>
  );
}
