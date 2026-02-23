"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import CartDrawer from "./cart-drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "../ui/sheet";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Collections", href: "/collections" },
    { id: 3, label: "About", href: "/about" },
    { id: 4, label: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full h-auto bg-transparent">
      <div className="max-w-[1440px] h-full mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo2.png"
            alt="logo"
            width={200}
            height={120}
            className="object-cover w-[130px] sm:w-[160px] lg:w-[200px]"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center font-medium gap-10 text-gold-bright text-xl">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.id}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-8">
          <CartDrawer />
          <Icon
            icon="mingcute:search-line"
            width="24"
            height="24"
            className="text-[#fdd17b] cursor-pointer"
          />
          <Link href="/my-orders" aria-label="My orders">
            <Icon
              icon="mdi:account-circle-outline"
              width="26"
              height="26"
              className="text-[#fdd17b] cursor-pointer"
            />
          </Link>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-3">
          <CartDrawer />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gold-bright hover:bg-transparent"
                aria-label="Open menu"
              >
                <Icon icon="solar:hamburger-menu-linear" width={28} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] border-r border-gold/30 bg-[#3d1012] p-0"
            >
              <SheetHeader className="p-6 pb-2">
                <SheetTitle>
                  <Image
                    src="/logo2.png"
                    alt="Sanwariya"
                    width={140}
                    height={60}
                    className="object-contain"
                  />
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col px-6 mt-2">
                {navLinks.map((link) => (
                  <Link
                    href={link.href}
                    key={link.id}
                    onClick={() => setMobileOpen(false)}
                    className="text-gold-bright text-lg py-3.5 border-b border-gold/10 font-medium tracking-wide"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 px-6 flex flex-col gap-3">
                <Link
                  href="/my-orders"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button variant="gold-outline" className="w-full">
                    <Icon icon="mdi:account-circle-outline" width={20} />
                    My Orders
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Login</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
