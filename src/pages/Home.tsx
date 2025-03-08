import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { TiltButton } from '../components/TiltButton';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const headerRef = useRef(null);
  const featuresRef = useRef(null);
  const textRefs = {
    title: useRef(null),
    subtitle: useRef(null),
    stats: useRef(null),
  };

  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["DELICIOUS", "HEALTHY", "YUMMY", "NUTRITIOUS", "AMAZING"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(textRefs.title.current, {
      x: -100,
      opacity: 0,
      duration: 1,
    })
    .from(textRefs.subtitle.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
    }, '-=0.5')
    .from(textRefs.stats.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
    }, '-=0.3')
    .from('.hero-image', {
      x: 100,
      opacity: 0,
      duration: 1,
    }, '-=0.8');

    gsap.from('.feature-item', {
      scrollTrigger: {
        trigger: featuresRef.current,
        start: 'top center',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[rgb(229,232,235)]">
      <div ref={headerRef} className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left lg:ml-[-20px] sm:ml-0">
              <p 
                ref={textRefs.title}
                className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 leading-tight text-gray-700"
              >
                PROTEIN COOKIES
              </p>
              <div 
                ref={textRefs.subtitle}
                className="text-4xl sm:text-6xl mb-1 font-bold text-gray-900"
              >
                THE MOST
                <span className="relative h-16 sm:h-24 overflow-hidden pl-[13px] block sm:inline">
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-extrabold text-4xl sm:text-6xl text-gray-600"
                      initial={{ opacity: 0, y: 50 }}
                      animate={
                        titleNumber === index
                          ? {
                              y: 0,
                              opacity: 1,
                            }
                          : {
                              y: titleNumber > index ? -50 : 50,
                              opacity: 0,
                            }
                      }
                      transition={{ type: "spring", stiffness: 100 }}
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
                <p className="text-gray-900 text-3xl sm:text-6xl mt-4 sm:mt-0">PROTEIN COOKIES IN THE GAME</p>
              </div>
              
              <div 
                ref={textRefs.stats}
                className="flex gap-6 sm:gap-12 mb-8 sm:mb-12 mt-8"
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-amber-600">15g</div>
                  <div className="text-sm sm:text-base text-gray-600">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-amber-600">4g</div>
                  <div className="text-sm sm:text-base text-gray-600">Collagen</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-amber-600">Low</div>
                  <div className="text-sm sm:text-base text-gray-600">Calorie</div>
                </div>
              </div>

              <TiltButton to="/shop">Shop Now</TiltButton>
            </div>

            <div className="hero-image relative h-[300px] sm:h-[400px] lg:h-[600px] w-full overflow-hidden flex items-center justify-center lg:ml-[65px]">
              <img
                src="https://drinkctrl.com/cdn/shop/files/collection-page-mobile-cookies_b1319fc0-05bf-4b38-bcee-ab7e30b6716d_1920x.jpg?v=1733422227"
                alt="Protein Cookie"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div ref={featuresRef} className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">Why Choose Our Cookies?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="feature-item text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">High Protein</h3>
              <p className="text-gray-600">16g of premium protein per cookie</p>
            </div>
            <div className="feature-item text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Natural Ingredients</h3>
              <p className="text-gray-600">Made with clean, wholesome ingredients</p>
            </div>
            <div className="feature-item text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">😋</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Amazing Taste</h3>
              <p className="text-gray-600">Delicious flavors you'll love</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};