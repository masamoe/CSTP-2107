import React from 'react';
import {
  gitProvider,
  googleProvider,
  loginWithSocialMedia,
} from '../../apis/firebase';
import { AiFillGoogleCircle, AiFillGithub } from 'react-icons/ai';
import styles from './SocialLogin.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function SocialLogin() {
  const { fetchData } = useAuth();
  const navigate = useNavigate();
  const handleSocialLogin = async (e) => {
    const provider =
      e.currentTarget.name === 'google' ? googleProvider : gitProvider;
    try {
      await loginWithSocialMedia(provider);
      await fetchData();

      navigate(-1);
    } catch (e) {
      alert(e.code);
    }
  };

  return (
    <ul className={styles.ul}>
      <li>
        <button name='google' onClick={handleSocialLogin}>
          <AiFillGoogleCircle />
        </button>
      </li>
      <li>
        <button name='git' onClick={handleSocialLogin}>
          <AiFillGithub />
        </button>
      </li>
    </ul>
  );
}
