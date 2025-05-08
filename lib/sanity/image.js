import { urlFor } from './client';

export function getSanityImageUrl(image, width = 800) {
  if (!image || !image.asset) {
    return null;
  }
  
  return urlFor(image).width(width).url();
}

export function getSanityImageDimensions(image) {
  if (!image || !image.asset || !image.asset._ref) {
    return null;
  }
  
  // Extract dimensions from asset reference
  // Format is: image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg
  const dimensions = image.asset._ref.split('-')[2];
  if (!dimensions) return null;
  
  const [width, height] = dimensions.split('x').map(num => parseInt(num, 10));
  return { width, height };
}
