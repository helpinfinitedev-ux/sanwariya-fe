"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoginForm, { type LoginFormValues } from "@/components/auth/login-form";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { loginUser } from "@/store/slices/user";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

  const handleLogin = async (values: LoginFormValues) => {
    const result = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(result)) {
      toast.success("Login successful");
      router.push("/");
      return;
    }
    toast.error((result.payload as string) || "Login failed");
  };

  return <LoginForm onSubmit={handleLogin} loading={loading} />;
}
