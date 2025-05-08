'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';

export default function HeroSection({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const defaultSlides = [
    {
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80',
      alt: 'Students collaborating'
    },
    {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80',
      alt: 'Team collaboration'
    },
    {
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80',
      alt: 'Creative workspace'
    },
    {
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80',
      alt: 'Professional meeting'
    },
    {
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=1740&amp;q=80',
      alt: 'Campus life'
    }
  ];
  
  // Use CMS data if available, otherwise use defaults
  const slides = data?.slides || defaultSlides;
  const title = data?.title || 'GROW YOUR SKILL<br>WITH US';
  const subtitle = data?.subtitle || 'Empowering students through career development and creative outlets';
  const buttonText = data?.buttonText || 'Learn More';
  const buttonUrl = data?.buttonUrl || '#about';
  
  // Set up slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  // Handle dot click
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  return (
    <section id="home" className="w-full h-screen flex flex-col justify-center items-center overflow-hidden relative">
      {/* Hero image slider */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="hero-slider relative h-full w-full">
          {slides.map((slide, index) => (
            <div key={index} className={`hero-slide ${index === currentSlide ? 'active' : ''}`}>
              <div className="w-full h-full">
                <Image
                  src={slide.image?.asset?.url || slide.image}
                  alt={slide.alt || 'Hero image'}
                  fill
                  quality={90}
                  priority={index === 0}
                  className="object-cover opacity-40"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Apple-style centered text */}
      <div className="container mx-auto px-4 text-center z-10 pt-24">
        <h1 
          className="text-4xl sm:text-6xl md:text-7xl font-bold heading-apple mb-6 text-white leading-tight"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto subheading-apple mb-8">
          {subtitle}
        </p>
        
        <Link 
          href={buttonUrl} 
          className="inline-flex items-center justify-center px-8 py-4 bg-apple-blue text-white rounded-full transition-apple hover:bg-blue-600 mt-4"
        >
          <span className="font-medium text-lg">{buttonText}</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </Link>
      </div>
      
      {/* Slider navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`hero-nav-dot w-3 h-3 rounded-full bg-white transition-opacity ${
              index === currentSlide ? 'opacity-100' : 'opacity-50'
            }`} 
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
