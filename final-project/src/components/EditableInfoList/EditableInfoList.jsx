import React, { useState } from 'react';

import EditableInfoItem from '../EditableInfoItem/EditableInfoItem';
import { useAuth } from '../../contexts/AuthContext';
import { deleteAccount } from '../../apis/firebase';
import { useNavigate } from 'react-router-dom';

const EDITABLE_INFO_LIST = [
  { label: 'username', value: 'username' },
  { label: 'phoneNumber', value: 'phone number' },
  { label: 'password', value: 'password' },
];

export default function EditableInfoList() {
  const { user, fetchData } = useAuth();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const toggleIsDeleting = () => {
    setEmail('');
    setIsDeleting(!isDeleting);
  };
  const handleDelete = async () => {
    await deleteAccount();
    await fetchData();

    navigate('/');
  };
  return (
    <>
      <ul>
        {EDITABLE_INFO_LIST.map((item, i) => (
          <EditableInfoItem key={'list_' + i} item={item} />
        ))}
      </ul>
      <button onClick={toggleIsDeleting} disabled={isDeleting}>
        Delete Account
      </button>
      {isDeleting && (
        <>
          <p>Are you sure you want to delete your account?</p>
          <p>Please enter your email for confirmation:</p>
          <input type='email' value={email} onChange={handleChange} />
          <button disabled={user.email !== email} onClick={handleDelete}>
            Delete
          </button>
          <button onClick={toggleIsDeleting}>Cancel</button>
        </>
      )}
    </>
  );
}
