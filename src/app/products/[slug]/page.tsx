'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { useTray } from '@/context/TrayContext';
import { api } from '@/lib/api/client';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Loader2,
  Check,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { addToTray, toggleWishlist, isWishlisted } = useTray();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Accordion tabs
  const [openTab, setOpenTab] = useState<'craft' | 'care' | 'delivery' | null>('craft');

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const res = await api.getProductBySlug(slug);
        if (res.success && res.data) {
          setProduct(res.data);
        } else {
          setError('Jewellery piece not found');
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to load piece');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-sera-ivory flex flex-col justify-between font-sans">
        <BoutiqueHeader />
        <div className="p-24 flex flex-col items-center justify-center text-sera-taupe space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-sera-espresso" />
          <span className="text-xs uppercase tracking-widest font-semibold">Unveiling Jewellery Piece...</span>
        </div>
        <BoutiqueFooter />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-sera-ivory flex flex-col justify-between font-sans">
        <BoutiqueHeader />
        <div className="p-24 text-center max-w-md mx-auto space-y-4">
          <h2 className="font-serif text-2xl text-sera-espresso">Piece Not Found</h2>
          <p className="text-xs text-sera-taupe">
            The requested jewellery creation might have moved or is exclusively available via private showroom appointment.
          </p>
          <Link
            href="/boutique"
            className="inline-flex items-center space-x-2 bg-sera-espresso text-sera-ivory px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Boutique</span>
          </Link>
        </div>
        <BoutiqueFooter />
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  function formatPrice(paise: number) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(paise / 100);
  }

  const images: string[] = product.media_urls?.length > 0 ? product.media_urls : [];

  return (
    <div className="min-h-screen flex flex-col bg-sera-ivory text-sera-espresso font-sans">
      <BoutiqueHeader />
      <EnquiryTrayDrawer />

      {/* Breadcrumbs */}
      <div className="border-b border-sera-taupe/20 px-6 lg:px-12 py-3 bg-white/40">
        <div className="max-w-bleed mx-auto flex items-center space-x-2 text-[11px] uppercase tracking-wider text-sera-taupe">
          <Link href="/" className="hover:text-sera-espresso">Home</Link>
          <span>/</span>
          <Link href="/boutique" className="hover:text-sera-espresso">Boutique</Link>
          <span>/</span>
          <span className="text-sera-espresso font-semibold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* PDP Content */}
      <main className="flex-1 max-w-bleed mx-auto w-full px-6 lg:px-12 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-sera-beige/20 border border-sera-taupe/20 rounded-sm overflow-hidden relative">
              {images.length > 0 ? (
                <img
                  src={images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-gradient-to-br from-sera-ivory to-sera-beige/40">
                  <span className="font-serif text-3xl text-sera-espresso/70 italic">SÉRA</span>
                  <span className="text-xs uppercase tracking-widest text-sera-taupe mt-2">Haute Joaillerie</span>
                </div>
              )}

              {product.badge && product.badge !== 'none' && (
                <span className="absolute top-4 left-4 bg-sera-espresso text-sera-ivory text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm shadow-md">
                  {product.badge.replace('_', ' ')}
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square bg-sera-beige/20 border border-sera-taupe/30 rounded-sm overflow-hidden"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Actions */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] text-sera-taupe font-semibold">
                  Demi-Fine Joaillerie
                </span>
                <span className="text-[10px] uppercase font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-sm">
                  Available to Order
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal mt-2">
                {product.name}
              </h1>
              <p className="text-xs text-sera-taupe font-mono mt-1">
                Ref: {product.sku}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 pt-2 border-t border-sera-taupe/20">
              <span className="font-mono text-2xl font-bold text-sera-espresso">
                {formatPrice(product.price_paise)}
              </span>
              {product.compare_at_paise && product.compare_at_paise > product.price_paise && (
                <span className="font-mono text-sm text-sera-taupe line-through">
                  {formatPrice(product.compare_at_paise)}
                </span>
              )}
              <span className="text-[11px] text-sera-taupe">Incl. of all taxes & insurance</span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-sera-espresso/80 leading-relaxed font-light">
              {product.short_description ||
                'Exquisitely handcrafted with luminous polish and meticulous precision. Designed to be cherished as a contemporary heirloom.'}
            </p>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-sera-taupe/20">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    addToTray({
                      id: product.id,
                      slug: product.slug,
                      sku: product.sku,
                      name: product.name,
                      price_paise: product.price_paise,
                      compare_at_paise: product.compare_at_paise,
                      image_url: images[0] || null,
                      badge: product.badge,
                    })
                  }
                  className="flex-1 bg-sera-espresso text-sera-ivory py-3.5 rounded-sm text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-sera-champagne" />
                  <span>Add to Enquiry Tray</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3.5 border border-sera-taupe/40 bg-white rounded-sm hover:bg-sera-beige/30 text-sera-espresso transition-colors shadow-sm"
                  title="Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      wishlisted ? 'fill-rose-600 text-rose-600' : 'text-sera-espresso'
                    }`}
                  />
                </button>
              </div>

              <a
                href={`https://wa.me/919999999999?text=Hello%20SÉRA%20Concierge,%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                  product.name
                )}%20(${product.sku}).`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 border border-emerald-700/50 bg-emerald-50/50 text-emerald-800 py-3 rounded-sm text-xs uppercase tracking-wider font-semibold hover:bg-emerald-100/50 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Instant Styling Advice via WhatsApp</span>
              </a>
            </div>

            {/* Trust Assurances */}
            <div className="bg-white/70 border border-sera-taupe/30 rounded-sm p-4 space-y-2.5">
              <div className="flex items-center space-x-2.5 text-xs text-sera-espresso">
                <Truck className="w-4 h-4 text-sera-taupe flex-shrink-0" />
                <span>Complimentary Insured Pan-India Express Delivery</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-sera-espresso">
                <ShieldCheck className="w-4 h-4 text-sera-taupe flex-shrink-0" />
                <span>Certified Anti-Tarnish & Hypoallergenic Finish</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-sera-espresso">
                <Sparkles className="w-4 h-4 text-sera-taupe flex-shrink-0" />
                <span>Signature SÉRA Velvet Box & Authenticity Card Included</span>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="border-t border-sera-taupe/20 divide-y divide-sera-taupe/15">
              {/* Craftsmanship */}
              <div>
                <button
                  onClick={() => setOpenTab(openTab === 'craft' ? null : 'craft')}
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-sera-espresso"
                >
                  <span>Materials & Craftsmanship</span>
                  {openTab === 'craft' ? <ChevronUp className="w-4 h-4 text-sera-taupe" /> : <ChevronDown className="w-4 h-4 text-sera-taupe" />}
                </button>
                {openTab === 'craft' && (
                  <div className="pb-4 text-xs text-sera-espresso/80 leading-relaxed space-y-2">
                    <p>
                      Each SÉRA creation is engineered using premium brass core enveloped in thick 18k solid gold vermeil or rhodium dip for luminous, long-lasting brilliance.
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-sera-taupe">
                      <li>Hand-set cubic zirconia & lab-grown crystals</li>
                      <li>Lead-free, nickel-free, skin-friendly composition</li>
                      <li>Inspected individually under high-magnification QC</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Care */}
              <div>
                <button
                  onClick={() => setOpenTab(openTab === 'care' ? null : 'care')}
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-sera-espresso"
                >
                  <span>Jewellery Care Guide</span>
                  {openTab === 'care' ? <ChevronUp className="w-4 h-4 text-sera-taupe" /> : <ChevronDown className="w-4 h-4 text-sera-taupe" />}
                </button>
                {openTab === 'care' && (
                  <div className="pb-4 text-xs text-sera-espresso/80 leading-relaxed space-y-1">
                    <p>To preserve the pristine lustre of your piece:</p>
                    <ul className="list-disc pl-4 space-y-1 text-sera-taupe">
                      <li>Apply perfumes, lotions, and hairspray before putting on jewellery.</li>
                      <li>Avoid contact with pool water, direct moisture, and harsh cleaning agents.</li>
                      <li>Store in your complimentary SÉRA keepsake pouch when not in use.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Delivery & Returns */}
              <div>
                <button
                  onClick={() => setOpenTab(openTab === 'delivery' ? null : 'delivery')}
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-sera-espresso"
                >
                  <span>Insured Shipping & Sizing</span>
                  {openTab === 'delivery' ? <ChevronUp className="w-4 h-4 text-sera-taupe" /> : <ChevronDown className="w-4 h-4 text-sera-taupe" />}
                </button>
                {openTab === 'delivery' && (
                  <div className="pb-4 text-xs text-sera-espresso/80 leading-relaxed space-y-1">
                    <p>Dispatched within 24–48 hours in tamper-evident secure packaging.</p>
                    <p className="text-sera-taupe">
                      For bespoke sizing or custom length adjustments, mention your requirements in the enquiry tray or consult directly on WhatsApp.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <BoutiqueFooter />
    </div>
  );
}
