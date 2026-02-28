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

interface AuthUserResponse {
  message: string;
  result: {
    user: AuthUser;
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
  getUser: async (phoneNumber: string) => {
    const response = await http.get<AuthUserResponse>(`/auth/user/${phoneNumber}`);
    return response.data;
  },
  updateUser: async (phoneNumber: string, password: string) => {
    const response = await http.patch<AuthUserResponse>(`/auth/user/${phoneNumber}`, {
      password,
    });
    return response.data;
  },
  logout: () => {
    localStorage.clear();
  },
};
