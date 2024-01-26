import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Cart() {
  const item = useLocation().state;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <>
      <img src={item.image.imageUrl} alt='' />
      <span>{item.title}</span>
      <span>{item.price}</span>
      <button onClick={handleClick}>Check out</button>
    </>
  );
}
