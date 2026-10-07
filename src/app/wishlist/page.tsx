'use client';

import React from 'react';
import Link from 'next/link';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { useTray } from '@/context/TrayContext';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToTray, openTray } = useTray();

  return (
    <div className="min-h-screen bg-sera-ivory text-sera-espresso flex flex-col font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />

      <main className="flex-1 py-12 px-6 lg:px-12 max-w-container mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-2">
            Personal Keepsakes
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal">
            Your Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-sera-taupe mt-3 leading-relaxed">
            Saved pieces of interest. Move them to your VIP Concierge Tray when you are ready to enquire about bespoke availability.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white/40 border border-sera-taupe/20 rounded-sm p-8 max-w-md mx-auto">
            <Heart className="w-8 h-8 text-sera-taupe/40 mx-auto mb-3" />
            <h3 className="font-serif text-lg text-sera-espresso mb-1">Your Wishlist Is Empty</h3>
            <p className="text-xs text-sera-taupe leading-relaxed mb-6">
              Browse our boutique catalogue and tap the heart icon on any jewellery piece you love.
            </p>
            <Link
              href="/boutique"
              className="inline-flex items-center space-x-2 bg-sera-espresso text-sera-ivory text-xs uppercase tracking-widest px-6 py-3 rounded-sm font-semibold hover:opacity-90"
            >
              <span>Explore Boutique</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between text-xs text-sera-taupe pb-3 border-b border-sera-taupe/20">
              <span>{wishlist.length} Saved {wishlist.length === 1 ? 'Piece' : 'Pieces'}</span>
              <Link
                href="/boutique"
                className="hover:text-sera-espresso font-semibold uppercase tracking-wider text-[11px]"
              >
                + Browse More
              </Link>
            </div>

            <div className="divide-y divide-sera-taupe/15 bg-white border border-sera-taupe/20 rounded-sm p-4">
              {wishlist.map((productId) => (
                <div
                  key={productId}
                  className="py-4 flex items-center justify-between text-xs gap-4"
                >
                  <div>
                    <span className="font-mono text-[10px] text-sera-taupe uppercase block">ID: {productId.slice(0, 8)}...</span>
                    <h4 className="font-serif text-sm font-semibold text-sera-espresso mt-0.5">
                      Boutique Jewellery Item
                    </h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        addToTray({
                          id: productId,
                          slug: productId,
                          name: 'Jewellery Piece',
                          sku: 'SRA-WISH',
                          price_paise: 0,
                        });
                        openTray();
                      }}
                      className="px-3 py-1.5 bg-sera-espresso text-sera-ivory rounded-sm text-[11px] uppercase tracking-wider font-semibold hover:opacity-90 flex items-center space-x-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Tray</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(productId)}
                      className="p-1.5 text-sera-taupe hover:text-rose-700"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <EnquiryTrayDrawer />
      <BoutiqueFooter />
    </div>
  );
}
