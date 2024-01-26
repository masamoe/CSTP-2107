import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../apis/firebase';

export default function ItemDetail() {
  const item = useLocation().state;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/cart', { state: item });
  };
  return (
    <>
      <img src={item.image.imageUrl} alt='' />
      <span>{item.title}</span>
      <span>{item.price}</span>
      <p>{item.description}</p>
      <button onClick={handleClick}>Add to cart</button>
    </>
  );
}
