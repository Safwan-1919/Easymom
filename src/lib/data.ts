// EasyMom Foods — product catalog, categories, recipes & brand content.
// In a production deployment this would be sourced from the database; here it
// is a typed, hand-curated catalog that powers the storefront experience.

export type SpiceLevel = "Mild" | "Medium" | "Hot" | "Fiery";

export type Category = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  count: number;
  accent: string; // tailwind color token name
  hue: number; // base hue for the card visual
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  price: number; // in INR
  mrp: number;
  weight: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  bestSeller?: boolean;
  isNew?: boolean;
  img?: string;
  images?: string[];
  shortDesc: string;
  description: string;
  ingredients: string[];
  origin: string;
  shelfLife: string;
  spiceLevel: SpiceLevel;
  cookingTime: string;
  servings: string;
  tags: string[];
  hue: number; // 0-360 base hue for card visual
};

export type Recipe = {
  id: string;
  title: string;
  region: string;
  time: string;
  serves: string;
  difficulty: "Easy" | "Medium" | "Involved";
  productSlug: string;
  excerpt: string;
  steps: string[];
  hue: number;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  role: string;
  quote: string;
  rating: number;
  product: string;
};

export const categories: Category[] = [
  {
    id: "green-curry",
    name: "Green Curry",
    tagline: "Coastal green, done right",
    description:
      "Aromatic green curry blend with fresh herbs, green chillies and roasted coconut — built for chicken or meat.",
    count: 1,
    accent: "leaf",
    hue: 145,
  },
  {
    id: "ghee-roast",
    name: "Ghee Roast Masala",
    tagline: "Rich, roasted, unmistakable",
    description:
      "Slow-roasted spices bloomed in ghee for that signature Mangalorean ghee roast — bold, deep, unforgettable.",
    count: 1,
    accent: "chilli",
    hue: 27,
  },
  {
    id: "fish-curry",
    name: "Fish Curry Masala",
    tagline: "Coastal tradition, bottled",
    description:
      "Mangalorean fish curry blend built on roasted kokum, red chillies and hand-pounded coconut.",
    count: 1,
    accent: "turmeric",
    hue: 80,
  },
  {
    id: "fish-fry",
    name: "Fish Fry Masala",
    tagline: "Crispy outside, flaky inside",
    description:
      "A sharp, tangy spice rub designed for pan-fried or deep-fried fish — coastal Kerala style.",
    count: 1,
    accent: "chilli",
    hue: 15,
  },
  {
    id: "red-curry",
    name: "Red Curry",
    tagline: "Deep red, full body",
    description:
      "A rich, slow-roasted red curry masala for chicken or meat — the kind that fills the whole kitchen with warmth.",
    count: 1,
    accent: "chilli",
    hue: 0,
  },
  {
    id: "chicken-sukka",
    name: "Chicken Sukka Masala",
    tagline: "Dry, bold, Mangalorean",
    description:
      "Roasted coconut and whole spice blend for a proper Mangalorean chicken sukka — dry, intense, addictive.",
    count: 1,
    accent: "chilli",
    hue: 40,
  },
  {
    id: "palli-curry",
    name: "Palli Curry",
    tagline: "Peanut-powered comfort",
    description:
      "A peanut and roasted spice blend for a rich, creamy chicken or meat curry — Andhra-style comfort food.",
    count: 1,
    accent: "turmeric",
    hue: 60,
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Green Curry — Chicken or Meat",
    slug: "green-curry",
    categoryId: "green-curry",
    price: 129,
    mrp: 199,
    weight: "100 g",
    rating: 4.9,
    reviewCount: 120,
    badge: "Signature",
    bestSeller: true,
    img: "/brand/products/green-curry1.png",
    images: ["/brand/products/green-curry1.png", "/brand/products/green-curry2.png", "/brand/products/green-curry3.jpeg"],
    shortDesc: "Coastal green curry with fresh herbs, green chillies and roasted coconut.",
    description:
      "An aromatic green curry blend with fresh herbs, green chillies and roasted coconut — built for chicken or meat. Coastal Mangalore tradition, done in under 30 minutes.",
    ingredients: ["Green chilli", "Roasted coconut", "Coriander", "Curry leaves", "Turmeric", "Cumin"],
    origin: "Mangalore, Karnataka",
    shelfLife: "9 months",
    spiceLevel: "Medium",
    cookingTime: "25 min",
    servings: "Serves 4",
    tags: ["coastal", "aromatic"],
    hue: 145,
  },
  {
    id: "p2",
    name: "Ghee Roast Masala",
    slug: "ghee-roast-masala",
    categoryId: "ghee-roast",
    price: 139,
    mrp: 209,
    weight: "100 g",
    rating: 4.8,
    reviewCount: 98,
    badge: "Signature",
    bestSeller: true,
    img: "/brand/products/ghee-roast1.png",
    images: ["/brand/products/ghee-roast1.png", "/brand/products/ghee-roast2.png", "/brand/products/ghee-roast3.jpeg"],
    shortDesc: "Slow-roasted spices bloomed in ghee for that signature Mangalorean ghee roast.",
    description:
      "Slow-roasted spices bloomed in ghee for that signature Mangalorean ghee roast — bold, deep, unforgettable. The spice blend that turns any protein into a proper ghee roast.",
    ingredients: ["Byadgi chilli", "Coriander", "Cumin", "Fenugreek", "Black pepper", "Curry leaves", "Turmeric"],
    origin: "Mangalore, Karnataka",
    shelfLife: "9 months",
    spiceLevel: "Hot",
    cookingTime: "30 min",
    servings: "Serves 4",
    tags: ["ghee-roast", "bold"],
    hue: 27,
  },
  {
    id: "p3",
    name: "Fish Curry Masala",
    slug: "fish-curry-masala",
    categoryId: "fish-curry",
    price: 129,
    mrp: 199,
    weight: "100 g",
    rating: 4.8,
    reviewCount: 178,
    badge: "Signature",
    img: "/brand/products/fish-curry1.png",
    images: ["/brand/products/fish-curry1.png", "/brand/products/fish-curry2.png", "/brand/products/fish-curry3.jpeg"],
    shortDesc: "Mangalorean fish curry blend with roasted kokum, red chillies and coconut.",
    description:
      "Mangalorean fish curry blend built on roasted kokum, red chillies and hand-pounded coconut. Tangy, red, coconut-thick — the coast in a bowl.",
    ingredients: ["Byadgi chilli", "Coriander", "Fenugreek", "Cumin", "Tamarind", "Mustard", "Curry leaves"],
    origin: "Mangalore, Karnataka",
    shelfLife: "9 months",
    spiceLevel: "Hot",
    cookingTime: "30 min",
    servings: "Serves 4",
    tags: ["coastal", "tangy"],
    hue: 25,
  },
  {
    id: "p4",
    name: "Fish Fry Masala",
    slug: "fish-fry-masala",
    categoryId: "fish-fry",
    price: 129,
    mrp: 199,
    weight: "100 g",
    rating: 4.7,
    reviewCount: 112,
    img: "/brand/products/fish-fry1.png",
    images: ["/brand/products/fish-fry1.png", "/brand/products/fish-fry2.png", "/brand/products/fish-fry3.jpeg"],
    shortDesc: "A sharp, tangy spice rub for pan-fried or deep-fried fish — Kerala style.",
    description:
      "A sharp, tangy spice rub designed for pan-fried or deep-fried fish — coastal Kerala style. Crispy outside, flaky inside, every single time.",
    ingredients: ["Kashmiri chilli", "Black pepper", "Cumin", "Coriander", "Ginger", "Garlic", "Curry leaves"],
    origin: "Kochi, Kerala",
    shelfLife: "9 months",
    spiceLevel: "Hot",
    cookingTime: "15 min",
    servings: "Serves 4",
    tags: ["fry", "crispy"],
    hue: 15,
  },
  {
    id: "p5",
    name: "Red Curry — Chicken or Meat",
    slug: "red-curry",
    categoryId: "red-curry",
    price: 129,
    mrp: 199,
    weight: "100 g",
    rating: 4.9,
    reviewCount: 200,
    badge: "Bestseller",
    bestSeller: true,
    img: "/brand/products/red-curry1.png",
    images: ["/brand/products/red-curry1.png", "/brand/products/red-curry2.png", "/brand/products/red-curry3.jpeg"],
    shortDesc: "A rich, slow-roasted red curry masala for chicken or meat.",
    description:
      "A rich, slow-roasted red curry masala for chicken or meat — the kind that fills the whole kitchen with warmth. Deep red, full body, every time.",
    ingredients: ["Byadgi chilli", "Coriander", "Cumin", "Black pepper", "Fenugreek", "Curry leaves", "Turmeric"],
    origin: "Mangalore, Karnataka",
    shelfLife: "9 months",
    spiceLevel: "Hot",
    cookingTime: "25 min",
    servings: "Serves 4",
    tags: ["bestseller", "classic"],
    hue: 0,
  },
  {
    id: "p6",
    name: "Chicken Sukka Masala",
    slug: "chicken-sukka-masala",
    categoryId: "chicken-sukka",
    price: 129,
    mrp: 199,
    weight: "100 g",
    rating: 4.8,
    reviewCount: 145,
    img: "/brand/products/chicken-sukka-masala1.png",
    images: ["/brand/products/chicken-sukka-masala1.png", "/brand/products/chicken-sukka-masala2.png", "/brand/products/chicken-sukka-masala3.jpeg"],
    shortDesc: "Roasted coconut and whole spice blend for Mangalorean chicken sukka.",
    description:
      "Roasted coconut and whole spice blend for a proper Mangalorean chicken sukka — dry, intense, addictive. The dry-roast that needs no gravy.",
    ingredients: ["Roasted coconut", "Byadgi chilli", "Coriander", "Cumin", "Fennel", "Curry leaves", "Turmeric"],
    origin: "Mangalore, Karnataka",
    shelfLife: "9 months",
    spiceLevel: "Hot",
    cookingTime: "25 min",
    servings: "Serves 4",
    tags: ["sukka", "dry-roast"],
    hue: 40,
  },
  {
    id: "p7",
    name: "Palli Curry — Chicken or Meat",
    slug: "palli-curry",
    categoryId: "palli-curry",
    price: 139,
    mrp: 209,
    weight: "100 g",
    rating: 4.7,
    reviewCount: 88,
    img: "/brand/products/palli-curry1.png",
    images: ["/brand/products/palli-curry1.png", "/brand/products/palli-curry2.png", "/brand/products/palli-curry3.jpeg"],
    shortDesc: "Peanut and roasted spice blend for a rich, creamy curry.",
    description:
      "A peanut and roasted spice blend for a rich, creamy chicken or meat curry — Andhra-style comfort food. Palli curry, done right.",
    ingredients: ["Peanut", "Coriander", "Red chilli", "Cumin", "Garlic", "Curry leaves", "Turmeric"],
    origin: "Andhra Pradesh",
    shelfLife: "9 months",
    spiceLevel: "Medium",
    cookingTime: "30 min",
    servings: "Serves 4",
    tags: ["peanut", "creamy"],
    hue: 60,
  },
];

export const recipes: Recipe[] = [
  {
    id: "r1",
    title: "Green Curry Chicken",
    region: "Mangalore, Karnataka",
    time: "30 min",
    serves: "4",
    difficulty: "Easy",
    productSlug: "green-curry",
    excerpt:
      "A fragrant green curry with fresh herbs and roasted coconut — the coastal way.",
    steps: [
      "Marinate 600g chicken in turmeric, salt and a splash of curd for 10 minutes.",
      "Heat coconut oil; add curry leaves, slit green chillies and a sprig of curry leaf.",
      "Add two sliced onions and cook until deeply golden.",
      "Stir in 2 tablespoons of EasyMom Green Curry and cook until the oil separates.",
      "Add the chicken, toss to coat, then pour in coconut milk. Simmer 18 minutes.",
      "Finish with a squeeze of lime and fresh coriander.",
    ],
    hue: 145,
  },
  {
    id: "r2",
    title: "Red Curry Chicken",
    region: "Mangalore, Karnataka",
    time: "30 min",
    serves: "4",
    difficulty: "Easy",
    productSlug: "red-curry",
    excerpt:
      "A rich, slow-roasted red curry that fills the kitchen with warmth.",
    steps: [
      "Marinate 600g chicken in turmeric, salt and ginger-garlic paste for 15 minutes.",
      "Bloom mustard seeds in hot oil; add curry leaves and sliced onions.",
      "Cook onions until deeply golden — patience here is the whole dish.",
      "Add 2 tablespoons of EasyMom Red Curry and cook until oil separates.",
      "Add chicken, toss to coat, pour in hot water to barely cover. Simmer 20 minutes.",
      "Finish with a squeeze of lime and fresh curry leaves.",
    ],
    hue: 0,
  },
  {
    id: "r3",
    title: "Ghee Roast Chicken",
    region: "Mangalore, Karnataka",
    time: "35 min",
    serves: "4",
    difficulty: "Medium",
    productSlug: "ghee-roast",
    excerpt:
      "The iconic Mangalorean ghee roast — bold, rich, unforgettable.",
    steps: [
      "Marinate 600g chicken in turmeric, salt and red chilli paste for 20 minutes.",
      "Heat 3 tablespoons of ghee; sear chicken until golden, set aside.",
      "In the same ghee, cook onions until deeply caramelized.",
      "Add 2 tablespoons of EasyMom Ghee Roast Masala and cook until fragrant.",
      "Return chicken, toss until well coated, cook on medium heat 12 minutes.",
      "Finish with a drizzle of ghee and fresh curry leaves.",
    ],
    hue: 27,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Anjali Rao",
    location: "Bengaluru",
    role: "Software engineer, two kids",
    quote:
      "The Mangalorean chicken masala is the only reason my family eats a proper dinner on weeknights. Tastes exactly like my mother's, in a quarter of the time.",
    rating: 5,
    product: "Mangalorean Chicken Masala",
  },
  {
    id: "t2",
    name: "Vivek Menon",
    location: "Dubai, UAE",
    role: "NRI, Kerala",
    quote:
      "I'd given up on packaged sambar powder abroad. This one actually tastes like Tamil Nadu. My Dubai kitchen finally smells right.",
    rating: 5,
    product: "Sambar Powder",
  },
  {
    id: "t3",
    name: "Priya Krishnan",
    location: "London, UK",
    role: "Doctor, mother of one",
    quote:
      "The gunpowder is dangerously good. I keep a jar at my desk at the hospital. Rice, sesame oil, podi — comfort in two minutes.",
    rating: 5,
    product: "Gunpowder (Idli Podi)",
  },
  {
    id: "t4",
    name: "Arun Kamath",
    location: "Mumbai",
    role: "Investment banker",
    quote:
      "Skeptical at first — premium pricing for masala? The fish curry blend earned it. My Mangalorean mother-in-law approved. That's the only review that matters.",
    rating: 5,
    product: "Mangalorean Fish Curry Masala",
  },
  {
    id: "t5",
    name: "Lakshmi Iyer",
    location: "Singapore",
    role: "Teacher",
    quote:
      "The rasam kit saved a sick week in our house. Proper, peppery, restorative. Tastes like someone made it for you, not from a packet.",
    rating: 5,
    product: "Rasam Kit (6-Serve)",
  },
  {
    id: "t6",
    name: "Rahul Nair",
    location: "Kochi",
    role: "Architect",
    quote:
      "Clean ingredients, no fillers, actual flavour. The Kerala stew masala is the gentlest, most fragrant thing in my pantry now.",
    rating: 4,
    product: "Kerala Chicken Stew Masala",
  },
];

export const brandStats = [
  { value: "42k+", label: "Households served" },
  { value: "100%", label: "No preservatives" },
  { value: "9", label: "South Indian regions" },
  { value: "4.8★", label: "Across 3,200 reviews" },
];

export const brandValues = [
  {
    title: "Small-batch, stone-ground",
    body: "Every blend is ground in batches under 20kg, the way it keeps its volatile oils — never industrial-scale pulverised.",
    icon: "mortar",
  },
  {
    title: "Sourced from origin",
    body: "Byadgi from Karnataka, Tellicherry from Kerala, our coriander from a single co-op in Tamil Nadu. Region matters.",
    icon: "leaf",
  },
  {
    title: "Nothing to hide",
    body: "No fillers, no added colours, no anti-caking agents. Read the back of the pouch — it reads like a recipe.",
    icon: "shield",
  },
  {
    title: "Built for the modern stove",
    body: "Blended so a 15-minute cook still tastes like a 90-minute one. Convenience without compromise is the whole point.",
    icon: "flame",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}
export function productsByCategory(categoryId: string) {
  return products.filter((p) => p.categoryId === categoryId);
}
