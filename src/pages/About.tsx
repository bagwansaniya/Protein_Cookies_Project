import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail, MessageCircleMore } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  useEffect(() => {
    gsap.from('.about-content', {
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top center',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
    });

    // New animations for the connect section
    gsap.from('.connect-title', {
      scrollTrigger: {
        trigger: '.connect-section',
        start: 'top center+=100',
      },
      y: 30,
      opacity: 0,
      duration: 1,
    });

    gsap.from('.social-link', {
      scrollTrigger: {
        trigger: '.connect-section',
        start: 'top center+=100',
      },
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: 'back.out(1.7)',
    });

    // Hover animations for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.2,
          duration: 0.3,
          ease: 'back.out(2)',
        });
      });
      
      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }, []);

  return (
    <div className="py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="about-content text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Born from a passion for fitness and a love for cookies, we set out to create something revolutionary: 
            protein cookies that actually taste amazing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 about-content">
          <div className="text-center">
            <div className="bg-amber-50 rounded-lg p-8 h-full">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-4">Premium Ingredients</h3>
              <p className="text-gray-600">
                We use only the highest quality protein and natural ingredients in our cookies.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-amber-50 rounded-lg p-8 h-full">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-semibold mb-4">Fitness Focused</h3>
              <p className="text-gray-600">
                Created by fitness enthusiasts for people who care about their health and gains.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-amber-50 rounded-lg p-8 h-full">
              <div className="text-4xl mb-4">🍪</div>
              <h3 className="text-xl font-semibold mb-4">Taste First</h3>
              <p className="text-gray-600">
                We believe healthy snacks should taste as good as they make you feel.
              </p>
            </div>
          </div>
        </div>

        <div className="about-content mt-24">
          <div className="bg-amber-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Commitment to Quality</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Nutrition Facts</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• 15-16g of premium protein per cookie</li>
                  <li>• Low sugar content</li>
                  <li>• Good source of fiber</li>
                  <li>• No artificial preservatives</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Our Promise</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>• Always fresh baked</li>
                  <li>• Sustainably sourced ingredients</li>
                  <li>• Continuous innovation</li>
                  <li>• Satisfaction guaranteed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Connect With Us Section */}
        <div className="connect-section mt-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-amber-100 opacity-50"></div>
          <div className="relative z-10 py-16 px-8 rounded-3xl">
            <h3 className="connect-title text-4xl font-bold text-center mb-8">
              Let's Connect
            </h3>
            <p className="connect-title text-center text-gray-600 max-w-2xl mx-auto mb-12">
              Join our community of fitness enthusiasts and cookie lovers. Follow us for exclusive offers, fitness tips, and delicious updates!
            </p>
            <div className="flex justify-center items-center gap-12">
              <a 
                href="https://www.instagram.com/_arbaz.here_/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link group flex flex-col items-center gap-3"
              >
                <div className="p-5 bg-white rounded-full shadow-lg group-hover:shadow-xl transition-shadow">
                  <Instagram size={32} className="text-pink-500" />
                </div>
                <span className="font-medium text-gray-700">Instagram</span>
              </a>
              
           <a href="https://wa.me/918625835422" target="_blank" 
                rel="noopener noreferrer" 
                className="social-link group flex flex-col items-center gap-3"
              >
                <div className="p-5 bg-white rounded-full shadow-lg group-hover:shadow-xl transition-shadow">
                  <MessageCircleMore size={32} className="text-green-500" />
                </div>
                <span className="font-medium text-gray-700">WhatsApp</span>
              </a>
              
              <a 
                href="pathanarbaj020@gmail.com" 
                className="social-link group flex flex-col items-center gap-3"
              >
                <div className="p-5 bg-white rounded-full shadow-lg group-hover:shadow-xl transition-shadow">
                  <Mail size={32} className="text-blue-500" />
                </div>
                <span className="font-medium text-gray-700">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};