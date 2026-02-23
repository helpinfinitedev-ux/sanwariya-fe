import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";

const Footer = () => {
  const treasuresLinks = [
    { label: "Gold Collection", href: "#" },
    { label: "Saffron Infusions", href: "#" },
    { label: "Royal Hampers", href: "#" },
    { label: "Sugar-Free Jewels", href: "#" },
  ];

  const estateLinks = [
    { label: "Our Lineage", href: "#" },
    { label: "Purity Standards", href: "#" },
    { label: "Flagship Vaults", href: "#" },
    { label: "Atelier Careers", href: "#" },
  ];

  return (
    <footer
      className="w-full relative overflow-hidden font-semibold text-maroon"
      style={{
        background:
          "linear-gradient(135deg, #bf953f 0%, #d4ab32 20%, #b38728 40%, #fbf5b7 60%, #aa771c 80%, #fbf5b7 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(0, 0, 0, 0.1) 10px,
            rgba(0, 0, 0, 0.1) 20px
          )`,
        }}
      />

      <div className="main-container mx-auto relative z-10">
        {/* Upper Content Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 py-10 sm:py-12 lg:py-16">
          {/* Column 1: Brand Information */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5 lg:space-y-6">
            <div className="flex items-start -ml-6">
              <Image
                src="/logo2.png"
                alt="SANWARIYA SWEET"
                width={200}
                height={120}
                className="object-cover w-[160px] lg:w-[200px]"
              />
            </div>
            <p className="text-maroon text-base lg:text-lg uppercase tracking-wider font-bold">
              DEFINED BY GOLD, REFINED BY HERITAGE
            </p>
            <p className="text-navy text-sm lg:text-md leading-relaxed">
              A legacy of purity since 1974. We combine ancient artisanal
              techniques with the world&apos;s most precious ingredients.
            </p>
            <div className="flex items-center">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Icon icon="mdi:instagram" width="28" height="28" />
              </a>
            </div>
          </div>

          {/* Column 2: TREASURES */}
          <div className="space-y-4">
            <h3 className="text-maroon text-lg lg:text-xl uppercase tracking-wider font-bold">
              TREASURES
            </h3>
            <ul className="space-y-2.5 lg:space-y-3">
              {treasuresLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-navy hover:opacity-80 transition-opacity text-sm lg:text-md"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: THE ESTATE */}
          <div className="space-y-4">
            <h3 className="text-maroon text-lg uppercase tracking-wider font-bold">
              THE ESTATE
            </h3>
            <ul className="space-y-2.5 lg:space-y-3">
              {estateLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-navy hover:opacity-80 transition-opacity text-sm lg:text-md"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CONCIERGE */}
          <div className="space-y-4">
            <h3 className="text-maroon text-lg uppercase tracking-wider font-bold">
              CONCIERGE
            </h3>
            <ul className="space-y-2.5 lg:space-y-3">
              <li className="flex items-center gap-3 text-navy text-sm lg:text-md">
                <Icon icon="mdi:phone" width="20" height="20" className="shrink-0" />
                <a
                  href="tel:+919999900000"
                  className="hover:opacity-80 transition-opacity"
                >
                  +91 99999 00000
                </a>
              </li>
              <li className="flex items-center gap-3 text-navy text-sm lg:text-md">
                <Icon icon="mdi:email" width="20" height="20" className="shrink-0" />
                <a
                  href="mailto:vault@sanwariya.com"
                  className="hover:opacity-80 transition-opacity break-all"
                >
                  vault@sanwariya.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-navy text-sm lg:text-md">
                <Icon icon="mdi:map-marker" width="20" height="20" className="shrink-0" />
                <span>Pink City, Jaipur</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="border-t border-navy/20 pt-6 lg:pt-8 pb-4 lg:pb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-navy text-xs">
              &copy; 2024 SANWARIYA SWEET. A GILDED EXPERIENCE
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="#"
                className="text-navy hover:opacity-80 transition-opacity text-xs"
              >
                PRIVACY VAULT
              </Link>
              <Link
                href="#"
                className="text-navy hover:opacity-80 transition-opacity text-xs"
              >
                TERMS OF INDULGENCE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
