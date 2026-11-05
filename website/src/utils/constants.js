export const BRAND = {
  name: "Property Gateway",
  tagline: "Chennai's Trusted Real Estate Gateway",
  phone: "+91 7598954635",
  phoneDisplay: "+91 75989 54635",
  phoneRaw: "917598954635",
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
  const text = `Hi Property Gateway! 🏡
I am interested in: *${property.title}*
📍 Location: ${property.location}
💰 Price: ${property.priceDisplay}
🔗 Ref: https://propertygateway.in/property/${property.slug}

Please share the detailed floor plan, cost sheet, and available site visit slots.`;

  return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(text)}`;
}

export function generateSiteVisitWhatsAppLink(propertyTitle, date) {
  const text = `Hi Property Gateway! 🚗
I would like to schedule a *Free Site Visit with Cab Pickup* for:
🏡 Property: *${propertyTitle || 'Chennai Properties'}*
📅 Preferred Date: ${date || 'This Weekend'}

Please confirm the pickup arrangement.`;

  return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(text)}`;
}
