import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import CartDrawer from "./cart-drawer";
const Header = () => {
  const navLinks = [
    {
      id: 1,
      label: "Home",
      href: "/",
    },
    {
      id: 2,
      label: "Collections",
      href: "/collections",
    },
    {
      id: 3,
      label: "About",
      href: "/about",
    },
    {
      id: 4,
      label: "Contact",
      href: "/contact",
    },
  ];
  return (
    <header className="w-full h-auto bg-transparent">
      <div className="max-w-[1440px] h-full mx-auto flex items-center justify-between">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="">
              <Image src="/logo2.png" alt="logo" width={200} height={120} className="object-cover" />
            </div>
          </Link>
        </div>
        <div className="flex items-center font-medium gap-10 text-gold-bright text-xl">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.id}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-8">
          <CartDrawer />
          <Icon icon="mingcute:search-line" width="24" height="24" className="text-[#fdd17b] cursor-pointer" />
          <Link href="/my-orders" aria-label="My orders">
            <Icon icon="mdi:account-circle-outline" width="26" height="26" className="text-[#fdd17b] cursor-pointer" />
          </Link>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
