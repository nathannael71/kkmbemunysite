import Link from 'next/link';

export default function Footer({ footerData }) {
  // Default data in case no CMS data is provided
  const defaultFooterData = {
    description: 'Dedicated to helping students at Universitas Negeri Yogyakarta develop their skills, showcase their talent, and prepare for their future careers.',
    copyright: '© 2025 Karir dan Karya Mahasiswa BEM KM UNY. All rights reserved.',
    socialMedia: [
      { platform: 'Instagram', url: 'https://instagram.com/kkm.bemuny', icon: 'fa-instagram' },
      { platform: 'Twitter', url: '#', icon: 'fa-twitter' },
      { platform: 'LinkedIn', url: '#', icon: 'fa-linkedin' },
      { platform: 'YouTube', url: '#', icon: 'fa-youtube' }
    ],
    quickLinks: [
      { label: 'Home', url: '/' },
      { label: 'About Us', url: '/about' },
      { label: 'Programs', url: '/programs' },
      { label: 'Our Team', url: '/team' },
      { label: 'Articles', url: '/articles' },
      { label: 'Gallery', url: '/gallery' },
      { label: 'Contact', url: '/contact' }
    ],
    contactInfo: {
      address: 'Student Center Building, Universitas Negeri Yogyakarta, Karangmalang, Yogyakarta',
      email: 'kkmbemuny@gmail.com',
      instagram: '@kkm.bemuny'
    },
    legalLinks: [
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Terms of Service', url: '/terms' }
    ]
  };
  
  // Use CMS data if available, otherwise use defaults
  const data = {
    description: footerData?.description || defaultFooterData.description,
    copyright: footerData?.copyright || defaultFooterData.copyright,
    socialMedia: footerData?.socialMedia || defaultFooterData.socialMedia,
    quickLinks: footerData?.quickLinks || defaultFooterData.quickLinks,
    contactInfo: footerData?.contactInfo || defaultFooterData.contactInfo,
    legalLinks: footerData?.legalLinks || defaultFooterData.legalLinks
  };
  
  return (
    <footer className="py-12 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="flex space-x-2 mr-4">
                {/* Placeholder for UNY logo */}
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">UNY</span>
                </div>
                {/* Placeholder for BEM KM logo */}
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">BEM</span>
                </div>
              </div>
              <h3 className="text-lg font-bold heading-apple">KARIR DAN KARYA MAHASISWA</h3>
            </div>
            <p className="text-gray-400 mb-6">
              {data.description}
            </p>
            <div className="flex space-x-4">
              {data.socialMedia.map((social, index) => (
                <a 
                  key={index}
                  href={social.url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-apple"
                  aria-label={social.platform}
                >
                  <i className={`fab ${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="text-base font-bold heading-apple mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {data.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.url} 
                    className="text-gray-400 hover:text-white transition-apple"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h4 className="text-base font-bold heading-apple mb-5">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-apple-blue mt-1 mr-3"></i>
                <span className="text-gray-400">{data.contactInfo.address}</span>
              </li>
              <li className="flex items-start">
                <i className="far fa-envelope text-apple-blue mt-1 mr-3"></i>
                <a 
                  href={`mailto:${data.contactInfo.email}`} 
                  className="text-gray-400 hover:text-white transition-apple"
                >
                  {data.contactInfo.email}
                </a>
              </li>
              <li className="flex items-start">
                <i className="fab fa-instagram text-apple-blue mt-1 mr-3"></i>
                <a 
                  href="https://instagram.com/kkm.bemuny" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-apple"
                >
                  {data.contactInfo.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {data.copyright}
          </p>
          <div className="flex space-x-6">
            {data.legalLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.url} 
                className="text-gray-400 hover:text-white text-sm transition-apple"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
