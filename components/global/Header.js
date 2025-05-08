'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header({ headerData }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Update header transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize on mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    
    const sidebarMenu = document.getElementById('sidebar-menu');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    if (!menuOpen) {
      sidebarMenu.classList.add('translate-x-0');
      sidebarOverlay.classList.add('active');
      document.body.classList.add('overflow-hidden');
    } else {
      sidebarMenu.classList.remove('translate-x-0');
      sidebarOverlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    }
  };
  
  return (
    <header className={`fixed w-full z-50 transition-apple glassmorphism light border-b border-gray-200 dark:border-gray-800 ${isScrolled ? 'bg-opacity-90' : 'bg-opacity-70'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and title */}
          <Link href="/" className="flex items-center">
            <div className="flex space-x-2 mr-4">
              {/* Placeholder for UNY logo */}
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">UNY</span>
              </div>
              {/* Placeholder for BEM KM logo */}
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">BEM</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold heading-apple hidden sm:block">
                {headerData?.title || 'KARIR DAN KARYA MAHASISWA'}
              </h1>
              <h1 className="text-lg font-bold heading-apple sm:hidden">
                {headerData?.title || 'KARIR DAN KARYA MAHASISWA'}
              </h1>
              <p className="text-xs text-apple-gray">
                {headerData?.subtitle || 'BEM KM Universitas Negeri Yogyakarta'}
              </p>
            </div>
          </Link>

          {/* Menu toggle button */}
          <button 
            id="menu-toggle" 
            className={`p-2 focus:outline-none z-50 ${menuOpen ? 'menu-open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className="hamburger-line w-full h-0.5 bg-apple-darkgray dark:bg-white rounded-full line-1"></span>
              <span className="hamburger-line w-full h-0.5 bg-apple-darkgray dark:bg-white rounded-full line-2"></span>
              <span className="hamburger-line w-full h-0.5 bg-apple-darkgray dark:bg-white rounded-full line-3"></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
