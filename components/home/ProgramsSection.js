'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProgramCard from '@/components/ui/ProgramCard';

export default function ProgramsSection({ data = [] }) {
  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const fadeUpElements = document.querySelectorAll('.programs-section .fade-up');
      
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
  
  // Default data if no programs are provided from CMS
  const defaultPrograms = [
    {
      _id: '1',
      title: 'KKM Space',
      description: 'A collaborative workspace for students to work, share ideas, and network.',
      status: 'Coming Soon',
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      }
    },
    {
      _id: '2',
      title: 'SkillUp [InsightUp]',
      description: 'Workshops and seminars focused on practical skill development.',
      status: 'Coming Soon',
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      }
    },
    {
      _id: '3',
      title: '[WeGrowth!]',
      description: 'Mentorship program connecting students with experienced professionals.',
      status: 'Coming Soon',
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      }
    },
    {
      _id: '4',
      title: '[WeLearn!]',
      description: 'Educational resources and online courses for self-paced learning.',
      status: 'Coming Soon',
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      }
    },
    {
      _id: '5',
      title: 'Company Visit',
      description: 'Field trips to companies to gain firsthand industry experience.',
      status: 'Coming Soon',
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      }
    }
  ];
  
  // Use CMS data if available, otherwise use defaults
  const programs = data.length > 0 ? data : defaultPrograms;
  
  return (
    <section id="programs" className="py-16 section-gradient-2 gradient-section programs-section">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-purple-500 dark:text-purple-300">
            Program Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">
            Our Programs
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            Kami menawarkan berbagai program yang dirancang untuk meningkatkan keterampilan, menampilkan bakat, dan mempersiapkan perjalanan karir Anda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {programs.map((program) => (
            <ProgramCard key={program._id} program={program} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            href="/programs" 
            className="inline-flex items-center px-6 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white rounded-full shadow-lg transition-apple hover:bg-white/30 dark:hover:bg-white/20 border border-white/20"
          >
            View All Programs
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
