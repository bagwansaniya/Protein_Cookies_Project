import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Cookie } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  cookie: Cookie;
}

export const ProductCard = ({ cookie }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      className="flex flex-col group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative isolate w-full pt-[125%]">
        {/* New Tag */}
        <div className="absolute z-50 md:top-5 md:right-5 top-2.5 right-2.5">
          <div className="bg-white text-black p-2 rounded text-xs uppercase font-black">
            NEW
          </div>
        </div>

        {/* Product Image */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full rounded-2xl bg-amber-100 overflow-hidden"
          whileHover={{ rotate: 2 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={cookie.image} 
            alt={cookie.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </motion.div>

        {/* Bottom Tag */}
        <div className="absolute z-10 md:bottom-5 bottom-2.5 md:left-5 left-2.5 bg-white text-black text-xs rounded-full px-3 sm:px-4 py-2 sm:py-2.5">
          Box of Premium Protein Cookies
        </div>

        {/* Quick Add Button */}
        <button 
          onClick={() => addToCart(cookie)}
          className="absolute md:bottom-5 md:right-5 bottom-2.5 right-2.5 w-9 h-9 sm:w-11 sm:h-11 bg-white text-black rounded-full hidden group-hover:flex items-center justify-center hover:scale-110 duration-300 transition-all z-20"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex items-start justify-between pt-3">
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-base sm:text-lg lg:text-xl font-medium">{cookie.name}</h3>
          <p className="text-sm sm:text-base">${cookie.price.toFixed(2)}</p>
          <div className="text-xs mb-4 text-gray-600">
            Premium Protein Cookie
          </div>
        </div>

        {/* Tags */}
        <div className="hidden sm:flex flex-col gap-1.5 items-end">
          <div className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full flex items-center justify-center text-xs bg-black/5">
            <p className="opacity-70">{cookie.nutrition.protein}g Protein</p>
          </div>
          {cookie.ingredients.slice(0, 1).map((ingredient, index) => (
            <div key={index} className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full flex items-center justify-center text-xs bg-black/5">
              <p className="opacity-70">{ingredient}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Buttons */}
      <div className="flex gap-2 mt-4 sm:hidden">
        <button className="flex-1 bg-gray-100 text-black py-2 rounded-full text-sm font-medium">
          View
        </button>
        <button 
          onClick={() => addToCart(cookie)}
          className="flex-1 bg-amber-600 text-white py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
    </motion.div>
  );
};