import http from "../http/index.service";

export type CartUnit = "kg" | "g" | "pcs";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  unit: CartUnit;
  image: string;
  quantity: number;
}

export interface UserCart {
  cartId: string;
  items: CartItem[];
}

export interface PlaceOrderPayload {
  cartId?: string;
  userId: string;
  phoneNumber: string;
  address: string;
  items: CartItem[];
}

interface ApiResponse<T> {
  message: string;
  result: T;
}

type RawProduct = {
  _id?: string;
  id?: string;
  name?: string;
  images?: string[];
  price?: number;
};

type RawCartItem = {
  _id?: string;
  id?: string;
  productId?: string | RawProduct;
  quantity?: number;
  price?: number;
  unit?: string;
};

type RawCart = {
  _id?: string;
  id?: string;
  items?: RawCartItem[];
};

const fallbackImage = "/premium-selection/1.png";

const normalizeUnit = (unit?: string): CartUnit => {
  if (unit === "kg" || unit === "g" || unit === "pcs") return unit;
  return "pcs";
};

const readProductId = (productId: RawCartItem["productId"]): string => {
  if (typeof productId === "string") return productId;
  if (productId?._id) return productId._id;
  if (productId?.id) return productId.id;
  return "";
};

const normalizeCartItem = (item: RawCartItem): CartItem | null => {
  const productId = readProductId(item.productId);
  if (!productId) return null;

  const product = typeof item.productId === "object" ? item.productId : undefined;
  const id = item._id || item.id || productId;

  return {
    id,
    productId,
    name: product?.name || "Sweet Box",
    price: typeof item.price === "number" ? item.price : typeof product?.price === "number" ? product.price : 0,
    unit: normalizeUnit(item.unit),
    image: Array.isArray(product?.images) && product?.images[0] ? product.images[0] : fallbackImage,
    quantity: typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1,
  };
};

const normalizeCart = (cart?: RawCart): UserCart | null => {
  if (!cart) return null;
  const cartId = cart._id || cart.id;
  if (!cartId) return null;

  const items = (cart.items || [])
    .map(normalizeCartItem)
    .filter((item): item is CartItem => item !== null);

  return { cartId, items };
};

const toCartItemsPayload = (items: CartItem[]) =>
  items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
    unit: item.unit,
  }));

export const CartService = {
  getCartDetails: async (userId: string): Promise<UserCart | null> => {
    http.setJWT();
    const response = await http.get<ApiResponse<{ carts: RawCart[] }>>("/carts", {
      params: { userId, page: 1, limit: 1, sort: "createdAt:desc" },
    });

    const firstCart = response.data.result?.carts?.[0];
    return normalizeCart(firstCart);
  },

  updateCart: async (cartId: string, items: CartItem[]): Promise<UserCart> => {
    http.setJWT();
    const response = await http.patch<ApiResponse<{ cart: RawCart }>>(`/carts/${cartId}`, {
      items: toCartItemsPayload(items),
    });

    const normalized = normalizeCart(response.data.result?.cart);
    if (!normalized) throw new Error("Unable to update cart");
    return normalized;
  },

  createCart: async (userId: string, items: CartItem[]): Promise<UserCart> => {
    http.setJWT();
    const response = await http.post<ApiResponse<{ cart: RawCart }>>("/carts", {
      userId,
      items: toCartItemsPayload(items),
    });

    const normalized = normalizeCart(response.data.result?.cart);
    if (!normalized) throw new Error("Unable to create cart");
    return normalized;
  },

  deleteCart: async (cartId: string): Promise<void> => {
    http.setJWT();
    await http.delete(`/carts/${cartId}`);
  },

  placeOrder: async (payload: PlaceOrderPayload): Promise<{ orderId: string }> => {
    http.setJWT();

    const expectedDeliveryDate = new Date();
    expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 2);

    const response = await http.post<ApiResponse<{ order: { _id?: string; id?: string } }>>("/orders", {
      userId: payload.userId,
      items: toCartItemsPayload(payload.items),
      address: payload.address,
      phoneNumber: payload.phoneNumber,
      expectedDeliveryDate: expectedDeliveryDate.toISOString(),
    });

    const orderId = response.data.result?.order?._id || response.data.result?.order?.id || "";
    if (!orderId) throw new Error("Unable to place order");

    if (payload.cartId) {
      await CartService.deleteCart(payload.cartId);
    }

    return { orderId };
  },
};
