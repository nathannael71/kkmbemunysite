'use client';

import { useEffect } from 'react';

export default function AboutSection({ data, fullPage = false }) {
  const defaultData = {
    sectionLabel: 'Tentang Kami',
    title: 'Why We Born?',
    description: 'Kami hadir untuk menjembatani aspirasi dan peluang Anda. Baik itu pengembangan karir, ekspresi kreatif, atau jaringan profesional, misi kami adalah mendukung mahasiswa dalam menemukan passion dan mencapai tujuan mereka.',
    features: [
      {
        title: 'Skill Development',
        description: 'Memberikan pelatihan dan sumber daya untuk mengembangkan keterampilan teknis dan soft skill yang relevan dengan kebutuhan dunia kerja modern.',
        icon: 'fa-graduation-cap'
      },
      {
        title: 'Creative Outlet',
        description: 'Menyediakan platform bagi mahasiswa untuk mengekspresikan kreativitas mereka melalui berbagai proyek dan kolaborasi yang inovatif.',
        icon: 'fa-paintbrush'
      },
      {
        title: 'Career Networking',
        description: 'Menghubungkan mahasiswa dengan profesional industri dan pemberi kerja potensial untuk memfasilitasi peluang karir yang berkelanjutan.',
        icon: 'fa-network-wired'
      }
    ]
  };
  
  // Use CMS data if available, otherwise use defaults
  const sectionData = {
    sectionLabel: data?.sectionLabel || defaultData.sectionLabel,
    title: data?.title || defaultData.title,
    description: data?.description || defaultData.description,
    features: data?.features || defaultData.features
  };
  
  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const fadeUpElements = document.querySelectorAll('.about-section .fade-up');
      
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
    <section id="about" className={`${fullPage ? 'pt-24' : 'py-16'} section-gradient-1 gradient-section about-section`}>
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-blue-500 dark:text-blue-300">
            {sectionData.sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">
            {sectionData.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            {sectionData.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sectionData.features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg transition-apple transform hover:-translate-y-2 fade-up border border-white/20"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                <i className={`fas ${feature.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold heading-apple text-apple-darkgray dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
