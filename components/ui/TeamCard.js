'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';

export default function TeamCard({ member }) {
  const [isActive, setIsActive] = useState(false);
  
  const toggleActive = () => {
    setIsActive(!isActive);
  };
  
  return (
    <div 
      className={`team-card bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-apple border border-white/20 relative ${isActive ? 'active' : ''}`}
    >
      <div className="relative overflow-hidden">
        <Image
          src={urlFor(member.photo).width(400).url()}
          alt={member.name}
          width={400}
          height={400}
          className="w-full aspect-square object-cover img-zoom"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold heading-apple mb-1 text-apple-darkgray dark:text-white">
          {member.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {member.position}
        </p>
        <button 
          onClick={toggleActive}
          className="team-btn w-full py-2 bg-apple-blue text-white rounded-full btn-apple transition-apple"
        >
          Get in Touch
        </button>
        <div className="team-social-buttons">
          {member.instagram && (
            <a 
              href={member.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center"
            >
              <i className="fab fa-instagram text-white"></i>
            </a>
          )}
          {member.email && (
            <a 
              href={`mailto:${member.email}`}
              className="w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center"
            >
              <i className="far fa-envelope text-white"></i>
            </a>
          )}
          {member.linkedin && (
            <a 
              href={member.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center"
            >
              <i className="fab fa-linkedin-in text-white"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
