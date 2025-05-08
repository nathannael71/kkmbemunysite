'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function LocationSection({ data = {} }) {
  // Default data if no location data is provided from CMS
  const defaultData = {
    sectionLabel: 'Lokasi Kami',
    title: 'Our Location',
    description: 'Kunjungi kami di Student Center Building, Universitas Negeri Yogyakarta.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.1633170025876!2d110.38421261477832!3d-7.773598894403988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59b2d7b98905%3A0x19ad4f9a195770c7!2sUniversitas%20Negeri%20Yogyakarta!5e0!3m2!1sen!2sid!4v1656483265685!5m2!1sen!2sid',
    locationName: 'Student Center Building',
    fullAddress: 'Universitas Negeri Yogyakarta, Karangmalang, Yogyakarta',
    directionsUrl: 'https://www.google.com/maps/dir//Universitas+Negeri+Yogyakarta/',
    cta: {
      title: 'For Your Better Future',
      description: 'Join us at Karir dan Karya Mahasiswa to enhance your skills, showcase your talent, and prepare for your future career.',
      buttonText: 'Join Our Community',
      buttonUrl: '/contact'
    }
  };
  
  // Use CMS data if available, otherwise use defaults
  const locationData = {
    sectionLabel: data?.sectionLabel || defaultData.sectionLabel,
    title: data?.title || defaultData.title,
    description: data?.description || defaultData.description,
    mapUrl: data?.mapUrl || defaultData.mapUrl,
    locationName: data?.locationName || defaultData.locationName,
    fullAddress: data?.fullAddress || defaultData.fullAddress,
    directionsUrl: data?.directionsUrl || defaultData.directionsUrl,
    cta: data?.cta || defaultData.cta
  };
  
  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const fadeUpElements = document.querySelectorAll('.location-section .fade-up');
      
      window.gsap.registerPlugin(window.ScrollTrigger);
      
      fadeUpElements.forEach(element => {
        window.gsap.fromTo(element, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }
  }, []);
  
  // Handle share location
  const shareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Lokasi BEM KM UNY',
        url: locationData.directionsUrl
      }).catch(err => {
        console.error('Error sharing location:', err);
      });
    }
  };
  
  return (
    <section id="location" className="py-16 section-gradient-3 gradient-section location-section">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-purple-500 dark:text-purple-300">
            {locationData.sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">
            {locationData.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            {locationData.description}
          </p>
        </div>
        
        {/* Map container */}
        <div className="rounded-2xl overflow-hidden shadow-lg transition-apple fade-up">
          <div className="map-container relative h-[450px] overflow-hidden rounded-t-2xl">
            <iframe 
              src={locationData.mapUrl}
              width="100%" 
              height="100%" 
              style={{border: 0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Map location"
            />
          </div>
          
          {/* Map info overlay */}
          <div className="bg-white/20 dark:bg-white/10 backdrop-blur-lg p-6 transition-apple border-t border-white/20 rounded-b-2xl">
            <div className="flex flex-wrap justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold heading-apple mb-2 text-apple-darkgray dark:text-white">
                  {locationData.locationName}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {locationData.fullAddress}
                </p>
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={shareLocation}
                  className="px-4 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white rounded-lg transition-apple hover:bg-white/30 dark:hover:bg-white/20 border border-white/20"
                >
                  <i className="fas fa-share-alt mr-2"></i> Share
                </button>
                <a 
                  href={locationData.directionsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-apple-blue text-white rounded-lg transition-apple hover:bg-blue-600"
                >
                  <i className="fas fa-directions mr-2"></i> Directions
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA section */}
        <div className="mt-24 text-center fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple mb-6 text-apple-darkgray dark:text-white">
            {locationData.cta.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto mb-10">
            {locationData.cta.description}
          </p>
          <Link 
            href={locationData.cta.buttonUrl}
            className="px-8 py-4 bg-apple-blue text-white rounded-full btn-apple transition-apple text-lg font-medium"
          >
            {locationData.cta.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
