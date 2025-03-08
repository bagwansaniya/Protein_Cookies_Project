import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    gsap.from('.cart-item', {
      opacity: 0,
      x: -50,
      duration: 0.5,
      stagger: 0.1,
    });
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.cookie.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600">Add some delicious protein cookies to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 sm:pt-40 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.cookie.id}
                className="cart-item bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0"
              >
                <img
                  src={item.cookie.image}
                  alt={item.cookie.name}
                  className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-md"
                />
                <div className="sm:ml-6 flex-grow">
                  <h3 className="text-lg font-semibold">{item.cookie.name}</h3>
                  <p className="text-gray-600">${item.cookie.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <button
                      onClick={() => updateQuantity(item.cookie.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cookie.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cookie.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded ml-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-amber-600 text-white py-3 rounded-md hover:bg-amber-700 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};