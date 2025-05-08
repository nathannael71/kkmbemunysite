import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';

export default function GalleryPreview({ item }) {
  if (!item) return null;
  
  return (
    <div className="gallery-preview">
      <div className="relative group overflow-hidden rounded-2xl">
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
    </div>
  );
}
