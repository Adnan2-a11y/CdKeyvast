"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CSSProperties } from "react";
import Container from "@/components/ui/container";
import { useRouter } from "next/navigation";

const TOPBAR_HEIGHT = 56;

export default function TopBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const styles: Record<string, CSSProperties> = {
    wrapper: {
      width: "100%",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      color: "#fff",
      backgroundColor: "#000",
      position: "fixed",
      top: 0,
      left: 0,
      // Emit the topbar height as a CSS variable consumed by Header and <main>
      ["--topbar-h" as string]: `${TOPBAR_HEIGHT}px`,
      zIndex: 1000,
    },
    topStrip: {
      height: TOPBAR_HEIGHT,
      background: "#0f0f10",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      boxShadow: "0 1px 0 rgba(255,255,255,0.03) inset",
    },
    leftArea: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      cursor: "pointer",
    },
    rightArea: {
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    searchBox: {
      display: "flex",
      alignItems: "center",
      background: "#fff",
      borderRadius: 3,
      padding: "4px 6px",
      minWidth: 220,
      height: 32,
      border: "1px solid rgba(0,0,0,0.08)",
      transition: "box-shadow 0.2s ease",
    },
    searchInput: {
      border: "none",
      outline: "none",
      padding: "5px 8px",
      fontSize: 14,
      flex: 1,
      // ✅ FIX: explicit dark text so it reads on the white search box background
      color: "#1a1a1a",
      background: "transparent",
      caretColor: "#1a1a1a",
    },
    searchBtn: {
      height: 26,
      minWidth: 32,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#c42b1f",
      color: "#fff",
      border: "none",
      borderRadius: 3,
      padding: "0 10px",
      fontWeight: 600,
      cursor: "pointer",
      fontSize: 13,
      transition: "background 0.15s ease, transform 0.1s ease",
    },
    slimBtn: {
      background: "transparent",
      color: "#cfcfcf",
      padding: "6px 12px",
      borderRadius: 3,
      border: "1px solid rgba(255,255,255,0.05)",
      cursor: "pointer",
      fontSize: 13,
      transition: "border-color 0.2s, color 0.2s",
    },
    checkoutBtn: {
      background: "#d9d9da",
      color: "#111",
      padding: "6px 12px",
      borderRadius: 3,
      border: "none",
      fontWeight: 700,
      cursor: "pointer",
      fontSize: 13,
      transition: "background 0.15s ease, transform 0.1s ease",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.topStrip}>
        <Container>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={styles.leftArea}>
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 120, height: 30, display: 'flex', alignItems: 'center' }}>
                  <Image
                    src="/images/CDkeyVast.svg"
                    alt="CDKeyVast Logo"
                    width={120}
                    height={30}
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
              </Link>
            </div>

            <div style={styles.rightArea}>
              {/* ✅ FIX: wired up search form for actual navigation */}
              <form onSubmit={handleSearch} style={{ display: "flex" }}>
                <div
                  style={styles.searchBox}
                  onFocus={() => {
                    (inputRef.current?.parentElement as HTMLElement)?.style &&
                      Object.assign((inputRef.current!.parentElement as HTMLElement).style, {
                        boxShadow: "0 0 0 2px rgba(196,43,31,0.4)",
                        borderColor: "#c42b1f",
                      });
                  }}
                  onBlur={() => {
                    (inputRef.current?.parentElement as HTMLElement)?.style &&
                      Object.assign((inputRef.current!.parentElement as HTMLElement).style, {
                        boxShadow: "none",
                        borderColor: "rgba(0,0,0,0.08)",
                      });
                  }}
                >
                  <input
                    ref={inputRef}
                    type="search"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                    aria-label="Search products"
                  />
                  <button type="submit" style={styles.searchBtn} aria-label="Submit search">
                    🔍
                  </button>
                </div>
              </form>
              <Link href="/login">
                <button style={styles.slimBtn}>
                  LOGIN
                </button>
              </Link>
              <Link href="/checkout">
                <button
                  style={styles.checkoutBtn}
                >
                  CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}