"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void> | void;
  loading?: boolean;
}

const LoginForm = ({ onSubmit, loading = false }: LoginFormProps) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  return (
    <div className="w-full">
      <h1 className="font-sans font-bold text-2xl md:text-3xl text-gold-secondary mb-3 uppercase tracking-wide">Welcome Back</h1>
      <p className="text-beige/70 text-sm mb-8 leading-relaxed">Sign in to continue your royal experience.</p>

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
                  <Link href="#" className="text-gold/60 text-xs hover:text-gold transition-colors">
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    {/* <Icon icon="solar:lock-keyhole-linear" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/40" width={18} /> */}
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
