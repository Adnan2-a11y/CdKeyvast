export default function SupportedGamesPage() {
  const platforms = [
    {
      name: "PlayStation",
      icon: "🎮",
      description: "PS4, PS5, PS3, PS Vita",
      games: ["FIFA Series", "Call of Duty", "Grand Theft Auto", "God of War", "The Last of Us", "Marvel's Spider-Man"]
    },
    {
      name: "Xbox",
      icon: "🎯",
      description: "Xbox Series X/S, Xbox One, Xbox 360",
      games: ["Halo Series", "Forza Horizon", "Gears of War", "Fable", "Sea of Thieves", "Microsoft Flight Simulator"]
    },
    {
      name: "Nintendo",
      icon: "🍃",
      description: "Switch, 3DS, Wii U",
      games: ["Mario Series", "Zelda", "Pokémon", "Animal Crossing", "Super Smash Bros", "Metroid"]
    },
    {
      name: "PC Gaming",
      icon: "💻",
      description: "Steam, Epic Games, Origin, GOG",
      games: ["Counter-Strike", "Dota 2", "League of Legends", "World of Warcraft", "Minecraft", "Cyberpunk 2077"]
    },
    {
      name: "Mobile Gaming",
      icon: "📱",
      description: "iOS, Android",
      games: ["Clash of Clans", "Pokémon GO", "Genshin Impact", "Among Us", "Call of Duty Mobile", "PUBG Mobile"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">What Games Are Supported?</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="prose max-w-none">
            <div className="space-y-8 text-gray-700">
              
              {/* Hero Section */}
              <div className="text-center mb-12">
                <p className="text-xl leading-relaxed max-w-3xl mx-auto">
                  CDKeyVast supports thousands of games across all major gaming platforms. 
                  Whether you're a console gamer, PC enthusiast, or mobile player, we have the digital codes you need.
                </p>
              </div>

              {/* Platform Grid */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Supported Gaming Platforms</h2>
                <div className="space-y-6">
                  {platforms.map((platform, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{platform.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-gray-900">{platform.name}</h3>
                          <p className="text-gray-600 mb-4">{platform.description}</p>
                          
                          <div>
                            <h4 className="font-semibold mb-2 text-gray-800">Popular Games:</h4>
                            <div className="flex flex-wrap gap-2">
                              {platform.games.map((game, gameIndex) => (
                                <span key={gameIndex} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                  {game}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gift Card Types */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Available Gift Card Types</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-purple-900">Platform Wallets</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• PlayStation Network Cards</li>
                      <li>• Xbox Gift Cards</li>
                      <li>• Nintendo eShop Cards</li>
                      <li>• Steam Wallet Codes</li>
                      <li>• Epic Games Gift Cards</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-green-900">Digital Stores</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• iTunes Gift Cards</li>
                      <li>• Google Play Cards</li>
                      <li>• Amazon Gift Cards</li>
                      <li>• Microsoft Store Cards</li>
                      <li>• Best Buy Gift Cards</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-orange-900">Gaming Services</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Xbox Game Pass</li>
                      <li>• PlayStation Plus</li>
                      <li>• Nintendo Switch Online</li>
                      <li>• EA Play</li>
                      <li>• Ubisoft Connect</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Game Categories */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Game Categories We Support</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    "Action & Adventure",
                    "Role-Playing (RPG)",
                    "First-Person Shooters",
                    "Sports & Racing",
                    "Strategy & Simulation",
                    "Puzzle & Casual",
                    "Horror & Survival",
                    "Family & Kids"
                  ].map((category, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                      <h3 className="font-semibold text-gray-900">{category}</h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regional Availability */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Regional Game Availability</h2>
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="mb-4">
                    Game availability may vary by region due to platform restrictions and licensing agreements. 
                    Here's what you need to know:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-900">Region-Free Games</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Most PC games (Steam, Epic Games)</li>
                        <li>• Digital wallet codes</li>
                        <li>• Subscription services</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-900">Region-Specific Games</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Some console games</li>
                        <li>• Platform-specific content</li>
                        <li>• Country-restricted titles</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Releases */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Latest Game Releases</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Grand Theft Auto VI", platform: "Multi-platform", status: "Coming Soon" },
                    { title: "Elden Ring DLC", platform: "PC/Console", status: "Available Now" },
                    { title: "Call of Duty 2026", platform: "Multi-platform", status: "Pre-order Available" },
                    { title: "Final Fantasy VII Rebirth", platform: "PS5", status: "Available Now" },
                    { title: "Starfield DLC", platform: "Xbox/PC", status: "Coming Soon" },
                    { title: "Zelda: Tears of the Kingdom", platform: "Switch", status: "Available Now" }
                  ].map((game, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900">{game.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{game.platform}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        game.status === "Available Now" 
                          ? "bg-green-100 text-green-800" 
                          : game.status === "Coming Soon"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {game.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2 text-gray-900">How do I know if a game is compatible with my region?</h3>
                    <p className="text-gray-600">
                      Check the product description for regional information, or contact our support team with your country details.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2 text-gray-900">Can I use gift cards from one platform on another?</h3>
                    <p className="text-gray-600">
                      No, gift cards are platform-specific. PlayStation cards only work on PlayStation, Xbox cards on Xbox, etc.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2 text-gray-900">Do you support indie games?</h3>
                    <p className="text-gray-600">
                      Yes! We support thousands of indie games through platforms like Steam, Epic Games, and others.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
