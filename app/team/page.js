import { client } from '@/lib/sanity/client';
import { teamListQuery, teamSettingsQuery } from '@/lib/sanity/queries';
import TeamCard from '@/components/ui/TeamCard';
import PageHeader from '@/components/ui/PageHeader';

export const metadata = {
  title: 'Our Team | Karir dan Karya Mahasiswa BEM KM UNY',
  description: 'Meet the team of the Karir dan Karya Mahasiswa department at BEM KM Universitas Negeri Yogyakarta'
}

export default async function TeamPage() {
  const [team, settings] = await Promise.all([
    client.fetch(teamListQuery),
    client.fetch(teamSettingsQuery)
  ]);
  
  return (
    <div className="pt-24">
      <PageHeader 
        title={settings?.title || "Meet With Our Team"} 
        description={settings?.description || "Tim mahasiswa kami yang berdedikasi untuk membantu sesama tumbuh dan berkembang dalam meraih cita-cita mereka."}
        sectionLabel={settings?.sectionLabel || "Tim Kami"}
      />
      
      <section className="py-16 section-gradient-3">
        <div className="main-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <TeamCard key={member._id} member={member} />
            ))}
          </div>
          
          {team.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No team members found</h3>
              <p className="text-gray-600 dark:text-gray-300">Check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
