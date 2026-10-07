'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { ProductCard } from '@/components/product/ProductCard';
import { api } from '@/lib/api/client';
import { getMediaUrl } from '@/lib/media';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Gem,
  Truck,
  RotateCcw,
  Lock,
  HeartHandshake,
} from 'lucide-react';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const prodRes = await api.getProducts({ limit: 4 });
        if (prodRes.success) {
          setFeaturedProducts(prodRes.data);
        }
      } catch (err) {
        console.error('Failed to load homepage pieces:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-sera-ivory text-sera-espresso font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />
      <EnquiryTrayDrawer />

      {/* 01. HERO SECTION (Split Layout matching reference) */}
      <section className="relative px-6 lg:px-12 py-10 lg:py-16 max-w-container mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-sera-espresso">
              Timeless Jewellery for Every You
            </h1>

            <p className="text-sera-espresso/70 text-sm sm:text-base leading-relaxed font-light max-w-md">
              Minimal designs. Modern expressions. Crafted in conscious 18K gold vermeil and hypoallergenic sterling silver.
            </p>

            <div>
              <Link
                href="/boutique"
                className="inline-flex items-center space-x-2 bg-sera-espresso text-sera-ivory px-7 py-3.5 rounded-sm text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-all shadow-sm group"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-3.5 h-3.5 text-sera-champagne transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Editorial Image Column */}
          <div className="lg:col-span-7">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-[1/1] w-full max-h-[580px] rounded-sm overflow-hidden bg-sera-beige/50 shadow-sm">
              <Image
                src={getMediaUrl('/editorial/hero-model.jpg')}
                alt="SÉRA Fine Jewellery Model"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 02. TRUST STRIP (4 Badges matching reference) */}
      <section className="border-y border-sera-taupe/20 bg-white/60 py-7 px-6 lg:px-12">
        <div className="max-w-container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-9 h-9 rounded-full border border-sera-taupe/30 flex items-center justify-center text-sera-espresso">
              <Gem className="w-4 h-4 text-amber-800" />
            </div>
            <h3 className="font-serif text-xs font-semibold text-sera-espresso uppercase tracking-wider">
              Premium Quality
            </h3>
            <p className="text-[11px] text-sera-taupe">Crafted with care</p>
          </div>

          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-9 h-9 rounded-full border border-sera-taupe/30 flex items-center justify-center text-sera-espresso">
              <Lock className="w-4 h-4 text-amber-800" />
            </div>
            <h3 className="font-serif text-xs font-semibold text-sera-espresso uppercase tracking-wider">
              Secure Payments
            </h3>
            <p className="text-[11px] text-sera-taupe">100% Safe &amp; Secure</p>
          </div>

          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-9 h-9 rounded-full border border-sera-taupe/30 flex items-center justify-center text-sera-espresso">
              <Truck className="w-4 h-4 text-amber-800" />
            </div>
            <h3 className="font-serif text-xs font-semibold text-sera-espresso uppercase tracking-wider">
              Pan India Shipping
            </h3>
            <p className="text-[11px] text-sera-taupe">Across India</p>
          </div>

          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-9 h-9 rounded-full border border-sera-taupe/30 flex items-center justify-center text-sera-espresso">
              <RotateCcw className="w-4 h-4 text-amber-800" />
            </div>
            <h3 className="font-serif text-xs font-semibold text-sera-espresso uppercase tracking-wider">
              Easy Returns
            </h3>
            <p className="text-[11px] text-sera-taupe">Hassle Free</p>
          </div>
        </div>
      </section>

      {/* 03. SHOP BY COLLECTION (4 Category Cards matching reference) */}
      <section className="py-16 px-6 lg:px-12 max-w-container mx-auto w-full">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-sera-taupe/15">
          <h2 className="font-serif text-2xl sm:text-3xl text-sera-espresso font-normal">
            Shop by Collection
          </h2>
          <Link
            href="/boutique"
            className="text-xs uppercase tracking-widest font-semibold text-sera-espresso hover:text-amber-900 flex items-center space-x-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: 'Necklaces', slug: 'necklaces', image: getMediaUrl('/editorial/cat-necklaces.jpg') },
            { name: 'Earrings', slug: 'earrings', image: getMediaUrl('/editorial/cat-earrings.jpg') },
            { name: 'Rings', slug: 'rings', image: getMediaUrl('/editorial/cat-rings.jpg') },
            { name: 'Bracelets', slug: 'bracelets', image: getMediaUrl('/editorial/cat-bracelets.jpg') },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/boutique?category=${cat.slug}`}
              className="group block text-center"
            >
              <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-white/80 border border-sera-taupe/20 mb-3 shadow-2xs group-hover:border-sera-espresso/40 transition-colors">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <h3 className="font-serif text-sm sm:text-base text-sera-espresso group-hover:text-amber-900 transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 04. MID-PAGE EDITORIAL BANNER ("Everyday Elegance") */}
      <section className="relative px-6 lg:px-12 py-6 max-w-container mx-auto w-full">
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] rounded-sm overflow-hidden bg-sera-espresso shadow-md flex items-center">
          <Image
            src={getMediaUrl('/editorial/everyday-elegance.jpg')}
            alt="Everyday Elegance Flatlay"
            fill
            className="object-cover object-center opacity-85"
            sizes="100vw"
          />
          <div className="relative z-10 p-8 sm:p-14 max-w-md bg-sera-ivory/90 backdrop-blur-xs m-6 sm:m-10 rounded-sm border border-sera-taupe/20 space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl text-sera-espresso font-normal leading-tight">
              Everyday Elegance
            </h2>
            <p className="text-xs sm:text-sm text-sera-taupe leading-relaxed">
              Pieces that go with your every mood. Thoughtfully designed to elevate casual denim as effortlessly as evening silk.
            </p>
            <div className="pt-2">
              <Link
                href="/boutique"
                className="inline-block bg-sera-espresso text-sera-ivory px-6 py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold hover:opacity-90"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 05. BESTSELLERS SECTION */}
      <section className="py-16 px-6 lg:px-12 max-w-container mx-auto w-full">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-sera-taupe/15">
          <h2 className="font-serif text-2xl sm:text-3xl text-sera-espresso font-normal">
            Bestsellers
          </h2>
          <Link
            href="/boutique"
            className="text-xs uppercase tracking-widest font-semibold text-sera-espresso hover:text-amber-900 flex items-center space-x-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="p-12 text-center text-sera-taupe bg-white/50 border border-sera-taupe/20 rounded-sm">
            <Gem className="w-6 h-6 mx-auto opacity-40 text-sera-espresso mb-2" />
            <p className="text-xs font-serif text-sera-espresso">Boutique Pieces Arriving Soon</p>
            <p className="text-[11px] text-sera-taupe mt-1">Catalogue is ready for your real inventory via Admin Import.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((p) => (
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
        )}
      </section>

      <BoutiqueFooter />
    </div>
  );
}
