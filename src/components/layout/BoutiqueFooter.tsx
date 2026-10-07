import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { MessageCircle, ShieldCheck, Gem, Sparkles } from 'lucide-react';

export const BoutiqueFooter: React.FC = () => {
  return (
    <footer className="bg-sera-espresso text-sera-ivory font-sans border-t border-sera-taupe/20">
      {/* Upper Concierge Bar */}
      <div className="border-b border-sera-taupe/20 py-10 px-6 lg:px-12">
        <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-sera-champagne font-semibold block mb-1">
              Private Concierge Consultation
            </span>
            <h3 className="font-serif text-2xl font-normal text-sera-ivory">
              Personalised Styling & Custom Inquiries
            </h3>
            <p className="text-xs text-sera-taupe/90 mt-1 max-w-md">
              Connect with our styling team for sizing guidance, gift curation, and bespoke order requests.
            </p>
          </div>

          <a
            href="https://wa.me/?text=Hello%20SÉRA%20Concierge,%20I%20would%20like%20to%20enquire%20about%20your%20jewellery%20collection."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-sera-champagne text-sera-espresso px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="py-14 px-6 lg:px-12 max-w-container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-4">
          <BrandLogo variant="footer" priority={false} />
          <p className="text-xs text-sera-taupe leading-relaxed mt-3">
            SÉRA BY SIMRAN is a luxury demi-fine boutique crafting timeless, conscious jewellery designed for the modern woman who embraces quiet opulence.
          </p>
        </div>

        {/* Collections */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-sera-champagne font-semibold mb-4">
            Collections
          </h4>
          <ul className="space-y-2 text-xs text-sera-ivory/80">
            <li>
              <Link href="/boutique?category=necklaces" className="hover:text-sera-ivory transition-colors">
                Necklaces & Pendants
              </Link>
            </li>
            <li>
              <Link href="/boutique?category=earrings" className="hover:text-sera-ivory transition-colors">
                Earrings & Hoops
              </Link>
            </li>
            <li>
              <Link href="/boutique?category=rings" className="hover:text-sera-ivory transition-colors">
                Rings & Bands
              </Link>
            </li>
            <li>
              <Link href="/boutique?category=bracelets" className="hover:text-sera-ivory transition-colors">
                Bracelets & Cuffs
              </Link>
            </li>
          </ul>
        </div>

        {/* Client Care */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-sera-champagne font-semibold mb-4">
            Client Experience
          </h4>
          <ul className="space-y-2 text-xs text-sera-ivory/80">
            <li>
              <Link href="/showroom" className="hover:text-sera-ivory transition-colors">
                Digital Showroom Tour
              </Link>
            </li>
            <li>
              <span className="text-sera-taupe">Complimentary Insured Delivery</span>
            </li>
            <li>
              <span className="text-sera-taupe">Hallmark & Authenticity Guarantee</span>
            </li>
            <li>
              <span className="text-sera-taupe">Jewellery Care Guidelines</span>
            </li>
          </ul>
        </div>

        {/* Assurance */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-sera-champagne font-semibold mb-2">
            The SÉRA Standards
          </h4>
          <div className="flex items-start space-x-2.5 text-xs text-sera-taupe">
            <ShieldCheck className="w-4 h-4 text-sera-champagne flex-shrink-0 mt-0.5" />
            <span>Anti-tarnish, skin-friendly composition</span>
          </div>
          <div className="flex items-start space-x-2.5 text-xs text-sera-taupe">
            <Gem className="w-4 h-4 text-sera-champagne flex-shrink-0 mt-0.5" />
            <span>Artisan handcrafted in conscious batches</span>
          </div>
          <div className="flex items-start space-x-2.5 text-xs text-sera-taupe">
            <Sparkles className="w-4 h-4 text-sera-champagne flex-shrink-0 mt-0.5" />
            <span>Signature Keepsake Box with velvet pouch</span>
          </div>
        </div>
      </div>

      {/* Copyright Sub-bar */}
      <div className="border-t border-sera-taupe/20 py-6 px-6 text-center text-xs text-sera-taupe">
        <p>© 2026 SÉRA BY SIMRAN. All Rights Reserved. Luxury Demi-Fine Jewellery.</p>
      </div>
    </footer>
  );
};
