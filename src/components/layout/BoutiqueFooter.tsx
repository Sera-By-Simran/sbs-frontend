import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { MessageCircle, ShieldCheck, Gem, Sparkles, Mail } from 'lucide-react';

export const BoutiqueFooter: React.FC = () => {
  return (
    <footer className="bg-sera-espresso text-sera-ivory font-sans border-t border-sera-taupe/20">
      {/* Upper Newsletter / Concierge Bar */}
      <div className="border-b border-sera-taupe/20 py-12 px-6 lg:px-12">
        <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-sera-champagne font-semibold block mb-1">
              Private Concierge Consultation
            </span>
            <h3 className="font-serif text-2xl font-normal text-sera-ivory">
              Need Personalised Jewellery Styling?
            </h3>
            <p className="text-xs text-sera-taupe/90 mt-1 max-w-md">
              Speak directly with our founder & luxury diamond stylist for custom bridal sets, gifts, and bespoke modifications.
            </p>
          </div>

          <a
            href="https://wa.me/919999999999?text=Hello%20SÉRA%20Concierge,%20I%20would%20like%20to%20enquire%20about%20your%20jewellery%20collection."
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
      <div className="py-16 px-6 lg:px-12 max-w-container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-4">
          <BrandLogo variant="footer" priority={false} />
          <p className="text-xs text-sera-taupe leading-relaxed">
            SÉRA BY SIMRAN is a luxury demi-fine boutique in India crafting timeless, conscious jewellery designed for the modern woman who embraces quiet opulence.
          </p>
          <div className="pt-2 text-[11px] text-sera-taupe">
            <span>Showroom: Flagship Studio, New Delhi</span>
          </div>
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
                Statement Rings & Bands
              </Link>
            </li>
            <li>
              <Link href="/boutique?category=bracelets" className="hover:text-sera-ivory transition-colors">
                Tennis Bracelets & Cuffs
              </Link>
            </li>
            <li>
              <Link href="/boutique?badge=new_in" className="hover:text-sera-ivory transition-colors">
                New Festive In
              </Link>
            </li>
          </ul>
        </div>

        {/* Client Care */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-sera-champagne font-semibold mb-4">
            Client Care
          </h4>
          <ul className="space-y-2 text-xs text-sera-ivory/80">
            <li>
              <Link href="/#about" className="hover:text-sera-ivory transition-colors">
                The SÉRA Craft Story
              </Link>
            </li>
            <li>
              <Link href="/#showroom" className="hover:text-sera-ivory transition-colors">
                Virtual Showroom Tour
              </Link>
            </li>
            <li>
              <span className="text-sera-taupe">Complimentary Insured Delivery</span>
            </li>
            <li>
              <span className="text-sera-taupe">Hallmark & Authenticity Guarantee</span>
            </li>
            <li>
              <span className="text-sera-taupe">Jewellery Care & Cleaning Guide</span>
            </li>
          </ul>
        </div>

        {/* Assurance */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-sera-champagne font-semibold mb-2">
            The SÉRA Promise
          </h4>
          <div className="flex items-start space-x-3 text-xs text-sera-taupe">
            <ShieldCheck className="w-4 h-4 text-sera-champagne flex-shrink-0 mt-0.5" />
            <span>100% Verified Ethical Sourcing & Premium Anti-Tarnish Finish</span>
          </div>
          <div className="flex items-start space-x-3 text-xs text-sera-taupe">
            <Gem className="w-4 h-4 text-sera-champagne flex-shrink-0 mt-0.5" />
            <span>Handcrafted in small boutique batches by master artisans</span>
          </div>
          <div className="flex items-start space-x-3 text-xs text-sera-taupe">
            <Sparkles className="w-4 h-4 text-sera-champagne flex-shrink-0 mt-0.5" />
            <span>Signature Keepsake Box & SÉRA Authenticity Certificate</span>
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
