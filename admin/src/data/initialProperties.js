export const INITIAL_PROPERTIES = [
  {
    id: "ecr-sea-breeze-villa-01",
    title: "The Sovereign Bay - ECR Sea-Facing Luxury Villa",
    slug: "sovereign-bay-ecr-luxury-villa",
    tagline: "Unobstructed Bay of Bengal views with private infinity plunge pool.",
    price: 38500000,
    priceDisplay: "₹3.85 Cr",
    location: "East Coast Road (ECR)",
    type: "Luxury Villa",
    bhk: "4 BHK",
    builtUpArea: 4250,
    carpetArea: 3780,
    possessionStatus: "Ready to Move",
    furnishing: "Semi-Furnished",
    facing: "East",
    floor: "G + 2 Floors",
    reraId: "TN/01/Layout/1124/2023",
    featured: true,
    active: true,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Located along the golden stretch of East Coast Road, this 4 BHK independent sea-facing villa is designed for high-net-worth families.",
    amenities: [
      "Swimming Pool",
      "Power Backup",
      "Clubhouse",
      "24/7 Security",
      "Covered Car Parking",
      "EV Charging Station"
    ],
    landmarks: [
      { name: "MGM Dizzee World", distance: "3 mins" },
      { name: "Mayajaal Multiplex", distance: "6 mins" },
      { name: "Siruseri IT SEZ", distance: "12 mins" }
    ],
    createdAt: "2025-01-15T10:00:00.000Z"
  },
  {
    id: "omr-tidel-park-apartment-02",
    title: "Urban Skyline - 3 BHK High-Rise near Tidel Park",
    slug: "urban-skyline-omr-3bhk-apartment",
    tagline: "Walk to work luxury suites on OMR IT Expressway.",
    price: 13500000,
    priceDisplay: "₹1.35 Cr",
    location: "Old Mahabalipuram Road (OMR)",
    type: "Apartment",
    bhk: "3 BHK",
    builtUpArea: 1680,
    carpetArea: 1390,
    possessionStatus: "Under Construction",
    furnishing: "Unfurnished",
    facing: "North",
    floor: "14th of 24 Floors",
    reraId: "TN/29/Building/0088/2024",
    featured: true,
    active: true,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "Urban Skyline offers premium 3 BHK residences tailored for tech executives. Minutes away from Tidel Park and Ascendas.",
    amenities: [
      "Gymnasium",
      "Swimming Pool",
      "Clubhouse",
      "24/7 Security",
      "Power Backup",
      "Children's Play Area"
    ],
    landmarks: [
      { name: "Tidel Park / Ascendas", distance: "5 mins" },
      { name: "Thiruvanmiyur MRTS", distance: "7 mins" },
      { name: "Adyar Circle", distance: "10 mins" }
    ],
    createdAt: "2025-02-01T10:00:00.000Z"
  },
  {
    id: "anna-nagar-heritage-haven-03",
    title: "The Regal Crest - Ultra Luxury 4 BHK in Anna Nagar",
    slug: "regal-crest-anna-nagar-4bhk",
    tagline: "Exclusive low-density residential haven in Chennai's prime cultural hub.",
    price: 49000000,
    priceDisplay: "₹4.90 Cr",
    location: "Anna Nagar",
    type: "Apartment",
    bhk: "4 BHK",
    builtUpArea: 3200,
    carpetArea: 2850,
    possessionStatus: "Ready to Move",
    furnishing: "Fully Furnished",
    facing: "East",
    floor: "4th of 6 Floors",
    reraId: "TN/02/Building/0432/2023",
    featured: true,
    active: true,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    overview: "An elite residence nestled in 2nd Avenue, Anna Nagar. Only 2 homes per floor ensuring absolute privacy.",
    amenities: [
      "Gymnasium",
      "24/7 Security",
      "Covered Car Parking",
      "Intercom Facility"
    ],
    landmarks: [
      { name: "Anna Nagar Tower Park", distance: "2 mins" },
      { name: "VR Mall Chennai", distance: "6 mins" },
      { name: "Thirumangalam Metro", distance: "4 mins" }
    ],
    createdAt: "2025-02-15T10:00:00.000Z"
  }
];

export const INITIAL_LEADS = [
  {
    id: "lead-01",
    name: "Karthik Subramanian",
    phone: "98401 23456",
    email: "karthik.s@example.com",
    leadType: "Site Visit Request",
    propertyTitle: "The Sovereign Bay - ECR Sea-Facing Luxury Villa",
    preferredLocation: "East Coast Road (ECR)",
    preferredDate: "2025-11-08",
    status: "New",
    submittedAt: "2025-11-05T08:30:00.000Z",
    message: "Interested in the 4 BHK villa. Need cab pickup from Besant Nagar."
  },
  {
    id: "lead-02",
    name: "Deepa Narayanan",
    phone: "98840 56789",
    email: "deepa.n@example.com",
    leadType: "Brochure & Price Sheet",
    propertyTitle: "Urban Skyline - 3 BHK High-Rise near Tidel Park",
    preferredLocation: "Old Mahabalipuram Road (OMR)",
    status: "Contacted",
    submittedAt: "2025-11-04T14:15:00.000Z",
    message: "Please send floor plans and cost breakdown for 14th floor."
  },
  {
    id: "lead-03",
    name: "Ramesh Kannan",
    phone: "94440 98765",
    email: "ramesh.k@example.com",
    leadType: "General Consultation",
    propertyTitle: "All Chennai Projects",
    preferredLocation: "Anna Nagar",
    status: "Site Visit Scheduled",
    submittedAt: "2025-11-03T11:00:00.000Z",
    message: "Looking for 3 or 4 BHK in Anna Nagar or Shenoy Nagar under ₹4.5 Cr."
  }
];
