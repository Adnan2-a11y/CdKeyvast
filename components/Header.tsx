"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import Container from "@/components/ui/container";
import { 
  gameCardsItems, 
  giftCardsItems, 
  supportItems, 
  faqItems,
  type NavItem 
} from "@/lib/categories";

interface DropdownProps {
  label: string;
  items: NavItem[];
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  twoColumns?: boolean;
}

interface SimpleLinkProps {
  href: string;
  label: string;
}

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { itemCount } = useCart();

  const handleDropdownEnter = (dropdownName: string) =>
    setActiveDropdown(dropdownName);

  const handleDropdownLeave = () => setActiveDropdown(null);

  return (
    <header className="w-full fixed top-[56px] left-0 z-[999] bg-[#c41200]">
      <Container className="flex items-center h-[55px] relative">

        <nav className="flex gap-[28px] text-[12px] font-[500] text-white uppercase items-center">

          <Dropdown
            label="Game Cards"
            items={gameCardsItems}
            active={activeDropdown === "gameCards"}
            onEnter={() => handleDropdownEnter("gameCards")}
            onLeave={handleDropdownLeave}
            twoColumns
          />

          <Dropdown
            label="Gift Cards"
            items={giftCardsItems}
            active={activeDropdown === "giftCards"}
            onEnter={() => handleDropdownEnter("giftCards")}
            onLeave={handleDropdownLeave}
          />

          <SimpleLink href="/products?category=Playstation" label="Playstation" />
          <SimpleLink href="/products?category=Google Play" label="Google Play" />
          <SimpleLink href="/products?category=Steam" label="Steam" />

          <Dropdown
            label="Support"
            items={supportItems}
            active={activeDropdown === "support"}
            onEnter={() => handleDropdownEnter("support")}
            onLeave={handleDropdownLeave}
          />

          <Dropdown
            label="FAQ"
            items={faqItems}
            active={activeDropdown === "faq"}
            onEnter={() => handleDropdownEnter("faq")}
            onLeave={handleDropdownLeave}
          />
        </nav>

        {/* Cart */}
        <div className="bg-[#8B0000] h-full flex items-center absolute right-0 top-0 px-4">
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

      </Container>
    </header>
  );
}

function Dropdown({ label, items, active, onEnter, onLeave, twoColumns = false }: DropdownProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="cursor-pointer px-[10px]">{label}</span>

      <div
        className={`absolute left-0 top-full pt-4 transition-all duration-200 ${
          active ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
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
                  className="block text-white px-3 py-2 hover:bg-[#a30000] rounded"
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

function SimpleLink({ href, label }: SimpleLinkProps) {
  return (
    <Link
      href={href}
      className="px-[10px] hover:text-gray-200"
    >
      {label}
    </Link>
  );
}