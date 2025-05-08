'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ArticleCard from '@/components/ui/ArticleCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ArticlesSection({ data = [], settings = {} }) {
  const swiperRef = useRef(null);
  
  // Use CMS data if available, otherwise use defaults
  const sectionSettings = {
    sectionLabel: settings?.sectionLabel || 'Artikel Terbaru',
    title: settings?.title || 'Latest Articles',
    description: settings?.description || 'Wawasan, cerita, dan sumber daya untuk membantu Anda dalam perjalanan karir.',
    viewAllButtonText: settings?.viewAllButtonText || 'View All Articles',
    viewAllButtonUrl: settings?.viewAllButtonUrl || '/articles'
  };
  
  // Initialize GSAP animations
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const fadeUpElements = document.querySelectorAll('.articles-section .fade-up');
      
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
  
  // Default data if no articles are provided from CMS
  const defaultArticles = [
    {
      _id: '1',
      title: 'How to Build a Professional Network While in College',
      excerpt: 'Learn effective strategies for building a professional network that will serve you well after graduation.',
      slug: { current: 'how-to-build-network' },
      publishedAt: '2024-06-15T10:00:00Z',
      mainImage: {
        asset: {
          url: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1147&q=80'
        }
      },
      author: {
        name: 'Sarah Johnson',
        image: {
          asset: {
            url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80'
          }
        }
      }
    },
    {
      _id: '2',
      title: 'The Top Skills Employers Are Looking For in 2024',
      excerpt: 'Discover the most in-demand skills in today\'s job market and how you can develop them.',
      slug: { current: 'top-skills-employers' },
      publishedAt: '2024-05-28T10:00:00Z',
      mainImage: {
        asset: {
          url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      },
      author: {
        name: 'Michael Brown',
        image: {
          asset: {
            url: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
          }
        }
      }
    },
    {
      _id: '3',
      title: 'How to Balance Academics and Career Development',
      excerpt: 'Practical tips for managing your coursework while also building your professional skills and experience.',
      slug: { current: 'balancing-academics-career' },
      publishedAt: '2024-05-10T10:00:00Z',
      mainImage: {
        asset: {
          url: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1106&q=80'
        }
      },
      author: {
        name: 'John Smith',
        image: {
          asset: {
            url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
          }
        }
      }
    },
    {
      _id: '4',
      title: 'Leveraging Student Organizations for Career Growth',
      excerpt: 'How to make the most of your involvement in student organizations to enhance your professional development.',
      slug: { current: 'leveraging-student-organizations' },
      publishedAt: '2024-04-22T10:00:00Z',
      mainImage: {
        asset: {
          url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
        }
      },
      author: {
        name: 'Jane Doe',
        image: {
          asset: {
            url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
          }
        }
      }
    }
  ];
  
  // Use CMS data if available, otherwise use defaults
  const articles = data.length > 0 ? data : defaultArticles;
  
  return (
    <section id="articles" className="py-16 section-gradient-4 gradient-section articles-section">
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
        
        {/* Articles carousel */}
        <div className="article-carousel-container fade-up">
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
              1024: {
                slidesPerView: 3,
                centeredSlides: false,
              },
            }}
            className="article-carousel pb-10"
          >
            {articles.map((article) => (
              <SwiperSlide key={article._id}>
                <ArticleCard article={article} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* View all articles button */}
        <div className="text-center mt-10">
          <Link 
            href={sectionSettings.viewAllButtonUrl}
            className="inline-flex items-center px-6 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white rounded-full shadow-lg transition-apple hover:bg-white/30 dark:hover:bg-white/20 border border-white/20"
          >
            {sectionSettings.viewAllButtonText}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
