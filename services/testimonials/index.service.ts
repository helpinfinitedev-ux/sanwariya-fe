export interface Testimonial {
  id: number;
  customerName: string;
  location: string;
  postedAt: string;
  rating: number;
  message: string;
}

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    customerName: "Rohan Mehta",
    location: "Jaipur",
    postedAt: "1 day ago",
    rating: 5,
    message:
      "The gulab jamun was soft, rich, and balanced. Packaging felt premium, and the delivery was perfectly on time.",
  },
  {
    id: 2,
    customerName: "Blossom Menezes",
    location: "Mumbai",
    postedAt: "3 days ago",
    rating: 5,
    message:
      "Sanwariya has become my default for gifting. The saffron notes and texture quality feel consistently top-tier.",
  },
  {
    id: 3,
    customerName: "Aarav Sethi",
    location: "Delhi",
    postedAt: "5 days ago",
    rating: 4,
    message:
      "Excellent flavors and clean ingredient profile. Their motichoor ladoo has a fresh homemade finish I really liked.",
  },
  {
    id: 4,
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

export const TestimonialService = {
  getTestimonials: async (): Promise<Testimonial[]> => {
    await sleep(900);
    return mockTestimonials;
  },
};

