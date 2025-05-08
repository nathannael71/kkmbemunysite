import { client } from '@/lib/sanity/client';
import { articlesListQuery, articlesSettingsQuery } from '@/lib/sanity/queries';
import ArticleCard from '@/components/ui/ArticleCard';
import PageHeader from '@/components/ui/PageHeader';

export const metadata = {
  title: 'Articles | Karir dan Karya Mahasiswa BEM KM UNY',
  description: 'Explore articles and insights from the Karir dan Karya Mahasiswa department at BEM KM Universitas Negeri Yogyakarta'
}

export default async function ArticlesPage() {
  const [articles, settings] = await Promise.all([
    client.fetch(articlesListQuery),
    client.fetch(articlesSettingsQuery)
  ]);
  
  return (
    <div className="pt-24">
      <PageHeader 
        title={settings?.title || "Articles"} 
        description={settings?.description || "Wawasan, cerita, dan sumber daya untuk membantu Anda dalam perjalanan karir."}
        sectionLabel={settings?.sectionLabel || "Artikel Terbaru"}
      />
      
      <section className="py-16 section-gradient-1">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
          
          {articles.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-300">Check back soon for new content.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
