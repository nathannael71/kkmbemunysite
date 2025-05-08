import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/client';
import { formatDate } from '@/lib/utils';

export default function ArticleCard({ article }) {
  return (
    <div className="article-card bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-apple border border-white/20">
      <div className="article-img-container">
        <Image
          src={urlFor(article.mainImage).width(600).url()}
          alt={article.title}
          width={600}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="article-content p-6">
        <div className="flex items-center mb-4">
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
        <h3 className="text-lg font-bold heading-apple mb-3 text-apple-darkgray dark:text-white">
          {article.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="mt-auto">
          <Link
            href={`/articles/${article.slug.current}`}
            className="text-blue-500 dark:text-blue-300 font-medium inline-flex items-center"
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
