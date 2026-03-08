Project Overview
Build a high-performance, production-ready headless e-commerce frontend for NexusCart.
Frontend: Next.js 14+ (App Router), TypeScript, TailwindCSS.
Backend: WordPress + WooCommerce REST API v3 (Headless).
Core Goal: Fast, SEO-optimized, secure gaming/digital goods store.
1. Architectural Requirements (Strict)
Security: Use import "server-only" for the WooCommerce API wrapper. All CK and CS keys must be stored in .env and never prefixed with NEXT_PUBLIC_.
Data Fetching: Implement Incremental Static Regeneration (ISR) for products and categories.
State Management: Use Zustand or React Context for the shopping cart with localStorage persistence.
Auth: Implement JWT-based authentication using the JWT Auth WordPress plugin.
2. Feature Implementation Logic
A. Product Engine
Catalog: Server-side fetching with support for category, search, and sorting via URL params.
PDP (Product Detail Page):
Dynamic routes: app/product/[slug]/page.tsx.
Use generateStaticParams for pre-rendering top products.
SEO: Implement generateMetadata with Open Graph and JSON-LD structured data.
Caching:
Products: ISR 60s.
Categories: ISR 300s.
On-Demand Revalidation: Create a POST route /api/revalidate protected by a REVALIDATE_SECRET.
B. Checkout & Security
Cart: Client-side UI (Drawer/Sidebar).
Checkout: All order creation logic must happen in a Next.js Server Action or an API Route to keep the WooCommerce Secret Key hidden from the client.
CORS: Ensure the backend only accepts requests from the Vercel production domain.
3. Aesthetic & UI
Theme: Dark theme, gaming-centric, mobile-first design.
Components: High-quality TailwindCSS components with framer-motion for smooth transitions.
4. Specific Context for AI
When generating code, prioritize Server Components by default.
Use TypeScript interfaces for all WooCommerce API responses.
Ensure all HTML descriptions from WordPress are safely sanitized before rendering.
