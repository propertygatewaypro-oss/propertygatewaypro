export const BRAND = {
  name: "Property Gateway",
  firmName: "PROPERTY GATEWAY",
  tagline: "Chennai's Trusted Real Estate Gateway",
  phone: "+91 7598954635",
  phoneDisplay: "+91 75989 54635",
  phoneRaw: "917598954635",
  email: "propertygatewaypro@gmail.com",
  address: "Flat No. 2, New No 25, Alandur Road, Saidapet, Chennai - 600 015",
  addressFull: "Flat No. 2, New No 25, Alandur Road, Saidapet, Chennai - 600015",
  area: "Saidapet, Chennai",
  reraId: "TN/Agent/0117/2026",
  reraDisplay: "TN/Agent/0117/2026 dated 09.04.2026",
  reraDate: "09.04.2026",
  reraFileNo: "TNRERA/AF/0035/2026",
  udyamRegNo: "UDYAM-TN-02-0464324",
  agency: "Strategy 360 Digital Marketing Agency",
  websiteUrl: "https://www.propertygatewaypro.com",
  adminUrl: import.meta.env.VITE_ADMIN_URL || "http://localhost:3001",
};

export const CHENNAI_LOCATIONS = [
  "All Locations",
  "Anna Nagar",
  "East Coast Road (ECR)",
  "Kelambakkam",
  "Kovilambakkam",
  "Madhavaram",
  "Manapakkam",
  "Medavakkam",
  "Old Mahabalipuram Road (OMR)",
  "Padur",
  "Pallavaram",
  "Perungalathur",
  "Perungudi",
  "Porur",
  "Sholinganallur",
  "Singaperumal Koil",
  "Siruseri",
  "Thirumazhisai",
  "Velachery"
];

export const PROPERTY_TYPES = [
  "All Types",
  "Apartment",
  "Luxury Villa",
  "Plot / Land",
  "Commercial Office",
];

export const BUDGET_RANGES = [
  { label: "Any Budget", min: 0, max: Infinity },
  { label: "Under ₹50 Lakhs", min: 0, max: 5000000 },
  { label: "₹50 Lakhs - ₹1 Crore", min: 5000000, max: 10000000 },
  { label: "₹1 Crore - ₹2.5 Crores", min: 10000000, max: 25000000 },
  { label: "Above ₹2.5 Crores", min: 25000000, max: Infinity },
];

export const POSSESSION_STATUSES = [
  "All Statuses",
  "Ready to Move",
  "Under Construction",
  "New Launch",
];

export const BUILDER_PARTNERS = [
  { name: "TVS Emerald", focus: "Sustainable Green Living" },
  { name: "Shriram Properties", focus: "Integrated Townships" },
  { name: "Casagrand", focus: "Luxury & Wellness Communities" },
  { name: "Puravankara", focus: "Premium High-Rises" },
  { name: "Brigade Group", focus: "World-Class Architecture" },
  { name: "Appaswamy", focus: "Chennai Urban Landmarks" },
];

export function formatIndianCurrency(amount) {
  if (!amount || isNaN(amount)) return "Price on Request";
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2);
    return `₹${cr.replace(/\.00$/, '')} Cr`;
  }
  if (amount >= 100000) {
    const l = (amount / 100000).toFixed(1);
    return `₹${l.replace(/\.0$/, '')} Lakhs`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function generateWhatsAppLink(property) {
  if (!property) {
    const defaultText = `Hi Property Gateway, I am looking for verified properties in Chennai. Please share available options.`;
    return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(defaultText)}`;
  }

  const title = property.title || 'Verified Property';
  const location = property.location ? ` in ${property.location}` : '';

  const text = `Hi Property Gateway, I am interested in ${title}${location}. Please share the brochure and pricing details.`;

  return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(text)}`;
}

export function generateSiteVisitWhatsAppLink(propertyTitle, date) {
  const title = propertyTitle || 'Verified Chennai Properties';
  const preferredDate = date || 'Upcoming Weekend';

  const text = `Hi Property Gateway, I would like to schedule a site visit for ${title} on ${preferredDate}. Please share the available time slots.`;

  return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(text)}`;
}
