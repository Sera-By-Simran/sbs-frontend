'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { ProductCard } from '@/components/product/ProductCard';
import { api } from '@/lib/api/client';
import {
  Gem,
  Filter,
  Search,
  Loader2,
  SlidersHorizontal,
  RefreshCw,
} from 'lucide-react';

function BoutiqueContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const badgeParam = searchParams.get('badge');

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategorySlug(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    async function loadCatalogue() {
      setLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          api.getCategories(),
          api.getProducts({ limit: 100 }),
        ]);

        if (catRes.success) setCategories(catRes.data);
        if (prodRes.success) setProducts(prodRes.data);
      } catch (err) {
        console.error('Failed to load catalogue:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCatalogue();
  }, []);

  const categorySlugMap = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((c) => {
      map[c.id] = c.slug;
    });
    return map;
  }, [categories]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Category filter
      if (selectedCategorySlug !== 'all') {
        const productCatSlug = categorySlugMap[p.primary_category_id];
        if (productCatSlug !== selectedCategorySlug) return false;
      }

      // Badge filter
      if (badgeParam && p.badge !== badgeParam) {
        return false;
      }

      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesSku = p.sku?.toLowerCase().includes(q);
        if (!matchesName && !matchesSku) return false;
      }

      return true;
    });

    // Sort
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price_paise - b.price_paise);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price_paise - a.price_paise);
    }

    return result;
  }, [products, selectedCategorySlug, categorySlugMap, badgeParam, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-sera-ivory text-sera-espresso font-sans">
      <BoutiqueHeader />
      <EnquiryTrayDrawer />

      {/* Banner Header */}
      <section className="bg-sera-beige/40 border-b border-sera-taupe/20 py-12 px-6 lg:px-12 text-center">
        <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-2">
          Curated Demi-Fine Pieces
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-sera-espresso">
          The SÉRA Jewellery Collection
        </h1>
        <p className="text-xs sm:text-sm text-sera-espresso/70 max-w-xl mx-auto mt-3 leading-relaxed">
          Sculptural elegance and radiant craftsmanship. Every creation is produced in mindful batches using premium finishes.
        </p>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-bleed mx-auto w-full px-6 lg:px-12 py-10 space-y-8">
        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-sera-taupe/20">
          {/* Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategorySlug('all')}
              className={`px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors flex-shrink-0 ${
                selectedCategorySlug === 'all'
                  ? 'bg-sera-espresso text-sera-ivory'
                  : 'bg-white/80 border border-sera-taupe/30 text-sera-espresso hover:bg-sera-beige/40'
              }`}
            >
              All Pieces
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategorySlug(c.slug)}
                className={`px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors flex-shrink-0 ${
                  selectedCategorySlug === c.slug
                    ? 'bg-sera-espresso text-sera-ivory'
                    : 'bg-white/80 border border-sera-taupe/30 text-sera-espresso hover:bg-sera-beige/40'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
            <div className="relative w-44 sm:w-56">
              <input
                type="text"
                placeholder="Search pieces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-sera-taupe/40 rounded-sm focus:outline-none focus:border-sera-espresso"
              />
              <Search className="w-3.5 h-3.5 text-sera-taupe absolute left-2.5 top-2.5" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-sera-taupe/40 rounded-sm focus:outline-none focus:border-sera-espresso text-sera-espresso"
            >
              <option value="newest">Featured / Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-sera-taupe space-y-2">
            <Loader2 className="w-7 h-7 animate-spin text-sera-espresso" />
            <span className="text-xs uppercase tracking-widest">Unveiling Collection...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-20 text-center text-sera-taupe bg-white/50 border border-dashed border-sera-taupe/30 rounded-sm">
            <Gem className="w-10 h-10 mx-auto opacity-30 text-sera-espresso mb-3" />
            <h3 className="font-serif text-lg text-sera-espresso">No pieces match your selection</h3>
            <p className="text-xs mt-1">Try clearing filters or search terms to view all fine jewellery creations.</p>
            <button
              onClick={() => {
                setSelectedCategorySlug('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 border border-sera-espresso text-sera-espresso rounded-sm text-xs uppercase tracking-wider font-semibold hover:bg-sera-beige/30"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((p) => (
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
      </main>

      <BoutiqueFooter />
    </div>
  );
}

export default function BoutiquePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-sera-ivory flex flex-col justify-between font-sans">
          <BoutiqueHeader />
          <div className="p-24 flex flex-col items-center justify-center text-sera-taupe space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-sera-espresso" />
            <span className="text-xs uppercase tracking-widest font-semibold">Opening Boutique Catalogue...</span>
          </div>
          <BoutiqueFooter />
        </div>
      }
    >
      <BoutiqueContent />
    </Suspense>
  );
}
