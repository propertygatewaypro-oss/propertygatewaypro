export const BRAND = {
  name: "Property Gateway",
  tagline: "Chennai's Trusted Real Estate Gateway",
  phone: "+91 9345852889",
  phoneDisplay: "+91 93458 52889",
  phoneRaw: "919345852889",
  email: "propertygatewy@gmail.com",
  address: "37/48, 1st Floor, Vellalar Street, TNGO Colony, Adambakkam, Chennai, Tamil Nadu - 600 088",
  reraId: "TN/Agent/020/2019",
  agency: "Strategy 360 Digital Marketing Agency",
};

export const CHENNAI_LOCATIONS = [
  "All Locations",
  "East Coast Road (ECR)",
  "Old Mahabalipuram Road (OMR)",
  "Anna Nagar",
  "Porur",
  "Guindy",
  "Velachery",
  "Medavakkam",
  "Kovilambakkam",
  "Perumbakkam",
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
    const defaultText = `Hello Property Gateway,

I am looking for verified residential properties in Chennai. Please share available options and brochures. Thank you!`;
    return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(defaultText)}`;
  }

  const title = property.title || 'Verified Property';
  const location = property.location ? `\n• Location: ${property.location}` : '';
  const price = property.priceDisplay ? `\n• Price: ${property.priceDisplay}` : '';
  const slug = property.slug ? `\n• Ref: https://propertygateway.in/property/${property.slug}` : '';

  const text = `Hello Property Gateway,

I am interested in: *${title}*${location}${price}${slug}

Please share the detailed floor plans, cost sheet, and available site visit slots. Thank you!`;

  return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(text)}`;
}

export function generateSiteVisitWhatsAppLink(propertyTitle, date) {
  const title = propertyTitle || 'Verified Chennai Properties';
  const preferredDate = date || 'Upcoming Weekend';

  const text = `Hello Property Gateway,

I would like to schedule a complimentary site visit with cab pickup for:
• Property: *${title}*
• Preferred Date: ${preferredDate}

Please let me know the available time slots and confirm the pickup arrangements. Thank you!`;

  return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(text)}`;
}
