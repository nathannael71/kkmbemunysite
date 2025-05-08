import { client } from '@/lib/sanity/client';
import { galleryListQuery, gallerySettingsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';

export const metadata = {
  title: 'Gallery | Karir dan Karya Mahasiswa BEM KM UNY',
  description: 'Explore photos from events and activities organized by the Karir dan Karya Mahasiswa department at BEM KM Universitas Negeri Yogyakarta'
}

export default async function GalleryPage() {
  const [gallery, settings] = await Promise.all([
    client.fetch(galleryListQuery),
    client.fetch(gallerySettingsQuery)
  ]);
  
  return (
    <div className="pt-24">
      <PageHeader 
        title={settings?.title || "Gallery"} 
        description={settings?.description || "Dokumentasi kegiatan dan acara kami yang telah membantu mahasiswa tumbuh dan berkembang."}
        sectionLabel={settings?.sectionLabel || "Galeri Kegiatan"}
      />
      
      <section className="py-16 section-gradient-1">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div key={item._id} className="relative group overflow-hidden rounded-2xl">
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
          
          {gallery.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No images found</h3>
              <p className="text-gray-600 dark:text-gray-300">Check back soon for new content.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
