import React, { useEffect, useState } from 'react';
// Import the featuredProducts data

import { getProducts } from '../apis/firebase';
import { Link } from 'react-router-dom';

export default function Items() {
  const [products, setProducts] = useState();
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    const products = await getProducts();
    setProducts(products);
  };
  return (
    products && (
      <ul>
        {products.map((item) => (
          <li key={item.id}>
            <Link to={`items/${item.id}`} state={item}>
              <img src={item.image.imageUrl} alt='' />
              <span>{item.title}</span>
              <span>{item.price}</span>
            </Link>
          </li>
        ))}
      </ul>
    )
  );
}
