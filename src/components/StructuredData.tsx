import { Helmet } from "react-helmet-async";

// Organization Schema - for the company
export interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  sameAs?: string[];
}

export const OrganizationSchema = ({
  name = "NinescapeLand",
  url = "https://indoorplaygroundsolution.com",
  logo = "https://indoorplaygroundsolution.com/favicon.png",
  description = "Professional indoor playground equipment manufacturer specializing in custom indoor playgrounds, trampoline parks, ninja courses, and soft play equipment worldwide.",
  email = "sale@indoorplaygroundsolution.com",
  phone = "+86-150-5878-2901",
  address = {
    addressLocality: "Wenzhou",
    addressRegion: "Zhejiang",
    addressCountry: "CN"
  },
  sameAs = []
}: OrganizationSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    email,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      ...address
    },
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "sales",
      email,
      availableLanguage: ["English", "Chinese", "Spanish", "German", "Portuguese", "Arabic"]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Product Schema - for product pages
export interface ProductSchemaProps {
  name: string;
  description: string;
  image: string | string[];
  brand?: string;
  category?: string;
  offers?: {
    priceRange?: string;
    availability?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export const ProductSchema = ({
  name,
  description,
  image,
  brand = "NinescapeLand",
  category,
  offers,
  aggregateRating
}: ProductSchemaProps) => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: Array.isArray(image) ? image : [image],
    brand: {
      "@type": "Brand",
      name: brand
    },
    manufacturer: {
      "@type": "Organization",
      name: "NinescapeLand",
      url: "https://indoorplaygroundsolution.com"
    }
  };

  if (category) {
    schema.category = category;
  }

  if (offers) {
    schema.offers = {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: offers.priceRange || "Contact for quote"
      },
      availability: offers.availability || "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "NinescapeLand"
      }
    };
  }

  if (aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Article Schema - for blog posts
export interface ArticleSchemaProps {
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  url?: string;
}

export const ArticleSchema = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = "NinescapeLand Team",
  url
}: ArticleSchemaProps) => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    author: {
      "@type": "Organization",
      name: author
    },
    publisher: {
      "@type": "Organization",
      name: "NinescapeLand",
      logo: {
        "@type": "ImageObject",
        url: "https://indoorplaygroundsolution.com/favicon.png"
      }
    }
  };

  if (description) schema.description = description;
  if (image) schema.image = image;
  if (datePublished) schema.datePublished = datePublished;
  if (dateModified) schema.dateModified = dateModified;
  if (url) schema.mainEntityOfPage = { "@type": "WebPage", "@id": url };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// FAQ Schema - for FAQ sections
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSchemaProps {
  items: FAQItem[];
}

export const FAQSchema = ({ items }: FAQSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Breadcrumb Schema
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// LocalBusiness Schema - enhanced organization for local SEO
export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://indoorplaygroundsolution.com",
    name: "NinescapeLand",
    description: "Professional indoor playground equipment manufacturer specializing in custom indoor playgrounds, trampoline parks, ninja courses, and soft play equipment. Factory direct sales with worldwide shipping.",
    url: "https://indoorplaygroundsolution.com",
    telephone: "+86-150-5878-2901",
    email: "sale@indoorplaygroundsolution.com",
    image: "https://indoorplaygroundsolution.com/favicon.png",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wenzhou",
      addressRegion: "Zhejiang",
      addressCountry: "CN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "27.9939",
      longitude: "120.6996"
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "0",
        longitude: "0"
      },
      geoRadius: "40075000"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Indoor Playground Equipment",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Indoor Playgrounds",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Custom Indoor Playground" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          name: "Trampoline Parks",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Commercial Trampoline Park" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          name: "Ninja Courses",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Ninja Warrior Course" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          name: "Soft Play",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Soft Play Equipment" } }
          ]
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// WebSite Schema with SearchAction
export const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NinescapeLand",
    url: "https://indoorplaygroundsolution.com",
    description: "Professional indoor playground equipment manufacturer",
    publisher: {
      "@type": "Organization",
      name: "NinescapeLand"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://indoorplaygroundsolution.com/en/products?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
