"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RegisterForm, { type RegisterFormValues } from "@/components/auth/register-form";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { registerUser } from "@/store/slices/user";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

  const handleRegister = async (values: RegisterFormValues) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      address: values.address,
      password: values.password,
      emailAddress: values.emailAddress || undefined,
    };

    const result = await dispatch(registerUser(payload));
    if (registerUser.fulfilled.match(result)) {
      toast.success("Registration successful");
      router.push("/");
      return;
    }
    toast.error((result.payload as string) || "Registration failed");
  };

  return <RegisterForm onSubmit={handleRegister} loading={loading} />;
}
