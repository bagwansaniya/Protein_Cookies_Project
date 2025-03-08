import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { cookies } from '../data/cookies';
import { ProductCard } from '../components/ProductCard';

const categories = {
  'chocolate': 'Chocolate Cookies',
  'peanut-butter': 'Peanut Butter Cookies',
  'special': 'Special Edition'
};

export const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = React.useState(category || 'all');

  useEffect(() => {
    gsap.from('.product-grid', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, [selectedCategory]);

  const filteredCookies = selectedCategory === 'all'
    ? cookies
    : cookies.filter(cookie => {
        if (selectedCategory === 'chocolate') {
          return cookie.name.toLowerCase().includes('chocolate');
        }
        if (selectedCategory === 'peanut-butter') {
          return cookie.name.toLowerCase().includes('peanut butter');
        }
        if (selectedCategory === 'special') {
          return cookie.name.toLowerCase().includes('birthday');
        }
        return true;
      });

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-12 bg-gray-50" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-8 sm:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Our Cookies</h1>
            <p className="text-gray-600">Premium protein cookies for your gains</p>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 sm:px-6 py-2 sm:py-3 border rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          >
            <option value="all">All Cookies</option>
            {Object.entries(categories).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="product-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCookies.map((cookie) => (
            <ProductCard key={cookie.id} cookie={cookie} />
          ))}
        </div>
      </div>
    </div>
  );
};