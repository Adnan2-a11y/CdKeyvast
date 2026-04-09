"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import Container from "@/components/ui/container";
import { CurrencySwitcher } from "@/components/CurrencySwitcher";
import type { HeaderMenuCategory, NavItem } from "@/types/woocommerce";

interface HeaderProps {
  categories: HeaderMenuCategory[];
}

interface DropdownProps {
  label: string;
  href: string;
  items: NavItem[];
  active: boolean;
  onToggle: () => void;
  onEnter: () => void;
  onLeave: () => void;
  twoColumns?: boolean;
}

export default function Header({ categories }: HeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { itemCount } = useCart();

  const handleDropdownEnter = (dropdownName: string) =>
    setActiveDropdown(dropdownName);

  const handleDropdownLeave = () => setActiveDropdown(null);

  return (
    // ✅ FIX: `top` is driven by --topbar-h injected by <TopBar> on the parent.
    // Fallback to 56px matches the TOPBAR_HEIGHT constant so SSR renders correctly.
    <header
      className="w-full fixed left-0 z-[999] bg-[#c41200]"
      style={{ top: "var(--topbar-h, 56px)" }}
    >
      <Container className="flex items-center h-[55px] relative">

        <nav className="flex gap-[28px] text-[12px] font-[500] text-white uppercase items-center">
          {categories.map((cat) => (
            <Dropdown
              key={cat.href}
              label={cat.label}
              href={cat.href}
              items={cat.children}
              active={activeDropdown === cat.href}
              onToggle={() => setActiveDropdown((cur) => (cur === cat.href ? null : cat.href))}
              onEnter={() => handleDropdownEnter(cat.href)}
              onLeave={handleDropdownLeave}
              twoColumns={cat.children.length > 10}
            />
          ))}
        </nav>

        {/* Currency Switcher and Cart */}
        <div className="bg-[#8B0000] h-full flex items-center absolute right-0 top-0">
          <CurrencySwitcher />
          <div className="px-4">
            <Link href="/checkout" className="flex flex-col items-center text-white">
              <span className="text-[13px]">{itemCount}</span>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-[20px] h-[20px]" fill="white">
                <path d="M528.12 301.319l47.273-208C578.529 77.878 
                565.965 64 550.059 64H130.94l-9.223-41.016C119.883 
                10.502 109.847 0 97.254 0H24C10.745 0 0 10.745 0 
                24s10.745 24 24 24h53.201l70.949 315.586C134.298 
                386.012 121.92 400 105.102 400H24c-13.255 0-24 
                10.745-24 24s10.745 24 24 24h81.102c43.462 
                0 80.08-30.703 90.325-71.586l326.471-29.036c11.69-1.04 
                21.39-9.098 24.222-20.059z"/>
              </svg>
            </Link>
          </div>
        </div>

      </Container>
    </header>
  );
}


function Dropdown({ label, href, items, active, onToggle, onEnter, onLeave, twoColumns = false }: DropdownProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="flex items-center gap-1 px-[10px]">
        <Link href={href} className="cursor-pointer hover:opacity-80 transition-opacity duration-150">
          {label}
        </Link>
        {items.length > 0 && (
          <button
            type="button"
            className="cursor-pointer"
            onClick={onToggle}
            aria-haspopup="menu"
            aria-expanded={active}
            aria-label={`${label} menu`}
          >
            {/* Chevron rotates smoothly on open */}
            <svg
              width="10" height="10" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
              style={{
                transform: active ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown panel — slide-in-from-top + fade */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "100%",
          paddingTop: 8,
          // GPU-composited animation for butter-smooth feel
          willChange: "transform, opacity",
          transform: active ? "translateY(0px)" : "translateY(-6px)",
          opacity: active ? 1 : 0,
          visibility: active ? "visible" : "hidden",
          transition: "transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.22s ease, visibility 0s linear " + (active ? "0s" : "0.22s"),
          pointerEvents: active ? "auto" : "none",
        }}
      >
        <div
          className="bg-[#8B0000] border border-[#ddd] rounded-md shadow-lg"
          style={{ minWidth: twoColumns ? "500px" : "230px" }}
        >
          <ul
            className="p-3"
            style={{
              display: twoColumns ? "grid" : "block",
              gridTemplateColumns: twoColumns ? "1fr 1fr" : "none",
              gap: "0 25px",
            }}
          >
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="block text-white px-3 py-2 hover:bg-[#a30000] rounded transition-colors duration-150"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}