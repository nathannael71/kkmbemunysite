'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';

export default function GalleryLightbox({ images, currentIndex, onClose, onPrevious, onNext }) {
  const [isLoading, setIsLoading] = useState(true);
  const currentImage = images[currentIndex];
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrevious, onNext]);
  
  // Preload next and previous images
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    
    const nextImage = new Image();
    nextImage.src = urlFor(images[nextIndex].image).width(1200).url();
    
    const prevImage = new Image();
    prevImage.src = urlFor(images[prevIndex].image).width(1200).url();
    
    setIsLoading(true);
  }, [currentIndex, images]);
  
  if (!currentImage) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        aria-label="Close lightbox"
      >
        <i className="fas fa-times"></i>
      </button>
      
      {/* Previous button */}
      <button 
        onClick={onPrevious}
        className="absolute left-4 z-50 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        aria-label="Previous image"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      
      {/* Next button */}
      <button 
        onClick={onNext}
        className="absolute right-4 z-50 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        aria-label="Next image"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      
      {/* Image */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10">
        <div className="relative max-w-full max-h-full">
          <Image
            src={urlFor(currentImage.image).width(1200).url()}
            alt={currentImage.title}
            width={1200}
            height={800}
            className="object-contain max-h-[90vh]"
            onLoad={() => setIsLoading(false)}
          />
          
          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 text-white">
            <h3 className="text-lg font-semibold">{currentImage.title}</h3>
            <p className="text-sm text-gray-300">{currentImage.date}</p>
            {currentImage.description && (
              <p className="text-sm mt-2">{currentImage.description}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Image counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
