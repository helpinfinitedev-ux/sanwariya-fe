import http from "../http/index.service";

export type OrderStatus = "pending" | "shipped" | "in-transit" | "delivered";

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  placedAt: string;
  expectedBy: string;
  deliveryAddress: string;
  items: OrderItem[];
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
};

type RawOrderItem = {
  _id?: string;
  id?: string;
  productId?: string | RawProduct;
  quantity?: number;
  unit?: string;
  price?: number;
};

type RawOrder = {
  _id?: string;
  id?: string;
  status?: OrderStatus;
  createdAt?: string;
  expectedDeliveryDate?: string;
  address?: string;
  items?: RawOrderItem[];
};

const fallbackImage = "/premium-selection/1.png";

const readProduct = (value: RawOrderItem["productId"]): RawProduct | null =>
  typeof value === "object" && value ? value : null;

const normalizeItem = (item: RawOrderItem): OrderItem | null => {
  const product = readProduct(item.productId);
  const productId =
    typeof item.productId === "string"
      ? item.productId
      : product?._id || product?.id || "";

  if (!productId) return null;

  return {
    id: item._id || item.id || productId,
    name: product?.name || "Sweet Box",
    image: Array.isArray(product?.images) && product?.images[0] ? product.images[0] : fallbackImage,
    quantity: typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1,
    unit: item.unit || "pcs",
    price: typeof item.price === "number" ? item.price : 0,
  };
};

const normalizeOrder = (order: RawOrder): Order | null => {
  const id = order._id || order.id;
  if (!id) return null;

  const items = (order.items || [])
    .map(normalizeItem)
    .filter((item): item is OrderItem => item !== null);

  return {
    id,
    status: order.status || "pending",
    placedAt: order.createdAt || new Date().toISOString(),
    expectedBy: order.expectedDeliveryDate || new Date().toISOString(),
    deliveryAddress: order.address || "",
    items,
  };
};

export const OrdersService = {
  getMyOrders: async (userId: string): Promise<Order[]> => {
    http.setJWT();
    const response = await http.get<ApiResponse<{ orders: RawOrder[] }>>("/orders", {
      params: { userId, page: 1, limit: 100, sort: "createdAt:desc" },
    });

    return (response.data.result?.orders || [])
      .map(normalizeOrder)
      .filter((item): item is Order => item !== null);
  },
};
