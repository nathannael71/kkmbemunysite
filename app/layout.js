import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Karir dan Karya Mahasiswa | BEM KM UNY',
  description: 'Departemen Karir dan Karya Mahasiswa BEM KM Universitas Negeri Yogyakarta - Empowering students through career development and creative outlets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="keywords" content="BEM KM UNY, Karir Mahasiswa, Karya Mahasiswa, UNY, Universitas Negeri Yogyakarta" />
        
        {/* Font Awesome Icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-white dark:bg-apple-darkgray text-apple-darkgray dark:text-white transition-colors duration-500 overflow-x-hidden">
        {children}
        
        {/* GSAP for animations */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/ScrollTrigger.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
