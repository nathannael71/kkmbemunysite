import { PortableText as SanityPortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <div className="my-8 relative">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || ' '}
            width={800}
            height={450}
            className="rounded-lg mx-auto"
          />
          {value.alt && (
            <div className="text-sm text-center mt-2 text-gray-600 dark:text-gray-400">
              {value.alt}
            </div>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          target={!value.href.startsWith('/') ? '_blank' : undefined}
          className="text-blue-500 dark:text-blue-300 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="my-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 my-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 my-4">{children}</ol>
    ),
  },
};

export default function PortableText({ content }) {
  return <SanityPortableText value={content} components={components} />;
}
