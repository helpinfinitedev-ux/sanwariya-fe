"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import CartDrawer from "./cart-drawer";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "../ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "../ui/sheet";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { userActions } from "@/store/slices/user";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const userName = user ? `${user.firstName} ${user.lastName}`.trim() : "";

  const handleLogout = () => {
    dispatch(userActions.logout());
    router.push("/login");
  };

  const navLinks = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Collections", href: "/collections" },
    { id: 3, label: "About", href: "/about" },
    { id: 4, label: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full h-auto bg-transparent pt-8">
      <div className="max-w-[1440px] h-full mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="">
          <Image src="/logo2.png" alt="logo" width={200} height={120} className="object-cover w-[130px] sm:w-[160px] lg:w-[200px]" />
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
          <Icon icon="mingcute:search-line" width="24" height="24" className="text-[#fdd17b] cursor-pointer" />
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="text-gold-bright hover:bg-gold/10">
                  <Icon icon="mdi:account-circle-outline" width={24} />
                  <span className="max-w-[120px] truncate">{userName}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-60 border-gold/20 bg-[#3d1012] text-gold-bright">
                <PopoverHeader className="border-b border-gold/20 pb-3">
                  <PopoverTitle className="flex items-center gap-2 text-base">
                    <Icon icon="mdi:account-circle-outline" width={24} />
                    <span className="truncate">{userName}</span>
                  </PopoverTitle>
                </PopoverHeader>
                <div className="mt-3 space-y-2">
                  <Link href="/my-orders" className="block">
                    <Button variant="gold-outline" className="w-full justify-start">
                      My orders
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start text-gold-bright hover:bg-gold/10" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-3">
          <CartDrawer />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gold-bright hover:bg-transparent hover:text-gold-bright cursor-pointer" aria-label="Open menu">
                <Icon icon="solar:hamburger-menu-linear" className="!w-[28px] !h-[28px]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] border-r border-gold/30 bg-[#3d1012] p-0">
              <SheetHeader className="p-6 pb-2">
                <SheetTitle>
                  <Image src="/logo2.png" alt="Sanwariya" width={140} height={60} className="object-contain" />
                </SheetTitle>
                <SheetDescription className="sr-only">Navigation menu</SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col px-6 mt-2">
                {navLinks.map((link) => (
                  <Link href={link.href} key={link.id} onClick={() => setMobileOpen(false)} className="text-gold-bright text-lg py-3.5 border-b border-gold/10 font-medium tracking-wide">
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 px-6 flex flex-col gap-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 text-gold-bright px-1 py-1">
                      <Icon icon="mdi:account-circle-outline" width={22} />
                      <span className="truncate">{userName}</span>
                    </div>
                    <Link href="/my-orders" onClick={() => setMobileOpen(false)}>
                      <Button variant="gold-outline" className="w-full">
                        My orders
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full text-gold-bright hover:bg-gold/10"
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full">Login</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
