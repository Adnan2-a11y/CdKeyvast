import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/providers";
import TopBar from "@/components/Topbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ReviewsButton from "@/components/ReviewsButton";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { SWUpdateNotification } from "@/components/SWUpdateNotification";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { ManualServiceWorkerRegistration } from "@/components/ManualServiceWorkerRegistration";
import { getHeaderMenuCategories } from "@/lib/api/woocommerce.server";

export const metadata: Metadata = {
  title: {
    default: "CDKeyVast – Instant Digital Game Keys",
    template: "%s | CDKeyVast",
  },
  description:
    "Buy cheap PC game keys, gift cards, and software licenses. Instant digital delivery. Best prices guaranteed.",
  manifest: "/manifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CDKeyVast",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "CDKeyVast",
    title: "CDKeyVast – Instant Digital Game Keys",
    description:
      "Buy cheap PC game keys, gift cards, and software licenses. Instant digital delivery. Best prices guaranteed.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CDKeyVast – Instant Digital Game Keys",
    description:
      "Buy cheap PC game keys, gift cards, and software licenses. Instant digital delivery. Best prices guaranteed.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
  },
  other: {
    "msapplication-TileColor": "#0a0a0a",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#0ea5e9",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "CDKeyVast",
    "application-name": "CDKeyVast",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerCategories = await getHeaderMenuCategories();

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CDKeyVast" />
        <meta name="application-name" content="CDKeyVast" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="manifest" href="/manifest" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#0ea5e9" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-body antialiased safe-area-all">
        <Providers>
          <CartDrawer />
          <TopBar />
          <Header categories={headerCategories} />
          <main className="pt-[111px] safe-area-top">{children}</main>
          <Footer />
          <ReviewsButton />
          
          {/* PWA Components */}
          <ManualServiceWorkerRegistration />
          <ServiceWorkerRegistration />
          <PWAInstallPrompt />
          <SWUpdateNotification />
        </Providers>
      </body>
    </html>
  );
}
