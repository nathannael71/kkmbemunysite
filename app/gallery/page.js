'use client';

import { useState, useEffect } from 'react';
import { client } from '@/lib/sanity/client';
import { galleryListQuery, gallerySettingsQuery, galleryCategoriesQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import GalleryLightbox from '@/components/ui/GalleryLightbox';
import { useSearchParams, useRouter } from 'next/navigation';

// Add this query to lib/sanity/queries.js
// export const galleryCategoriesQuery = `*[_type == "galleryCategory"] | order(title asc) { _id, title, slug }`;

export const metadata = {
  title: 'Gallery | Karir dan Karya Mahasiswa BEM KM UNY',
  description: 'Explore photos from events and activities organized by the Karir dan Karya Mahasiswa department at BEM KM Universitas Negeri Yogyakarta'
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [settings, setSettings] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [years, setYears] = useState([]);
  const [activeYear, setActiveYear] = useState('all');
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialCategory = searchParams.get('category') || 'all';
  const initialYear = searchParams.get('year') || 'all';
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        const [galleryData, settingsData, categoriesData] = await Promise.all([
          client.fetch(galleryListQuery),
          client.fetch(gallerySettingsQuery),
          client.fetch(galleryCategoriesQuery)
        ]);
        
        setGallery(galleryData);
        setSettings(settingsData || {});
        setCategories(categoriesData || []);
        
        // Extract available years from gallery data
        const availableYears = [...new Set(galleryData.map(item => {
          const year = item.publishedAt ? new Date(item.publishedAt).getFullYear() : null;
          return year;
        }).filter(Boolean))].sort((a, b) => b - a); // Sort years in descending order
        
        setYears(availableYears);
        
        // Set initial filters from URL
        setActiveCategory(initialCategory);
        setActiveYear(initialYear);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [initialCategory, initialYear]);
  
  // Filter gallery items based on active filters
  const filteredGallery = gallery.filter(item => {
    // Filter by category
    const categoryMatch = activeCategory === 'all' || 
      item.categories?.some(cat => cat.slug.current === activeCategory);
      
    // Filter by year
    const itemYear = item.publishedAt ? new Date(item.publishedAt).getFullYear().toString() : null;
    const yearMatch = activeYear === 'all' || itemYear === activeYear;
    
    return categoryMatch && yearMatch;
  });
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // Update URL with new filter
    const params = new URLSearchParams(searchParams);
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    
    // Keep year filter if present
    if (activeYear !== 'all') {
      params.set('year', activeYear);
    }
    
    router.push(`/gallery?${params.toString()}`);
  };
  
  // Handle year change
  const handleYearChange = (year) => {
    setActiveYear(year);
    
    // Update URL with new filter
    const params = new URLSearchParams(searchParams);
    if (year === 'all') {
      params.delete('year');
    } else {
      params.set('year', year);
    }
    
    // Keep category filter if present
    if (activeCategory !== 'all') {
      params.set('category', activeCategory);
    }
    
    router.push(`/gallery?${params.toString()}`);
  };
  
  // Open lightbox for an image
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };
  
  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    // Restore scrolling
    document.body.style.overflow = 'auto';
  };
  
  return (
    <div className="pt-24">
      <PageHeader 
        title={settings?.title || "Gallery"} 
        description={settings?.description || "Dokumentasi kegiatan dan acara kami yang telah membantu mahasiswa tumbuh dan berkembang."}
        sectionLabel={settings?.sectionLabel || "Galeri Kegiatan"}
      />
      
      <section className="py-16 section-gradient-1">
        <div className="main-container">
          {/* Category and year filters */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            {/* Category filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  activeCategory === 'all' ? 'bg-apple-blue text-white' : 'bg-white/60 dark:bg-white/10 text-apple-darkgray dark:text-white'
                }`}
              >
                All Categories
              </button>
              
              {categories.map(cat => (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryChange(cat.slug.current)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    activeCategory === cat.slug.current ? 'bg-apple-blue text-white' : 'bg-white/60 dark:bg-white/10 text-apple-darkgray dark:text-white'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
            
            {/* Year dropdown */}
            <div className="relative">
              <select
                value={activeYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 rounded-lg border border-white/20 bg-white/60 dark:bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <i className="fas fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-apple-blue"></div>
            </div>
          ) : (
            <>
              {/* Gallery grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGallery.map((item, index) => (
                  <div 
                    key={item._id} 
                    className="relative group overflow-hidden rounded-2xl cursor-pointer transform transition-transform hover:scale-[1.02]"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={urlFor(item.image).width(600).url()}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100 flex flex-col justify-end p-6">
                        <h3 className="text-white text-xl font-bold heading-apple">
                          {item.title}
                        </h3>
                        <p className="text-white/80 text-sm mt-2">
                          {item.date}
                        </p>
                        {item.description && (
                          <p className="text-white/80 text-sm mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredGallery.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">No images found</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try changing the category or year filter.
                  </p>
                  <button 
                    onClick={() => {
                      handleCategoryChange('all');
                      handleYearChange('all');
                    }}
                    className="mt-4 px-4 py-2 bg-apple-blue text-white rounded-lg"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* Lightbox */}
      {lightboxOpen && (
        <GalleryLightbox
          images={filteredGallery}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onPrevious={() => setCurrentImageIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length)}
          onNext={() => setCurrentImageIndex((prev) => (prev + 1) % filteredGallery.length)}
        />
      )}
    </div>
  );
}
