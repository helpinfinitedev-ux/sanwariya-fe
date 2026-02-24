import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService, type AuthUser } from "@/services/auth/index.service";
import http from "@/services/http/index.service";

export const loginUser = createAsyncThunk<
  AuthUser,
  { phoneNumber: string; password: string },
  { rejectValue: string }
>("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(credentials);
    const { token, user } = response.result;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    http.setJWT();
    return user;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

export const registerUser = createAsyncThunk<
  AuthUser,
  {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    password: string;
    emailAddress?: string;
  },
  { rejectValue: string }
>("user/register", async (payload, { rejectWithValue }) => {
  try {
    const response = await AuthService.register(payload);
    const { token, user } = response.result;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    http.setJWT();
    return user;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || "Registration failed");
  }
});

const getInitialUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;

  try {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as AuthUser) : null;
  } catch {
    return null;
  }
};

interface UserState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: getInitialUser(),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      AuthService.logout();
    },
    hydrateUser: (state, action: { payload: AuthUser | null }) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Registration failed";
      });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
