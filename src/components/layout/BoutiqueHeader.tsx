'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { useTray } from '@/context/TrayContext';
import { SearchModal } from '@/components/search/SearchModal';
import {
  Heart,
  ShoppingBag,
  Search,
  Menu,
  X,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export const BoutiqueHeader: React.FC = () => {
  const { totalTrayCount, wishlist, openTray } = useTray();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-sera-espresso text-sera-ivory text-center py-2 px-4 text-[11px] tracking-[0.2em] uppercase font-medium border-b border-sera-taupe/20">
        <span>Bespoke Demi-Fine Luxury • Handcrafted Pan-India Jewellery</span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-sera-ivory/95 backdrop-blur-md border-b border-sera-taupe/30 px-6 lg:px-12 py-3.5 transition-all">
        <div className="max-w-bleed mx-auto flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-sera-espresso focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Logo & Desktop Nav */}
          <div className="flex items-center space-x-10">
            <Link href="/" className="flex items-center">
              <BrandLogo variant="header" priority />
            </Link>

            <nav className="hidden md:flex space-x-7 text-xs uppercase tracking-widest font-semibold text-sera-espresso/80">
              <Link href="/boutique" className="hover:text-sera-espresso transition-colors">
                Boutique
              </Link>
              <Link href="/collections" className="hover:text-sera-espresso transition-colors">
                Collections
              </Link>
              <Link href="/edit" className="hover:text-sera-espresso transition-colors">
                SÉRA EDIT
              </Link>
              <Link href="/showroom" className="hover:text-sera-espresso transition-colors flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-sera-taupe" />
                <span>Showroom</span>
              </Link>
              <Link href="/about" className="hover:text-sera-espresso transition-colors">
                About
              </Link>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 sm:space-x-5 text-xs uppercase tracking-wider font-medium">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center space-x-1 text-sera-espresso/70 hover:text-sera-espresso transition-colors p-1"
              title="Search catalogue"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline text-[11px]">Search</span>
            </button>

            <Link
              href="/wishlist"
              className="relative p-1 text-sera-espresso/70 hover:text-sera-espresso transition-colors flex items-center space-x-1"
              title="Saved Keepsakes"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-rose-800 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={openTray}
              className="relative p-1 text-sera-espresso/80 hover:text-sera-espresso transition-colors flex items-center space-x-1"
              title="Enquiry Tray"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px] font-semibold">Tray</span>
              {totalTrayCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-sera-espresso text-sera-ivory text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalTrayCount}
                </span>
              )}
            </button>

            <button
              onClick={openTray}
              className="hidden sm:inline-flex items-center space-x-1.5 bg-sera-espresso text-sera-ivory px-3.5 py-1.5 rounded-sm text-[11px] tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              <PhoneCall className="w-3 h-3 text-sera-champagne" />
              <span>Concierge</span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-sera-taupe/20 mt-3 pt-4 pb-2 space-y-3 font-sans text-xs uppercase tracking-widest font-semibold text-sera-espresso">
            <Link
              href="/boutique"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-sera-taupe"
            >
              All Jewellery Pieces
            </Link>
            <Link
              href="/collections"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-sera-taupe"
            >
              Curated Collections
            </Link>
            <Link
              href="/edit"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-sera-taupe"
            >
              SÉRA EDIT (Journal)
            </Link>
            <Link
              href="/showroom"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-sera-taupe"
            >
              Virtual Showroom
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-sera-taupe"
            >
              Wishlist ({wishlist.length})
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-sera-taupe"
            >
              The SÉRA Story
            </Link>
            <Link
              href="/track-order"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 hover:text-sera-taupe"
            >
              Track Order Status
            </Link>
          </div>
        )}
      </header>

      {/* Instant Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
