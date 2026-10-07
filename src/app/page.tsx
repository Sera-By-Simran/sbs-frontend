'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { ProductCard } from '@/components/product/ProductCard';
import { api } from '@/lib/api/client';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Gem,
  Truck,
  HeartHandshake,
  MessageCircle,
  Eye,
} from 'lucide-react';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, catRes] = await Promise.allSettled([
          api.getProducts({ limit: 8 }),
          api.getCategories(),
        ]);

        if (prodRes.status === 'fulfilled' && prodRes.value.success) {
          setFeaturedProducts(prodRes.value.data);
        }
        if (catRes.status === 'fulfilled' && catRes.value.success) {
          setCategories(catRes.value.data);
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

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 py-20 lg:py-32 max-w-bleed mx-auto w-full text-center">
        <div className="inline-flex items-center space-x-2 border border-sera-taupe/30 bg-white/70 px-4 py-1.5 rounded-full mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-sera-taupe" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold">
            Boutique Haute Joaillerie
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-sera-espresso max-w-4xl mx-auto mb-6">
          The Poetry of Fine Geometry & Warm Lustre
        </h1>

        <p className="text-sera-espresso/80 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Sculptural elegance crafted for the discerning eye. Each piece is designed to reflect timeless grace, understated radiance, and effortless modern luxury.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/boutique"
            className="w-full sm:w-auto bg-sera-espresso text-sera-ivory px-8 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm hover:opacity-90 transition-opacity shadow-sm"
          >
            Discover Collection
          </Link>
          <a
            href="#showroom"
            className="w-full sm:w-auto border border-sera-taupe/50 text-sera-espresso px-8 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-sera-beige/50 transition-colors"
          >
            Explore Showroom
          </a>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-sera-beige/60 border-y border-sera-taupe/30 py-8 px-6 lg:px-12">
        <div className="max-w-container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <Truck className="w-4 h-4 text-sera-taupe mx-auto mb-1" />
            <h3 className="font-serif text-sm font-medium text-sera-espresso">Insured Pan-India Transit</h3>
            <p className="text-[11px] text-sera-espresso/70">Complimentary secure delivery</p>
          </div>
          <div className="space-y-1">
            <ShieldCheck className="w-4 h-4 text-sera-taupe mx-auto mb-1" />
            <h3 className="font-serif text-sm font-medium text-sera-espresso">Certified Demi-Fine Finish</h3>
            <p className="text-[11px] text-sera-espresso/70">Skin-friendly anti-tarnish dip</p>
          </div>
          <div className="space-y-1">
            <HeartHandshake className="w-4 h-4 text-sera-taupe mx-auto mb-1" />
            <h3 className="font-serif text-sm font-medium text-sera-espresso">Private Concierge</h3>
            <p className="text-[11px] text-sera-espresso/70">Dedicated bespoke styling assist</p>
          </div>
          <div className="space-y-1">
            <Gem className="w-4 h-4 text-sera-taupe mx-auto mb-1" />
            <h3 className="font-serif text-sm font-medium text-sera-espresso">Signature Keepsake Box</h3>
            <p className="text-[11px] text-sera-espresso/70">Velvet pouch & certificate</p>
          </div>
        </div>
      </section>

      {/* Category Navigation Showcase */}
      <section className="py-20 px-6 lg:px-12 max-w-container mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-1">
            Curated Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal">
            Refined Expressions
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: 'Necklaces & Pendants', slug: 'necklaces', desc: 'Sculptural neckpieces' },
            { name: 'Earrings & Hoops', slug: 'earrings', desc: 'Luminous statement studs' },
            { name: 'Rings & Bands', slug: 'rings', desc: 'Architectural modern solitaires' },
            { name: 'Bracelets & Cuffs', slug: 'bracelets', desc: 'Tennis lines & fluid wristwear' },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/boutique?category=${cat.slug}`}
              className="group bg-white/70 border border-sera-taupe/30 rounded-sm p-6 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-sera-taupe block mb-1">
                  Collection
                </span>
                <h3 className="font-serif text-lg text-sera-espresso font-normal group-hover:text-sera-taupe transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-sera-espresso/60 mt-1">{cat.desc}</p>
              </div>

              <div className="mt-8 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-sera-espresso/80 group-hover:text-sera-espresso">
                <span>View Pieces</span>
                <ArrowRight className="w-3.5 h-3.5 text-sera-taupe group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Pieces Rail */}
      <section className="bg-sera-beige/30 border-y border-sera-taupe/20 py-20 px-6 lg:px-12">
        <div className="max-w-bleed mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-1">
                Spotlight Edit
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal">
                Curated Creations
              </h2>
            </div>
            <Link
              href="/boutique"
              className="text-xs uppercase tracking-widest font-semibold text-sera-espresso hover:text-sera-taupe flex items-center space-x-1.5 transition-colors"
            >
              <span>Explore Complete Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="p-16 text-center text-sera-taupe bg-white/60 border border-dashed border-sera-taupe/30 rounded-sm">
              <Gem className="w-8 h-8 mx-auto opacity-30 text-sera-espresso mb-2" />
              <p className="text-sm">New boutique pieces currently being staged in the studio.</p>
              <Link
                href="/boutique"
                className="mt-3 inline-block text-xs uppercase tracking-wider font-semibold text-sera-espresso underline"
              >
                Browse All
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
        </div>
      </section>

      {/* Virtual Showroom Feature Showcase */}
      <section id="showroom" className="py-24 px-6 lg:px-12 max-w-container mx-auto w-full">
        <div className="bg-white/80 border border-sera-taupe/30 rounded-sm p-8 sm:p-14 shadow-sm flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center space-x-1.5 bg-sera-champagne/40 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold text-sera-espresso">
              <Eye className="w-3 h-3" />
              <span>Interactive Space</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal leading-snug">
              The Digital Showroom Experience
            </h2>
            <p className="text-xs sm:text-sm text-sera-espresso/70 leading-relaxed font-light">
              Experience SÉRA creations as if standing before the velvet pedestals of our flagship salon. Discover high-magnification stone cuts, layered styling pairings, and certified finish details before ordering.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/boutique"
                className="w-full sm:w-auto bg-sera-espresso text-sera-ivory px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
              >
                Step Into Showroom
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hello%20SÉRA,%20I%20would%20like%20to%20book%20a%20private%20virtual%20appointment."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto border border-sera-taupe/40 text-sera-espresso px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold hover:bg-sera-beige/30 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Book Private Viewing</span>
              </a>
            </div>
          </div>

          <div className="flex-1 w-full aspect-video bg-gradient-to-tr from-sera-espresso to-sera-espresso/90 text-sera-ivory rounded-sm p-8 flex flex-col justify-between shadow-inner relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-sera-champagne">
                Curator’s Desk
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light">
                “Fine jewellery should elevate your everyday cadence, not wait in a bank vault.”
              </h3>
            </div>
            <div className="border-t border-sera-taupe/30 pt-3 flex items-center justify-between text-[11px] text-sera-taupe">
              <span>Simran — Founder & Creative Director</span>
              <span className="font-mono">SÉRA Flagship</span>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story / About Section */}
      <section id="about" className="bg-sera-beige/40 border-t border-sera-taupe/20 py-20 px-6 lg:px-12 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block">
            The SÉRA Ethos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal">
            Conscious Demi-Fine Elegance
          </h2>
          <p className="text-xs sm:text-sm text-sera-espresso/80 leading-relaxed font-light">
            Born out of a desire for enduring beauty without prohibitive traditional markups, SÉRA BY SIMRAN bridges authentic craft and contemporary design. Every piece is an ode to refined symmetry and conscious craftsmanship.
          </p>
        </div>
      </section>

      <BoutiqueFooter />
    </div>
  );
}
