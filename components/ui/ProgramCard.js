import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';

export default function ProgramCard({ program }) {
  return (
    <div className="bg-white/70 dark:bg-white/10 backdrop-blur-lg program-card overflow-hidden shadow-lg transition-apple fade-up border border-white/20">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={urlFor(program.image).width(600).url()}
          alt={program.title}
          fill
          className="object-cover img-zoom"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold heading-apple mb-2 text-apple-darkgray dark:text-white">
          {program.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {program.description}
        </p>
        <span className={`
          ${program.status === 'Active' 
            ? 'bg-green-100 dark:bg-green-400/20 text-green-600 dark:text-green-200 border-green-200 dark:border-green-400/40' 
            : program.status === 'Completed'
              ? 'bg-gray-100 dark:bg-gray-400/20 text-gray-600 dark:text-gray-200 border-gray-200 dark:border-gray-400/40'
              : 'bg-purple-100 dark:bg-purple-400/20 text-purple-600 dark:text-purple-200 border-purple-200 dark:border-purple-400/40'
          } px-3 py-1 rounded-full text-xs font-medium border`}
        >
          {program.status}
        </span>
      </div>
    </div>
  );
}
