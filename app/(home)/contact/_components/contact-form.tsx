"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail, Send, User, MessageSquare, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ContactService, ContactFormData } from "@/services/contact/index.service";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await ContactService.submitForm(values);
      if (response.success) {
        toast.success(response.message);
        form.reset();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-none bg-inherit shadow-none">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold bg-transparent  logo-gold-pressed">Send us a Message</CardTitle>
        <CardDescription className="text-beige/70">We&apos;d love to hear from you. Please fill out the form below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold flex items-center gap-2">
                      <User className="size-4" /> Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="bg-white/5   text-beige placeholder:text-beige/30 focus:border-gold/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gold flex items-center gap-2">
                      <Mail className="size-4" /> Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} className="bg-white/5  text-beige placeholder:text-beige/30 focus:border-gold/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold flex items-center gap-2">
                    <Tag className="size-4" /> Subject
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="How can we help you?" {...field} className="bg-white/5  text-beige placeholder:text-beige/30 focus:border-gold/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gold flex items-center gap-2">
                    <MessageSquare className="size-4" /> Message
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your message here..." className="min-h-[150px] bg-white/5   text-beige placeholder:text-beige/30 focus:border-gold/50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-12 text-lg cinzel-decorative-bold uppercase tracking-widest" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
