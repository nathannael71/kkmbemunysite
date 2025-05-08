'use client';

import { useState } from 'react';

export default function AccordionItem({ title, date, children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`apple-accordion bg-white/70 dark:bg-white/10 backdrop-blur-lg shadow-lg transition-apple border border-white/20 ${isOpen ? 'accordion-active' : ''}`}>
      <div 
        className="apple-accordion-header flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="pl-4">
          <h3 className="text-lg font-bold heading-apple text-apple-darkgray dark:text-white">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {date}
          </p>
        </div>
        <span className="accordion-icon pr-4">
          <div className="custom-accordion-arrow">
            <i className="fas fa-chevron-down text-sm"></i>
          </div>
        </span>
      </div>
      <div className="accordion-content px-4 text-gray-600 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}
