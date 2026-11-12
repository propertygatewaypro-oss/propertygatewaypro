import { BRAND } from './constants';

const SITE_URL = BRAND.websiteUrl || 'https://www.propertygatewaypro.com';

/**
 * Generates RealEstateAgent / LocalBusiness Schema (Schema.org)
 * Used on Homepage, About Page, and Contact Page
 */
export function getRealEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#organization`,
    "name": BRAND.name,
    "legalName": "PROPERTY GATEWAY",
    "description": "Tamil Nadu RERA licensed property consultancy in Chennai offering zero-brokerage new builder projects, title verification, and luxury residential sales.",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "image": `${SITE_URL}/images/hero/hero-architectural-travertine.jpg`,
    "telephone": "+91-7598954635",
    "email": BRAND.email,
    "priceRange": "₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Flat No. 2, New No 25, Alandur Road",
      "addressLocality": "Saidapet",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600015",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.0213,
      "longitude": 80.2231
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "10:00",
        "closes": "18:00"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Chennai" },
      { "@type": "AdministrativeArea", "name": "Tamil Nadu" }
    ],
    "knowsAbout": [
      "Residential Apartments in Chennai",
      "Beachfront Villas along ECR",
      "IT Corridor Properties along OMR",
      "TNRERA Due Diligence",
      "Commercial Office Spaces in Guindy & Anna Nagar"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Government License",
        "name": `TNRERA Registration: ${BRAND.reraId}`
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "MSME Registration",
        "name": `Udyam MSME: ${BRAND.udyamRegNo}`
      }
    ]
  };
}

/**
 * Generates FAQPage Schema for rich search result accordions
 */
export function getFaqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q || faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a || faq.answer
      }
    }))
  };
}

/**
 * Generates RealEstateListing / SingleFamilyResidence / Apartment Schema
 * Used on individual Property Detail Pages
 */
export function getPropertyListingSchema(property) {
  if (!property) return null;
  const isVilla = (property.propertyType || property.type || '').toLowerCase().includes('villa');

  const schemaType = isVilla ? 'SingleFamilyResidence' : 'Apartment';

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": property.title,
    "description": property.description || property.tagline,
    "url": `${SITE_URL}/property/${property.slug}`,
    "image": property.images || [],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.location || 'Chennai',
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "numberOfRooms": property.bhk || "3 BHK",
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": property.builtUpArea || property.carpetArea,
      "unitCode": "FTK"
    },
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "INR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": property.price,
        "priceCurrency": "INR",
        "name": property.priceDisplay
      },
      "availability": "https://schema.org/InStock"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "RERA Registration Number",
        "value": property.reraId || "TNRERA Verified"
      },
      {
        "@type": "PropertyValue",
        "name": "Possession Status",
        "value": property.status || property.possessionStatus || "Ready to Move"
      },
      {
        "@type": "PropertyValue",
        "name": "Facing",
        "value": property.facing || "East"
      }
    ]
  };
}

/**
 * Generates BreadcrumbList Schema for navigation paths
 */
export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}
