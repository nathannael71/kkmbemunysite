// Home page queries
export const heroQuery = `*[_type == "hero"][0] {
  title,
  subtitle,
  buttonText,
  buttonUrl,
  slides[] {
    image {
      asset-> {
        _id,
        url
      }
    },
    alt
  }
}`;

export const aboutQuery = `*[_type == "about"][0] {
  sectionLabel,
  title,
  description,
  features[] {
    title,
    description,
    icon
  }
}`;

export const programsListQuery = `*[_type == "program"] | order(order asc) {
  _id,
  title,
  slug,
  description,
  status,
  image {
    asset-> {
      _id,
      url
    }
  }
}`;

export const teamListQuery = `*[_type == "team"] | order(order asc) {
  _id,
  name,
  position,
  photo {
    asset-> {
      _id,
      url
    }
  },
  instagram,
  email,
  linkedin
}`;

export const teamSettingsQuery = `*[_type == "siteSettings"].teamSettings[0] {
  sectionLabel,
  title,
  description
}`;

export const articlesHomeQuery = `*[_type == "article"] | order(publishedAt desc)[0...4] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage {
    asset-> {
      _id,
      url
    }
  },
  author-> {
    name,
    image {
      asset-> {
        _id,
        url
      }
    }
  }
}`;

export const articlesSettingsQuery = `*[_type == "siteSettings"].articlesSettings[0] {
  sectionLabel,
  title,
  description,
  viewAllButtonText,
  viewAllButtonUrl
}`;

export const timelineQuery = `*[_type == "timeline"] | order(order asc) {
  _id,
  title,
  date,
  description,
  buttonText
}`;

export const timelineSettingsQuery = `*[_type == "siteSettings"].timelineSettings[0] {
  sectionLabel,
  title,
  description
}`;

export const galleryHomeQuery = `*[_type == "gallery"] | order(publishedAt desc)[0...6] {
  _id,
  title,
  date,
  image {
    asset-> {
      _id,
      url
    }
  }
}`;

export const gallerySettingsQuery = `*[_type == "siteSettings"].gallerySettings[0] {
  sectionLabel,
  title,
  description,
  viewAllButtonText,
  viewAllButtonUrl
}`;

export const contactQuery = `*[_type == "siteSettings"].contactSettings[0] {
  sectionLabel,
  title,
  description,
  contactInfo {
    instagram,
    instagramUrl,
    email,
    address
  },
  formspreeId
}`;

export const locationQuery = `*[_type == "siteSettings"].locationSettings[0] {
  sectionLabel,
  title,
  description,
  mapUrl,
  locationName,
  fullAddress,
  directionsUrl,
  cta {
    title,
    description,
    buttonText,
    buttonUrl
  }
}`;

// Site-wide settings
export const footerQuery = `*[_type == "siteSettings"].footer[0] {
  description,
  copyright,
  socialMedia[] {
    platform,
    url,
    icon
  },
  quickLinks[] {
    label,
    url
  },
  contactInfo {
    address,
    email,
    instagram
  },
  legalLinks[] {
    label,
    url
  }
}`;

export const headerQuery = `*[_type == "siteSettings"].header[0] {
  title,
  subtitle,
  menuItems[] {
    label,
    url,
    icon
  }
}`;

// Articles pages
export const articleSlugsQuery = `*[_type == "article" && defined(slug.current)][].slug.current`;

export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage {
    asset-> {
      _id,
      url
    }
  },
  body,
  publishedAt,
  author-> {
    name,
    image {
      asset-> {
        _id,
        url
      }
    }
  }
}`;

export const articlesListQuery = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage {
    asset-> {
      _id,
      url
    }
  },
  author-> {
    name,
    image {
      asset-> {
        _id,
        url
      }
    }
  }
}`;

// Gallery page
export const galleryListQuery = `*[_type == "gallery"] | order(publishedAt desc) {
  _id,
  title,
  date,
  description,
  image {
    asset-> {
      _id,
      url
    }
  }
}`;

export const articleCategoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug
}`;

export const articlesByTagQuery = `*[_type == "article" && $tag in tags[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage {
    asset-> {
      _id,
      url
    }
  },
  author-> {
    name,
    image {
      asset-> {
        _id,
        url
      }
    }
  }
}`;

export const relatedArticlesQuery = `*[_type == "article" && count(categories[@._ref in $categoryIds]) > 0 && _id != $articleId] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage {
    asset-> {
      _id,
      url
    }
  },
  author-> {
    name,
    image {
      asset-> {
        _id,
        url
      }
    }
  }
}`;

export const galleryCategoriesQuery = `*[_type == "galleryCategory"] | order(title asc) {
  _id,
  title,
  slug
}`;
