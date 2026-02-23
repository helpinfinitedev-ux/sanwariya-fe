"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const currentPath = usePathname();

  const showHeaderAndFooter = currentPath !== "/login" && currentPath !== "/register";

  return (
    <div>
      {showHeaderAndFooter ? <Header /> : null}
      {children}
      {showHeaderAndFooter ? <Footer /> : null}
    </div>
  );
};

export default BaseLayout;
