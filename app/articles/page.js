'use client';

import { useState } from 'react';
import { client } from '@/lib/sanity/client';
import { articlesListQuery, articlesSettingsQuery, articleCategoriesQuery } from '@/lib/sanity/queries';
import ArticleCard from '@/components/ui/ArticleCard';
import PageHeader from '@/components/ui/PageHeader';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PaginationControls from '@/components/ui/PaginationControls';

export default async function ArticlesPage({ searchParams }) {
  const currentPage = parseInt(searchParams?.page) || 1;
  const pageSize = 9;
  const category = searchParams?.category || null;
  const search = searchParams?.search || null;

  const [articles, settings, categories] = await Promise.all([
    client.fetch(articlesListQuery),
    client.fetch(articlesSettingsQuery),
    client.fetch(articleCategoriesQuery)
  ]);

  let filteredArticles = articles;

  if (category) {
    filteredArticles = filteredArticles.filter(article => 
      article.categories?.some(cat => cat.slug.current === category)
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredArticles = filteredArticles.filter(article => 
      article.title.toLowerCase().includes(searchLower) ||
      article.excerpt.toLowerCase().includes(searchLower)
    );
  }

  const totalPages = Math.ceil(filteredArticles.length / pageSize);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const queryParams = new URLSearchParams();
  if (category) queryParams.set('category', category);
  if (search) queryParams.set('search', search);
  const basePath = `/articles?${queryParams.toString()}`;

  return (
    <div className="pt-24">
      <PageHeader 
        title={settings?.title || "Articles"} 
        description={settings?.description || "Wawasan, cerita, dan sumber daya untuk membantu Anda dalam perjalanan karir."}
        sectionLabel={settings?.sectionLabel || "Artikel Terbaru"}
      />
      
      <section className="py-16 section-gradient-1">
        <div className="main-container">
          {/* Search and filter */}
          <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Link
                href="/articles"
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  !category ? 'bg-apple-blue text-white' : 'bg-white/60 dark:bg-white/10 text-apple-darkgray dark:text-white'
                }`}
              >
                All Articles
              </Link>
              
              {categories.map(cat => (
                <Link
                  key={cat._id}
                  href={`/articles?category=${cat.slug.current}`}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    category === cat.slug.current ? 'bg-apple-blue text-white' : 'bg-white/60 dark:bg-white/10 text-apple-darkgray dark:text-white'
                  }`}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
            
            <form className="flex max-w-md">
              {category && (
                <input type="hidden" name="category" value={category} />
              )}
              <input
                type="text"
                name="search"
                placeholder="Search articles..."
                defaultValue={search || ''}
                className="px-4 py-2 rounded-l-lg border border-white/20 bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-base w-full"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-apple-blue text-white rounded-r-lg"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
          
          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {search 
                  ? `No articles matching "${search}"`
                  : category 
                    ? "No articles in this category" 
                    : "Check back soon for new content."
                }
              </p>
              {(search || category) && (
                <Link href="/articles" className="mt-4 inline-block text-apple-blue dark:text-blue-300">
                  View all articles
                </Link>
              )}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <PaginationControls 
                currentPage={currentPage} 
                totalPages={totalPages} 
                basePath={basePath} 
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
