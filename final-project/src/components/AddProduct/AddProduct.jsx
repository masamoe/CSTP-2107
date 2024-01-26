import React, { useEffect, useState } from 'react';
import { FaRegSquarePlus } from 'react-icons/fa6';
import styles from './AddProduct.module.css';
import { deleteProduct, getProducts, uploadProduct } from '../../apis/firebase';
export default function AddProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const [products, setProducts] = useState();

  useEffect(() => {
    fetchProduct();
  }, []);

  const toggleIsAdding = () => {
    if (isAdding) {
      setProduct({});
      setFile();
    }
    setIsAdding(!isAdding);
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({
      ...product,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct(product, file);

    setIsAdding(false);
    setFile();
    setProduct({});

    await fetchProduct();
  };
  const fetchProduct = async () => {
    const products = await getProducts();
    console.log(products);
    setProducts(products);
  };
  const handleDelete = async (id, name) => {
    await deleteProduct(id, name);
    await fetchProduct();
  };
  return (
    <>
      <button disabled={isAdding} onClick={toggleIsAdding}>
        <FaRegSquarePlus />
        <span>Add Product</span>
      </button>
      {isAdding && (
        <>
          {file && <img src={URL.createObjectURL(file)} alt='local file' />}
          <form onSubmit={handleSubmit}>
            <input
              type='file'
              accept='image/*'
              name='file'
              required
              onChange={handleChange}
            />
            <input
              type='text'
              name='title'
              value={product.title ?? ''}
              placeholder='Title'
              required
              onChange={handleChange}
            />
            <input
              className={styles.price}
              type='number'
              name='price'
              value={product.price ?? ''}
              placeholder='Price'
              required
              onChange={handleChange}
            />
            <input
              type='text'
              name='category'
              value={product.category ?? ''}
              placeholder='Category'
              required
              onChange={handleChange}
            />
            <input
              type='text'
              name='description'
              value={product.description ?? ''}
              placeholder='Description'
              required
              onChange={handleChange}
            />
            <button>Add</button>
            <button type='button' onClick={toggleIsAdding}>
              Cancel
            </button>
          </form>
        </>
      )}
      {products && (
        <ul>
          {products.map((item) => (
            <li key={item.id}>
              <img src={item.image.imageUrl} alt='' />
              <span>{item.title}</span>
              <span>{item.price}</span>
              <button onClick={() => handleDelete(item.id, item.image.name)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
