export const propertyTypes = [
  { id: "1bhk", label: "1 BHK Home", icon: "Home", baseSqFt: 650, basePrice: 195000 },
  { id: "2bhk", label: "2 BHK Home", icon: "Home", baseSqFt: 1050, basePrice: 345000, popular: true },
  { id: "3bhk", label: "3 BHK Home", icon: "Building", baseSqFt: 1550, basePrice: 495000 },
  { id: "villa", label: "4 BHK / Luxury Villa", icon: "Building", baseSqFt: 2600, basePrice: 850000 },
  { id: "kitchen", label: "Modular Kitchen Only", icon: "Utensils", baseSqFt: 120, basePrice: 110000 },
  { id: "wardrobes", label: "Wardrobes & Carpentry Only", icon: "Layers", baseSqFt: 250, basePrice: 95000 },
  { id: "office", label: "Office / Commercial Space", icon: "Briefcase", baseSqFt: 1800, basePrice: 420000 }
];


export const finishTiers = [
  {
    id: "essential",
    name: "Essential",
    multiplier: 1.0,
    tagline: "Durable & Budget-Friendly",
    features: [
      "IS:303 Moisture Resistant (MR) Plywood",
      "0.8mm High-Pressure Laminates (Merino / Century)",
      "Standard Soft-Close Hinges (Ebco / Ozone)",
      "Asian Paints Tractor Emulsion finish",
      "5-Year Structural Warranty"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    multiplier: 1.35,
    tagline: "Most Popular for Chennai Homes",
    popular: true,
    features: [
      "IS:710 Marine Grade Boiling Water Proof (BWP) Plywood",
      "1.0mm Anti-Fingerprint / High-Gloss Acrylic Laminates",
      "German Soft-Close Tandem Boxes (Hettich / Hafele)",
      "Designer False Ceiling with Philips LED Cove Lights",
      "Asian Paints Royale Luxury Velvet Emulsion",
      "10-Year Comprehensive Warranty"
    ]
  },
  {
    id: "luxury",
    name: "Luxe / Architectural",
    multiplier: 1.8,
    tagline: "Bespoke Italian & Veneer Finishes",
    features: [
      "Greenply Club Prime / HDHMR Anti-Bacterial Core",
      "Natural Teak Wood Veneer with PU Clear Coat / Ultra-Gloss Acrylic",
      "Blum Servo-Drive / Hafele Concealed Hardware",
      "Smart Mood Lighting & Profile LED Aluminum Tracks",
      "Complete Turnkey Oversight & Dedicated Site Engineer",
      "15-Year Life Guarantee & Annual Maintenance"
    ]
  }
];

export const scopeOptions = [
  { id: "kitchen", label: "Modular Kitchen & Storage", defaultChecked: true, priceAdd: 120000 },
  { id: "wardrobes", label: "Bedroom Wardrobes & Lofts", defaultChecked: true, priceAdd: 110000 },
  { id: "falseCeiling", label: "False Ceiling & Ambient LED", defaultChecked: true, priceAdd: 45000 },
  { id: "livingDecor", label: "Living Room TV Unit & Partitions", defaultChecked: true, priceAdd: 40000 },
  { id: "painting", label: "Full Wall & Ceiling Painting", defaultChecked: true, priceAdd: 35000 },
  { id: "electrical", label: "Electrical Rewiring & Modern Switchplates", defaultChecked: false, priceAdd: 28000 },
  { id: "civil", label: "Civil Alteration & Tile / Granite Laying", defaultChecked: false, priceAdd: 50000 },
  { id: "plumbing", label: "Bathroom Sanitary & CPVC Plumbing", defaultChecked: false, priceAdd: 30000 }
];
