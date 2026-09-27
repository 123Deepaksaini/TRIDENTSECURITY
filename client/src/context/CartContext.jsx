import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('trident_quote_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [shiftDuration, setShiftDuration] = useState('24_HOURS'); // '8_HOURS', '12_HOURS', '24_HOURS'
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('trident_quote_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (service, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: service.id,
          title: service.title,
          category: service.category,
          quantity: quantity,
          shift: '24_HOURS'
        }
      ];
    });
    setIsCartModalOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        shiftDuration,
        setShiftDuration,
        totalItemCount,
        isCartModalOpen,
        setIsCartModalOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
