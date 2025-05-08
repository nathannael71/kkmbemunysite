'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { toggleDarkMode } from '@/lib/utils';

export default function SideMenu({ menuItems = [] }) {
  // Handle closing the menu
  const closeSideMenu = () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    menuToggle.classList.remove('menu-open');
    sidebarMenu.classList.remove('translate-x-0');
    sidebarOverlay.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  };
  
  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    toggleDarkMode();
  };
  
  // Set default menu items if none provided
  const defaultMenuItems = [
    { label: 'Home', url: '/', icon: 'fa-home' },
    { label: 'About', url: '/about', icon: 'fa-info-circle' },
    { label: 'Programs', url: '/programs', icon: 'fa-box' },
    { label: 'Team', url: '/team', icon: 'fa-users' },
    { label: 'Articles', url: '/articles', icon: 'fa-newspaper' },
    { label: 'Gallery', url: '/gallery', icon: 'fa-images' },
    { label: 'Contact', url: '/contact', icon: 'fa-envelope' },
  ];
  
  const displayMenuItems = menuItems.length > 0 ? menuItems : defaultMenuItems;
  
  // Set up event listeners
  useEffect(() => {
    const sidebarMenu = document.getElementById('sidebar-menu');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarClose = document.getElementById('sidebar-close');
    
    // Close menu when clicking overlay
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', closeSideMenu);
    }
    
    // Close menu when clicking X button
    if (sidebarClose) {
      sidebarClose.addEventListener('click', closeSideMenu);
    }
    
    // Get dark mode status from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const darkmodeToggle = document.getElementById('darkmode-toggle');
    if (darkmodeToggle) {
      darkmodeToggle.setAttribute('aria-checked', 
        savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    
    return () => {
      if (sidebarOverlay) {
        sidebarOverlay.removeEventListener('click', closeSideMenu);
      }
      if (sidebarClose) {
        sidebarClose.removeEventListener('click', closeSideMenu);
      }
    };
  }, []);

  return (
    <>
      {/* Sidebar overlay */}
      <div id="sidebar-overlay" className="sidebar-overlay"></div>

      {/* Mobile sidebar menu */}
      <div id="sidebar-menu" className="glassmorphism fixed top-0 right-0 w-[80%] max-w-[320px] h-full transform translate-x-full z-50 transition-transform duration-500 ease-in-out p-6 overflow-y-auto">
        {/* Close button (X) */}
        <button id="sidebar-close" className="close-btn absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-black dark:text-white">
          <i className="fas fa-times"></i>
        </button>
        
        {/* Sidebar header */}
        <div className="sidebar-header mt-4 mb-6">
          <h3 className="text-lg font-semibold heading-apple text-black dark:text-white">Menu</h3>
        </div>
        
        {/* Menu links */}
        <div className="menu-links flex flex-col gap-3">
          {displayMenuItems.map((item, index) => (
            <Link 
              key={index}
              href={item.url} 
              className="font-semibold heading-apple hover:text-apple-blue transition-apple flex items-center gap-3"
              onClick={closeSideMenu}
            >
              <div className="menu-icon w-8 h-8 bg-blue-500 flex items-center justify-center rounded-lg text-white">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        
        {/* Dark mode toggle */}
        <div id="darkmode-toggle-container" className="flex items-center gap-3 bg-white/10 dark:bg-black/20 p-3 rounded-xl mt-6">
          <div className="menu-icon w-8 h-8 bg-[#F4A83A] flex items-center justify-center rounded-lg text-white">
            <i className="fas fa-sun"></i>
          </div>
          <span className="font-semibold heading-apple text-black dark:text-white">Dark Mode</span>
          <button 
            id="darkmode-toggle" 
            onClick={handleDarkModeToggle}
            className="ml-auto w-12 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center transition-apple p-1"
            role="switch"
            aria-checked="false"
          >
            <div id="darkmode-toggle-circle" className="w-5 h-5 bg-white rounded-full shadow-md transform dark:translate-x-5 transition-transform flex justify-center items-center">
              <i className="fas fa-sun text-yellow-500 dark:hidden text-xs"></i>
              <i className="fas fa-moon text-blue-300 hidden dark:block text-xs"></i>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
