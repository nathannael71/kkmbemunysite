import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import SideMenu from '@/components/global/SideMenu'
import { client } from '@/lib/sanity/client'
import { headerQuery, footerQuery } from '@/lib/sanity/queries'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default async function SiteLayout({ children }) {
  // Fetch header and footer data
  const headerData = await client.fetch(headerQuery);
  const footerData = await client.fetch(footerQuery);
  
  return (
    <>
      <Header headerData={headerData} />
      <SideMenu menuItems={headerData?.menuItems || []} />
      <main>
        {children}
      </main>
      <Footer footerData={footerData} />
      <ScrollToTop />
      
      <script
        id="dark-mode-script"
        dangerouslySetInnerHTML={{
          __html: `
            function initDarkMode() {
              // Check for saved theme preference or prefer-color-scheme
              const savedTheme = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              
              if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
              
              // Listen for OS theme changes
              window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                if (!localStorage.getItem('theme')) { // Only if user hasn't manually set theme
                  if (event.matches) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                }
              });
            }

            // Run on client-side
            if (typeof window !== 'undefined') {
              initDarkMode();
            }
          `,
        }}
      />
    </>
  )
}
