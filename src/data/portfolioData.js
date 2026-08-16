import { projectAssets } from '../assets';

export const portfolioCategories = [
  { id: "all", label: "All Projects" },
  { id: "carpentry", label: "Wardrobes & Carpentry" },
  { id: "interiors", label: "Modular Kitchens & Living" },
  { id: "commercial", label: "Commercial & Office Fitouts" },
  { id: "renovation", label: "Full Turnkey Renovations" }
];

export const portfolioData = [
  {
    id: 1,
    title: "Modern Bedroom Wardrobe with LED Ceiling",
    category: "carpentry",
    categoryLabel: "Wardrobes & Carpentry",
    description: "Full-room wardrobe installation with soft-glide sliding doors, LED cove lighting on false ceiling, and matching window pelmet in soft teal finish.",
    location: "Anna Nagar, Chennai",
    materials: "Greenply BWP Ply, High-Gloss Acrylic, Ebco Slide Fittings, Warm LED 3000K",
    timeline: "14 Days",
    image: projectAssets.projMasterBedroomWardrobe,
    tags: ["Sliding Wardrobe", "LED Cove", "False Ceiling", "Teal Theme"]
  },
  {
    id: 2,
    title: "Two-Tone Designer Geometric Wardrobe",
    category: "carpentry",
    categoryLabel: "Wardrobes & Carpentry",
    description: "Premium white and charcoal grey wardrobe with custom geometric mountain-cut panel design, integrated dresser, and contemporary pull handles.",
    location: "Adyar, Chennai",
    materials: "Century Pro Ply, Matte Charcoal & Off-White Laminate, Hettich Soft-Close",
    timeline: "12 Days",
    image: projectAssets.projDiningAreaPartition,
    tags: ["Two-Tone", "Geometric Cut", "Matte Finish", "Built-in Dresser"]
  },
  {
    id: 3,
    title: "Beige & Wood Natural Veneer Wardrobe",
    category: "carpentry",
    categoryLabel: "Wardrobes & Carpentry",
    description: "Floor-to-ceiling wardrobe in rich natural wood veneer top with matte beige lower panels, matching dressing counter and bed platform.",
    location: "Velachery, Chennai",
    materials: "Natural Teak Veneer, PU Clear Coat, Merino Laminates, Concealed Handles",
    timeline: "16 Days",
    image: projectAssets.projKidsBedroomStudy,
    tags: ["Wood Veneer", "Floor-to-Ceiling", "PU Polish", "Luxury Bedroom"]
  },
  {
    id: 4,
    title: "Grey Gloss Full-Wall Sliding Wardrobe",
    category: "carpentry",
    categoryLabel: "Wardrobes & Carpentry",
    description: "Built-in high-gloss grey sliding wardrobe with upper loft cabinets in light grey, maximizing vertical wall storage without taking room floor space.",
    location: "T. Nagar, Chennai",
    materials: "Acrylic Gloss Shutter, Heavy Duty Top Hanging Track, Aluminium Profiles",
    timeline: "10 Days",
    image: projectAssets.projLivingFalseCeiling,
    tags: ["High Gloss", "Loft Storage", "Top Hung Sliding", "Modern Minimalist"]
  },
  {
    id: 5,
    title: "Modular Parallel Kitchen – Teal & Granite Finish",
    category: "interiors",
    categoryLabel: "Modular Kitchens & Living",
    description: "High-end parallel kitchen featuring acrylic sea-foam green cabinetry, galaxy black quartz countertop, tandem box pull-outs, and built-in chimney recess.",
    location: "Arumbakkam, Chennai",
    materials: "BWP Marine 710 Plywood, Hafele Tandem Boxes, Quartz Counter, Acrylic Shutters",
    timeline: "18 Days",
    image: projectAssets.projModularKitchen,
    tags: ["Parallel Kitchen", "Hafele Hardware", "Quartz Top", "Marine 710"]
  },
  {
    id: 6,
    title: "Contemporary Minimalist Modular Kitchen",
    category: "interiors",
    categoryLabel: "Modular Kitchens & Living",
    description: "L-shaped ergonomic layout designed with anti-scratch laminate shutters, corner carousel unit, oil-pullout, and under-cabinet ambient task lighting.",
    location: "Koyambedu, Chennai",
    materials: "Century Club Prime Ply, Merino Anti-Fingerprint Laminate, Ebco SS Baskets",
    timeline: "15 Days",
    image: projectAssets.projWardrobeGlass,
    tags: ["L-Shaped", "Anti-Fingerprint", "Task Lighting", "Corner Carousel"]
  },
  {
    id: 7,
    title: "Living Room False Ceiling & TV Entertainment Console",
    category: "interiors",
    categoryLabel: "Modular Kitchens & Living",
    description: "Multi-layered perimeter false ceiling with RGB LED cove lights, natural fluted panel TV backer, and floating credenza storage.",
    location: "Porur, Chennai",
    materials: "Saint-Gobain Gyproc Sheets, Charcoal Louver Panels, Philips Smart LED Coves",
    timeline: "10 Days",
    image: projectAssets.projLuxuryLounge,
    tags: ["TV Unit", "Fluted Panels", "Gyproc Ceiling", "Smart Lighting"]
  },
  {
    id: 8,
    title: "Traditional Teak Wood Pooja Room Mandir",
    category: "interiors",
    categoryLabel: "Modular Kitchens & Living",
    description: "Custom CNC cut Jali brass door design, solid teak wood pillar frame, bell insets, and integrated LED backlit deity wall.",
    location: "Tambaram, Chennai",
    materials: "100% Solid Burma Teak, CNC Brass Inlay, PU Matt Melamine Polish",
    timeline: "12 Days",
    image: projectAssets.projModernPoojaRoom,
    tags: ["Pooja Mandir", "CNC Jali", "Burma Teak", "Brass Bells"]
  },
  {
    id: 9,
    title: "Corporate Office Interior – Conference & Workstations",
    category: "commercial",
    categoryLabel: "Commercial & Office Fitouts",
    description: "40-seater IT workspace turnkey fitout including acoustic partition glass, meeting room conference table, data cabling, and commercial carpet flooring.",
    location: "OMR (IT Corridor), Chennai",
    materials: "Toughened 12mm Glass, Acoustic Wall Panels, Moduform Workstations, LED Troffers",
    timeline: "30 Days",
    image: projectAssets.projCommercialOffice,
    tags: ["Corporate Fitout", "Glass Partition", "Acoustic Panels", "Turnkey IT Office"]
  },
  {
    id: 10,
    title: "Walk-in Dressing Closet with Sensor LED Profile",
    category: "renovation",
    categoryLabel: "Full Turnkey Renovations",
    description: "Master bedroom suite walk-in wardrobe featuring tinted fluted glass aluminum framed doors, automatic sensor strip lighting, and vanity island.",
    location: "Maduravoyal, Chennai",
    materials: "Black Anodized Slim Profiles, Tinted Fluted Glass, German Hinges, Sensor LED",
    timeline: "20 Days",
    image: projectAssets.projWalkinCloset,
    tags: ["Walk-in Closet", "Glass Profile", "Sensor Lighting", "Island Vanity"]
  },
  {
    id: 11,
    title: "Complete Villa Bathroom & Civil Plumbing Renovation",
    category: "renovation",
    categoryLabel: "Full Turnkey Renovations",
    description: "Complete wet area tear-down, waterproof chemical grouting, wall-hung sanitary ware, concealed thermostatic diverter, and floating vanity basin.",
    location: "Anna Nagar West, Chennai",
    materials: "Dr. Fixit 2K Waterproofing, Kohler Concealed Diverters, Somany Grand Vitrified Tiles",
    timeline: "14 Days",
    image: projectAssets.projBathroomVanityCivil,
    tags: ["Civil Renovation", "Waterproofing", "Concealed Plumbing", "Luxury Vanity"]
  }
];

export const beforeAfterShowcases = [
  {
    id: "living",
    label: "Living Room & Ceiling",
    title: "Dated Hall to Luxury Contemporary Lounge",
    subtitle: "Complete False Ceiling, Fluted Panels, & Lighting in Adyar",
    location: "Adyar, Chennai",
    duration: "18 Days",
    beforeImage: projectAssets.projDiningAreaPartition,
    afterImage: projectAssets.projLuxuryLounge,
    highlights: [
      "Perimeter LED cove lighting with warm 3000K mood profile",
      "Custom fluted charcoal wall panel behind TV unit",
      "Concealed wiring and acoustic gypsum board treatment"
    ]
  },
  {
    id: "kitchen",
    label: "Modular Kitchen",
    title: "Old Civil Kitchen to Marine 710 Modular Setup",
    subtitle: "Complete Counter Replacement & Acrylic Cabinets in Arumbakkam",
    location: "Arumbakkam, Chennai",
    duration: "21 Days",
    beforeImage: projectAssets.projBathroomVanityCivil,
    afterImage: projectAssets.projModularKitchen,
    highlights: [
      "100% BWP Marine 710 boiling waterproof plywood carcase",
      "Hafele soft-close tandem drawers and corner carousel",
      "Quartz countertop with undermount deep granite sink"
    ]
  },
  {
    id: "wardrobe",
    label: "Bedroom & Wardrobe",
    title: "Bare Wall to Floor-to-Ceiling Luxury Wardrobe",
    subtitle: "Soft-Glide Sliding Wardrobe with Integrated LED in Anna Nagar",
    location: "Anna Nagar, Chennai",
    duration: "14 Days",
    beforeImage: projectAssets.projCommercialOffice,
    afterImage: projectAssets.projMasterBedroomWardrobe,
    highlights: [
      "Heavy duty German top-hung sliding tracks",
      "Integrated sensor LED lights in wardrobe interior",
      "Matching loft cabinets maximizing vertical room height"
    ]
  }
];

export const beforeAfterShowcase = beforeAfterShowcases[0];

