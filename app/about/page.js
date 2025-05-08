import { client } from '@/lib/sanity/client';
import { aboutQuery } from '@/lib/sanity/queries';
import AboutSection from '@/components/home/AboutSection';

export const metadata = {
  title: 'About Us | Karir dan Karya Mahasiswa BEM KM UNY',
  description: 'Learn about the Karir dan Karya Mahasiswa department at BEM KM Universitas Negeri Yogyakarta'
}

export default async function AboutPage() {
  const aboutData = await client.fetch(aboutQuery);
  
  return (
    <div className="pt-24">
      <AboutSection data={aboutData} fullPage={true} />
    </div>
  )
}
