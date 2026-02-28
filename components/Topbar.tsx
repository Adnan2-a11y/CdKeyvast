"use client";

import Link from "next/link";
import Image from "next/image";
import { CSSProperties } from "react";

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
      padding: "0 18px",
      width: "100%",
      boxShadow: "0 1px 0 rgba(255,255,255,0.03) inset",
    },
    container: {
      maxWidth: 1200,
      margin: "0 auto",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    leftArea: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      cursor: "pointer",
    },
    logoImage: {
      width: 30,
      height: 22,
      objectFit: "cover",
      borderRadius: 2,
      transform: "skewX(-12deg)",
    },
    brand: {
      fontSize: 19,
      fontWeight: 600,
      color: "#f3f3f3",
      letterSpacing: 0.3,
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
        <div style={styles.container}>
          <div style={styles.leftArea}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 30, height: 22, borderRadius: 2, transform: "skewX(-12deg)", background: '#c41200', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>
                GCD
              </div>
              <div style={styles.brand}>CDKeyVast</div>
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
      </div>
    </div>
  );
}