export default function PayPalPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Paying With PayPal</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose max-w-none">
            <div className="space-y-6 text-gray-700">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">How to Pay with PayPal</h2>
                <p>
                  We accept PayPal as a secure and convenient payment method for all our digital products. 
                  Follow these simple steps to complete your purchase using PayPal:
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Step-by-Step Guide</h3>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Select Your Products:</strong> Browse our catalog and add the desired gift cards 
                    or game codes to your cart.
                  </li>
                  <li>
                    <strong>Proceed to Checkout:</strong> Click on the cart icon and then "Proceed to Checkout".
                  </li>
                  <li>
                    <strong>Choose PayPal:</strong> Select PayPal as your payment method on the payment page.
                  </li>
                  <li>
                    <strong>Redirect to PayPal:</strong> You'll be redirected to PayPal's secure checkout page.
                  </li>
                  <li>
                    <strong>Log In or Sign Up:</strong> Log in to your existing PayPal account or create a new one.
                  </li>
                  <li>
                    <strong>Confirm Payment:</strong> Review your order details and confirm the payment.
                  </li>
                  <li>
                    <strong>Return to Our Store:</strong> After payment, you'll be redirected back to our site 
                    for order confirmation.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">PayPal Account Requirements</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Valid PayPal account in good standing</li>
                  <li>Verified email address associated with PayPal</li>
                  <li>Sufficient funds or linked payment method</li>
                  <li>Account must be able to receive payments (not restricted)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Payment Processing Time</h3>
                <p>
                  PayPal payments are typically processed instantly. However, in some cases, additional 
                  verification may be required, which can delay processing by up to 24 hours.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Security & Protection</h3>
                <p>
                  PayPal offers buyer protection for eligible purchases. Your financial information is 
                  never shared with merchants, and PayPal's encryption technology keeps your transactions secure.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Common Issues & Solutions</h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-semibold text-gray-900">Payment Declined</h4>
                    <p className="text-sm mt-1">
                      Check your PayPal balance, linked payment methods, and account limits. Contact PayPal 
                      support if the issue persists.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-semibold text-gray-900">Redirect Issues</h4>
                    <p className="text-sm mt-1">
                      Enable cookies and pop-ups for our site. Clear your browser cache and try again.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-semibold text-gray-900">Account Verification</h4>
                    <p className="text-sm mt-1">
                      Complete PayPal's verification process if your account is unverified to avoid payment issues.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Currency Conversion</h3>
                <p>
                  PayPal automatically handles currency conversion at their current exchange rates. 
                  Additional fees may apply for international transactions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Refunds to PayPal</h3>
                <p>
                  If you're eligible for a refund, it will be processed back to your original PayPal 
                  payment method. Refunds typically take 3-5 business days to appear in your PayPal account.
                </p>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Need Help?</h3>
                <p>
                  If you encounter any issues with PayPal payment, our 24/7 customer support team is here to help:
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
