export interface NavItem {
  label: string;
  href: string;
}

export interface Category {
  name: string;
  icon: string;
  subcategories?: NavItem[];
}

export const gameCardsItems: NavItem[] = [
  { label: "Apple/iTunes Gift Cards", href: "/products?category=Apple / iTunes" },
  { label: "Google Play Gift Cards", href: "/products?category=Google Play" },
  { label: "Playstation Gift Cards", href: "/products?category=Playstation" },
  { label: "Nintendo eShop Gift Cards", href: "/products?category=Game Cards" },
  { label: "Xbox Gift Cards", href: "/products?category=Game Cards" },
  { label: "Minecraft Game Cards", href: "/products?category=Game Cards" },
  { label: "Karma Koin Game Cards", href: "/products?category=Game Cards" },
  { label: "Nexon Game Cards", href: "/products?category=Game Cards" },
  { label: "League Of Legends Game Cards", href: "/products?category=Game Cards" },
  { label: "EA Gift Cards", href: "/products?category=Game Cards" },
  { label: "Blizzard Game Cards", href: "/products?category=Game Cards" },
  { label: "Facebook Gift Cards", href: "/products?category=Game Cards" },
  { label: "Razer Gold Game Cards", href: "/products?category=Game Cards" },
  { label: "IMVU Game Cards", href: "/products?category=Game Cards" },
  { label: "Roblox Game Cards", href: "/products?category=Game Cards" },
  { label: "Final Fantasy XIV - 60 Day Time Cards", href: "/products?category=Game Cards" },
  { label: "UC PUBG Mobile Game Cards", href: "/products?category=Game Cards" },
  { label: "VALORANT Game Cards", href: "/products?category=Game Cards" },
  { label: "Webkinz Gift Cards", href: "/products?category=Game Cards" },
  { label: "Fortnite V-Bucks", href: "/products?category=Game Cards" },
  { label: "Steam Game Cards", href: "/products?category=Steam" },
];

export const giftCardsItems: NavItem[] = [
  { label: "Amazon Gift Cards", href: "/products?category=Gift Cards" },
  { label: "Skype Gift Cards", href: "/products?category=Gift Cards" },
  { label: "Hulu Gift Cards", href: "/products?category=Gift Cards" },
  { label: "Spotify Gift Cards", href: "/products?category=Gift Cards" },
  { label: "Netflix Gift Cards", href: "/products?category=Gift Cards" },
  { label: "eBay Gift Cards", href: "/products?category=Gift Cards" },
  { label: "MLB.TV Gift Cards", href: "/products?category=Gift Cards" },
  { label: "Vudu Gift Cards", href: "/products?category=Gift Cards" },
  { label: "Binance USDT Gift Cards", href: "/products?category=Gift Cards" },
];

export const supportItems: NavItem[] = [
  { label: "24/7/365 Customer Support Team", href: "/support" },
  { label: "Returns & Refunds Policy", href: "/support/shipping-returns" },
  { label: "Paying With Paypal", href: "/support/paying-with-paypal" },
  { label: "Terms Of Service", href: "/terms-of-service" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export const faqItems: NavItem[] = [
  { label: "Why Cd Key Vast?", href: "/faq/why-game-card-delivery" },
  { label: "Create Game Accounts", href: "/faq/create-game-accounts" },
  { label: "Redeem Your Gift Card", href: "/faq/redeem-your-gift-card" },
  { label: "International Email Delivery", href: "/faq/international-email-delivery" },
  { label: "What Games Are Supported?", href: "/faq/what-games-are-supported" },
  { label: "Why Digital Delivery?", href: "/faq/why-digital-delivery" },
  { label: "How Will I Receive My Gift Cards?", href: "/faq/how-will-i-receive-my-gift-cards" },
  { label: "Why Buy US Gaming Cards?", href: "/faq/why-buy-us-gaming-cards" },
  { label: "Wholesale", href: "/discounted/wholesale-gift-cards" },
  { label: "Testimonials", href: "/reviews/products" },
  { label: "Blog", href: "/best-gaming-blog" },
];

export const productCategories: Category[] = [
  { 
    name: "Game Cards", 
    icon: "🎮",
    subcategories: gameCardsItems
  },
  { 
    name: "Gift Cards", 
    icon: "🎁",
    subcategories: giftCardsItems
  },
  { 
    name: "Playstation", 
    icon: "🎯",
    subcategories: gameCardsItems.filter(item => 
      item.label.toLowerCase().includes("playstation")
    )
  },
  { 
    name: "Google Play", 
    icon: "📱",
    subcategories: gameCardsItems.filter(item => 
      item.label.toLowerCase().includes("google play")
    )
  },
  { 
    name: "Steam", 
    icon: "🚂",
    subcategories: gameCardsItems.filter(item => 
      item.label.toLowerCase().includes("steam")
    )
  },
  { 
    name: "Apple / iTunes", 
    icon: "🍎",
    subcategories: gameCardsItems.filter(item => 
      item.label.toLowerCase().includes("apple") || 
      item.label.toLowerCase().includes("itunes")
    )
  },
];
