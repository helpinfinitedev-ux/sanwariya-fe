export type OrderStatus = "pending" | "shipped" | "in-transit" | "delivered";

export interface OrderItem {
  id: number;
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

const mockOrders: Order[] = [
  {
    id: "SW-614728",
    status: "in-transit",
    placedAt: "2026-02-22T10:30:00.000Z",
    expectedBy: "2026-02-24T18:00:00.000Z",
    deliveryAddress: "16-2 Laxman Colony, 4 Jalan Colony, Jaipur, 302004",
    items: [
      {
        id: 1,
        name: "Royal Gulab Jamun",
        image: "/premium-selection/1.png",
        quantity: 2,
        unit: "500g",
        price: 450,
      },
      {
        id: 2,
        name: "Silver Kaju Katli",
        image: "/premium-selection/3.png",
        quantity: 1,
        unit: "500g",
        price: 600,
      },
      {
        id: 3,
        name: "Desi Besan Ladoo",
        image: "/premium-selection/2.png",
        quantity: 1,
        unit: "500g",
        price: 350,
      },
    ],
  },
  {
    id: "SW-514101",
    status: "delivered",
    placedAt: "2026-02-17T09:20:00.000Z",
    expectedBy: "2026-02-19T16:30:00.000Z",
    deliveryAddress: "C-Scheme, Jaipur, Rajasthan",
    items: [
      {
        id: 4,
        name: "Kesar Peda",
        image: "/premium-selection/1.png",
        quantity: 1,
        unit: "500g",
        price: 420,
      },
      {
        id: 5,
        name: "Premium Dry Fruit Roll",
        image: "/premium-selection/3.png",
        quantity: 1,
        unit: "500g",
        price: 800,
      },
    ],
  },
  {
    id: "SW-473392",
    status: "delivered",
    placedAt: "2026-02-08T11:50:00.000Z",
    expectedBy: "2026-02-10T17:00:00.000Z",
    deliveryAddress: "Malviya Nagar, Jaipur, Rajasthan",
    items: [
      {
        id: 6,
        name: "Shahi Motichoor Ladoo",
        image: "/premium-selection/2.png",
        quantity: 2,
        unit: "500g",
        price: 380,
      },
    ],
  },
];

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const OrdersService = {
  getMyOrders: async (): Promise<Order[]> => {
    await sleep(900);
    return mockOrders;
  },
};

