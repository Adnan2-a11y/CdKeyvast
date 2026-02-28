export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Returns & Refunds Policy</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Digital Products Policy</h2>
            
            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">No Returns on Digital Products</h3>
                <p>
                  Due to the nature of digital products, all sales are final. Once a digital gift card or game code 
                  has been delivered to your email address, we cannot accept returns or offer refunds.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Defective or Invalid Codes</h3>
                <p>
                  If you receive a defective or invalid code, please contact our customer support team immediately 
                  at support@CdkeyVast.com or call 1-800-257-7220. We will:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Verify the issue within 24 hours</li>
                  <li>Provide a replacement code if the original code is indeed defective</li>
                  <li>Offer a full refund if a replacement cannot be provided</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Incorrect Purchase</h3>
                <p>
                  If you accidentally purchased the wrong product, please contact us within 1 hour of purchase. 
                  We may be able to cancel the order if it hasn't been processed yet. Once the digital code has been 
                  delivered, we cannot cancel or refund the order.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Regional Restrictions</h3>
                <p>
                  Customers are responsible for checking regional compatibility before purchasing. We cannot provide 
                  refunds for digital products that cannot be used in your country due to regional restrictions. 
                  All product descriptions include information about regional limitations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Fraud Prevention</h3>
                <p>
                  In cases of suspected fraud, we reserve the right to delay or cancel orders and conduct additional 
                  verification. This may include requesting additional documentation to confirm your identity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Chargebacks</h3>
                <p>
                  If you initiate a chargeback without first contacting us to resolve any issues, we will dispute the 
                  chargeback and may suspend your account. Please always give us the opportunity to resolve any problems 
                  before contacting your payment provider.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Contact Information</h3>
                <p>
                  For any issues with your order, please contact our 24/7 customer support team:
                </p>
                <div className="bg-gray-50 p-4 rounded-md mt-2">
                  <p><strong>Email:</strong> support@CdkeyVast.com</p>
                  <p><strong>Phone:</strong> 1-800-257-7220</p>
                  <p><strong>Hours:</strong> 24/7/365</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm text-gray-600">
                  <strong>Last Updated:</strong> January 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
