export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
}

export interface PlaceOrderPayload {
  phone: string;
  address: string;
  items: CartItem[];
}

export interface PlaceOrderResponse {
  success: boolean;
  orderId: string;
}

const mockCartItems: CartItem[] = [
  {
    id: 1,
    productId: 1,
    name: "Royal Gulab Jamun",
    price: 450,
    unit: "500g",
    image: "/premium-selection/1.png",
    quantity: 1,
  },
  {
    id: 2,
    productId: 3,
    name: "Silver Kaju Katli",
    price: 600,
    unit: "500g",
    image: "/premium-selection/3.png",
    quantity: 2,
  },
  {
    id: 3,
    productId: 5,
    name: "Desi Besan Ladoo",
    price: 350,
    unit: "500g",
    image: "/premium-selection/2.png",
    quantity: 1,
  },
];

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const CartService = {
  getCartDetails: async (): Promise<CartItem[]> => {
    await sleep(800);
    return mockCartItems;
  },
  placeOrder: async (
    payload: PlaceOrderPayload
  ): Promise<PlaceOrderResponse> => {
    await sleep(1000);

    if (!payload.phone || !payload.address || payload.items.length === 0) {
      throw new Error("Invalid order payload");
    }

    const orderId = `SW-${Date.now().toString().slice(-6)}`;

    return {
      success: true,
      orderId,
    };
  },
};
