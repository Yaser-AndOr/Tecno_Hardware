"use client";

import React, { useState } from 'react';
import ProductList from './components/ProductList';
import CartModal from './components/CartModal';
import './page.module.css';
import productsData from './data';

export default function Home() {
    const [products, setProducts] = useState(productsData);
    const [cart, setCart] = useState([]);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  
    const addToCart = (product) => {
      setProducts(products.map(p => 
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      ));
      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
        setCart(cart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    };
  
    const removeFromCart = (productId) => {
      const productToRemove = cart.find(item => item.id === productId);
      if (productToRemove) {
        setProducts(products.map(p => 
          p.id === productId ? { ...p, quantity: p.quantity + productToRemove.quantity } : p
        ));
        setCart(cart.filter(item => item.id !== productId));
      }
    };
  
    const clearCart = () => {
      if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        setCart([]);
        setProducts(productsData);
      }
    };
  
    const completePurchase = () => {
      if (window.confirm("¿Estás seguro de que quieres finalizar la compra?")) {
        setCart([]);
      }
    };
  
    const handleOpenCartModal = () => {
      setIsCartModalOpen(true);
    };
  
    const handleCloseCartModal = () => {
      setIsCartModalOpen(false);
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Tecno Hardware</h1>
          <button onClick={handleOpenCartModal}>Carrito ({cart.length})</button>
        </header>
        <main>
          <ProductList products={products} addToCart={addToCart} />
        </main>
        {isCartModalOpen && (
          <CartModal 
            cartItems={cart} 
            onClose={handleCloseCartModal} 
            clearCart={clearCart} 
            completePurchase={completePurchase} 
            removeFromCart={removeFromCart} 
          />
        )}
      </div>
    );
}
