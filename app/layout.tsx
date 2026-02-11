import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

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
      <body className="antialiased overflow-x-hidden min-w-screen min-h-screen">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
