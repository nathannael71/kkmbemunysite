import { client } from '@/lib/sanity/client';
import { contactQuery } from '@/lib/sanity/queries';
import ContactSection from '@/components/home/ContactSection';

export const metadata = {
  title: 'Contact Us | Karir dan Karya Mahasiswa BEM KM UNY',
  description: 'Get in touch with the Karir dan Karya Mahasiswa department at BEM KM Universitas Negeri Yogyakarta'
}

export default async function ContactPage() {
  const contactData = await client.fetch(contactQuery);
  
  return (
    <div className="pt-24">
      <ContactSection data={contactData} fullPage={true} />
    </div>
  );
}
