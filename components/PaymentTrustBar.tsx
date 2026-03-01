import { Globe, Shield, Zap, CreditCard } from "lucide-react";
import Container from "@/components/ui/container";

const PaymentTrustBar = () => {
  return (
    <div className="bg-red-600 py-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          {/* Payment Methods Column */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider">Payment Methods We Accept</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <div className="w-16 h-10 bg-white rounded flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-blue-600">PayPal</span>
              </div>
              <div className="w-16 h-10 bg-white rounded flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-blue-800">VISA</span>
              </div>
              <div className="w-16 h-10 bg-white rounded flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-red-600">Master</span>
              </div>
              <div className="w-16 h-10 bg-white rounded flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-blue-500">AMEX</span>
              </div>
              <div className="w-16 h-10 bg-white rounded flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-orange-500">Discover</span>
              </div>
            </div>
          </div>

          {/* Language Selector Column */}
          <div className="text-center">
            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider">Choose Your Language | Worldwide Delivery</h3>
            <div className="inline-flex items-center gap-2 bg-white rounded px-4 py-2 shadow-sm">
              <Globe size={16} className="text-gray-600" />
              <select className="text-sm text-gray-800 bg-transparent outline-none font-medium">
                <option>ভাষা বেছে নিন</option>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Chinese</option>
                <option>Japanese</option>
              </select>
            </div>
          </div>

          {/* Why CdkeyVast Column */}
          <div className="text-center md:text-right">
            <h3 className="text-sm font-bold mb-3 uppercase tracking-wider">Why CdkeyVast?</h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-2">
              <button className="bg-white text-red-600 px-4 py-2 rounded text-xs font-bold hover:bg-gray-100 transition-colors shadow-sm">
                Buy Online
              </button>
              <button className="bg-white text-red-600 px-4 py-2 rounded text-xs font-bold hover:bg-gray-100 transition-colors shadow-sm">
                Instant Delivery
              </button>
              <button className="bg-white text-red-600 px-4 py-2 rounded text-xs font-bold hover:bg-gray-100 transition-colors shadow-sm">
                Easy To Use
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PaymentTrustBar;