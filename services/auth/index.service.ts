import http from "../http/index.service";

export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  emailAddress?: string | null;
  role: "admin" | "customer" | "deliveryPartner";
}

interface AuthResponse {
  message: string;
  result: {
    user: AuthUser;
    token: string;
  };
}

export const AuthService = {
  login: async (credentials: { phoneNumber: string; password: string }) => {
    const response = await http.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },
  register: async (payload: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    password: string;
    emailAddress?: string;
  }) => {
    const response = await http.post<AuthResponse>("/auth/register", payload);
    return response.data;
  },
  logout: () => {
    localStorage.clear();
  },
};
