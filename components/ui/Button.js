import Link from 'next/link';

export default function Button({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  isLoading = false,
  withIcon = false,
}) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full transition-apple font-medium';
  
  const variantStyles = {
    primary: 'bg-apple-blue text-white hover:bg-blue-600 btn-apple',
    secondary: 'bg-white/20 dark:bg-white/10 backdrop-blur-lg text-apple-darkgray dark:text-white hover:bg-white/30 dark:hover:bg-white/20 border border-white/20',
    outline: 'border border-gray-300 dark:border-gray-600 text-apple-darkgray dark:text-white hover:bg-gray-100 dark:hover:bg-white/10',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const computedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled || isLoading ? 'opacity-70 cursor-not-allowed' : ''}`;
  
  // If it's a link, render a Link component
  if (href) {
    return (
      <Link href={href} className={computedClassName}>
        {children}
        {withIcon && (
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        )}
      </Link>
    );
  }
  
  // Otherwise, render a button
  return (
    <button
      type={type}
      onClick={onClick}
      className={computedClassName}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {children}
          {withIcon && (
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          )}
        </>
      )}
    </button>
  );
}
