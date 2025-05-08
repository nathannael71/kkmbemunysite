'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function GallerySection({ data = [], settings = {} }) {
  const swiperRef = useRef(null);
  
  // Use CMS data if available, otherwise use defaults
  const sectionSettings = {
    sectionLabel: settings?.sectionLabel || 'Galeri Kegiatan',
    title: settings?.title || 'Our Activity Gallery',
    description: settings?.description || 'Dokumentasi kegiatan dan acara kami yang telah membantu mahasiswa tumbuh dan berkembang.',
    viewAllButtonText: settings?.viewAllButtonText || 'View Full Gallery',
    viewAllButtonUrl: settings?.viewAllButtonUrl || '/gallery'
  };
  
  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const fadeUpElements = document.querySelectorAll('.gallery-section .fade-up');
      
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
  
  // Default data if no gallery items are provided from CMS
  const defaultGallery = [
    {
      _id: '1',
      title: 'Workshop: Resume Building',
      date: 'March 2024',
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      }
    },
    {
      _id: '2',
      title: 'Company Visit: Tech Startup',
      date: 'February 2024',
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      }
    },
    {
      _id: '3',
      title: 'Career Fair 2024',
      date: 'January 2024',
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      }
    },
    {
      _id: '4',
      title: 'Networking Night',
      date: 'December 2023',
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      }
    },
    {
      _id: '5',
      title: 'Panel Discussion: Future of Work',
      date: 'November 2023',
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      }
    },
    {
      _id: '6',
      title: 'Student Work Exhibition',
      date: 'October 2023',
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80'
        }
      }
    }
  ];
  
  // Use CMS data if available, otherwise use defaults
  const gallery = data.length > 0 ? data : defaultGallery;
  
  return (
    <section id="gallery" className="py-16 section-gradient-1 gradient-section overflow-hidden gallery-section">
      <div className="main-container">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-purple-500 dark:text-purple-300">
            {sectionSettings.sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold heading-apple text-apple-darkgray dark:text-white mb-6 fade-up">
            {sectionSettings.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto fade-up">
            {sectionSettings.description}
          </p>
        </div>
        
        {/* Album carousel */}
        <div className="album-carousel-container fade-up">
          <Swiper
            ref={swiperRef}
            modules={[Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 'auto',
              },
            }}
            className="album-carousel pb-10"
          >
            {gallery.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="rounded-2xl overflow-hidden shadow-lg h-full">
                  <div className="gallery-img-container">
                    <Image
                      src={urlFor(item.image).width(1000).url()}
                      alt={item.title}
                      width={1000}
                      height={562}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-white text-xl font-bold heading-apple">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm mt-2">
                        {item.date}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* View all button */}
        <div className="text-center mt-12">
          <Link 
            href={sectionSettings.viewAllButtonUrl}
            className="px-8 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white rounded-full transition-apple hover:bg-white/30 dark:hover:bg-white/20 border border-white/20 fade-up"
          >
            {sectionSettings.viewAllButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
