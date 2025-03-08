import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, X, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cookies } from '../data/cookies';

export const Navbar = () => {
  const { cartItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const filteredCookies = cookies.filter(cookie =>
    cookie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <nav className="fixed w-[95%] left-1/2 -translate-x-1/2 top-4 bg-white shadow-lg rounded-2xl z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <div className="flex flex-col items-center">
                <span className="text-lg sm:text-xl font-black tracking-tight">POWER BITE</span>
                <span className="text-[8px] sm:text-[10px] text-gray-600 font-medium tracking-wide">POWER IN EVERY BITE</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-amber-600">Home</Link>
              <div className="relative group">
                <Link to="/shop" className="text-gray-700 hover:text-amber-600">Shop</Link>
                <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-lg mt-2 py-2">
                  <Link to="/shop?category=chocolate" className="block px-4 py-2 text-gray-700 hover:bg-amber-50">
                    Chocolate Cookies
                  </Link>
                  <Link to="/shop?category=peanut-butter" className="block px-4 py-2 text-gray-700 hover:bg-amber-50">
                    Peanut Butter Cookies
                  </Link>
                  <Link to="/shop?category=special" className="block px-4 py-2 text-gray-700 hover:bg-amber-50">
                    Special Edition
                  </Link>
                </div>
              </div>
              <Link to="/about" className="text-gray-700 hover:text-amber-600">About</Link>
              
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700 hover:text-amber-600"
              >
                <Search className="h-6 w-6" />
              </button>

              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-amber-600" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link to="/cart" className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/shop" className="text-gray-700 hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>
                  Shop
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 sm:pt-32 px-4">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl">
            <div className="p-4 border-b flex items-center">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cookies..."
                className="flex-1 ml-3 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {searchQuery && (
              <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto">
                {filteredCookies.map(cookie => (
                  <Link
                    key={cookie.id}
                    to={`/shop?product=${cookie.id}`}
                    className="flex items-center p-4 hover:bg-gray-50"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <img
                      src={cookie.image}
                      alt={cookie.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-sm sm:text-base">{cookie.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{cookie.description}</p>
                      <p className="text-amber-600 font-medium text-sm sm:text-base">${cookie.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
                {filteredCookies.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No cookies found matching your search.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};