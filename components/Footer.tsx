import Link from "next/link";
import PaymentTrustBar from "./PaymentTrustBar";
import Container from "@/components/ui/container";



const Footer = () => {

  return (

    <footer className="border-t border-border bg-card">

      {/* Payment and Trust bar */}

      <PaymentTrustBar />



      {/* Links */}

      <div className="bg-black text-white">
      <Container className="grid gap-6 py-8 md:grid-cols-4">

        <div>

          <h4 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-white">

            Fast Links

          </h4>

          <ul className="space-y-1.5">

            <li>

              <Link href="/wholesale-gift-cards" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                Wholesale Gift Cards

              </Link>

            </li>

            <li>

              <Link href="/reviews" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                Reviews

              </Link>

            </li>

            <li>

              <Link href="/faq" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                FAQ

              </Link>

            </li>

            <li>

              <Link href="/terms-and-conditions" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                Terms and Conditions

              </Link>

            </li>

            <li>

              <Link href="/terms-of-service" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                Terms Of Service

              </Link>

            </li>

            <li>

              <Link href="/privacy-policy" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                Privacy Policy

              </Link>

            </li>

            <li>

              <Link href="/sitemap" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                Sitemap

              </Link>

            </li>

            <li>

              <Link href="/blog" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                Blog

              </Link>

            </li>

          </ul>

        </div>

        <div>

          <h4 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-white">

            Product Categories

          </h4>

          <ul className="space-y-1.5">

            {["Game Cards", "Gift Cards", "iTunes", "Google Play", "Steam", "PC"].map((link) => (

              <li key={link}>

                <Link href="/products" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                  {link}

                </Link>

              </li>

            ))}

          </ul>

        </div>

        <div>

          <h4 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-white">

            Questions?

          </h4>

          <ul className="space-y-1.5">

            <li>

              <Link href="/why-cdkeyvast" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                Why CDKeyVast?

              </Link>

            </li>

            <li>

              <Link href="/support" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                Customer Support

              </Link>

            </li>

            <li>

              <Link href="/returns-and-refund-policy" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                Returns And Refund Policy

              </Link>

            </li>

            <li>

              <Link href="/international-delivery" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                International Email Delivery

              </Link>

            </li>

            <li>

              <Link href="/supported-games" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                What Games Are Supported?

              </Link>

            </li>

            <li>

              <Link href="/why-digital-delivery" className="text-[11px] text-gray-300 transition-colors hover:text-white">

                Why Digital Delivery?

              </Link>

            </li>

          </ul>

        </div>

        <div>

          <h4 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-white">

            Contact Our Support Team

          </h4>

          <p className="mb-2 text-[11px] text-gray-300">Email Or Call Us - Available 24/7!</p>

          <p className="mb-1 text-xs font-semibold text-red-400">support@cdkeyvast.com</p>

          <p className="text-xs font-semibold text-white">1-800-257-7220</p>

        </div>
      </Container>

      <div className="border-t border-gray-800 py-3">
        <Container className="text-center text-[10px] text-gray-400">
          © 2026 CDKeyVast. All rights reserved. All prices are in EUR.
        </Container>
      </div>
      </div>

    </footer>

  );

};



export default Footer;

