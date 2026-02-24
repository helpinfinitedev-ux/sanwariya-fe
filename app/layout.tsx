import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import BaseLayout from "@/layout";
import { AppToaster } from "@/components/app-toaster";

export const metadata: Metadata = {
  title: "Sanwariya - Legacy of Exquisite Taste",
  description: "Premium Indian sweets crafted with centuries of tradition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-red-gold-gradient overflow-x-hidden min-w-screen min-h-screen">
        <Providers>
          <AppToaster />
          <BaseLayout>{children}</BaseLayout>
        </Providers>
      </body>
    </html>
  );
}
