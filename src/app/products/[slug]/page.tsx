'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { ProductCard } from '@/components/product/ProductCard';
import { useTray } from '@/context/TrayContext';
import { api } from '@/lib/api/client';
import { getMediaUrl } from '@/lib/media';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Lock,
  Star,
  Plus,
  Minus,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Loader2,
  Gem,
  Feather,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { addToTray, toggleWishlist, isWishlisted, openTray } = useTray();
  const [product, setProduct] = useState<any | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Accordions
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    details: true,
    care: false,
    shipping: false,
  });

  function toggleAccordion(key: string) {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const [res, relatedRes] = await Promise.all([
          api.getProductBySlug(slug),
          api.getProducts({ limit: 4 }),
        ]);

        if (res.success && res.data) {
          setProduct(res.data);
        } else {
          setError('Jewellery piece not found');
        }

        if (relatedRes.success) {
          setRelatedProducts(relatedRes.data.filter((p: any) => p.slug !== slug));
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

  const rawImages: string[] = product.media_urls?.length > 0
    ? product.media_urls
    : ['/editorial/cat-necklaces.jpg'];
  const images = rawImages.map((u) => getMediaUrl(u));

  function handleAddToCart() {
    addToTray(
      {
        id: product.id,
        slug: product.slug,
        sku: product.sku,
        name: product.name,
        price_paise: product.price_paise,
        compare_at_paise: product.compare_at_paise,
        image_url: images[0] || null,
        badge: product.badge,
      },
      quantity
    );
    openTray();
  }

  return (
    <div className="min-h-screen flex flex-col bg-sera-ivory text-sera-espresso font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />
      <EnquiryTrayDrawer />

      {/* Breadcrumb matching Reference Board 03 */}
      <div className="border-b border-sera-taupe/15 px-6 lg:px-12 py-3 bg-white/40 text-xs">
        <div className="max-w-container mx-auto flex items-center space-x-1.5 text-sera-taupe">
          <Link href="/" className="hover:text-sera-espresso">Home</Link>
          <span>/</span>
          <Link href="/boutique" className="hover:text-sera-espresso">Collections</Link>
          <span>/</span>
          <span className="text-sera-espresso font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <main className="flex-1 max-w-container mx-auto w-full px-6 lg:px-12 py-10 lg:py-14 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Gallery Left (Thumbnails on left + Large active image) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-sm overflow-hidden border transition-all flex-shrink-0 ${
                      selectedImageIdx === idx
                        ? 'border-sera-espresso ring-1 ring-sera-espresso'
                        : 'border-sera-taupe/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-square bg-white border border-sera-taupe/20 rounded-sm overflow-hidden shadow-sm">
              <img
                src={images[selectedImageIdx] || images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {product.badge && product.badge !== 'none' && (
                <span className="absolute top-4 left-4 bg-sera-champagne text-sera-espresso text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-sm shadow-xs">
                  {product.badge.replace('_', ' ')}
                </span>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-sera-espresso hover:text-rose-600 transition-colors shadow-sm"
                title="Save to Wishlist"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlisted ? 'fill-rose-600 text-rose-600' : 'text-sera-espresso'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Details Right (Matching Board 03) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal">
                {product.name}
              </h1>

              {/* Star Rating & Reviews */}
              <div className="flex items-center space-x-2 mt-2 text-xs">
                <div className="flex text-amber-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-sera-espresso">4.8</span>
                <span className="text-sera-taupe">(120 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3 pt-3 border-t border-sera-taupe/20">
              <span className="font-mono text-2xl font-bold text-sera-espresso">
                {formatPrice(product.price_paise)}
              </span>
              {product.compare_at_paise && product.compare_at_paise > product.price_paise && (
                <span className="font-mono text-sm text-sera-taupe line-through">
                  {formatPrice(product.compare_at_paise)}
                </span>
              )}
              <span className="text-[11px] text-sera-taupe">(inclusive of all taxes)</span>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-sera-espresso/80 leading-relaxed font-light">
              {product.short_description ||
                'A timeless gold pendant with a delicate sparkle. Crafted in thick 18K gold vermeil for everyday wear or festive elegance.'}
            </p>

            {/* Feature Bullets (Matching Board 03) */}
            <div className="space-y-2 py-3 border-y border-sera-taupe/20 text-xs text-sera-espresso/90">
              <div className="flex items-center space-x-2.5">
                <Gem className="w-3.5 h-3.5 text-amber-800" />
                <span>Premium 18K gold vermeil plating</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
                <span>Hypoallergenic &amp; skin-friendly alloy</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Feather className="w-3.5 h-3.5 text-amber-800" />
                <span>Lightweight &amp; comfortable for all-day wear</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Perfect for everyday wear or special occasions</span>
              </div>
            </div>

            {/* Quantity Selector + Add to Cart + Buy Now */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                {/* Quantity */}
                <div className="flex items-center border border-sera-taupe/30 bg-white rounded-sm px-2 py-2 text-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-sera-taupe hover:text-sera-espresso"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 font-mono font-semibold text-sera-espresso">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-sera-taupe hover:text-sera-espresso"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* ADD TO CART Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-sera-espresso text-sera-ivory py-3 rounded-sm text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-sera-champagne" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* BUY NOW Button */}
              <button
                onClick={handleAddToCart}
                className="w-full border border-sera-espresso bg-white text-sera-espresso py-3 rounded-sm text-xs uppercase tracking-widest font-semibold hover:bg-sera-beige/30 transition-colors shadow-2xs"
              >
                Buy Now
              </button>
            </div>

            {/* Inline Trust Badges (Board 03) */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-sera-taupe border-b border-sera-taupe/20 pb-4">
              <div className="flex flex-col items-center space-y-1">
                <Truck className="w-4 h-4 text-sera-espresso" />
                <span>Pan India Shipping</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <Lock className="w-4 h-4 text-sera-espresso" />
                <span>Secure Payments</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RotateCcw className="w-4 h-4 text-sera-espresso" />
                <span>Easy Returns</span>
              </div>
            </div>

            {/* Accordions (Product Details, Care, Shipping) */}
            <div className="divide-y divide-sera-taupe/20 pt-1 text-xs">
              <div>
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full py-3.5 flex items-center justify-between font-serif text-sm font-semibold text-sera-espresso hover:text-amber-900"
                >
                  <span>Product Details</span>
                  <span>{openAccordions.details ? '—' : '+'}</span>
                </button>
                {openAccordions.details && (
                  <div className="pb-3 text-sera-espresso/80 leading-relaxed space-y-1.5">
                    <p>• Metallurgy: 18K Yellow Gold Vermeil over 925 Sterling Silver</p>
                    <p>• Clasp: Lobster claw with 2-inch extension chain</p>
                    <p>• Weight: 3.8g ultra-lightweight drape</p>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-3.5 flex items-center justify-between font-serif text-sm font-semibold text-sera-espresso hover:text-amber-900"
                >
                  <span>Care Instructions</span>
                  <span>{openAccordions.care ? '—' : '+'}</span>
                </button>
                {openAccordions.care && (
                  <div className="pb-3 text-sera-espresso/80 leading-relaxed space-y-1">
                    <p>• Store in your provided SÉRA velvet keepsake pouch.</p>
                    <p>• Keep away from harsh perfumes, alcohol sanitizers, and chlorine.</p>
                    <p>• Buff gently with a soft microfibre cloth after wear.</p>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-3.5 flex items-center justify-between font-serif text-sm font-semibold text-sera-espresso hover:text-amber-900"
                >
                  <span>Shipping &amp; Returns</span>
                  <span>{openAccordions.shipping ? '—' : '+'}</span>
                </button>
                {openAccordions.shipping && (
                  <div className="pb-3 text-sera-espresso/80 leading-relaxed space-y-1">
                    <p>• Complimentary insured dispatch across India in 2–4 business days.</p>
                    <p>• 48-hour exchange window for unworn items with security seal intact.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 04. "YOU MAY ALSO LIKE" SECTION (Board 03 bottom) */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 border-t border-sera-taupe/20 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl sm:text-3xl text-sera-espresso font-normal">
                You May Also Like
              </h2>
              <Link
                href="/boutique"
                className="text-xs uppercase tracking-widest font-semibold text-sera-espresso hover:text-amber-900"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={{
                    id: p.id,
                    slug: p.slug,
                    sku: p.sku,
                    name: p.name,
                    price_paise: p.price_paise,
                    compare_at_paise: p.compare_at_paise,
                    badge: p.badge,
                    image_url: p.primary_media_url || null,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <BoutiqueFooter />
    </div>
  );
}
