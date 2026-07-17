import { Helmet } from "react-helmet-async";

const SITE_URL = "https://indoorplaygroundsolution.com";
const LOGO_URL = `${SITE_URL}/favicon.png`;

// Organization + Manufacturer Schema (trimmed for crawl-budget efficiency)
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
  url = SITE_URL,
  logo = LOGO_URL,
  description = "Professional indoor playground equipment manufacturer since 2008. Custom indoor playgrounds, trampoline parks, ninja courses & soft play. ASTM & TUV certified.",
  email = "sale@indoorplaygroundsolution.com",
  phone = "+86-150-5878-2901",
  address = {
    addressLocality: "Wenzhou",
    addressRegion: "Zhejiang",
    addressCountry: "CN"
  },
  sameAs = [
    "https://www.facebook.com/ninescapeland",
    "https://www.youtube.com/@ninescapeland",
    "https://www.linkedin.com/company/ninescapeland",
    "https://www.instagram.com/ninescapeland"
  ]
}: OrganizationSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "Manufacturer"],
    "@id": `${url}/#organization`,
    name,
    url,
    logo: { "@type": "ImageObject", url: logo, width: 512, height: 512 },
    description,
    email,
    telephone: phone,
    foundingDate: "2008",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 200, maxValue: 300 },
    address: { "@type": "PostalAddress", ...address },
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "sales",
      email,
      availableLanguage: ["English", "Chinese", "Spanish", "German", "Portuguese", "Arabic", "French"]
    },
    areaServed: { "@type": "Place", name: "Worldwide" },
    slogan: "Your Trusted Indoor Playground Equipment Manufacturer Since 2008",
    // Speakable markup helps voice assistants (Google Assistant, Alexa) extract
    // concise answers from the page for spoken responses (AEO / voice-search).
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".hero-description", "meta[name='description']"]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Product Schema
export interface ProductSchemaProps {
  name: string;
  description: string;
  image: string | string[];
  brand?: string;
  category?: string;
  offers?: { priceRange?: string; availability?: string };
  aggregateRating?: { ratingValue: number; reviewCount: number };
}

export const ProductSchema = ({
  name, description, image, brand = "NinescapeLand", category, offers, aggregateRating
}: ProductSchemaProps) => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name, description,
    image: Array.isArray(image) ? image : [image],
    brand: { "@type": "Brand", name: brand },
    manufacturer: { "@type": "Organization", name: "NinescapeLand", url: SITE_URL }
  };
  if (category) schema.category = category;
  if (offers) {
    schema.offers = {
      "@type": "AggregateOffer", priceCurrency: "USD",
      priceSpecification: { "@type": "PriceSpecification", price: offers.priceRange || "Contact for quote" },
      availability: offers.availability || "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "NinescapeLand" }
    };
  }
  if (aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: 5, worstRating: 1
    };
  }
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// FAQ Schema
export interface FAQItem { question: string; answer: string; }
export interface FAQSchemaProps { items: FAQItem[]; }

export const FAQSchema = ({ items }: FAQSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question", name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// Review Schema
export interface ReviewItem { author: string; reviewBody: string; ratingValue: number; datePublished?: string; }
export interface ReviewSchemaProps { itemReviewed: { type: string; name: string }; reviews: ReviewItem[]; }

export const ReviewSchema = ({ itemReviewed, reviews }: ReviewSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: itemReviewed.name,
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.reviewBody,
      reviewRating: { "@type": "Rating", ratingValue: r.ratingValue, bestRating: 5, worstRating: 1 },
      datePublished: r.datePublished
    })),
    aggregateRating: reviews.length > 0 ? {
      "@type": "AggregateRating",
      ratingValue: (reviews.reduce((a, r) => a + r.ratingValue, 0) / reviews.length).toFixed(1),
      reviewCount: reviews.length, bestRating: 5, worstRating: 1
    } : undefined
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// HowTo Schema
export interface HowToStep { name: string; text: string; image?: string; }
export interface HowToSchemaProps { name: string; description: string; steps: HowToStep[]; totalTime?: string; image?: string; }

export const HowToSchema = ({ name, description, steps, totalTime, image }: HowToSchemaProps) => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org", "@type": "HowTo", name, description,
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text, image: s.image }))
  };
  if (totalTime) schema.totalTime = totalTime;
  if (image) schema.image = image;
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// BlogPosting Schema
export interface BlogPostingSchemaProps {
  headline: string; description?: string; image?: string; datePublished?: string;
  dateModified?: string; author?: string; url?: string; keywords?: string;
  wordCount?: number; articleBody?: string;
}

export const BlogPostingSchema = ({
  headline, description, image, datePublished, dateModified,
  author = "NinescapeLand Team", url, keywords, wordCount, articleBody
}: BlogPostingSchemaProps) => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline,
    author: {
      "@type": "Person",
      name: author,
      jobTitle: "Senior Indoor Playground Design Specialist",
      worksFor: { "@type": "Organization", name: "NinescapeLand", url: SITE_URL },
      url: `${SITE_URL}/about-us`,
      image: `${SITE_URL}/favicon-180.png`,
      knowsAbout: [
        "Indoor Playground Equipment",
        "Trampoline Park Design",
        "Ninja Warrior Course Engineering",
        "Soft Play Safety Standards (ASTM F1918, EN 1176)",
        "FEC Business ROI Analysis"
      ],
      description: "16+ years (since 2008) designing commercial indoor playgrounds, trampoline parks and FEC equipment for 2,000+ projects across 50+ countries."
    },
    publisher: { "@type": "Organization", name: "NinescapeLand", logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 } },
    isAccessibleForFree: true, inLanguage: "en"
  };
  if (description) schema.description = description;
  if (image) schema.image = { "@type": "ImageObject", url: image };
  if (datePublished) schema.datePublished = datePublished;
  if (dateModified) schema.dateModified = dateModified;
  if (url) schema.mainEntityOfPage = { "@type": "WebPage", "@id": url };
  if (keywords) schema.keywords = keywords;
  if (wordCount) schema.wordCount = wordCount;
  if (articleBody) schema.articleBody = articleBody.substring(0, 500);
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// Breadcrumb Schema
export interface BreadcrumbItem { name: string; url: string; }
export interface BreadcrumbSchemaProps { items: BreadcrumbItem[]; }

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name, item: item.url
    }))
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// LocalBusiness Schema (trimmed — no nested OfferCatalog)
export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "NinescapeLand",
    description: "Indoor playground equipment manufacturer. Custom playgrounds, trampoline parks, ninja courses & soft play. Worldwide shipping.",
    url: SITE_URL,
    telephone: "+86-150-5878-2901",
    email: "sale@indoorplaygroundsolution.com",
    image: LOGO_URL,
    priceRange: "$$$$",
    address: { "@type": "PostalAddress", addressLocality: "Wenzhou", addressRegion: "Zhejiang", addressCountry: "CN" },
    geo: { "@type": "GeoCoordinates", latitude: "27.9939", longitude: "120.6996" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00", closes: "18:00"
    }
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// ContactPage Schema
export const ContactPageSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact NinescapeLand",
    description: "Contact NinescapeLand for a free 3D playground design & quote within 24 hours.",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Organization", name: "NinescapeLand", url: SITE_URL,
      telephone: "+86-150-5878-2901", email: "sale@indoorplaygroundsolution.com",
      contactPoint: {
        "@type": "ContactPoint", telephone: "+86-150-5878-2901",
        contactType: "sales",
        availableLanguage: ["English", "Chinese", "Spanish", "Portuguese", "German", "French", "Arabic"],
        areaServed: "Worldwide"
      }
    }
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// WebSite Schema with SearchAction
export const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org", "@type": "WebSite",
    name: "NinescapeLand", url: SITE_URL,
    description: "Professional indoor playground equipment manufacturer",
    publisher: { "@type": "Organization", name: "NinescapeLand" },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/en/products?search={search_term_string}` },
      "query-input": "required name=search_term_string"
    }
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// ItemList Schema
export interface ItemListItem { position: number; name: string; url: string; image?: string; description?: string; }
export interface ItemListSchemaProps { name: string; description?: string; items: ItemListItem[]; itemListType?: "Product" | "ListItem"; }

export const ItemListSchema = ({ name, description, items, itemListType = "ListItem" }: ItemListSchemaProps) => {
  const schema = {
    "@context": "https://schema.org", "@type": "ItemList", name, description,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      "@type": itemListType, position: item.position, name: item.name,
      url: item.url, image: item.image, description: item.description
    }))
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// CollectionPage Schema
export interface CollectionPageSchemaProps { name: string; description: string; url: string; image?: string; numberOfItems?: number; }

export const CollectionPageSchema = ({ name, description, url, image, numberOfItems }: CollectionPageSchemaProps) => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org", "@type": "CollectionPage", name, description, url,
    mainEntity: { "@type": "ItemList", numberOfItems },
    publisher: { "@type": "Organization", name: "NinescapeLand", url: SITE_URL }
  };
  if (image) schema.image = image;
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// OfferCatalog Schema
export interface CatalogItem { name: string; description?: string; url: string; }
export interface OfferCatalogSchemaProps { name: string; description?: string; items: CatalogItem[]; }

export const OfferCatalogSchema = ({ name, description, items }: OfferCatalogSchemaProps) => {
  const schema = {
    "@context": "https://schema.org", "@type": "OfferCatalog", name, description,
    itemListElement: items.map((item, index) => ({
      "@type": "Offer", position: index + 1,
      itemOffered: { "@type": "Product", name: item.name, description: item.description, url: item.url }
    }))
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// Blog Schema
export interface BlogItem { position: number; title: string; url: string; image?: string; datePublished?: string; description?: string; }
export interface BlogSchemaProps { name: string; description: string; url: string; blogPosts: BlogItem[]; }

export const BlogSchema = ({ name, description, url, blogPosts }: BlogSchemaProps) => {
  const schema = {
    "@context": "https://schema.org", "@type": "Blog", name, description, url,
    publisher: { "@type": "Organization", name: "NinescapeLand", url: SITE_URL, logo: { "@type": "ImageObject", url: LOGO_URL } },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting", position: post.position, headline: post.title, url: post.url,
      image: post.image, datePublished: post.datePublished, description: post.description,
      author: { "@type": "Organization", name: "NinescapeLand Team" }
    }))
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// SearchAction Schema for Blog
export interface BlogSearchActionSchemaProps { blogUrl: string; }

export const BlogSearchActionSchema = ({ blogUrl }: BlogSearchActionSchemaProps) => {
  const schema = {
    "@context": "https://schema.org", "@type": "WebSite", url: blogUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${blogUrl}?search={search_term_string}` },
      "query-input": "required name=search_term_string"
    }
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};

// Article Schema
export interface ArticleSchemaProps {
  headline: string; description?: string; image?: string;
  datePublished?: string; dateModified?: string; author?: string; url?: string;
}

export const ArticleSchema = ({
  headline, description, image, datePublished, dateModified,
  author = "NinescapeLand Team", url
}: ArticleSchemaProps) => {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org", "@type": "Article", headline,
    author: { "@type": "Organization", name: author },
    publisher: { "@type": "Organization", name: "NinescapeLand", logo: { "@type": "ImageObject", url: LOGO_URL } }
  };
  if (description) schema.description = description;
  if (image) schema.image = image;
  if (datePublished) schema.datePublished = datePublished;
  if (dateModified) schema.dateModified = dateModified;
  if (url) schema.mainEntityOfPage = { "@type": "WebPage", "@id": url };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};
