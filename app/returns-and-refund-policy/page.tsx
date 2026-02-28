export default function ReturnsAndRefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Returns and Refund Policy</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose max-w-none">
            <div className="space-y-6 text-gray-700">
              
              {/* Important Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-3 text-yellow-900">Important Notice</h2>
                <p className="text-yellow-800">
                  Due to the digital nature of our products, all sales are final. However, we offer refunds 
                  or replacements for defective or invalid codes under specific conditions outlined below.
                </p>
              </div>

              {/* Refund Eligibility */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Refund Eligibility</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">We Offer Refunds For:</h3>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li><strong>Defective Codes:</strong> Digital codes that are invalid, already used, or do not work as intended</li>
                      <li><strong>Wrong Product:</strong> If you receive a different product than what you ordered</li>
                      <li><strong>Technical Issues:</strong> If our system fails to deliver your purchase due to technical problems</li>
                      <li><strong>Duplicate Charges:</strong> If you were accidentally charged multiple times for the same order</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">We Do NOT Offer Refunds For:</h3>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li><strong>Change of Mind:</strong> If you simply decide you don't want the product after purchase</li>
                      <li><strong>Regional Restrictions:</strong> If the product doesn't work in your region due to platform restrictions</li>
                      <li><strong>Account Issues:</strong> Problems with your gaming platform account (banned, suspended, etc.)</li>
                      <li><strong>Lost Codes:</strong> If you lose or delete the digital code after successful delivery</li>
                      <li><strong>Incompatibility:</strong> If the product is not compatible with your device or system</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Refund Process */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Refund Request Process</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-blue-900">Step 1: Contact Support</h3>
                    <p>
                      Submit a refund request within 24 hours of purchase by contacting our customer support team 
                      at support@cdkeyvast.com or through our live chat system.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-blue-900">Step 2: Provide Information</h3>
                    <p>
                      Include your order number, purchase details, and a clear description of the issue. 
                      For defective codes, provide screenshots or error messages if applicable.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-blue-900">Step 3: Verification</h3>
                    <p>
                      Our support team will investigate your claim within 24-48 hours. We may need to verify 
                      the code status with our suppliers.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-blue-900">Step 4: Resolution</h3>
                    <p>
                      If your claim is approved, we'll either issue a replacement code or process a refund 
                      to your original payment method within 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Replacement Policy */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Replacement Policy</h2>
                <p className="mb-4">
                  For eligible cases, we prioritize providing replacement codes over refunds. Here's how it works:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Replacement codes are typically issued within 2-4 hours of approval</li>
                  <li>You'll receive the new code via email with detailed instructions</li>
                  <li>If a replacement is not available, we'll process a full refund</li>
                  <li>Multiple replacement requests for the same order may require additional verification</li>
                </ul>
              </div>

              {/* Timeframes */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Important Timeframes</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Refund Request Window</h3>
                    <p className="text-gray-600">Within 24 hours of purchase</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                    <p className="text-gray-600">24-48 hours for initial review</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Refund Processing</h3>
                    <p className="text-gray-600">3-5 business days after approval</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Replacement Delivery</h3>
                    <p className="text-gray-600">2-4 hours after approval</p>
                  </div>
                </div>
              </div>

              {/* Special Cases */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Special Cases</h2>
                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-900">Bulk Orders</h3>
                    <p>
                      For wholesale orders (100+ units), please contact our wholesale team directly at 
                      wholesale@cdkeyvast.com for specialized return policies.
                    </p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-900">Gift Purchases</h3>
                    <p>
                      If you purchased a gift for someone else, the refund policy applies to the original 
                      purchaser. Gift recipients cannot request refunds directly.
                    </p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-900">Promotional Items</h3>
                    <p>
                      Items purchased during special promotions or with discount codes may have different 
                      refund terms. Check the promotion details for specific conditions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Need Help with a Refund?</h2>
                <p className="mb-4">
                  Our customer support team is here to help you with any refund or replacement requests.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-900">
                    <strong>Email:</strong> support@cdkeyvast.com
                  </p>
                  <p className="font-semibold text-gray-900">
                    <strong>Phone:</strong> 1-800-257-7220
                  </p>
                  <p className="font-semibold text-gray-900">
                    <strong>Live Chat:</strong> Available 24/7 on our website
                  </p>
                  <p className="font-semibold text-gray-900">
                    <strong>Hours:</strong> 24/7/365
                  </p>
                </div>
              </div>

              {/* Policy Updates */}
              <div className="border-t pt-6">
                <p className="text-sm text-gray-600">
                  <strong>Last Updated:</strong> February 2026
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  This policy may be updated from time to time. Changes will be posted on this page 
                  with an updated revision date.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
