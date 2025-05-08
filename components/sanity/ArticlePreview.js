import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/client';
import { formatDate } from '@/lib/utils';

export default function ArticlePreview({ article }) {
  if (!article) return null;
  
  return (
    <div className="article-preview">
      <div className="bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-apple border border-white/20 h-full">
        {article.mainImage && (
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={urlFor(article.mainImage).width(800).url()}
              alt={article.title}
              fill
              className="object-cover transition-transform hover:scale-105 duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="mb-4 flex items-center">
            {article.author?.image && (
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image 
                  src={urlFor(article.author.image).width(100).url()}
                  alt={article.author.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-apple-darkgray dark:text-white">
                {article.author?.name || 'Anonymous'}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-bold heading-apple mb-3 text-apple-darkgray dark:text-white">
            {article.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          
          <Link
            href={`/articles/${article.slug.current}`}
            className="inline-flex items-center text-blue-500 dark:text-blue-300 font-medium"
          >
            Read Article
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
