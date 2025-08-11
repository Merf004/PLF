export const palettes = [
  {
    id: 1,
    title: "Palette Électronique Premium",
    description: "Mélange d'appareils électroniques haut de gamme, retours magasins et surstocks",
    price: 599,
    originalPrice: 1500,
    condition: "Grade A",
    quantity: 25,
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500"
    ],
    weight: "30kg",
    dimensions: "120x80x100cm",
    content: ["Smartphones", "Tablettes", "Écouteurs", "Chargeurs", "Accessoires"],
    available: true,
    featured: true,
    category: "Électronique",
    origin: "Retours Amazon",
    estimatedProfit: "200-400€",
    rating: 4.8
  },
  {
    id: 2,
    title: "Palette Vêtements Mixte",
    description: "Collection variée de vêtements toutes saisons, fin de série grandes marques",
    price: 299,
    originalPrice: 800,
    condition: "Grade A-B",
    quantity: 50,
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500"
    ],
    weight: "15kg",
    dimensions: "100x60x80cm",
    content: ["T-shirts", "Jeans", "Robes", "Vestes", "Accessoires"],
    available: true,
    featured: false,
    category: "Textile",
    origin: "Fins de série",
    estimatedProfit: "100-250€",
    rating: 4.8
  },
  {
    id: 3,
    title: "Palette Maison & Décoration",
    description: "Articles de décoration et objets pour la maison, surstock de magasins spécialisés",
    price: 399,
    originalPrice: 900,
    condition: "Grade A",
    quantity: 35,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"
    ],
    weight: "20kg",
    dimensions: "110x70x90cm",
    content: ["Vases", "Coussins", "Cadres", "Bougies", "Objets déco"],
    available: true,
    featured: true,
    category: "Maison",
    origin: "Surstock magasins",
    estimatedProfit: "150-300€",
    rating: 4.8
  },
  {
    id: 4,
    title: "Palette Jouets & Loisirs",
    description: "Jouets et articles de loisirs, parfait pour la revente en période de fêtes",
    price: 459,
    originalPrice: 1200,
    condition: "Grade A-B",
    quantity: 40,
    images: [
      "https://images.unsplash.com/photo-1558877163-92cd80ab9de3?w=500",
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500"
    ],
    weight: "25kg",
    dimensions: "120x80x100cm",
    content: ["Peluches", "Jeux de société", "Figurines", "Puzzles", "Jouets éducatifs"],
    available: true,
    featured: false,
    category: "Jouets",
    origin: "Retours grandes surfaces",
    estimatedProfit: "200-350€",
    rating: 4.8
  },
  {
    id: 5,
    title: "Palette Sport & Fitness",
    description: "Équipements et accessoires de sport, idéal pour boutiques spécialisées",
    price: 549,
    originalPrice: 1400,
    condition: "Grade A",
    quantity: 30,
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500"
    ],
    weight: "35kg",
    dimensions: "130x90x110cm",
    content: ["Haltères", "Tapis yoga", "Équipements fitness", "Vêtements sport", "Accessoires"],
    available: true,
    featured: true,
    category: "Sport",
    origin: "Liquidation magasin",
    estimatedProfit: "250-450€",
    rating: 4.8
  },
  {
    id: 6,
    title: "Palette Beauté & Cosmétiques",
    description: "Produits de beauté et cosmétiques, dates longues, parfait pour revendeurs",
    price: 329,
    originalPrice: 750,
    condition: "Grade A",
    quantity: 80,
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500"
    ],
    weight: "12kg",
    dimensions: "80x60x70cm",
    content: ["Crèmes", "Maquillage", "Parfums", "Soins", "Accessoires beauté"],
    available: true,
    featured: false,
    category: "Beauté",
    origin: "Surstock laboratoire",
    estimatedProfit: "120-200€",
    rating: 4.8
  }
];

export const categories = [
  "Tous",
  "Électronique",
  "Textile", 
  "Maison",
  "Jouets",
  "Sport",
  "Beauté"
];

export const conditions = [
  "Grade A",
  "Grade A-B", 
  "Grade B",
  "Grade C"
];

// Helper functions
export const getFeaturedPalettes = () => {
  return palettes.filter(palette => palette.featured);
};

export const getAvailablePalettes = () => {
  return palettes.filter(palette => palette.available);
};

export const getPaletteById = (id) => {
  return palettes.find(palette => palette.id === parseInt(id));
};

export const filterPalettes = (filters) => {
  return palettes.filter(palette => {
    if (filters.category && filters.category !== "Tous" && palette.category !== filters.category) {
      return false;
    }
    if (filters.condition && palette.condition !== filters.condition) {
      return false;
    }
    if (filters.minPrice && palette.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && palette.price > filters.maxPrice) {
      return false;
    }
    if (filters.available !== undefined && palette.available !== filters.available) {
      return false;
    }
    return true;
  });
};