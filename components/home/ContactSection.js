'use client';

import { useEffect } from 'react';
import ContactForm from '@/components/ui/ContactForm';

export default function ContactSection({ data = {}, fullPage = false }) {
  // Default data if no contact data is provided from CMS
  const defaultData = {
    sectionLabel: 'Kontak Kami',
    title: 'Get In Touch',
    description: 'Punya pertanyaan atau ingin berkolaborasi? Hubungi kami segera!',
    contactInfo: {
      instagram: 'Follow us for updates',
      instagramUrl: 'https://instagram.com/kkm.bemuny',
      email: 'kkmbemuny@gmail.com',
      address: 'Student Center Building, Universitas Negeri Yogyakarta, Karangmalang, Yogyakarta'
    },
    formspreeId: '' // You'll need to provide your own Formspree ID
  };
  
  // Use CMS data if available, otherwise use defaults
  const contactData = {
    sectionLabel: data?.sectionLabel || defaultData.sectionLabel,
    title: data?.title || defaultData.title,
    description: data?.description || defaultData.description,
    contactInfo: data?.contactInfo || defaultData.contactInfo,
    formspreeId: data?.formspreeId || defaultData.formspreeId
  };
  
  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const fadeUpElements = document.querySelectorAll('.contact-section .fade-up');
      
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
  
  return (
    <section id="contact" className={`${fullPage ? 'pt-24' : 'py-16'} section-gradient-2 gradient-section contact-section`}>
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-blue-500 dark:text-blue-300">
            {contactData.sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">
            {contactData.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            {contactData.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="fade-up">
            <div className="bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg transition-apple h-full border border-white/20">
              <h3 className="text-2xl font-bold heading-apple mb-6 text-apple-darkgray dark:text-white">Connect With Us</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <i className="fab fa-instagram text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold heading-apple text-apple-darkgray dark:text-white">Instagram</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{contactData.contactInfo.instagram}</p>
                    <a 
                      href={contactData.contactInfo.instagramUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 dark:text-blue-300 font-medium"
                    >
                      @kkm.bemuny
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <i className="far fa-envelope text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold heading-apple text-apple-darkgray dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">We'd love to hear from you</p>
                    <a 
                      href={`mailto:${contactData.contactInfo.email}`}
                      className="text-blue-500 dark:text-blue-300 font-medium"
                    >
                      {contactData.contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <i className="fas fa-map-marker-alt text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold heading-apple text-apple-darkgray dark:text-white">Location</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">Visit our office</p>
                    <p className="text-apple-darkgray dark:text-white">{contactData.contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="fade-up">
            <div className="bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg transition-apple border border-white/20">
              <h3 className="text-2xl font-bold heading-apple mb-6 text-apple-darkgray dark:text-white">Send a Message</h3>
              
              <ContactForm formspreeId={contactData.formspreeId} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
