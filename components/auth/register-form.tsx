"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    address: z.string().min(5, "Address is required"),
    emailAddress: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => Promise<void> | void;
  loading?: boolean;
}

const RegisterForm = ({ onSubmit, loading = false }: RegisterFormProps) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  return (
    <div className="w-full">
      <h1 className="font-sans font-bold text-2xl md:text-3xl text-gold-secondary mb-3 uppercase tracking-wide">Join the Royalty</h1>
      <p className="text-beige/70 text-sm mb-8 leading-relaxed">Create your account to experience the heritage of luxury sweets.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold-secondary/80 text-[11px] uppercase tracking-[3px] font-sans font-medium">First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Maharaja" className="text-white" />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold-secondary/80 text-[11px] uppercase tracking-[3px] font-sans font-medium">Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Singh" className="text-white" />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Email Address */}
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gold-secondary/80 text-[11px] uppercase tracking-[3px] font-sans font-medium">Email Address (Optional)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} type="email" placeholder="royal@sanwariya.com" className="text-white" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
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

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gold-secondary/80 text-[11px] uppercase tracking-[3px] font-sans font-medium">Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="House no, street, city" className="text-white" />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Password + Confirm Password */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold-secondary/80 text-[11px] uppercase tracking-[3px] font-sans font-medium">Password</FormLabel>
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold-secondary/80 text-[11px] uppercase tracking-[3px] font-sans font-medium">Confirm</FormLabel>
                  <FormControl>
                    <div className="relative">
                      {/* <Icon icon="solar:shield-check-linear" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/40" width={18} /> */}
                      <Input {...field} type="password" placeholder="••••••••" className="text-white" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Terms & Conditions */}
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-0.5 border-gold/30 data-[state=checked]:bg-gold data-[state=checked]:border-gold" />
                  </FormControl>
                  <span className="text-beige/60 text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link href="#" className="text-gold-secondary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-gold-secondary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </div>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full h-12 font-sans font-bold text-sm uppercase tracking-[2px]" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center mt-8 text-beige/50 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-gold-secondary font-semibold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
