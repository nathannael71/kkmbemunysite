import { client } from '@/lib/sanity/client'
import { 
  heroQuery, aboutQuery, programsListQuery, 
  teamListQuery, teamSettingsQuery, articlesHomeQuery, 
  articlesSettingsQuery, timelineQuery, timelineSettingsQuery,
  galleryHomeQuery, gallerySettingsQuery, contactQuery, locationQuery
} from '@/lib/sanity/queries'

import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import ProgramsSection from '@/components/home/ProgramsSection'
import TeamSection from '@/components/home/TeamSection'
import ArticlesSection from '@/components/home/ArticlesSection'
import TimelineSection from '@/components/home/TimelineSection'
import GallerySection from '@/components/home/GallerySection'
import ContactSection from '@/components/home/ContactSection'
import LocationSection from '@/components/home/LocationSection'

export default async function Home() {
  // Fetch all data for the homepage sections
  const [
    heroData, aboutData, programsData, 
    teamData, teamSettings, articlesData, 
    articlesSettings, timelineData, timelineSettings,
    galleryData, gallerySettings, contactData, locationData
  ] = await Promise.all([
    client.fetch(heroQuery),
    client.fetch(aboutQuery),
    client.fetch(programsListQuery),
    client.fetch(teamListQuery),
    client.fetch(teamSettingsQuery),
    client.fetch(articlesHomeQuery),
    client.fetch(articlesSettingsQuery),
    client.fetch(timelineQuery),
    client.fetch(timelineSettingsQuery),
    client.fetch(galleryHomeQuery),
    client.fetch(gallerySettingsQuery),
    client.fetch(contactQuery),
    client.fetch(locationQuery)
  ])
  
  return (
    <>
      <HeroSection data={heroData} />
      <AboutSection data={aboutData} />
      <ProgramsSection data={programsData} />
      <TeamSection data={teamData} settings={teamSettings} />
      <ArticlesSection data={articlesData} settings={articlesSettings} />
      <TimelineSection data={timelineData} settings={timelineSettings} />
      <GallerySection data={galleryData} settings={gallerySettings} />
      <ContactSection data={contactData} />
      <LocationSection data={locationData} />
    </>
  )
}
