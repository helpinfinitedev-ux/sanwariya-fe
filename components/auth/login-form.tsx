"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { AuthService } from "@/services/auth/index.service";
import { toast } from "sonner";

const loginSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const forgotPasswordSchema = z
  .object({
    phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void> | void;
  loading?: boolean;
}

const LoginForm = ({ onSubmit, loading = false }: LoginFormProps) => {
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const forgotForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phoneNumber: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleVerifyPhone = async () => {
    const isValid = await forgotForm.trigger("phoneNumber");
    if (!isValid) return;

    const phoneNumber = forgotForm.getValues("phoneNumber");
    setIsCheckingPhone(true);
    try {
      await AuthService.getUser(phoneNumber);
      setIsPhoneVerified(true);
      toast.success("Phone number found. You can now set a new password.");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "User not found");
      setIsPhoneVerified(false);
    } finally {
      setIsCheckingPhone(false);
    }
  };

  const handleForgotPasswordSubmit = async (values: ForgotPasswordFormValues) => {
    if (!isPhoneVerified) {
      toast.error("Please verify your phone number first");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await AuthService.updateUser(values.phoneNumber, values.newPassword);
      toast.success("Password updated successfully. Please login with your new password.");
      setIsForgotPasswordMode(false);
      setIsPhoneVerified(false);
      form.setValue("phoneNumber", values.phoneNumber);
      form.setValue("password", "");
      forgotForm.reset();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="font-sans font-bold text-2xl md:text-3xl text-gold-secondary mb-3 uppercase tracking-wide">Welcome Back</h1>
      <p className="text-beige/70 text-sm mb-8 leading-relaxed">
        {isForgotPasswordMode
          ? "Verify your phone number and set a new password."
          : "Sign in to continue your royal experience."}
      </p>

      {isForgotPasswordMode ? (
        <Form {...forgotForm}>
          <form onSubmit={forgotForm.handleSubmit(handleForgotPasswordSubmit)} className="space-y-5">
            <FormField
              control={forgotForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold-secondary/80 text-[11px] uppercase tracking-[3px] font-sans font-medium">Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" inputMode="numeric" maxLength={10} placeholder="9876543210" className="text-white" />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />

            <Button type="button" className="w-full h-12 font-sans font-bold text-sm uppercase tracking-[2px]" onClick={handleVerifyPhone} disabled={isCheckingPhone || isPhoneVerified}>
              {isCheckingPhone ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : isPhoneVerified ? (
                "Phone Verified"
              ) : (
                "Verify Phone Number"
              )}
            </Button>

            {isPhoneVerified ? (
              <>
                <FormField
                  control={forgotForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold-secondary/80 text-[11px] uppercase tracking-[3px] font-sans font-medium">New Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="••••••••" className="text-white" />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={forgotForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gold-secondary/80 text-[11px] uppercase tracking-[3px] font-sans font-medium">Confirm Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="••••••••" className="text-white" />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 font-sans font-bold text-sm uppercase tracking-[2px]" disabled={isUpdatingPassword}>
                  {isUpdatingPassword ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </>
            ) : null}

            <Button
              type="button"
              variant="link"
              className="mx-auto block h-auto p-0 text-gold/70 hover:text-gold"
              onClick={() => {
                setIsForgotPasswordMode(false);
                setIsPhoneVerified(false);
                forgotForm.reset();
              }}
            >
              Back to login
            </Button>
          </form>
        </Form>
      ) : null}

      {!isForgotPasswordMode ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold-secondary/80 text-[11px] uppercase tracking-[3px] font-sans font-medium">Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} type="tel" inputMode="numeric" maxLength={10} placeholder="9876543210" className="text-white" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-gold-secondary/80 text-[11px] uppercase tracking-[3px] font-sans font-medium">Password</FormLabel>
                    <Button
                      type="button"
                      variant="link"
                      className="h-auto p-0 text-gold/60 text-xs hover:text-gold transition-colors"
                      onClick={() => setIsForgotPasswordMode(true)}
                    >
                      Forgot Password?
                    </Button>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} type="password" placeholder="••••••••" className="text-white" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 font-sans font-bold text-sm uppercase tracking-[2px]" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      ) : null}

      <p className="text-center mt-8 text-beige/50 text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-gold-secondary font-semibold hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
