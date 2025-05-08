'use client';

import { useEffect, useState } from 'react';
import AccordionItem from '@/components/ui/AccordionItem';

export default function TimelineSection({ data = [], settings = {} }) {
  // Use CMS data if available, otherwise use defaults
  const sectionSettings = {
    sectionLabel: settings?.sectionLabel || 'Timeline Program',
    title: settings?.title || 'Program Timeline',
    description: settings?.description || 'Jadwal kegiatan dan program kami untuk tahun akademik 2025.'
  };
  
  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const fadeUpElements = document.querySelectorAll('.timeline-section .fade-up');
      
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
  
  // Default data if no timeline events are provided from CMS
  const defaultTimeline = [
    {
      _id: '1',
      title: 'SkillUp Workshop Series',
      date: 'April 2025',
      description: 'A series of workshops focusing on key skills such as resume writing, interview preparation, and professional communication.',
      buttonText: 'Coming Soon'
    },
    {
      _id: '2',
      title: 'KKM Space Launch',
      date: 'May 2025',
      description: 'Grand opening of our collaborative workspace with networking opportunities, guest speakers, and workshops.',
      buttonText: 'Coming Soon'
    },
    {
      _id: '3',
      title: 'Company Visit Week',
      date: 'July 2025',
      description: 'A week-long series of visits to various companies and organizations in the region to provide students with insights into different industries.',
      buttonText: 'Coming Soon'
    },
    {
      _id: '4',
      title: 'WeGrowth Mentorship Program',
      date: 'August 2025',
      description: 'Launch of our mentorship program connecting students with experienced professionals in their field of interest.',
      buttonText: 'Coming Soon'
    },
    {
      _id: '5',
      title: 'Student Work Exhibition',
      date: 'September 2025',
      description: 'An exhibition showcasing student projects, artwork, and innovative ideas to the university community and industry professionals.',
      buttonText: 'Coming Soon'
    }
  ];
  
  // Use CMS data if available, otherwise use defaults
  const timeline = data.length > 0 ? data : defaultTimeline;
  
  return (
    <section id="timeline" className="py-16 section-gradient-5 gradient-section timeline-section">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-blue-500 dark:text-blue-300">
            {sectionSettings.sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">
            {sectionSettings.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            {sectionSettings.description}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* Timeline accordion */}
          <div className="space-y-6 relative pl-10">
            {timeline.map((event) => (
              <div key={event._id} className="timeline-node">
                <div className="timeline-dot"></div>
                <AccordionItem title={event.title} date={event.date}>
                  <p className="mb-4">{event.description}</p>
                  <button className="px-6 py-2 bg-apple-blue text-white rounded-full btn-apple transition-apple">
                    {event.buttonText}
                  </button>
                </AccordionItem>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
