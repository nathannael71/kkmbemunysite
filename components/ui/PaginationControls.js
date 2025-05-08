import Link from 'next/link';

export default function PaginationControls({ currentPage, totalPages, basePath }) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  
  // Generate page numbers to display (current page, 2 before and 2 after)
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show first page
    pages.push(1);
    
    // Add ellipsis after first page if needed
    if (currentPage > 3) {
      pages.push('...');
    }
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  // If there's only one page, don't show pagination
  if (totalPages <= 1) {
    return null;
  }
  
  const getPageUrl = (page) => {
    const separator = basePath.includes('?') ? '&' : '?';
    return `${basePath}${separator}page=${page}`;
  };
  
  return (
    <div className="flex justify-center items-center space-x-2">
      {/* Previous Page Button */}
      {prevPage ? (
        <Link
          href={getPageUrl(prevPage)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/70 dark:bg-white/10 text-apple-darkgray dark:text-white hover:bg-apple-blue hover:text-white transition-colors"
          aria-label="Previous page"
        >
          <i className="fas fa-chevron-left"></i>
        </Link>
      ) : (
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-white/5 text-gray-400 dark:text-gray-600 cursor-not-allowed">
          <i className="fas fa-chevron-left"></i>
        </span>
      )}
      
      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-4 py-2">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={getPageUrl(page)}
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              page === currentPage
                ? 'bg-apple-blue text-white'
                : 'bg-white/70 dark:bg-white/10 text-apple-darkgray dark:text-white hover:bg-apple-blue hover:text-white'
            }`}
          >
            {page}
          </Link>
        )
      ))}
      
      {/* Next Page Button */}
      {nextPage ? (
        <Link
          href={getPageUrl(nextPage)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/70 dark:bg-white/10 text-apple-darkgray dark:text-white hover:bg-apple-blue hover:text-white transition-colors"
          aria-label="Next page"
        >
          <i className="fas fa-chevron-right"></i>
        </Link>
      ) : (
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-white/5 text-gray-400 dark:text-gray-600 cursor-not-allowed">
          <i className="fas fa-chevron-right"></i>
        </span>
      )}
    </div>
  );
}
