import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updateUserInfo } from '../../apis/firebase';

export default function EditableInfoItem({ item: { label, value } }) {
  const { user, fetchData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newInfo, setNewInfo] = useState(
    label === 'password'
      ? { [label]: '', confirmPassword: '' }
      : { [label]: '' }
  );
  const updatingPassword = label === 'password';
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleChange = (e, label) => {
    setNewInfo({ ...newInfo, [label]: e.target.value });
  };
  const handleSave = async () => {
    if (!newInfo[label]) {
      return;
    }
    if (updatingPassword) {
      if (newInfo.password.length < 7) {
        alert('Password must be at least 7 characters');
        return;
      }
      if (newInfo.password !== newInfo.confirmPassword) {
        alert('Password do not match');
        return;
      }
      await updateUserInfo(newInfo.password, updatingPassword);
      setNewInfo({ password: '', confirmPassword: '' });
    } else {
      await updateUserInfo(newInfo);
      setNewInfo({ [label]: '' });
    }
    await fetchData();
    setIsEditing(false);
  };
  return (
    <li>
      <h3>{value}</h3>
      {updatingPassword ? (
        <span>********</span>
      ) : (
        <span>{user[label] || `${value} has not been set yet.`}</span>
      )}
      {!isEditing ? (
        <button onClick={handleEdit}>Edit</button>
      ) : (
        <>
          <span>New {value}</span>
          <input
            type={updatingPassword ? 'password' : 'text'}
            value={newInfo[label]}
            onChange={(e) => handleChange(e, label)}
          />
          {updatingPassword && (
            <input
              type='password'
              value={newInfo.confirmPassword}
              onChange={(e) => handleChange(e, 'confirmPassword')}
            />
          )}
          <button onClick={handleSave}>Save</button>
        </>
      )}
    </li>
  );
}
