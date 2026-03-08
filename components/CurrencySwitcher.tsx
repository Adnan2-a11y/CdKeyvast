"use client";

import { useState } from "react";
import { useCurrency } from "@/hooks/useCurrency";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Loader2 } from "lucide-react";

export function CurrencySwitcher() {
  const { currency, currencies, setCurrency, isLoading } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = (code: string) => {
    setCurrency(code);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-white hover:bg-[#a30000] px-3 py-2 h-auto"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span className="font-medium">
              {currency.symbol} {currency.code}
            </span>
          )}

          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-48 bg-[#8B0000] border-[#ddd] text-white z-[9999]"
        >
          {currencies.map((curr) => (
            <DropdownMenuItem
              key={curr.code}
              onClick={() => handleCurrencyChange(curr.code)}
              className="cursor-pointer hover:bg-[#a30000] focus:bg-[#a30000]"
            >
              <span className="flex items-center gap-2">
                <span className="font-medium">{curr.symbol}</span>
                <span>{curr.name} ({curr.code})</span>
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>

    </DropdownMenu>
  );
}