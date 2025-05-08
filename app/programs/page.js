import { client } from '@/lib/sanity/client';
import { programsListQuery } from '@/lib/sanity/queries';
import ProgramCard from '@/components/ui/ProgramCard';
import PageHeader from '@/components/ui/PageHeader';

export const metadata = {
  title: 'Programs | Karir dan Karya Mahasiswa BEM KM UNY',
  description: 'Explore programs offered by the Karir dan Karya Mahasiswa department at BEM KM Universitas Negeri Yogyakarta'
}

export default async function ProgramsPage() {
  const programs = await client.fetch(programsListQuery);
  
  return (
    <div className="pt-24">
      <PageHeader 
        title="Our Programs" 
        description="Kami menawarkan berbagai program yang dirancang untuk meningkatkan keterampilan, menampilkan bakat, dan mempersiapkan perjalanan karir Anda."
        sectionLabel="Program Kami"
      />
      
      <section className="py-16 section-gradient-2">
        <div className="main-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program._id} program={program} />
            ))}
          </div>
          
          {programs.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No programs found</h3>
              <p className="text-gray-600 dark:text-gray-300">Check back soon for new programs.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
