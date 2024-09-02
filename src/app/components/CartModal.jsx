"use client";

import React from 'react';

function CartModal({ cartItems = [], onClose, clearCart, completePurchase, removeFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveFromCart = (productId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto del carrito?")) {
      removeFromCart(productId);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Carrito de Compras</h2>
        {cartItems.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <div>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                    <pre>
                      <img src={item.urlimg} alt={item.tittle}  style={{ width: '34px', height: '40px' }} /> - {item.tittle} - {item.price} - Cantidad: {item.quantity}   <button onClick={() => handleRemoveFromCart(item.id)}>Eliminar</button>
                    </pre>
                </li>
              ))}
            </ul>
            <p>Total: ${total.toFixed(2)}</p>
            <button onClick={clearCart}>Vaciar Carrito</button>
            <button onClick={completePurchase}>Finalizar Compra</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartModal;
