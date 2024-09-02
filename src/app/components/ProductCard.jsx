"use client";

import React, { useState } from 'react';
import './ProductCard.css';
import ModalObject from './ModalObject';

function ProductCard({ product, addToCart }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddToCart = () => {
    if (product.quantity > 0) {
      addToCart(product);
    }
  };

  return (
    <div>
      <div className="product-card">
        <img src={product.urlimg} alt={product.tittle} onClick={handleOpenModal} />
        <h2>{product.tittle}</h2>
        <h2 onClick={handleAddToCart}>Agregar al carrito</h2>
        <p>{product.price}</p>
        <p>Stock: {product.quantity}</p>
      </div>
      {isModalOpen && (
        <ModalObject onClose={() => setIsModalOpen(false)}>
          <h2>{product.tittle}</h2>
          <img src={product.urlimg} alt={product.tittle} />
          <p>{product.tittle}</p>
          <p>{product.price}</p>
        </ModalObject>
      )}
    </div>
  );
}

export default ProductCard;
