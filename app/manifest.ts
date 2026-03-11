import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CDKeyVast - Instant Digital Game Keys",
    short_name: "CDKeyVast",
    description: "Buy cheap PC game keys, gift cards, and software licenses. Instant digital delivery. Best prices guaranteed.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0ea5e9",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["games", "shopping", "entertainment"],
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/desktop-1.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "CDKeyVast desktop view showing game catalog",
      },
      {
        src: "/screenshots/mobile-1.png",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
        label: "CDKeyVast mobile view showing product details",
      },
    ],
    shortcuts: [
      {
        name: "Browse Games",
        short_name: "Games",
        description: "Browse our collection of game keys",
        url: "/products",
        icons: [
          {
            src: "/icons/shortcut-games.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
      {
        name: "Shopping Cart",
        short_name: "Cart",
        description: "View your shopping cart",
        url: "/cart",
        icons: [
          {
            src: "/icons/shortcut-cart.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
