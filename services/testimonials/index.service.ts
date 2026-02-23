import http from "../http/index.service";

export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  postedAt: string;
  rating: number;
  message: string;
}

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    customerName: "Rohan Mehta",
    location: "Jaipur",
    postedAt: "1 day ago",
    rating: 5,
    message:
      "The gulab jamun was soft, rich, and balanced. Packaging felt premium, and the delivery was perfectly on time.",
  },
  {
    id: "2",
    customerName: "Blossom Menezes",
    location: "Mumbai",
    postedAt: "3 days ago",
    rating: 5,
    message:
      "Sanwariya has become my default for gifting. The saffron notes and texture quality feel consistently top-tier.",
  },
  {
    id: "3",
    customerName: "Aarav Sethi",
    location: "Delhi",
    postedAt: "5 days ago",
    rating: 4,
    message:
      "Excellent flavors and clean ingredient profile. Their motichoor ladoo has a fresh homemade finish I really liked.",
  },
  {
    id: "4",
    customerName: "Niyati Shah",
    location: "Ahmedabad",
    postedAt: "1 week ago",
    rating: 5,
    message:
      "The dry fruit barfi tasted luxurious and not overly sweet. It felt handcrafted, elegant, and worth the price.",
  },
];

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readResult = (payload: unknown): unknown => {
  if (!isRecord(payload)) return payload;
  if ("result" in payload) return payload.result;
  if ("data" in payload) return payload.data;
  return payload;
};

const readArray = (payload: unknown, key: string): unknown[] => {
  const result = readResult(payload);
  if (Array.isArray(result)) return result;
  if (isRecord(result) && Array.isArray(result[key])) return result[key] as unknown[];
  return [];
};

const toPostedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "Recently";
  return date.toLocaleDateString();
};

const normalizeTestimonial = (raw: unknown, index: number): Testimonial | null => {
  if (!isRecord(raw)) return null;

  const id =
    typeof raw._id === "string"
      ? raw._id
      : typeof raw.id === "string"
      ? raw.id
      : String(index + 1);

  const message =
    typeof raw.comment === "string"
      ? raw.comment
      : typeof raw.message === "string"
      ? raw.message
      : "";

  if (!message) return null;

  return {
    id,
    customerName: "Sanwariya Customer",
    location: "India",
    postedAt:
      typeof raw.createdAt === "string" ? toPostedAt(raw.createdAt) : "Recently",
    rating:
      typeof raw.rating === "number"
        ? raw.rating
        : Number(raw.rating ?? 5) || 5,
    message,
  };
};

export const TestimonialService = {
  getTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const response = await http.get("/testimonials");
      const testimonials = readArray(response.data, "testimonials")
        .map((item, index) => normalizeTestimonial(item, index))
        .filter((item): item is Testimonial => item !== null);

      return testimonials.length > 0 ? testimonials : mockTestimonials;
    } catch {
      await sleep(900);
      return mockTestimonials;
    }
  },
};
