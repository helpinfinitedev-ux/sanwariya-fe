export interface Product {
  id: number;
  name: string;
  tags: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  badge: string | null;
  badgeClass: string;
  category: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Royal Gulab Jamun",
    tags: "GHEE ROASTED • SAFFRON INFUSED",
    description:
      "Slow-cooked in pure desi ghee, these melt-in-the-mouth delights are infused with saffron and cardamom.",
    price: 450,
    unit: "500g",
    image: "/premium-selection/1.png",
    badge: "Bestseller",
    badgeClass: "bg-gold text-navy",
    category: "gulab-jamun",
  },
  {
    id: 2,
    name: "Shahi Motichoor Ladoo",
    tags: "TRADITIONAL RECIPE • FINE PEARLS",
    description:
      "Classic golden pearls made from gram flour, fried in ghee and soaked in sugar syrup.",
    price: 380,
    unit: "500g",
    image: "/premium-selection/2.png",
    badge: null,
    badgeClass: "",
    category: "ladoo",
  },
  {
    id: 3,
    name: "Silver Kaju Katli",
    tags: "PREMIUM CASHEWS • THIN CUT",
    description:
      "An exquisite treat made from the finest cashews, finished with a delicate silver leaf.",
    price: 600,
    unit: "500g",
    image: "/premium-selection/3.png",
    badge: null,
    badgeClass: "",
    category: "barfi",
  },
  {
    id: 4,
    name: "Emerald Pista Barfi",
    tags: "CALIFORNIA PISTACHIOS • RICH MILK",
    description:
      "Decadent pistachio fudge made with condensed milk and hand-picked California pistachios.",
    price: 750,
    unit: "500g",
    image: "/premium-selection/1.png",
    badge: null,
    badgeClass: "",
    category: "barfi",
  },
  {
    id: 5,
    name: "Desi Besan Ladoo",
    tags: "ARTISANAL ROASTED • COARSE GRAIN",
    description:
      "Traditional roasted gram flour spheres infused with cardamom and crunchy cashew bits.",
    price: 350,
    unit: "500g",
    image: "/premium-selection/2.png",
    badge: null,
    badgeClass: "",
    category: "ladoo",
  },
  {
    id: 6,
    name: "Exotic Rose Sandesh",
    tags: "FRESH CHHENA • DAMASK ROSE",
    description:
      "Elegant Bengali cottage cheese treats flavored with real rose petals and saffron.",
    price: 500,
    unit: "500g",
    image: "/premium-selection/3.png",
    badge: "New Arrival",
    badgeClass: "bg-rose-500 text-white",
    category: "dry-fruit",
  },
  {
    id: 7,
    name: "Kesar Peda",
    tags: "PURE SAFFRON • CONDENSED MILK",
    description:
      "Rich, creamy peda infused with authentic Kashmiri saffron strands and cardamom.",
    price: 420,
    unit: "500g",
    image: "/premium-selection/1.png",
    badge: null,
    badgeClass: "",
    category: "dry-fruit",
  },
  {
    id: 8,
    name: "Coconut Barfi",
    tags: "FRESH COCONUT • PURE GHEE",
    description:
      "Soft, moist barfi made with freshly grated coconut and sweetened with jaggery.",
    price: 320,
    unit: "500g",
    image: "/premium-selection/2.png",
    badge: null,
    badgeClass: "",
    category: "barfi",
  },
  {
    id: 9,
    name: "Premium Dry Fruit Roll",
    tags: "MIXED NUTS • SILVER LEAF",
    description:
      "A luxurious roll packed with almonds, cashews, pistachios and figs, wrapped in silver leaf.",
    price: 800,
    unit: "500g",
    image: "/premium-selection/3.png",
    badge: "Bestseller",
    badgeClass: "bg-gold text-navy",
    category: "dry-fruit",
  },
  {
    id: 10,
    name: "Classic Rasgulla",
    tags: "FRESH CHHENA • SUGAR SYRUP",
    description:
      "Soft, spongy cottage cheese balls soaked in light cardamom-scented sugar syrup.",
    price: 280,
    unit: "500g",
    image: "/premium-selection/1.png",
    badge: null,
    badgeClass: "",
    category: "gulab-jamun",
  },
  {
    id: 11,
    name: "Mysore Pak",
    tags: "GRAM FLOUR • CLARIFIED BUTTER",
    description:
      "A South Indian delicacy with a melt-in-the-mouth texture crafted from pure ghee.",
    price: 400,
    unit: "500g",
    image: "/premium-selection/2.png",
    badge: null,
    badgeClass: "",
    category: "barfi",
  },
  {
    id: 12,
    name: "Angoor Rabdi",
    tags: "SAFFRON MILK • GRAPE-SIZED",
    description:
      "Miniature milk dumplings simmered in thickened saffron-infused rabdi with pistachios.",
    price: 550,
    unit: "500g",
    image: "/premium-selection/3.png",
    badge: "New Arrival",
    badgeClass: "bg-rose-500 text-white",
    category: "gulab-jamun",
  },
];

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const CollectionService = {
  getProducts: async (): Promise<Product[]> => {
    await sleep(800);
    return mockProducts;
  },
  getProductById: async (id: number): Promise<Product> => {
    await sleep(700);
    const product = mockProducts.find((item) => item.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  },
  getRelatedProducts: async (
    productId: number,
    category: string
  ): Promise<Product[]> => {
    await sleep(500);
    return mockProducts
      .filter((item) => item.id !== productId && item.category === category)
      .concat(
        mockProducts.filter(
          (item) => item.id !== productId && item.category !== category
        )
      )
      .slice(0, 4);
  },
};
