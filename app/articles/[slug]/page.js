import { client } from '@/lib/sanity/client';
import { articleBySlugQuery, articleSlugsQuery, relatedArticlesQuery } from '@/lib/sanity/queries';
import { formatDate } from '@/lib/utils';
import { urlFor } from '@/lib/sanity/client';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ui/ArticleCard';

// Add this query to lib/sanity/queries.js
// export const relatedArticlesQuery = `*[_type == "article" && count(categories[@._ref in $categoryIds]) > 0 && _id != $articleId] | order(publishedAt desc)[0...3]`;

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
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author?.name],
      images: article.mainImage ? [urlFor(article.mainImage).width(1200).url()] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.mainImage ? [urlFor(article.mainImage).width(1200).url()] : [],
    }
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
  
  // Fetch related articles
  const categoryIds = article.categories?.map(cat => cat._id) || [];
  const relatedArticles = await client.fetch(relatedArticlesQuery, {
    categoryIds,
    articleId: article._id
  });
  
  return (
    <div className="pt-24">
      <article className="py-8 section-gradient-1">
        <div className="main-container max-w-4xl">
          {/* Article header */}
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
            
            {/* Categories */}
            {article.categories && article.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.categories.map(category => (
                  <Link 
                    key={category._id}
                    href={`/articles?category=${category.slug.current}`}
                    className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}
            
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
                priority
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
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <Link 
                    key={tag._id}
                    href={`/articles?tag=${tag.slug.current}`}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    #{tag.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Share Links */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold mb-3">Share this article</h3>
            <div className="flex justify-center space-x-4">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://kkmbemunysite.vercel.app/articles/${article.slug.current}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                aria-label="Share on Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://kkmbemunysite.vercel.app/articles/${article.slug.current}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                aria-label="Share on Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://kkmbemunysite.vercel.app/articles/${article.slug.current}`)}&title=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#0A66C2] rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                aria-label="Share on LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                href={`https://wa.me/?text=${encodeURIComponent(`${article.title} https://kkmbemunysite.vercel.app/articles/${article.slug.current}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                aria-label="Share on WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </article>
      
      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="py-16 section-gradient-2">
          <div className="main-container">
            <h2 className="text-2xl md:text-3xl font-bold heading-apple text-apple-darkgray dark:text-white mb-8 text-center">
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map(article => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
