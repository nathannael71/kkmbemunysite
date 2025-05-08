'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import TeamCard from '@/components/ui/TeamCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function TeamSection({ data = [], settings = {} }) {
  const swiperRef = useRef(null);
  
  // Use CMS data if available, otherwise use defaults
  const sectionSettings = {
    sectionLabel: settings?.sectionLabel || 'Tim Kami',
    title: settings?.title || 'Meet With Our Team',
    description: settings?.description || 'Tim mahasiswa kami yang berdedikasi untuk membantu sesama tumbuh dan berkembang dalam meraih cita-cita mereka.'
  };
  
  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const fadeUpElements = document.querySelectorAll('.team-section .fade-up');
      
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
  
  // Default data if no team members are provided from CMS
  const defaultTeam = [
    {
      _id: '1',
      name: 'Jane Doe',
      position: 'Head of Department',
      photo: {
        asset: {
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
        }
      },
      instagram: 'https://instagram.com',
      email: 'jane@example.com',
      linkedin: 'https://linkedin.com'
    },
    {
      _id: '2',
      name: 'John Smith',
      position: 'Vice Head of Department',
      photo: {
        asset: {
          url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
        }
      },
      instagram: 'https://instagram.com',
      email: 'john@example.com',
      linkedin: 'https://linkedin.com'
    },
    {
      _id: '3',
      name: 'Sarah Johnson',
      position: 'Creative Director',
      photo: {
        asset: {
          url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80'
        }
      },
      instagram: 'https://instagram.com',
      email: 'sarah@example.com',
      linkedin: 'https://linkedin.com'
    },
    {
      _id: '4',
      name: 'Michael Brown',
      position: 'Event Coordinator',
      photo: {
        asset: {
          url: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
        }
      },
      instagram: 'https://instagram.com',
      email: 'michael@example.com',
      linkedin: 'https://linkedin.com'
    },
    {
      _id: '5',
      name: 'Emma Wilson',
      position: 'Marketing Specialist',
      photo: {
        asset: {
          url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
        }
      },
      instagram: 'https://instagram.com',
      email: 'emma@example.com',
      linkedin: 'https://linkedin.com'
    },
    {
      _id: '6',
      name: 'David Chen',
      position: 'Content Creator',
      photo: {
        asset: {
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
        }
      },
      instagram: 'https://instagram.com',
      email: 'david@example.com',
      linkedin: 'https://linkedin.com'
    }
  ];
  
  // Use CMS data if available, otherwise use defaults
  const team = data.length > 0 ? data : defaultTeam;
  
  return (
    <section id="team" className="py-16 section-gradient-3 gradient-section overflow-hidden team-section">
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
        
        {/* Team carousel */}
        <div className="carousel-container fade-up">
          <Swiper
            ref={swiperRef}
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={false}
            pagination={{ clickable: true }}
            loop={false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 3,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 4,
                centeredSlides: false,
              },
            }}
            className="team-carousel pb-10"
          >
            {team.map((member) => (
              <SwiperSlide key={member._id}>
                <TeamCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className="text-center mt-10">
          <Link 
            href="/team" 
            className="inline-flex items-center px-6 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white rounded-full shadow-lg transition-apple hover:bg-white/30 dark:hover:bg-white/20 border border-white/20"
          >
            View All Team Members
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
