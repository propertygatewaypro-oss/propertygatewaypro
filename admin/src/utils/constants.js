export const BRAND = {
  name: "Property Gateway Admin",
  siteName: "Property Gateway",
  firmName: "PROPERTY GATEWAY",
  phone: "+91 7598954635",
  phoneDisplay: "+91 75989 54635",
  phoneRaw: "917598954635",
  email: "propertygatewaypro@gmail.com",
  address: "Flat No. 2, Old No 20 / New No 25, Alandur Road, Saidapet, Chennai - 600 015",
  addressFull: "Flat No. Flat No 2, Door No. Old No 20 New No 25, Alandur Road, Saidapet, Chennai - 600015",
  area: "Saidapet, Chennai",
  reraId: "TN/Agent/0117/2026",
  reraDisplay: "TN/Agent/0117/2026 dated 09.04.2026",
  reraDate: "09.04.2026",
  reraFileNo: "TNRERA/AF/0035/2026",
  udyamRegNo: "UDYAM-TN-02-0464324",
  websiteUrl: import.meta.env.VITE_WEBSITE_URL || "http://localhost:3000",
};

export const CHENNAI_LOCATIONS = [
  "East Coast Road (ECR)",
  "Old Mahabalipuram Road (OMR)",
  "Anna Nagar",
  "Porur",
  "Guindy",
  "Velachery",
  "Medavakkam",
  "Kovilambakkam",
  "Perumbakkam",
  "Thoraipakkam",
  "Sholinganallur",
  "Pallikaranai",
  "Tambaram",
];

export const PROPERTY_TYPES = [
  "Apartment",
  "Luxury Villa",
  "Plot / Land",
  "Commercial Office",
];

export const POSSESSION_STATUSES = [
  "Ready to Move",
  "Under Construction",
  "New Launch",
];

export const FURNISHING_OPTIONS = [
  "Unfurnished",
  "Semi-Furnished",
  "Fully Furnished",
];

export const FACING_OPTIONS = [
  "North",
  "East",
  "South",
  "West",
  "North-East",
  "South-East",
];

export const AMENITIES_CATALOG = [
  "Swimming Pool",
  "Gymnasium",
  "Clubhouse",
  "24/7 Security",
  "Power Backup",
  "Covered Car Parking",
  "EV Charging Station",
  "Children's Play Area",
  "Landscaped Gardens",
  "Jogging Track",
  "CCTV Surveillance",
  "Rooftop Infinity Lounge",
  "Intercom Facility",
  "Rainwater Harvesting",
  "Solar Water Heating",
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
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}
