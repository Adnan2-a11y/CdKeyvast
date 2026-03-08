import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/providers";
import TopBar from "@/components/Topbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ReviewsButton from "@/components/ReviewsButton";
<<<<<<< HEAD
=======
import { getHeaderMenuCategories } from "@/lib/api/woocommerce.server";
>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f

export const metadata: Metadata = {
  title: {
    default: "CDKeyVast – Instant Digital Game Keys",
    template: "%s | CDKeyVast",
  },
  description:
    "Buy cheap PC game keys, gift cards, and software licenses. Instant digital delivery. Best prices guaranteed.",
  openGraph: {
    type: "website",
    siteName: "CDKeyVast",
    title: "CDKeyVast – Instant Digital Game Keys",
    description:
      "Buy cheap PC game keys, gift cards, and software licenses. Instant digital delivery. Best prices guaranteed.",
  },
  robots: { index: true, follow: true },
};

<<<<<<< HEAD
export default function RootLayout({ children }: { children: React.ReactNode }) {
=======
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerCategories = await getHeaderMenuCategories();

>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground font-body antialiased">
        <Providers>
          <CartDrawer />
          <TopBar />
<<<<<<< HEAD
          <Header />
=======
          <Header categories={headerCategories} />
>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
          <main className="pt-[111px]">{children}</main>
          <Footer />
          <ReviewsButton />
        </Providers>
      </body>
    </html>
  );
}
