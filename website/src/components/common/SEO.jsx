import React, { useEffect } from 'react';
import { BRAND } from '../../utils/constants';

/**
 * Universal SEO & Social Metadata Head Manager
 * Handles dynamic document.title, meta descriptions, canonical URLs,
 * OpenGraph previews (WhatsApp, FB, LinkedIn), Twitter cards, and Schema.org JSON-LD.
 */
export default function SEO({
  title,
  description,
  canonicalUrl,
  ogImage = '/images/hero/hero-architectural-travertine.jpg',
  ogType = 'website',
  schemaData = null,
  noIndex = false,
}) {
  const fullTitle = title 
    ? `${title} | ${BRAND.name}`
    : `${BRAND.name} | Verified Chennai Real Estate & RERA Approved Properties`;

  const metaDesc = description || BRAND.tagline;
  const siteUrl = BRAND.websiteUrl || 'https://www.propertygatewaypro.com';
  const fullCanonical = canonicalUrl 
    ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl}`)
    : siteUrl;
  
  const fullOgImage = ogImage.startsWith('http') 
    ? ogImage 
    : `${siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to create or update meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', metaDesc);
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMetaTag('name', 'author', BRAND.name);
    setMetaTag('name', 'geo.region', 'IN-TN');
    setMetaTag('name', 'geo.placename', 'Chennai, Tamil Nadu');

    // 3. OpenGraph Tags (WhatsApp, Facebook, LinkedIn)
    setMetaTag('property', 'og:site_name', BRAND.name);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDesc);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', fullCanonical);
    setMetaTag('property', 'og:image', fullOgImage);
    setMetaTag('property', 'og:locale', 'en_IN');

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDesc);
    setMetaTag('name', 'twitter:image', fullOgImage);

    // 5. Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonical);

    // 6. Schema.org JSON-LD Structured Data
    const schemaScriptId = 'pg-schema-jsonld';
    let schemaScript = document.getElementById(schemaScriptId);
    if (schemaData) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = schemaScriptId;
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schemaData);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Clean up dynamic schema script on unmount
      const existingScript = document.getElementById(schemaScriptId);
      if (existingScript) existingScript.remove();
    };
  }, [fullTitle, metaDesc, fullCanonical, fullOgImage, ogType, schemaData, noIndex]);

  return null;
}
