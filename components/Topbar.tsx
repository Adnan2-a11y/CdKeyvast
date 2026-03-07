"use client";

import Link from "next/link";
import Image from "next/image";
import { CSSProperties } from "react";
import Container from "@/components/ui/container";

export default function TopBar() {
  const TOPBAR_HEIGHT = 56; // ছোট করা হয়েছে

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
    // 🔽 Search bar ছোট করা হয়েছে
    searchBox: {
      display: "flex",
      alignItems: "center",
      background: "#fff",
      borderRadius: 3,
      padding: "4px 6px",
      minWidth: 220,
      height: 32,
      border: "1px solid rgba(0,0,0,0.08)",
    },
    searchInput: {
      border: "none",
      outline: "none",
      padding: "5px 8px",
      fontSize: 14,
      flex: 1,
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
    },
    slimBtn: {
      background: "transparent",
      color: "#cfcfcf",
      padding: "6px 12px",
      borderRadius: 3,
      border: "1px solid rgba(255,255,255,0.05)",
      cursor: "pointer",
      fontSize: 13,
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
                  <img 
                    src="/images/CDkeyVast.svg" 
                    alt="CDKeyVast Logo" 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain' 
                    }}
                  />
                </div>
              </Link>
            </div>

            <div style={styles.rightArea}>
              <div style={styles.searchBox}>
                <input placeholder="Search" style={styles.searchInput} />
                <button style={styles.searchBtn}>🔍</button>
              </div>
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