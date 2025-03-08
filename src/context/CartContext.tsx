import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cookie, CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (cookie: Cookie) => void;
  removeFromCart: (cookieId: string) => void;
  updateQuantity: (cookieId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cookie: Cookie) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.cookie.id === cookie.id);
      if (existingItem) {
        return prev.map(item =>
          item.cookie.id === cookie.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { cookie, quantity: 1 }];
    });
  };

  const removeFromCart = (cookieId: string) => {
    setCartItems(prev => prev.filter(item => item.cookie.id !== cookieId));
  };

  const updateQuantity = (cookieId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(cookieId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.cookie.id === cookieId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
