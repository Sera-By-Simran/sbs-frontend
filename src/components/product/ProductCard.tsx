'use client';

import React from 'react';
import Link from 'next/link';
import { useTray } from '@/context/TrayContext';
import { Heart, Plus, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    sku: string;
    name: string;
    price_paise: number;
    compare_at_paise?: number | null;
    badge?: string;
    category_name?: string;
    image_url?: string | null;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToTray, toggleWishlist, isWishlisted } = useTray();
  const wishlisted = isWishlisted(product.id);

  function formatPrice(paise: number) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(paise / 100);
  }

  function getBadgeLabel(badge?: string) {
    if (!badge || badge === 'none') return null;
    switch (badge) {
      case 'new_in':
        return 'New In';
      case 'bestseller':
        return 'Bestseller';
      case 'limited_edition':
        return 'Limited Edition';
      default:
        return null;
    }
  }

  const badgeText = getBadgeLabel(product.badge);

  return (
    <div className="group flex flex-col justify-between font-sans bg-white/70 border border-sera-taupe/20 rounded-sm overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square bg-sera-beige/20 overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-sera-ivory to-sera-beige/40">
              <span className="font-serif text-lg text-sera-espresso/70 italic">SÉRA</span>
              <span className="text-[10px] uppercase tracking-widest text-sera-taupe mt-1">Haute Joaillerie</span>
            </div>
          )}
        </Link>

        {/* Badge */}
        {badgeText && (
          <span className="absolute top-2.5 left-2.5 bg-sera-espresso text-sera-ivory text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm shadow-sm">
            {badgeText}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 hover:bg-white text-sera-espresso transition-colors shadow-sm"
          title={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              wishlisted ? 'fill-rose-600 text-rose-600' : 'text-sera-espresso'
            }`}
          />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-sera-espresso/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <button
            onClick={() =>
              addToTray({
                id: product.id,
                slug: product.slug,
                sku: product.sku,
                name: product.name,
                price_paise: product.price_paise,
                compare_at_paise: product.compare_at_paise,
                image_url: product.image_url,
                badge: product.badge,
              })
            }
            className="w-full bg-white text-sera-espresso text-[11px] uppercase tracking-wider font-semibold py-2 rounded-sm shadow hover:bg-sera-beige/60 transition-colors flex items-center justify-center space-x-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Enquiry Tray</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          {product.category_name && (
            <span className="text-[10px] uppercase tracking-widest text-sera-taupe font-semibold block mb-1">
              {product.category_name}
            </span>
          )}
          <Link
            href={`/products/${product.slug}`}
            className="font-serif text-sm text-sera-espresso font-normal group-hover:text-sera-taupe transition-colors line-clamp-1"
            title={product.name}
          >
            {product.name}
          </Link>
          <span className="text-[10px] text-sera-taupe font-mono mt-0.5 block">
            {product.sku}
          </span>
        </div>

        <div className="mt-3 flex items-baseline space-x-2">
          <span className="font-mono text-xs font-semibold text-sera-espresso">
            {formatPrice(product.price_paise)}
          </span>
          {product.compare_at_paise && product.compare_at_paise > product.price_paise && (
            <span className="font-mono text-[11px] text-sera-taupe line-through">
              {formatPrice(product.compare_at_paise)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
