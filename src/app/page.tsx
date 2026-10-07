import React from 'react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { SetupIncomplete } from '@/components/common/SetupIncomplete';

export default function HomePage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const missingKeys: string[] = [];
  if (!supabaseUrl) missingKeys.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) missingKeys.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  if (missingKeys.length > 0) {
    return <SetupIncomplete missingKeys={missingKeys} appName="Customer Boutique (Frontend)" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-sera-ivory text-sera-espresso font-sans">
      {/* Announcement Bar */}
      <div className="bg-sera-espresso text-sera-ivory text-center py-2 text-xs tracking-widest uppercase font-medium">
        Bespoke Luxury • Pan-India Complimentary Insured Delivery
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-sera-ivory/95 backdrop-blur-sm border-b border-sera-taupe/30 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <BrandLogo variant="header" priority />
          <nav className="hidden md:flex space-x-6 text-xs uppercase tracking-widest font-medium text-sera-espresso/90">
            <a href="#boutique" className="hover:text-sera-espresso transition-colors">Boutique</a>
            <a href="#collections" className="hover:text-sera-espresso transition-colors">Collections</a>
            <a href="#edit" className="hover:text-sera-espresso transition-colors">The Edit</a>
            <a href="#about" className="hover:text-sera-espresso transition-colors">About</a>
          </nav>
        </div>

        <div className="flex items-center space-x-6 text-xs uppercase tracking-wider font-medium">
          <button className="hidden sm:inline-block hover:opacity-75 transition-opacity">Search</button>
          <button className="hover:opacity-75 transition-opacity">Wishlist (0)</button>
          <button className="bg-sera-espresso text-sera-ivory px-4 py-2 rounded-sm hover:opacity-90 transition-opacity">
            Enquiry Tray (0)
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 py-20 lg:py-32 max-w-bleed mx-auto w-full text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-sera-taupe font-semibold mb-4 inline-block">
          Autumn / Festive Haute Joaillerie
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-sera-espresso max-w-4xl mx-auto mb-6">
          The Poetry of Fine Geometry & Warm Lustre
        </h1>
        <p className="text-sera-espresso/80 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Sculptural elegance crafted for the discerning eye. Each piece is designed to reflect timeless grace, understated radiance, and effortless modern luxury.
        </p>
        <div className="flex justify-center items-center gap-4">
          <a
            href="#boutique"
            className="bg-sera-espresso text-sera-ivory px-8 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm hover:opacity-90 transition-opacity"
          >
            Discover Collection
          </a>
          <a
            href="#showroom"
            className="border border-sera-taupe/50 text-sera-espresso px-8 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-sera-beige/50 transition-colors"
          >
            Explore Showroom
          </a>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-sera-beige/70 border-y border-sera-taupe/30 py-8 px-6 lg:px-12">
        <div className="max-w-container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="font-serif text-sm font-medium text-sera-espresso mb-0.5">Insured Pan-India Transit</h3>
            <p className="text-[11px] text-sera-espresso/70">Complimentary secure delivery</p>
          </div>
          <div>
            <h3 className="font-serif text-sm font-medium text-sera-espresso mb-0.5">100% Certified Craft</h3>
            <p className="text-[11px] text-sera-espresso/70">Authentic materials & finishes</p>
          </div>
          <div>
            <h3 className="font-serif text-sm font-medium text-sera-espresso mb-0.5">Personal Concierge</h3>
            <p className="text-[11px] text-sera-espresso/70">Dedicated bespoke styling assist</p>
          </div>
          <div>
            <h3 className="font-serif text-sm font-medium text-sera-espresso mb-0.5">Signature Keepsake Box</h3>
            <p className="text-[11px] text-sera-espresso/70">Velvet pouch & certificate included</p>
          </div>
        </div>
      </section>

      {/* Boutique Intro Section */}
      <section id="boutique" className="px-6 lg:px-12 py-20 max-w-container mx-auto w-full text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-sera-taupe font-semibold mb-2 inline-block">
          Curated Creations
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal mb-4">
          Everyday Radiance
        </h2>
        <p className="text-sera-espresso/70 text-xs sm:text-sm max-w-md mx-auto mb-12">
          Subtle statement earrings, delicately articulated pendants, and sculpted rings calibrated for daily elevation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
          {/* Card 1 */}
          <div className="bg-sera-beige/40 border border-sera-taupe/20 p-4 rounded-sm flex flex-col justify-between">
            <div className="aspect-[3/4] bg-sera-beige/80 rounded-sm mb-4 flex items-center justify-center text-sera-taupe text-xs uppercase tracking-widest">
              3:4 Product Hero
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold">Everyday Edit</span>
              <h3 className="font-serif text-base text-sera-espresso font-normal mt-0.5">Minimal Sculpted Pendant</h3>
              <p className="text-xs font-mono font-medium text-sera-espresso mt-1">₹1,299</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-sera-beige/40 border border-sera-taupe/20 p-4 rounded-sm flex flex-col justify-between">
            <div className="aspect-[3/4] bg-sera-beige/80 rounded-sm mb-4 flex items-center justify-center text-sera-taupe text-xs uppercase tracking-widest">
              3:4 Product Hero
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold">Signature</span>
              <h3 className="font-serif text-base text-sera-espresso font-normal mt-0.5">Baroque Pearl Drop Earrings</h3>
              <p className="text-xs font-mono font-medium text-sera-espresso mt-1">₹1,899</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-sera-beige/40 border border-sera-taupe/20 p-4 rounded-sm flex flex-col justify-between">
            <div className="aspect-[3/4] bg-sera-beige/80 rounded-sm mb-4 flex items-center justify-center text-sera-taupe text-xs uppercase tracking-widest">
              3:4 Product Hero
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold">Gifting</span>
              <h3 className="font-serif text-base text-sera-espresso font-normal mt-0.5">Artisan Radiance Dome Ring</h3>
              <p className="text-xs font-mono font-medium text-sera-espresso mt-1">₹1,499</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer on Espresso */}
      <footer className="mt-auto bg-sera-espresso text-sera-ivory border-t border-sera-espresso px-6 lg:px-12 py-16">
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <BrandLogo variant="footer" priority />
            <p className="text-xs text-sera-ivory/70 max-w-sm mt-4 leading-relaxed font-light">
              Fine demi-fine jewellery designed in India. Intimate craftsmanship celebrating timeless beauty and quiet luxury.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-sera-champagne mb-4">Maison</h4>
            <ul className="space-y-2 text-xs text-sera-ivory/80">
              <li><a href="#about" className="hover:text-sera-ivory">Our Philosophy</a></li>
              <li><a href="#showroom" className="hover:text-sera-ivory">The Showroom</a></li>
              <li><a href="#care" className="hover:text-sera-ivory">Jewellery Care</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-sera-champagne mb-4">Client Care</h4>
            <ul className="space-y-2 text-xs text-sera-ivory/80">
              <li><a href="#enquiry" className="hover:text-sera-ivory">Enquiry Guide</a></li>
              <li><a href="#shipping" className="hover:text-sera-ivory">Shipping & Returns</a></li>
              <li><a href="#concierge" className="hover:text-sera-ivory">WhatsApp Concierge</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-container mx-auto border-t border-sera-ivory/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-sera-ivory/60">
          <p>© {new Date().getFullYear()} SÉRA BY SIMRAN. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed for timeless distinction.</p>
        </div>
      </footer>
    </div>
  );
}
