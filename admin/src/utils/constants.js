export const BRAND = {
  name: "Property Gateway Admin",
  siteName: "Property Gateway",
  phone: "+91 9345852889",
  phoneDisplay: "+91 93458 52889",
  phoneRaw: "919345852889",
  email: "propertygatewaypro@gmail.com",
  address: "37/48, 1st Floor, Vellalar Street, TNGO Colony, Adambakkam, Chennai, Tamil Nadu - 600 088",
  reraId: "TN/Agent/020/2019",
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
