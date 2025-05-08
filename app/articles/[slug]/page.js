import { client } from '@/lib/sanity/client';
import { articleBySlugQuery, articleSlugsQuery } from '@/lib/sanity/queries';
import { formatDate } from '@/lib/utils';
import { urlFor } from '@/lib/sanity/client';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

// Generate static paths for all articles
export async function generateStaticParams() {
  const slugs = await client.fetch(articleSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each article
export async function generateMetadata({ params }) {
  const { slug } = params;
  const article = await client.fetch(articleBySlugQuery, { slug });
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for could not be found.'
    };
  }
  
  return {
    title: `${article.title} | Karir dan Karya Mahasiswa BEM KM UNY`,
    description: article.excerpt,
    openGraph: {
      images: article.mainImage ? [urlFor(article.mainImage).width(1200).url()] : [],
    },
  };
}

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8 relative">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ' '}
            width={800}
            height={450}
            className="rounded-lg mx-auto"
          />
          {value.alt && (
            <div className="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">
              {value.alt}
            </div>
          )}
        </div>
      );
    },
  },
};

export default async function ArticlePage({ params }) {
  const { slug } = params;
  const article = await client.fetch(articleBySlugQuery, { slug });
  
  if (!article) {
    notFound();
  }
  
  return (
    <div className="pt-24">
      <article className="py-8 section-gradient-1">
        <div className="main-container max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/articles" 
              className="inline-flex items-center text-blue-500 dark:text-blue-300 mb-4"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to Articles
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold heading-apple mb-6">
              {article.title}
            </h1>
            
            <div className="flex items-center mb-6">
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
                <p className="text-sm font-medium">
                  {article.author?.name || 'Anonymous'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {formatDate(article.publishedAt)}
                </p>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          {article.mainImage && (
            <div className="mb-8 relative rounded-2xl overflow-hidden">
              <Image
                src={urlFor(article.mainImage).width(1000).url()}
                alt={article.title}
                width={1000}
                height={500}
                className="w-full object-cover aspect-video"
              />
            </div>
          )}
          
          {/* Article Content */}
          <div className="bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-lg transition-apple border border-white/20 article-content">
            <PortableText 
              value={article.body}
              components={ptComponents}
            />
          </div>
          
          {/* Share Links */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold mb-3">Share this article</h3>
            <div className="flex justify-center space-x-4">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://kkmbemunysite.vercel.app/articles/${article.slug.current}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://kkmbemunysite.vercel.app/articles/${article.slug.current}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://kkmbemunysite.vercel.app/articles/${article.slug.current}`)}&title=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#0A66C2] rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                href={`https://wa.me/?text=${encodeURIComponent(`${article.title} https://kkmbemunysite.vercel.app/articles/${article.slug.current}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
