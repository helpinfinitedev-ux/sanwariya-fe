import http from "../http/index.service";

export interface Product {
  id: string;
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

export interface Category {
  id: string;
  label: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Royal Gulab Jamun",
    tags: "GHEE ROASTED • SAFFRON INFUSED",
    description: "Slow-cooked in pure desi ghee, these melt-in-the-mouth delights are infused with saffron and cardamom.",
    price: 450,
    unit: "500g",
    image: "/premium-selection/1.png",
    badge: "Bestseller",
    badgeClass: "bg-gold text-navy",
    category: "gulab-jamun",
  },
  {
    id: "2",
    name: "Shahi Motichoor Ladoo",
    tags: "TRADITIONAL RECIPE • FINE PEARLS",
    description: "Classic golden pearls made from gram flour, fried in ghee and soaked in sugar syrup.",
    price: 380,
    unit: "500g",
    image: "/premium-selection/2.png",
    badge: null,
    badgeClass: "",
    category: "ladoo",
  },
  {
    id: "3",
    name: "Silver Kaju Katli",
    tags: "PREMIUM CASHEWS • THIN CUT",
    description: "An exquisite treat made from the finest cashews, finished with a delicate silver leaf.",
    price: 600,
    unit: "500g",
    image: "/premium-selection/3.png",
    badge: null,
    badgeClass: "",
    category: "barfi",
  },
  {
    id: "4",
    name: "Emerald Pista Barfi",
    tags: "CALIFORNIA PISTACHIOS • RICH MILK",
    description: "Decadent pistachio fudge made with condensed milk and hand-picked California pistachios.",
    price: 750,
    unit: "500g",
    image: "/premium-selection/1.png",
    badge: null,
    badgeClass: "",
    category: "barfi",
  },
  {
    id: "5",
    name: "Desi Besan Ladoo",
    tags: "ARTISANAL ROASTED • COARSE GRAIN",
    description: "Traditional roasted gram flour spheres infused with cardamom and crunchy cashew bits.",
    price: 350,
    unit: "500g",
    image: "/premium-selection/2.png",
    badge: null,
    badgeClass: "",
    category: "ladoo",
  },
  {
    id: "6",
    name: "Exotic Rose Sandesh",
    tags: "FRESH CHHENA • DAMASK ROSE",
    description: "Elegant Bengali cottage cheese treats flavored with real rose petals and saffron.",
    price: 500,
    unit: "500g",
    image: "/premium-selection/3.png",
    badge: "New Arrival",
    badgeClass: "bg-rose-500 text-white",
    category: "dry-fruit",
  },
  {
    id: "7",
    name: "Kesar Peda",
    tags: "PURE SAFFRON • CONDENSED MILK",
    description: "Rich, creamy peda infused with authentic Kashmiri saffron strands and cardamom.",
    price: 420,
    unit: "500g",
    image: "/premium-selection/1.png",
    badge: null,
    badgeClass: "",
    category: "dry-fruit",
  },
  {
    id: "8",
    name: "Coconut Barfi",
    tags: "FRESH COCONUT • PURE GHEE",
    description: "Soft, moist barfi made with freshly grated coconut and sweetened with jaggery.",
    price: 320,
    unit: "500g",
    image: "/premium-selection/2.png",
    badge: null,
    badgeClass: "",
    category: "barfi",
  },
  {
    id: "9",
    name: "Premium Dry Fruit Roll",
    tags: "MIXED NUTS • SILVER LEAF",
    description: "A luxurious roll packed with almonds, cashews, pistachios and figs, wrapped in silver leaf.",
    price: 800,
    unit: "500g",
    image: "/premium-selection/3.png",
    badge: "Bestseller",
    badgeClass: "bg-gold text-navy",
    category: "dry-fruit",
  },
  {
    id: "10",
    name: "Classic Rasgulla",
    tags: "FRESH CHHENA • SUGAR SYRUP",
    description: "Soft, spongy cottage cheese balls soaked in light cardamom-scented sugar syrup.",
    price: 280,
    unit: "500g",
    image: "/premium-selection/1.png",
    badge: null,
    badgeClass: "",
    category: "gulab-jamun",
  },
  {
    id: "11",
    name: "Mysore Pak",
    tags: "GRAM FLOUR • CLARIFIED BUTTER",
    description: "A South Indian delicacy with a melt-in-the-mouth texture crafted from pure ghee.",
    price: 400,
    unit: "500g",
    image: "/premium-selection/2.png",
    badge: null,
    badgeClass: "",
    category: "barfi",
  },
  {
    id: "12",
    name: "Angoor Rabdi",
    tags: "SAFFRON MILK • GRAPE-SIZED",
    description: "Miniature milk dumplings simmered in thickened saffron-infused rabdi with pistachios.",
    price: 550,
    unit: "500g",
    image: "/premium-selection/3.png",
    badge: "New Arrival",
    badgeClass: "bg-rose-500 text-white",
    category: "gulab-jamun",
  },
];

const mockCategories: Category[] = [
  { id: "gulab-jamun", label: "Gulab Jamun" },
  { id: "ladoo", label: "Ladoo" },
  { id: "barfi", label: "Barfi" },
  { id: "dry-fruit", label: "Dry Fruit Special" },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

const readData = (payload: unknown): unknown => {
  if (!isRecord(payload)) return payload;
  if ("result" in payload) return payload.result;
  if ("data" in payload) return payload.data;
  return payload;
};

const readArray = (payload: unknown, key?: string): unknown[] => {
  const data = readData(payload);
  if (Array.isArray(data)) return data;
  if (key && isRecord(data) && Array.isArray(data[key])) {
    return data[key] as unknown[];
  }
  return [];
};

const toSlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const readCategoryId = (rawCategory: unknown): string => {
  if (typeof rawCategory === "string") {
    return rawCategory;
  }

  if (isRecord(rawCategory)) {
    if (typeof rawCategory.id === "string") return rawCategory.id;
    if (typeof rawCategory._id === "string") return rawCategory._id;
    if (typeof rawCategory.slug === "string") return rawCategory.slug;
    if (typeof rawCategory.name === "string") return toSlug(rawCategory.name);
  }

  return "uncategorized";
};

const normalizeProduct = (raw: unknown): Product | null => {
  if (!isRecord(raw)) return null;

  const idValue = typeof raw.id === "string" ? raw.id : typeof raw._id === "string" ? raw._id : typeof raw.id === "number" ? String(raw.id) : typeof raw._id === "number" ? String(raw._id) : "";

  if (!idValue) return null;

  const name = typeof raw.name === "string" ? raw.name : "Unnamed Product";

  return {
    id: idValue,
    name,
    tags: typeof raw.tags === "string" ? raw.tags : "",
    description: typeof raw.description === "string" ? raw.description : "",
    price: typeof raw.price === "number" ? raw.price : Number(raw.price ?? 0),
    unit: typeof raw.unit === "string" ? raw.unit : "Kg",
    image:
      typeof raw.image === "string" && raw.image.length > 0
        ? raw.image
        : Array.isArray(raw.images) && typeof raw.images[0] === "string" && raw.images[0].length > 0
        ? raw.images[0]
        : "/premium-selection/1.png",
    badge: typeof raw.badge === "string" ? raw.badge : null,
    badgeClass: typeof raw.badgeClass === "string" ? raw.badgeClass : "",
    category: readCategoryId(raw.category),
  };
};

const normalizeCategory = (raw: unknown): Category | null => {
  if (!isRecord(raw)) return null;

  const id = typeof raw.id === "string" ? raw.id : typeof raw._id === "string" ? raw._id : typeof raw.slug === "string" ? raw.slug : typeof raw.name === "string" ? toSlug(raw.name) : null;

  const label = typeof raw.label === "string" ? raw.label : typeof raw.name === "string" ? raw.name : null;

  if (!id || !label) return null;

  return { id, label };
};

export const CollectionService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await http.get("/products");
      const products = readArray(response.data, "products")
        .map(normalizeProduct)
        .filter((item): item is Product => item !== null);

      return products.length > 0 ? products : mockProducts;
    } catch {
      await sleep(800);
      return [];
    }
  },
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await http.get("/categories");
      const categories = readArray(response.data, "categories")
        .map(normalizeCategory)
        .filter((item): item is Category => item !== null);

      return categories.length > 0 ? categories : [];
    } catch {
      await sleep(400);
      return [];
    }
  },
  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await http.get(`/products/${id}`);
      const data = readData(response.data);
      const product = normalizeProduct(isRecord(data) && "product" in data ? data.product : data);

      if (!product) throw new Error("Product not found");
      return product;
    } catch {
      await sleep(700);
      const product = mockProducts.find((item) => item.id === id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    }
  },
  getRelatedProducts: async (productId: string, category: string): Promise<Product[]> => {
    const products = await CollectionService.getProducts();
    const related = products
      .filter((item) => item.id !== productId && item.category === category)
      .concat(products.filter((item) => item.id !== productId && item.category !== category))
      .slice(0, 4);

    if (related.length > 0) {
      return related;
    }

    await sleep(500);
    return mockProducts
      .filter((item) => item.id !== productId && item.category === category)
      .concat(mockProducts.filter((item) => item.id !== productId && item.category !== category))
      .slice(0, 4);
  },
};
